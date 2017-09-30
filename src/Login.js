import React from 'react';
import { Form, Icon, Input, Button, Checkbox,message } from 'antd';
import md5 from 'js-md5';
import $ from 'jquery';
import './Login.css'
const FormItem = Form.Item;

//登录页
class LoginForm extends React.Component {
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
        var _this = this;
        $.ajax({
          url:'/login',
          dataType:'json',
          type:'POST',
          data:{name:values.userName,password:md5(values.password)},
          success:function(data){
            if(data.status===1){
              _this.setCookie('user',values.userName);
              var storage=window.localStorage;
              storage.token = data.token;
              _this.props.history.push('./app');
            }else{
              message.error('登录失败,账号或密码不正确');;
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

const WrappedLoginForm = Form.create()(LoginForm);
export default WrappedLoginForm;