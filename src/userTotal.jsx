import React from 'react';
import $ from 'jquery';
import { Row, Col } from 'antd';
var ReactHighcharts = require('react-highcharts');

export default class userTotal extends React.Component {
	state = { 
		userTotal1:{userTotalNo:0,monthAverRecharge:0,hisAverRecharge:0,monthAverConsume:0,hisAverConsume:0},
		categories: [] ,
		data01:  [],
	}
	loaDataFromServer=()=>{
		var token = window.localStorage["token"];
		$.ajax({
			url:'http://192.168.31.14:8080/usertotal',
			dataType:'JSON',
			headers: {
	          'Authorization': token,
	        },
			success:function(data){
				this.setState({
					userTotal1:data.userTotal1,
					categories:data.userTotal2.date,
					data01:data.userTotal2.newUserNo,
				});
			}.bind(this),
			error:function(xhr,status,err){
				console.error(this.props.url,status,err.toString());
			}.bind(this)
		});
	}
	componentDidMount(){
		this.loaDataFromServer();
		this.time = setInterval(this.loaDataFromServer,120000);
	}
	componentWillUnmount(){
		clearInterval(this.time);
	}
	render() {
		const config = {
			chart: {
	           type: 'line',
	           zoomType: 'x',
	           height:'550px'
	        },
	        credits: {
	        	enabled:false
	        },
	        title: {
	           text: '月用户数量变化折线图',
	           margin:30
	        },
	        xAxis: {
	           categories: this.state.categories
	        },
	        yAxis: {
	           title: {
	                text: '人数'
	            }
	        },
	        legend: {
	        	align: 'right',
            	verticalAlign: 'top',
	        },
	        plotOptions: {
	           line: {
	               dataLabels: {
	                   enabled: true          // 开启数据标签
	                },
	               enableMouseTracking: false // 关闭鼠标跟踪，对应的提示框、点击事件会失效
	            }
	        },
	        series: [ {
	            name: '新增用户数',
	            data: this.state.data01
	        }]
  			};
		return(
			<div>
				<Row style={{borderBottom:'2px solid #eee'}}> 
				<p className="dataTitle">用户数据统计</p>
					<Col lg={4} offset={2} className="Box">
						<p className="Title">用户总数</p>
						<p className="Data">{this.state.userTotal1.userTotalNo} </p>
					</Col>
					<Col lg={4} className="Box">
						<p className="Title">月平均充值</p>
						<p className="Data">{this.state.userTotal1.monthAverRecharge} </p>
					</Col>
					<Col lg={4} className="Box">
						<p className="Title">历史平均充值</p>
						<p className="Data">{this.state.userTotal1.hisAverRecharge.toFixed(2)} </p>
					</Col>
					<Col lg={4} className="Box">
						<p className="Title">月平均消费</p>
						<p className="Data">{this.state.userTotal1.monthAverConsume.toFixed(2)} </p>
					</Col>
					<Col lg={4} className="Box">
						<p className="Title">历史平均消费</p>
						<p className="Data">{this.state.userTotal1.hisAverConsume.toFixed(2)} </p>
					</Col>
				</Row>
				<Row style={{paddingTop:'20px'}}>
					<p className="dataTitle">当月数据</p>
					<Col lg={20} offset={2}>
						<ReactHighcharts config = {config}></ReactHighcharts>
					</Col>
				</Row>
			</div>
			) 
	}
}