import React from 'react';
import $ from 'jquery';
import { Form,  Input, Button,InputNumber,Table, Icon ,Row,Col,Tooltip } from 'antd';
const FormItem = Form.Item;

const token = window.localStorage["token"];
let dataX = [];
let dataY = [];
class App extends React.Component {
  state = {
    data:[],
    data01:[],
    filterDropdownVisible: false,
    filterDropdownVisible01: false,
    filtered: false,
    filtered01: false,
    searchText: '', 
    searchText01: '',
    selectedRowKeys: [], 
    loading: false,
  };
  lodaDataFromServer=()=>{
    const token = window.localStorage["token"]; 
    const _this = this;
    this.setState({ loading: true });
    $.ajax({
      url:'/recharge/getAll',
      dataType:'json',
      headers: {
          'Authorization': token,
        },
      success:function(data){
        dataX = data.userInfoPOS;
        this.setState({
          data:data.userInfoPOS,
          loading: false,
        });
      }.bind(this),
      error:function(xhr,status,err){
        console.error(this.props.url,status,err.toString());
      }.bind(this)
    });
    $.ajax({
        url:'/recharge/adminRecord',
        dataType:'json',
        headers: {
          'Authorization': token,
        },
        success:function(data){
            dataY = data.adminRecordInfo;
            _this.setState({data01:data.adminRecordInfo});
        },
        error:function(xhr,status,err){
          console.error(this.props.url,status,err.toString());
        }.bind(this)
      });
  }
  componentDidMount(){
    this.lodaDataFromServer();
    this.timeRecharge=setInterval(this.lodaDataFromServer,120000);
  }
  componentWillUnmount(){
    clearInterval(this.timeRecharge);
  }
  getPhoneArrary = (key) => {            
    const dataAll = this.state.data;
    for(var i=0;i<dataAll.length;i++){
      if(dataAll[i].key===key){
        return dataAll[i].phone;
      }
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const _this = this;
    const rechargePerson = this.state.selectedRowKeys.map(this.getPhoneArrary);
   console.log(rechargePerson);
    let admin = this.props.admin;
    this.props.form.validateFields(['money'],(err, fieldsValue) => {
      $.ajax({
        url:'/rechargePerson',
        dataType:'json',
        type:'POST',
        headers: {
          'Authorization': token,
        },
        data:{adminName:admin,phone:rechargePerson,money:fieldsValue['money']},
        success:function(data){
          if(data.rechargeStatus===1){
              _this.lodaDataFromServer();
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
  
  onInputChange = (e) => {
    this.setState({ searchText: e.target.value });
  }
  onInputChange01 = (e) => {
    this.setState({ searchText01: e.target.value });
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
      data: dataX.map((record) => {
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
  onSearch01 = () => {
    const { searchText01 } = this.state;
    const reg = new RegExp(searchText01, 'gi');
    this.setState({
      filterDropdownVisible01: false,
      filtered01: !!searchText01,
      data01: dataY.map((record) => {
        const match = record.adminPhone.match(reg);
        if (!match) {
          return null;
        }
        return {
          ...record,
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
            selectedRowKeys: this.state.data.map((data,i) => (data.key)),  
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
      dataIndex: 'nickName',
      key: 'name',
    },{
      title: '用户性别',
      dataIndex: 'gender',
      key: 'sex',
      render: (text) => {
        if (text === "male") {
          return text="男";
        }else if (text === "female") {
          return text="女";
        }
      },
      filters: [{
        text: '男',
        value: "male",
      },{
        text: '女',
        value: "female",
      },],
      onFilter: (value, record) => record.gender === value,
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
      dataIndex: 'city',
      key: 'city',
      filters: [{
        text: '杭州',
        value: '杭州',
      },{
        text: '南京',
        value: '南京',
      },],
      onFilter: (value, record) => record.city.indexOf(value) === 0,
    }, {
      title: '消费总额',
      dataIndex: 'sumConsume',
      key: 'cost',
      sorter: (a, b) => a.cost - b.cost,
    },{
      title: '账户余额',
      dataIndex: 'remain',
      key: 'balance',
    }];


    const columnsHistory = [{
      title: '管理员姓名',
      dataIndex: 'adminName',
      key: 'adminName',
    }, {
      title: '充值对象',
      dataIndex: 'adminPhone',
      key: 'adminPhone', 
      render: (text) => {
        if (text.length <= 11) {
          return text;
        }else if (text.length > 11) {
          return (
            <span>
              {text.slice(0,11)}
              <Tooltip title={text.slice(12,text.length-2)}>
                <span>...</span>
              </Tooltip>
            </span>
            )
        }
      },
      filterDropdown: (
        <div className="custom-filter-dropdown">
          <Input
            ref={elem => this.searchInput = elem}
            placeholder="查询号码"
            value={this.state.searchText01}
            onChange={this.onInputChange01}
            onPressEnter={this.onSearch01}
          />
          <Button type="primary" onClick={this.onSearch01}>Search</Button>
        </div>
      ),
      filterIcon: <Icon type="search" style={{ color: this.state.filtered01 ? '#108ee9' : '#aaa' }} />,
      filterDropdownVisible: this.state.filterDropdownVisible01,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          filterDropdownVisible01: visible,
        }, () => this.searchInput.focus());
      },
    }, {
      title: '充值金额',
      dataIndex: 'money',
      key: 'money',
      sorter: (a, b) => a.money - b.money,
    },{
      title: '充值时间',
      dataIndex: 'gmtCreate',
      key: 'gmtCreate',
      sorter: (a, b) => Date.parse(a.gmtCreate) - Date.parse(b.gmtCreate),
    }];

    return (
    <div >
      <div style={{marginTop:'20px',borderBottom:'2px solid #eee'}}>
        <p className="dataTitle">发放鼓励金</p>
        <Table columns={columns} rowSelection={rowSelection} dataSource={this.state.data} loading={this.state.loading}/>
        <Row style={{padding:'20px 0'}}>
          <Col span={20} offset={12}>
            <Form onSubmit={this.handleSubmit} layout='inline'>
              <FormItem
                label="为选中用户充值金额(元)"
                labelCol={{ lg: 16 }}
                wrapperCol={{ lg: 6 }}
              >
                {getFieldDecorator('money', {
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
      <Table columns={columnsHistory}  dataSource={this.state.data01} />
    </div>
    );
  }
}

const WrappedApp = Form.create()(App);
export default WrappedApp;