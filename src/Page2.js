import React from 'react';
import $ from 'jquery';
import { Form,  Input, Button } from 'antd';
const FormItem = Form.Item;


class App extends React.Component {
	state={
	 data:''
	}

  handleSubmit = (e) => {
    e.preventDefault();
    var money=this.state.data;
    $.ajax({
    	url:'/recharge',
    	dataType:'json',
    	type:'POST',
    	data:{money:money,AdminName:'xu'},
    	success:function(){
    		alert('充值成功');
    	},
    	error:function(xhr,status,err){
    		console.error(this.props.url,status,err.toString());
    	}.bind(this)
    })
  }
  handleChange = (e) => {
  	this.setState({
  		data:e.target.value
  	})
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
    	<div>
    	<h2 style={{margin:'20px 0'}}>给所有用户统一存入金额:</h2>
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          label="金额"
          labelCol={{ lg: 2 }}
          wrapperCol={{ lg: 4 }}
        >
          {getFieldDecorator('note', {
            rules: [{ required: true, message: '请输入要充值的金额!' }],
          })(
            <Input onChange={this.handleChange} />
          )}
        </FormItem>
        <FormItem
          wrapperCol={{ lg: 6, offset: 2 }}
        >
          <Button type="primary" htmlType="submit">
            充值
          </Button>
        </FormItem>
      </Form>
      </div>
    );
  }
}

const WrappedApp = Form.create()(App);
export default WrappedApp;