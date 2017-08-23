import React from 'react';
import $ from 'jquery';
import { Form,  Input, Button } from 'antd';
const FormItem = Form.Item;


class App extends React.Component {
	state={
	 data:''
	}
   getCookie=(cname)=>{
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) 
    {
      var c = ca[i].trim();
      if (c.indexOf(name)===0) return c.substring(name.length,c.length);
    }
    return "1";
   }
  
  
  handleSubmit = (e) => {
    e.preventDefault();
    var money=this.state.data;
    var user = this.getCookie('user');
    $.ajax({
    	url:'http://192.168.31.14:8080/recharge',
    	dataType:'json',
    	type:'POST',
    	data:{money:money,adminname:user},
    	success:function(data){
        if(data===1){
            alert('充值成功');
        }else{
          alert('充值失败');
        }
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