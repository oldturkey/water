import React from 'react';
import $ from 'jquery';
import { Form,  Input, Button,InputNumber,Table, Icon ,Row,Col,Popconfirm,Modal } from 'antd';
const FormItem = Form.Item;

const data = [{
    key: '1',
    phone: '1505335789',
    nickname: '小明',
    email: '0404@qq.com',
    feedback:15,
    feedbackTime:'2017/09/04',
    state:1
  }, {
    key: '2',
    phone: '1866799957',
    nickname: '小黄',
    email: '0404@qq.com',
    feedback:15,
    feedbackTime:'2017/09/04',
    state:1
  }, {
    key: '3',
    phone: '15805565587',
    nickname: '小兰',
    email: '0404@qq.com',
    feedback:15,
    feedbackTime:'2017/09/04',
    state:1
  }, {
    key: '4',
    phone: '1335655878',
    nickname: '小吕',
    email: '0404@qq.com',
    feedback:15,
    feedbackTime:'2017/09/04',
    state:1
  }, {
    key: '5',
    phone: '1866799957',
    nickname: '小黄',
    email: '0404@qq.com',
    feedback:15,
    feedbackTime:'2017/09/04',
    state:1
  }];
  
const token = window.localStorage["token"];
class App extends React.Component {
  
  state = {
    filterDropdownVisible: false,
    data,
    searchText: '',
    filtered: false,
    selectedRowKeys: [], 
    visible: false,
    message:''
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
  //弹出反馈信息层
  showModal = (mes) => {
    this.setState({
      visible: true,
      message:mes
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  onInputChange = (e) => {
    this.setState({ searchText: e.target.value });
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  onDelete = (key) => {
    const data = [...this.state.data];
    this.setState({ data: data.filter(item => item.key !== key) });
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
        text: '选择所有',
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
      title: '用户昵称',
      dataIndex: 'nickname',
      key: 'nickname',
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
        title: 'email',
        dataIndex: 'email',
        key: 'email',
      }, {
        title: '反馈内容',
        dataIndex: 'feedback',
        key: 'feedback',
        render:(text) => {
          return <a onClick={ () => this.showModal(text)}>查看详情</a>
        }
      },{
        title: '反馈时间',
        dataIndex: 'feedbackTime',
        key: 'feedbackTime',
      },{
        title: '反馈状态',
        dataIndex: 'state',
        key: 'state',
        render: (text) => {
        if (text ===1) {
          return <div><span style={{color:"#87D068",fontSize: 15,paddingRight: '10px'}}>●</span>已解决</div>;
        }else if (text ===2) {
          return <div><span style={{color:"#ff5500",fontSize: 15,paddingRight: '10px'}}>●</span>解决中</div>;
        }else if (text ===3) {
          return <div><span style={{color:"#CCC",fontSize: 15,paddingRight: '10px'}}>●</span>未解决</div>;
        } 
      },
      },{
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        return (
        <span>   
            <Popconfirm title="确定要删除?" onConfirm={() => this.onDelete(record.key)}>
              <a href="#">删除 </a>
            </Popconfirm><span>&nbsp;&nbsp;</span>
            <Popconfirm title="确定该反馈已解决?" onConfirm={() => this.onUpDate(record.key)}>
              <a href="#">更新状态</a>
            </Popconfirm>
          </span> 
        );
      },
    }];

    return (
    <div >
      <div style={{marginTop:'20px',borderBottom:'2px solid #eee'}}>
        <p className="dataTitle">用户反馈</p>
        <Table columns={columns} rowSelection={rowSelection} dataSource={this.state.data} />
      </div>
      <Modal
          title="反馈意见"
          visible={this.state.visible}
          onOk={this.handleOk}
          okText="解决反馈"
          cancelText="返回"
          onCancel={this.handleCancel}
        >
          <p>{this.state.message}</p>
        </Modal>
    </div>
    );
  }
}

const WrappedApp = Form.create()(App);
export default WrappedApp;