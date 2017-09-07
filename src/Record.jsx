import React from 'react';
import $ from 'jquery';
import { Row, Col ,Table} from 'antd';

export default class product extends React.Component {
	lodaDataFromServer=()=>{
		const token = window.localStorage["token"];
		$.ajax({
			url:'http://192.168.31.158:90/record/',
			dataType:'json',
			// headers: {
			//     'Authorization': token,
			//   },
			success:function(data){
				this.setState({
					data:data.record2,
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
			  title: '当天供水量/L',
			  dataIndex: 'flow',
			  render: renderContent,
			  sorter: (a, b) => a.flow - b.flow,
			}, {
			  title: '历史总供水量/L',
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
						<p className="Title">当天供水总量(L)</p>
						<p className="Data">{this.state.record1.todayflow.toFixed(2)} </p>
					</Col>
					<Col lg={6} className="Box">
							<p className="Title">今日平均每台供水量(L)</p>
						    <p className="Data">{this.state.record1.averflow.toFixed(2)} </p>
					</Col>
					<Col lg={6} className="Box">
						<p className="Title">历史供水总量(L)</p>
						<p className="Data">{this.state.record1.totalflow.toFixed(1)} </p>
					</Col>
					<Col lg={6} className="Box">
						<p className="Title">历史平均每台供水量(L)</p>
						<p className="Data">{this.state.record1.hisaverflow.toFixed(1)} </p>
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
