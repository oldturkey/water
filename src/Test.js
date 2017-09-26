import React from 'react';
import $ from 'jquery';
import { Form, Input, Button } from 'antd';
const FormItem = Form.Item;
class Test extends React.Component {
	 
  
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
    	const token = window.localStorage["token"];
    	if (!err) {
		    $.ajax({
		    	url:'/parameter',
		    	dataType:'json',
		    	type:'POST',
		    	headers: {
			    'Authorization': token,
			  	},
		    	data:{displayId:values.id,openTime:values.openTime?values.openTime:'',pulse:values.pulse?values.pulse:'',heartRate:values.heartRate?values.heartRate:'',hotPulse:values.hotPulse?values.hotPulse:''},
		    	success:function(data){
		        if(data.status===1){
		            alert('设置成功');
		        }else{
		          alert('设置失败');
		        }
		    	},
		    	error:function(xhr,status,err){
		    		console.error(this.props.url,status,err.toString());
		    	}.bind(this)
	    	});
		}
	});
   }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 4},
    };
    return (
    	<div>
    	<Form onSubmit={this.handleSubmit}>
	    	<FormItem
	          label="设备编号"
	          {...formItemLayout}
	        >
	          {getFieldDecorator('id', {
	            rules: [{ required: true, message: '请输入您的设备编号!' }],
	          })(
	            <Input />
	          )}
	        </FormItem>
	        <FormItem
	          label="阀门打开时间(s)"
	          {...formItemLayout}
	        >
	          {getFieldDecorator('openTime', {
	            rules: [{  message: '请输入设备阀门打开时间!' }],
	          })(
	            <Input />
	          )}
	        </FormItem>
	        <FormItem
	          label="设备冷水脉冲(个/L)"
	          {...formItemLayout}
	        >
	          {getFieldDecorator('pulse', {
	            rules: [{  message: '请输入设备冷水脉冲!' }],
	          })(
	            <Input />
	          )}
	        </FormItem>
	        <FormItem
	          label="设备热水脉冲(个/L)"
	          {...formItemLayout}
	        >
	          {getFieldDecorator('hotPulse', {
	            rules: [{  message: '请输入设备热水脉冲!' }],
	          })(
	            <Input />
	          )}
	        </FormItem>
	        <FormItem
	          label="心跳频率(min)"
	          {...formItemLayout}
	        >
	          {getFieldDecorator('heartRate', {
	            rules: [{ message: '请输入设备心跳频率!' }],
	          })(
	            <Input />
	          )}
	        </FormItem>
	        <FormItem
	          wrapperCol={{ lg: 6, offset: 4 }}
	        >
	        	<Button type="primary" htmlType="submit">
	            提交
	          	</Button>
	         </FormItem>
        
        </Form>
      </div>
    );
  }
}
	const TestApp = Form.create()(Test);
	export default TestApp;
