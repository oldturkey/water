import React from 'react';
import $ from 'jquery';
import { Row, Col ,Table,Form, Input, Button,Icon} from 'antd';

const FormItem = Form.Item;


 class userData extends React.Component {
  lodaDataFromServer=()=>{
    var token = window.localStorage["token"];
    $.ajax({
      url:'/home',
      dataType:'json',
      headers: {
          'Authorization': token,
        },
      success:function(data){
        this.setState({
        });
      }.bind(this),
      error:function(xhr,status,err){
        console.error(this.props.url,status,err.toString());
      }.bind(this)
    });
  }
  state ={
    data:[],
  }
  componentDidMount(){
    this.lodaDataFromServer();
    this.time=setInterval(this.lodaDataFromServer,120000);
  }
  componentWillUnmount(){
    clearInterval(this.time);
  }

  render(){
    const { getFieldDecorator } = this.props.form; 
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
    };
    return(
      <div>
        <Form
        className="ant-advanced-search-form"
        onSubmit={this.handleSearch}
      >
        <Row gutter={40}>
          <Col span={12} key={1} >
            <FormItem {...formItemLayout} label='手机号码'>
              {getFieldDecorator(`field-${1}`)(
                <Input placeholder="placeholder" />
              )}
            </FormItem>
          </Col>
          <Col span={12} key={2} >
            <FormItem {...formItemLayout} label={`订单号`}>
              {getFieldDecorator(`field-${1}`)(
                <Input placeholder="placeholder" />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24} offset={19}>
            <Button type="primary" htmlType="submit">搜索</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              清空
            </Button>
          </Col>
        </Row>
      </Form>
        
      </div>
      ) 
  }
}

const WrappedApp = Form.create()(userData);
export default WrappedApp;