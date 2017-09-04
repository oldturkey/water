import React from 'react';
import $ from 'jquery';
import { Form,  Input, Button,InputNumber } from 'antd';
const FormItem = Form.Item;


class deviceManage extends React.Component {
  
  handleSubmit01 = (e) => {
    e.preventDefault();
    this.props.form.resetFields(['phone','money']);
    var user = this.props.admin;
    var _this = this;
    this.props.form.validateFields(['note'],(err, values) => {
    $.ajax({
    	url:'http://119.23.210.52:80/watermachineplateform/deviceManage',
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
  

  render() {
    const { getFieldDecorator } = this.props.form;  
    return (
    <div >
    	<div style={{marginTop:'20px',borderBottom:'2px solid #eee'}}>
      	<p className="dataTitle">添加设备</p>
        <Form onSubmit={this.handleSubmit01} layout='inline'>
          <FormItem
            label="IMEI号："    
          >
            {getFieldDecorator('IMEI', {
              rules: [{ required: true, message: '请输入IMEI号!' }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            label="地址："    
          >
            {getFieldDecorator('location', {
              rules: [{ required: true, message: '请输入设备地址!' }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            label="SIM卡号："   
          >
            {getFieldDecorator('SIM', {
              rules: [{ required: true, message: '请输入设备SIM卡号!' }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            wrapperCol={{ lg: 6, offset: 5 }}
          >
            <Button type="primary" htmlType="submit">
              添加
            </Button>
          </FormItem>
        </Form>
        </div>
      <div style={{marginTop:'20px',borderBottom:'2px solid #eee'}}>
        <p className="dataTitle">删除设备</p>
        <Form onSubmit={this.handleSubmit02} layout='inline'>
          <FormItem
            label="IMEI号："
          >
            {getFieldDecorator('deletIMEI', {
              rules: [{ required: true, message: '请输入设备IMEI号!' }],
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem
          >
            <Button type="primary" htmlType="submit">
              删除
            </Button>
          </FormItem>
        </Form>
      </div>
      <div style={{marginTop:'20px',borderBottom:'2px solid #eee'}}>
        <p className="dataTitle">更新设备</p>
        <Form onSubmit={this.handleSubmit02} layout='inline'>
          <FormItem
            label="原IMEI号："
          >
            {getFieldDecorator('historyIMEI', {
              rules: [{ required: true, message: '请输入设备原始IMEI号!' }],
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem
            label="现在IMEI号："
          >
            {getFieldDecorator('updateIMEI', {
              rules: [{ required: true, message: '请输入设备IMEI号!' }],
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem
          >
            <Button type="primary" htmlType="submit">
              更新设备
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
    );
  }
}

const device = Form.create()(deviceManage);
export default device;