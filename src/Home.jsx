import React from 'react';
import $ from 'jquery';
import { Row, Col ,Table,Icon,message} from 'antd';
import './home.css';


//首页
export default class Home extends React.Component {
	state ={
		loading: false,
		data:[],
		mainpageHead:{"terminalNumber": 0,"userNumber":0,"rechargeNumber":0,"userNumberYesterday":0,"rechargeNumberYesterday":0,"flowNumberYesterday":0,"consumeNumberYesterday": 0}
	}
	lodaDataFromServer=()=>{
		const token = window.localStorage["token"];
		this.setState({ loading: true });
		$.ajax({
			url:'/mainpage',
			dataType:'json',
			headers: {
			    'Authorization': token,
			  },
			success:function(data){
				this.setState({
					data:data.offlineTerminal,
					mainpageHead:data.head,
					loading: false
				});
			}.bind(this),
			error:function(xhr,status,err){
				console.error(this.props.url,status,err.toString());
				message.error('加载失败');
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
	onChange = (pagination, filters, sorter)=>{
		console.log('params', pagination, filters, sorter);

	}
	render(){
		const columns = [{
			  title: '设备编号',
			  dataIndex: 'displayId',
			}, {
			  title: '投放位置',
			  dataIndex: 'location',
			}, {
			  title: 'SIM卡号',
			  dataIndex: 'simId',
			}, {
			  title: 'IMEI号',
			  dataIndex: 'imei',
			}, {
			  title: '最后连接时刻',
			  dataIndex: 'lastConnectTime',
			  sorter: (a, b) => Date.parse(a.lastConnectTime) - Date.parse(b.lastConnectTime),
			}, {
			  title: '掉线时长',
			  dataIndex: 'offlineTime',
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
								<p className="Data">{this.state.mainpageHead.terminalNumber.toFixed(2)} </p>
							</Col>
							<Col lg={8} className="Box">
									<p className="Title">活跃用户(人)</p>
								    <p className="Data">{this.state.mainpageHead.userNumber.toFixed(2)} </p>
							</Col>
							<Col lg={8} className="Box">
								<p className="Title">充值总额(元)</p>
								<p className="Data">{this.state.mainpageHead.rechargeNumber.toFixed(1)} </p>
							</Col>
						</Row>
					</Col>
					<Col lg = {15} style={{padding:'0 0 0 25px'}}>
						<p className="dataTitle">昨日统计</p>
						<Row>
							<Col lg={6} className="Box">
								<p className="Title">用户数量(个)</p>
								<p className="Data">{this.state.mainpageHead.userNumberYesterday.toFixed(2)} </p>
							</Col>
							<Col lg={6} className="Box">
									<p className="Title">充值金额(人)</p>
								    <p className="Data">{this.state.mainpageHead.rechargeNumberYesterday.toFixed(2)} </p>
							</Col>
							<Col lg={6} className="Box">
								<p className="Title">流量耗费(/L)</p>
								<p className="Data">{this.state.mainpageHead.flowNumberYesterday.toFixed(1)} </p>
							</Col>
							<Col lg={6} className="Box">
								<p className="Title">消费金额(元)</p>
								<p className="Data">{this.state.mainpageHead.consumeNumberYesterday.toFixed(1)} </p>
							</Col>
						</Row>
					</Col>
				</Row>
				<Row style={{paddingTop:'35px'}}>
					<Col lg={20} offset={2} >
						<Table columns={columns} title={ () => (<span style={{fontSize: '16pt',color:'#f04134',letterSpacing: 5}}><Icon type="bell" />设备报警信息</span>)} dataSource={data} onChange={this.onChange} bordered style={{textAlign:'center'}}/>
					</Col>
				</Row>
			</div>
			) 
	}
}
