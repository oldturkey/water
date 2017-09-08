import React from 'react';
import $ from 'jquery';
import { Row, Col ,Table,Form,Input,DatePicker, Button} from 'antd';

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

 class userData extends React.Component {
  state ={
    consumeInfo:[],
    rechargeInfo:[]
  }
  handleSearch = (e) => {
    const _this = this;
    e.preventDefault();
    const token = window.localStorage["token"];
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      let beginTime=null;
      let endTime=null;
      // Should format date value before submit.
      const rangeTimeValue = fieldsValue['orderTime'];
      if(rangeTimeValue){
         beginTime = rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss');
         endTime = rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss');
      }
      $.ajax({
        url:'/userinfo/search/phone',
        dataType:'json',
        headers: {
          'Authorization': token,
        },
        data:{phone:fieldsValue['userPhone'],beginTime:beginTime?beginTime:'',endTime:endTime?endTime:''},
        success:function(data){
          if(data.status===1){
              _this.setState({
                consumeInfo:data.consumeInfo,
                rechargeInfo:data.rechargeInfo
              });
          }
        },
        error:function(xhr,status,err){
          console.error(this.props.url,status,err.toString());
        }.bind(this)
      });
      console.log('Received values of form: ', fieldsValue);
    });
  }

   handleReset = () => {
    this.props.form.resetFields();
  }
  

  render(){
    const { getFieldDecorator } = this.props.form; 
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
    };

      const columnsOrder01 = [{
        title: '订单编号',
        dataIndex: 'orderNo',
      }, {
        title: '订单地址',
        dataIndex: 'deviceLocation',
      }, {
        title: '订单设备',
        dataIndex: 'displayId',
      },{
        title: '订单时间',
        dataIndex: 'gmtCreate',
      }, {
        title: '取水量/L',
        dataIndex: 'flow',
      },{
        title: '消费金额',
        dataIndex: 'payment',
      }];
      const columnsOrder02 = [{
        title: '订单编号',
        dataIndex: 'orderId',
      }, {
        title: '订单时间',
        dataIndex: 'gmtCreate',
      }, {
        title: '充值金额',
        dataIndex: 'payment',
      }];
    return(
      <div>
      <p className="dataTitle">条件查询</p>
        <Form
        className="ant-advanced-search-form"
        onSubmit={this.handleSearch}
        style={{padding:'30px 5px',marginBottom:20,backgroundColor: '#eee',borderRadius: 10}}
      >
        <Row gutter={40}>
          <Col span={12} key={1} >
            <FormItem {...formItemLayout} label='手机号码'>
            {getFieldDecorator('userPhone', {
            rules: [{ required: true, message: '请输入用户手机号码!' }],
          })(
            <Input placeholder="请输入用户手机号码" />
          )}
            </FormItem>
          </Col>
          
          <Col span={12} key={2} >
            <FormItem {...formItemLayout} label={`订单时间`} >
              {getFieldDecorator(`orderTime`)(
                 <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24} offset={18}>
            <Button type="primary" htmlType="submit">搜索</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              清空
            </Button>
          </Col>
        </Row>
      </Form>
        <Row>
          <Col lg={14}>
            <Table columns={columnsOrder01} title={ () => '消费记录'} dataSource={this.state.consumeInfo}  onChange={this.onChange} rowSelection={this.rowSelection} bordered style={{textAlign:'center',padding:'0 10px'}}/>
          </Col>
          <Col lg={10}>
            <Table columns={columnsOrder02} title={ () => '充值记录'} dataSource={this.state.rechargeInfo}  onChange={this.onChange} rowSelection={this.rowSelection} bordered style={{textAlign:'center'}}/>
          </Col>
        </Row>
      </div>  
      ) 
  }
}

const WrappedApp = Form.create()(userData);
export default WrappedApp;

