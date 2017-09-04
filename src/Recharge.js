import React from 'react';
import $ from 'jquery';
import { Form,  Input, Button,InputNumber,Table, Icon ,Row,Col } from 'antd';
const FormItem = Form.Item;

const data = [{
    key: '1',
    phone: '1505335789',
    name: '小明',
    address: '杭州',
    balance:15,
    cost:65
  }, {
    key: '2',
    phone: '1866799957',
    name: '小黄',
    address: '杭州',
    balance:15,
    cost:45
  }, {
    key: '3',
    phone: '15805565587',
    name: '小兰',
    address: '南京',
    balance:15,
    cost:125
  }, {
    key: '4',
    phone: '1335655878',
    name: '小吕',
    address: '南京',
    balance:15,
    cost:15
  }, {
    key: '5',
    phone: '1866799957',
    name: '小黄',
    address: '杭州',
    balance:15,
    cost:45
  }];
  const data01 = [{
    key: '1',
    phone: '1505335789',
    name: '管理员小明',
    time:'2017/08/05',
    recharge:'25'
  }, {
    key: '2',
    phone: '1866799957',
    name: '管理员小明',
    time:'2017/08/06',
    recharge:'25'
  }, {
    key: '3',
    phone: '15805565587',
    name: '管理员小明',
    time:'2017/08/07',
    recharge:'25'
  }, {
    key: '4',
    phone: '1335655878',
    name: '管理员小明',
    time:'2017/08/08',
    recharge:'25'
  }, {
    key: '5',
    phone: '1866799957',
    name: '管理员小明',
    time:'2017/08/15',
    recharge:'25'
  }];
  const token = window.localStorage["token"];
class App extends React.Component {
  
  state = {
    filterDropdownVisible: false,
    data,
    data01,
    searchText: '',
    filtered: false,
    selectedRowKeys: [], 
  };
  handleSubmit = (e) => {
    e.preventDefault();
    var admin = this.props.admin;
    var _this = this;
      $.ajax({
        url:'http://112.124.6.31:80/watermachineplateform/rechargePerson',
        dataType:'json',
        type:'POST',
        headers: {
          'Authorization': token,
        },
        data:{adminName:admin,user:this.state.selectedRowKeys},
        success:function(data){
          if(data===1){
              alert('充值成功');
              _this.props.form.resetFields(['money']);
          }else{
            alert('充值失败');
          }
        },
        error:function(xhr,status,err){
          console.error(this.props.url,status,err.toString());
        }.bind(this)
      });
  }
  handleSubmitRecord = (e) => {
    e.preventDefault();
    
  }
  onInputChange = (e) => {
    this.setState({ searchText: e.target.value });
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  onSearch = () => {
    const { searchText } = this.state;
    const reg = new RegExp(searchText, 'gi');
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      data: data.map((record) => {
        const match = record.phone.match(reg);
        if (!match) {
          return null;
        }
        return {
          ...record,
          phone: (
            <span>
              {record.phone.split(reg).map((text, i) => (
                i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
              ))}
            </span>
          ),
        };
      }).filter(record => !!record),
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      selections: [{
        key: 'all-data',
        text: '选择所有用户',
        onSelect: () => {
          this.setState({
            selectedRowKeys: data.map((data,i) => (data.key)),  
          });
        },
      },{
        key: 'all-close',
        text: '清空所有选择',
        onSelect: () => {
          this.setState({
            selectedRowKeys: [],  
          });
        },
      }],
      onSelection: this.onSelection,
    }; 
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '手机号码',
      dataIndex: 'phone',
      key: 'phone',
      filterDropdown: (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="查询号码"
            value={this.state.searchText}
            onChange={this.onInputChange}
            onPressEnter={this.onSearch}
          />
          <Button type="primary" onClick={this.onSearch}>Search</Button>
        </div>
      ),
      filterIcon: <Icon type="search" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
      filterDropdownVisible: this.state.filterDropdownVisible,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          filterDropdownVisible: visible,
        }, () => this.searchInput.focus());
      },
    }, {
      title: '用户位置',
      dataIndex: 'address',
      key: 'address',
      filters: [{
        text: '杭州',
        value: '杭州',
      },{
        text: '南京',
        value: '南京',
      },],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    }, {
      title: '消费总额',
      dataIndex: 'cost',
      key: 'cost',
      sorter: (a, b) => a.cost - b.cost,
    },{
      title: '账户余额',
      dataIndex: 'balance',
      key: 'balance',
    }];
    const columnsHistory = [{
      title: '管理员姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '用户手机号码',
      dataIndex: 'phone',
      key: 'phone',
      filterDropdown: (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="查询号码"
            value={this.state.searchText}
            onChange={this.onInputChange}
            onPressEnter={this.onSearch}
          />
          <Button type="primary" onClick={this.onSearch}>Search</Button>
        </div>
      ),
      filterIcon: <Icon type="search" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
      filterDropdownVisible: this.state.filterDropdownVisible,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          filterDropdownVisible: visible,
        }, () => this.searchInput.focus());
      },
    }, {
      title: '充值金额',
      dataIndex: 'recharge',
      key: 'recharge',
      sorter: (a, b) => a.recharge - b.recharge,
    },{
      title: '充值时间',
      dataIndex: 'time',
      key: 'time',
      sorter: (a, b) => Date.parse(a.time) - Date.parse(b.time),
    }];
    return (
    <div >
      <div style={{marginTop:'20px',borderBottom:'2px solid #eee'}}>
        <p className="dataTitle">发放鼓励金</p>
        <Table columns={columns} rowSelection={rowSelection} dataSource={this.state.data} />
        <Row style={{padding:'20px 0'}}>
          <Col span={20} offset={18}>
            <Form onSubmit={this.handleSubmit} layout='inline'>
              <FormItem
                label="为选中用户充值金额(元)"
                labelCol={{ lg: 16 }}
                wrapperCol={{ lg: 6 }}
              >
                {getFieldDecorator('note', {
                  rules: [{ required: true, message: '请输入充值金额!' }],
                })(
                  <InputNumber min={1}  max={50}/>
                )}
              </FormItem>
              <FormItem
                wrapperCol={{ lg: 6, offset: 6 }}
              >
                <Button type="primary" htmlType="submit">
                  充值
                </Button>
              </FormItem>
            </Form>
         </Col>
        </Row>
      </div>
      <p className="dataTitle" style={{marginTop:'20px'}}>发放记录</p>
      <Row style={{padding:'20px 0'}}>
          <Col span={24} offset={6}>
            <Form onSubmit={this.handleSubmitRecord} layout='inline'>
              <FormItem
                label="请输入管理员用户名"
                labelCol={{ lg: 12 }}
                wrapperCol={{ lg: 12 }}
              >
                {getFieldDecorator('admin', {
                  rules: [{ required: true, message: '请输入管理员账号!' }],
                })(
                  <Input/>
                )}
              </FormItem>
              <FormItem
                wrapperCol={{ lg: 6, offset: 6 }}
              >
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
              </FormItem>
            </Form>
         </Col>
        </Row>
      <Table columns={columnsHistory}  dataSource={this.state.data01} />
    </div>
    );
  }
}

const WrappedApp = Form.create()(App);
export default WrappedApp;