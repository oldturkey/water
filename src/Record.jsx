import React from 'react';
import $ from 'jquery';
import { Row, Col ,Table} from 'antd';


//流量管理
export default class FlowManage extends React.Component {
	state ={
		data:[],
		recordToday:{"todayflow": 0,"averflow":0,"totalflow":0,"hisaverflow":0}
	}
	lodaDataFromServer=()=>{
		const token = window.localStorage["token"];
		$.ajax({
			url:'/record',
			dataType:'json',
			headers: {
			    'Authorization': token,
			  },
			success:function(data){
				this.setState({
					data:data.recordDevice,
					recordToday:data.recordToday
				});
			}.bind(this),
			error:function(xhr,status,err){
				console.error(this.props.url,status,err.toString());
			}.bind(this)
		});
	}
	componentDidMount(){
		this.lodaDataFromServer();
		this.timeRecord=setInterval(this.lodaDataFromServer,120000);
	}
	componentWillUnmount(){
		clearInterval(this.timeRecord);
	}
	onChange = (pagination, filters, sorter)=>{
		console.log('params', pagination, filters, sorter);
	}

	render(){
		const renderContent = (value, col, index) => {
				value=value.toFixed(1);
			return value;
		}
		const columns = [{
			  title: '设备编号',
			  dataIndex: 'displayId',
			  sorter: (a, b) => a.displayId-b.displayId,
			}, {
			  title: '投放位置',
			  dataIndex: 'location',
			}, {
			  title: '当天供水总量(升)',
			  dataIndex: 'flow',
			  render: renderContent,
			  sorter: (a, b) => a.flow - b.flow,
			}, {
			  title: '历史供水总量(升)',
			  dataIndex: 'hisflow',
			  render: renderContent,
			  sorter: (a, b) => a.hisflow - b.hisflow,
			}];
			const data = this.state.data;

		return(
			<div>
				<Row style={{borderBottom:'2px solid #eee'}}>
					<p className="dataTitle">数据统计</p>
					<Col lg={6} className="Box">
						<p className="Title">当天供水总量(升)</p>
						<p className="Data">{this.state.recordToday.todayflow.toFixed(2)} </p>
					</Col>
					<Col lg={6} className="Box">
							<p className="Title">今日平均每台供水量(升)</p>
						    <p className="Data">{this.state.recordToday.averflow.toFixed(2)} </p>
					</Col>
					<Col lg={6} className="Box">
						<p className="Title">历史供水总量(升)</p>
						<p className="Data">{this.state.recordToday.totalflow.toFixed(2)} </p>
					</Col>
					<Col lg={6} className="Box">
						<p className="Title">历史平均每台供水量(升)</p>
						<p className="Data">{this.state.recordToday.hisaverflow.toFixed(2)} </p>
					</Col>
				</Row>
				<Row style={{paddingTop:'20px'}}>
					<p className="dataTitle">设备数据</p>
					<Col lg={20} offset={2} >
						<Table columns={columns}  dataSource={data} onChange={this.onChange} bordered style={{textAlign:'center'}}/>
					</Col>
				</Row>
			</div>
			) 
	}
}
