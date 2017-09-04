import React from 'react';
import $ from 'jquery';
import { Table, Input, Icon, Button, Popconfirm } from 'antd';
import './device.css';
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
  constructor(props) {
    super(props);
    this.columns = [{
      title: 'IMEI号',
      dataIndex: 'IMEI',
      width: '20%',
      render: (text, record) => (
        <EditableCell
          value={text}
          onChange={this.onCellChange(record.key, 'IMEI')}
        />
      ),
    }, {
      title: 'SIM卡号',
      dataIndex: 'SIM',
      width: '20%',
      render: (text, record) => (
        <EditableCell
          value={text}
          onChange={this.onCellChange(record.key, 'SIM')}
        />
      ),
    }, {
      title: '设备地址',
      dataIndex: 'address',
      width: '20%',
      render: (text, record) => (
        <EditableCell
          value={text}
          onChange={this.onCellChange(record.key, 'address')}
        />
      ),
    },{
      title: '设备状态',
      dataIndex: 'state',
      width: '20%',
      render: (text) => {
        if (text ===1) {
          return <div><span style={{color:"#87D068",fontSize: 15,paddingRight: '10px'}}>●</span>在线</div>;
        }else if (text ===2) {
          return <div><span style={{color:"#ff5500",fontSize: 15,paddingRight: '10px'}}>●</span>异常</div>;
        }else if (text ===3) {
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
              <a href="#">删除 </a>
            </Popconfirm><span>&nbsp;&nbsp;</span>
            <Popconfirm title="确定要更新该设备信息?" onConfirm={() => this.onUpDate(record.key)}>
              <a href="#">上传更新设备状态</a>
            </Popconfirm>
          </span> 
        );
      },
    }];

    this.state = {
      dataSource: [{
        key: '0',
        IMEI: '001',
        SIM: '1',
        address: '西湖',
        state:1
      }, {
        key: '1',
        IMEI: '002',
        SIM: '2',
        address: '下沙',
        state:2
      },{
        key: '2',
        IMEI: '003',
        SIM: '3',
        address: '西溪',
        state:3
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
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  }
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      IMEI: `设备 ${count}`,
      SIM: 'xx',
      address: `xxxx`,
      state:'在线/离线'
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
        <Button className="editable-add-btn" onClick={this.handleAdd}>Add</Button>
        <Table bordered dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}


