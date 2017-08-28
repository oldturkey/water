import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import $ from 'jquery';
import './Login.css'
const FormItem = Form.Item;


class NormalLoginForm extends React.Component {
   setCookie=(cname,cvalue,exdays)=>{
      const d = new Date();
      d.setTime(d.getTime()+(exdays*24*60*60*1000));
      const expires = "expires="+d.toGMTString();
      document.cookie = cname + "=" + cvalue + "; " + expires;
   }
    
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        var _this = this;
        $.ajax({
          url:'http://112.124.6.31:80/watermachineplateform/login',
          dataType:'json',
          type:'POST',
          data:{name:values.userName,password:values.password},
          success:function(data){
            if(data===true){
              _this.setCookie('user',values.userName);
              _this.props.history.push('./app');
            }else{
              alert('登录失败');
            }
          },
          error:function(xhr,status,err){
            console.error(this.props.url,status,err.toString());
          }.bind(this)
        })
      }
        });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="loginBox">
      <Form onSubmit={this.handleSubmit} className="login-form">
        <h2 className="formTitle">智能饮水机管理平台</h2>

        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入您的用户名!' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入您的密码！' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住我</Checkbox>
          )}
          <a className="login-form-forgot" href="">忘记密码？</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
          或者 <a href="">立即注册!</a>
        </FormItem>
      </Form>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
export default WrappedNormalLoginForm;