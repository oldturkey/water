import React from 'react';
import $ from 'jquery';
import { Row, Col ,Table,Form, Select,Input,DatePicker,  Button,Icon} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const token = window.localStorage["token"];

 class userData extends React.Component {
  state ={
    data:[],
  }
  handleSearch = (e) => {
    e.preventDefault();
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
        url:'http://112.124.6.31:80/watermachineplateform/userinfo/search/phone',
        dataType:'json',
        type:'POST',
        headers: {
          'Authorization': token,
        },
        data:{phone:fieldsValue['phone'],beginTime:beginTime?beginTime:'',endTime:endTime?endTime:'',type:fieldsValue['orderType']?fieldsValue['orderType']:''},
        success:function(data){
          if(data===1){
              this.setState({data:data});
          }else{
            alert('查询失败');
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
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
      },
    };
    const renderContent = (value, col, index) => {
        value=value.toFixed(2);
      return value;
    }
    const columns = [{
        title: '用户姓名',
        dataIndex: 'userName',
      }, {
        title: '用户所在地',
        dataIndex: 'userLocation',
      }, {
        title: '手机号码',
        dataIndex: 'phoneNumber',
        render: renderContent,
      }, {
        title: '账户余额',
        dataIndex: 'balance',
      }, {
        title: '充值总额',
        dataIndex: 'recharge',
      }, {
        title: '注册时间',
        dataIndex: 'regTime',
      }];
      const columnsOrder = [{
        title: '订单编号',
        dataIndex: 'orderId',
      }, {
        title: '订单类型',
        dataIndex: 'orderType',
      }, {
        title: '订单时间',
        dataIndex: 'orderTime',
      }, {
        title: '消费金额',
        dataIndex: 'balance',
      }, {
        title: '充值金额',
        dataIndex: 'recharge',
      }, {
        title: '是否成功',
        dataIndex: 'success',
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
            <FormItem {...formItemLayout} label={`订单类型`}>
              {getFieldDecorator(`orderType`)(
                <Select mode="multiple" placeholder="请选择订单类型">
                  <Option value="消费记录">消费记录</Option>
                  <Option value="充值记录">充值记录</Option>
                  <Option value="赠送记录">赠送记录</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={12} key={3} offset={12}>
            <FormItem {...formItemLayout} label={`订单时间`} style={{marginTop:16}}>
              {getFieldDecorator(`orderTime`)(
                 <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
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
        <p className="dataTitle" >用户信息</p>
        <Table columns={columns} dataSource={this.state.userInfo}  onChange={this.onChange} rowSelection={this.rowSelection} bordered style={{textAlign:'center'}}/>
        <p className="dataTitle" style={{marginTop:20}}>订单查询结果</p>
        <Table columns={columnsOrder} dataSource={this.state.consumeInfo}  onChange={this.onChange} rowSelection={this.rowSelection} bordered style={{textAlign:'center'}}/>
      </div>
      ) 
  }
}

const WrappedApp = Form.create()(userData);
export default WrappedApp;