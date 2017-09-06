import React from 'react';
import $ from 'jquery';
import { Table, Input, Icon, Button, Popconfirm } from 'antd';
import './device.css';

const token = window.localStorage["token"];
class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: false,
  }
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  }
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
  edit = () => {
    this.setState({ editable: true });
  }
  render() {
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {
          editable ?
            <div className="editable-cell-input-wrapper">
              <Input
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
              />
              <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check}
              />
            </div>
            :
            <div className="editable-cell-text-wrapper">
              {value || ' '}
              <Icon
                type="edit"
                className="editable-cell-icon"
                onClick={this.edit}
              />
            </div>
        }
      </div>
    );        
  }
}
     
export default class EditableTable extends React.Component {
  lodaDataFromServer=()=>{
    var token = window.localStorage["token"];
    $.ajax({
      url:'/device/get',
      dataType:'json',
      headers: {
          'Authorization': token,
        },
      success:function(data){
        this.setState({dataSource:data.dataSource,
          count:data.count
        });
      }.bind(this),
      error:function(xhr,status,err){
        console.error(this.props.url,status,err.toString());
      }.bind(this)
    });
  }
  componentDidMount(){
    this.lodaDataFromServer();
    this.time=setInterval(this.lodaDataFromServer,120000);
  }
  componentWillUnmount(){
    clearInterval(this.time);
  }
  constructor(props) {
    super(props);
    this.columns = [{
      title: 'IMEI号',
      dataIndex: 'imei',
      width: '12%',
      render: (text, record) => (
        <EditableCell
          value={text}
          onChange={this.onCellChange(record.key, 'imei')}
        />
      ),
    },  {
      title: '设备编号',
      dataIndex: 'displayId',
      width: '12%',
    },{
      title: 'SIM卡号',
      dataIndex: 'simId',
      width: '12%',
      render: (text, record) => (
        <EditableCell
          value={text}
          onChange={this.onCellChange(record.key, 'simId')}
        />
      ),
    }, {
      title: '设备地址',
      dataIndex: 'location',
      width: '12%',
      render: (text, record) => (
        <EditableCell
          value={text}
          onChange={this.onCellChange(record.key, 'location')}
        />
      ),
    }, {
      title: '信号强度',
      dataIndex: 'strength',
      width: '12%',
    }, {
      title: '注册时间',
      dataIndex: 'gmtCreate',
      width: '12%',
    },{
      title: '设备状态',
      dataIndex: 'state',
      width: '12%',
      render: (text) => {
        if (text ===10) {
          return <div><span style={{color:"#87D068",fontSize: 15,paddingRight: '10px'}}>●</span>在线</div>;
        }else if (text ===11) {
          return <div><span style={{color:"#2DB7F5",fontSize: 15,paddingRight: '10px'}}>●</span>使用中</div>;
        }else if (text ===12) {
          return <div><span style={{color:"#FF5500",fontSize: 15,paddingRight: '10px'}}>●</span>下单中</div>;
        }else if (text ===23) {
          return <div><span style={{color:"#CCC",fontSize: 15,paddingRight: '10px'}}>●</span>离线</div>;
        }
      },
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        return (
        <span>   
            <Popconfirm title="确定要删除该设备?" onConfirm={() => this.onDelete(record.key)}>
              <a href="">删除 </a>
            </Popconfirm><span>&nbsp;&nbsp;</span>
            <Popconfirm title="确定要更新该设备信息?" onConfirm={() => this.onUpDate(record.key)}>
              <a href="">上传更新设备状态</a>
            </Popconfirm>
          </span> 
        );
      },
    }];

    this.state = {
      dataSource: [{
        key: '0',
        imei: '001',
        simId: '1',
        location: '西湖',
        state:10
      }, {
        key: '1',
        imei: '002',
        simId: '2',
        location: '下沙',
        state:11
      },{
        key: '2',
        imei: '003',
        simId: '3',
        location: '西溪',
        state:12
      }],
      count: 3,
    };
  }
  onCellChange = (key, dataIndex) => {
    return (value) => {
      const dataSource = [...this.state.dataSource];
      const target = dataSource.find(item => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.setState({ dataSource });
      }
    };
  }
  onDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    const deleteItem = dataSource.filter(item => item.key === key)[0];
    $.ajax({
        url:'/device/delete',
        dataType:'json',
        type:'POST',
        headers: {
          'Authorization': token,
        },
        data:{user:deleteItem.displayId},
        success:function(data){
          if(data===200){
              this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
          }else{
            alert('删除失败');
          }
        },
        error:function(xhr,status,err){
          console.error(this.props.url,status,err.toString());
        }.bind(this)
      });
  }
  onUpDate = (key) => {
    const dataSource = [...this.state.dataSource];
    const upDateItem = dataSource.filter(item => item.key === key)[0];
    $.ajax({
        url:'/device/add',
        dataType:'json',
        type:'POST',
        headers: {
          'Authorization': token,
        },
        data:{imei:upDateItem.imei,address:upDateItem.location,sim:upDateItem.simId},
        success:function(data){
          if(data===600){
              
          }else{
            alert('更新失败');
          }
        },
        error:function(xhr,status,err){
          console.error(this.props.url,status,err.toString());
        }.bind(this)
      });
  }
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      imei: `设备 ${count}`,
      simId: 'xx',
      location: `xxxx`,
      state:'在线/离线',
      displayId:'00',
      strength:'x',
      gmtCreate:new Date().toLocaleString()
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  }
  render() {
    const { dataSource } = this.state;
    const columns = this.columns;
    return (
      <div>
        <p className="dataTitle" >设备管理</p>
        <Button className="editable-add-btn" onClick={this.handleAdd}>添加设备</Button>
        <Table bordered dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}


