import React from 'react';
import $ from 'jquery';
import { Row, Col ,Table} from 'antd';

export default class product extends React.Component {
	lodaDataFromServer=()=>{
		var token = window.localStorage["token"];
		$.ajax({
			url:'/home',
			dataType:'json',
			headers: {
			    'Authorization': token,
			  },
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
	componentDidMount(){
		this.lodaDataFromServer();
		this.time=setInterval(this.lodaDataFromServer,120000);
	}
	componentWillUnmount(){
		clearInterval(this.time);
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
			  title: '最后连接时刻',
			  dataIndex: 'flow',
			  render: renderContent,
			  sorter: (a, b) => a.flow - b.flow,
			}, {
			  title: '掉线时长',
			  dataIndex: 'hisflow',
			  render: renderContent,
			  sorter: (a, b) => a.hisflow - b.hisflow,
			}];
			const data = this.state.data;

		return(
			<div>
				<Row style={{borderBottom:'2px solid #eee'}}>
					<Col lg = {9} style={{borderRight:'3px solid #eee'}}>
						<p className="dataTitle">系统概览</p>
						<Row>
							<Col lg={8} className="Box">
								<p className="Title">设备总数(个)</p>
								<p className="Data">{this.state.record1.todayflow.toFixed(2)} </p>
							</Col>
							<Col lg={8} className="Box">
									<p className="Title">活跃用户(人)</p>
								    <p className="Data">{this.state.record1.averflow.toFixed(2)} </p>
							</Col>
							<Col lg={8} className="Box">
								<p className="Title">充值总额(元)</p>
								<p className="Data">{this.state.record1.totalflow.toFixed(1)} </p>
							</Col>
						</Row>
					</Col>
					<Col lg = {15} style={{padding:'0 5px'}}>
						<p className="dataTitle">昨日统计</p>
						<Row>
							<Col lg={6} className="Box">
								<p className="Title">用户数量(个)</p>
								<p className="Data">{this.state.record1.todayflow.toFixed(2)} </p>
							</Col>
							<Col lg={6} className="Box">
									<p className="Title">充值金额(人)</p>
								    <p className="Data">{this.state.record1.averflow.toFixed(2)} </p>
							</Col>
							<Col lg={6} className="Box">
								<p className="Title">流量耗费(元)</p>
								<p className="Data">{this.state.record1.totalflow.toFixed(1)} </p>
							</Col>
							<Col lg={6} className="Box">
								<p className="Title">消费金额(元)</p>
								<p className="Data">{this.state.record1.totalflow.toFixed(1)} </p>
							</Col>
						</Row>
					</Col>
				</Row>
				<Row style={{paddingTop:'20px'}}>
					<p className="dataTitle">设备掉线报警</p>
					<Col lg={20} offset={2} style={{paddingTop:'20px'}}>
						<Table columns={columns} dataSource={data} onChange={this.onChange} bordered style={{textAlign:'center'}}/>
					</Col>
				</Row>
			</div>
			) 
	}
}
