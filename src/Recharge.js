import React from 'react';
import $ from 'jquery';
import { Form,  Input, Button } from 'antd';
const FormItem = Form.Item;


class App extends React.Component {
  
  handleSubmit01 = (e) => {
    e.preventDefault();
    this.props.form.resetFields(['phone','money']);
    var user = this.props.admin;
    var _this = this;
    this.props.form.validateFields(['note'],(err, values) => {
    $.ajax({
    	url:'/rechargeAll',
    	dataType:'json',
    	type:'POST',
    	data:{money:values.note,adminName:user},
    	success:function(data){
        if(data===1){
            alert('充值成功');
            _this.props.form.resetFields(['note']);
        }else{
          alert('充值失败');
        }
    	},
    	error:function(xhr,status,err){
    		console.error(this.props.url,status,err.toString());
    	}.bind(this)
      });
    });
  }
  handleSubmit02 = (e) => {
    this.props.form.resetFields(['note']);
    var user = this.props.admin;
    var _this = this;
    e.preventDefault();
    this.props.form.validateFields(['phone','money'],(err, values) => {
      $.ajax({
        url:'http://192.168.31.14:8080/rechargePerson',
        dataType:'json',
        type:'POST',
        data:{money:values.money,adminName:user,phone:values.phone},
        success:function(data){
          if(data===1){
              alert('充值成功');
              _this.props.form.resetFields(['phone','money']);
          }else{
            alert('充值失败');
          }
        },
        error:function(xhr,status,err){
          console.error(this.props.url,status,err.toString());
        }.bind(this)
      });
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;  
    return (
    <div style={{width:'80%',margin:'0 auto'}}>
    	<div style={{marginTop:'20px',borderBottom:'2px solid #eee'}}>
      	<p className="dataTitle">所有用户余额充值：</p>
        <Form onSubmit={this.handleSubmit01}>
          <FormItem
            label="金额(元)"
            labelCol={{ lg: 5 }}
            wrapperCol={{ lg: 4 }}
          >
            {getFieldDecorator('note', {
              rules: [{ required: true, message: '请输入充值金额!' }],
            })(
              <Input onChange={this.handleChange} />
            )}
          </FormItem>
          <FormItem
            wrapperCol={{ lg: 6, offset: 5 }}
          >
            <Button type="primary" htmlType="submit">
              充值
            </Button>
          </FormItem>
        </Form>
        </div>
      <div style={{marginTop:'20px',borderBottom:'2px solid #eee'}}>
        <p className="dataTitle">指定用户余额充值：</p>
        <Form onSubmit={this.handleSubmit02}>
          <FormItem
            label="金额(元)"
            labelCol={{ lg: 5 }}
            wrapperCol={{ lg: 4 }}
          >
            {getFieldDecorator('money', {
              rules: [{ required: true, message: '请输入充值金额!' }],
            })(
              <Input onChange={this.handleChange} />
            )}
          </FormItem>
          <FormItem
              label="用户手机号码"
              labelCol={{ lg: 5 }}
              wrapperCol={{ lg: 4 }}
            >
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: '请输入用户的手机号码!' }],
              })(
                <Input onChange={this.handleChange} />
              )}
            </FormItem>
          <FormItem
            wrapperCol={{ lg: 6, offset: 5 }}
          >
            <Button type="primary" htmlType="submit">
              充值
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
    );
  }
}

const WrappedApp = Form.create()(App);
export default WrappedApp;