import React from 'react';
import $ from 'jquery';
import { Row, Col ,Card ,Table} from 'antd';

export default class product extends React.Component {
	lodaDataFromServer=()=>{
		$.ajax({
			url:'/record',
			dataType:'json',
			success:function(data){
				this.setState({data:data.record2,
					record1:data.record1
				});
			}.bind(this),
			error:function(xhr,status,err){
				console.error(this.props.url,status,err.toString());
			}.bind(this)
		});
	}
	state ={
		data:[],
		record1:{"todayflow": 0,"averflow":0,"totalflow":0,"hisaverflow":0}
	}
	componentDidMount=()=>{
		this.lodaDataFromServer();
		// setInterval(this.lodaDataFromServer,100);
	}
	onChange = (pagination, filters, sorter)=>{
		console.log('params', pagination, filters, sorter);
	}

	render(){
		const renderContent = (value, col, index) => {
				value=value.toFixed(2);
			return value;
		}
		const columns = [{
			  title: '设备编号',
			  dataIndex: 'displayId',
			}, {
			  title: '投放位置',
			  dataIndex: 'location',
			}, {
			  title: '当天供水量',
			  dataIndex: 'flow',
			  render: renderContent,
			  sorter: (a, b) => a.flow - b.flow,
			}, {
			  title: '历史总供水量',
			  dataIndex: 'hisflow',
			  render: renderContent,
			  sorter: (a, b) => a.hisflow - b.hisflow,
			}];
			const data = this.state.data;

		return(
			<div>
				<Row style={{textAlign:'center'}}>
					<Col lg={12} >
						<Card title="当天供水总量" bordered={true} style={{ width: 300,margin:'20px auto' }}>
						      <p>{this.state.record1.todayflow.toFixed(2)}</p>
						    </Card>
					</Col>
					<Col lg={12}>
						<Card title="当天平均每台供水量" bordered={true} style={{ width: 300,margin:'20px auto'  }}>
						      <p>{this.state.record1.averflow.toFixed(2)}</p>
						    </Card>
					</Col>
					<Col lg={12}>
						<Card title="历史供水总量" bordered={true} style={{ width: 300,margin:'20px auto 50px'  }}>
						      <p>{this.state.record1.totalflow.toFixed(2)}</p>
						    </Card>
					</Col>
					<Col lg={12}>
						<Card title="历史平均每台供水量" bordered={true} style={{ width: 300,margin:'20px auto 50px'  }}>
						      <p>{this.state.record1.hisaverflow.toFixed(2)}</p>
						    </Card>
					</Col>
					<Col lg={16} offset={4} >
						<Table columns={columns} dataSource={data} onChange={this.onChange} bordered/>
					</Col>
				</Row>
			</div>
			) 
	}
}
