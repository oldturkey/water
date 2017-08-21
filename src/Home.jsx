import React from 'react';
import $ from 'jquery';
import { Row, Col ,Card ,Table} from 'antd';

export default class product extends React.Component {
	lodaDataFromServer=()=>{
		$.ajax({
			url:this.props.url,
			dataType:'json',
			success:function(data){
				this.setState({data:data});
			}.bind(this),
			error:function(xhr,status,err){
				console.error(this.props.url,status,err.toString());
			}.bind(this)
		});
	}
	state ={
		data:[{
			  key: '1',
			  displayID: '000001',
			  location: '华星时代广场',
			  todayflow: '100',
			  totalflow: 32,
			}, {
			  key: '2',
			  displayID: '000002',
			  location: '浙江大学',
			  todayflow: '50',
			  totalflow: 32,
			}, {
			  key: '3',
			  displayID: '000003',
			  location: '武林广场',
			  todayflow: '25',
			  totalflow: 32,
			}, {
			  key: '4',
			  displayID: '000004',
			  location: '庆丰社区',
			  todayflow: '125',
			  totalflow: 32,
			}]
	}
	componentDidMount=()=>{
		this.lodaDataFromServer;
		// setInterval(this.lodaDataFromServer,100);
	}
	onChange = (pagination, filters, sorter)=>{
		console.log('params', pagination, filters, sorter);
	}

	render(){
		const columns = [{
			  title: '设备编号',
			  dataIndex: 'displayID',
			}, {
			  title: '投放位置',
			  dataIndex: 'location',
			}, {
			  title: '当天供水量',
			  dataIndex: 'todayflow',
			  sorter: (a, b) => a.todayflow - b.todayflow,
			}, {
			  title: '历史总供水量',
			  dataIndex: 'totalflow',
			  sorter: (a, b) => a.totalflow - b.totalflow,
			}];

			const data = this.state.data;
		return(
			<div>
				<Row style={{textAlign:'center'}}>
					<Col lg={12} >
						<Card title="当天供水总量" bordered={true} style={{ width: 300,margin:'20px auto' }}>
						      <p>300 L</p>
						    </Card>
					</Col>
					<Col lg={12}>
						<Card title="当天平均每台供水量" bordered={true} style={{ width: 300,margin:'20px auto'  }}>
						      <p>75 L</p>
						    </Card>
					</Col>
					<Col lg={12}>
						<Card title="历史供水总量" bordered={true} style={{ width: 300,margin:'20px auto 50px'  }}>
						      <p>2000 L</p>
						    </Card>
					</Col>
					<Col lg={12}>
						<Card title="历史平均每台供水量" bordered={true} style={{ width: 300,margin:'20px auto 50px'  }}>
						      <p>500 L</p>
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
