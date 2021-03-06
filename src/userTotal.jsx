import React from 'react';
import $ from 'jquery';
import { Row, Col } from 'antd';
var ReactHighcharts = require('react-highcharts');

//用户统计
export default class userTotal extends React.Component {
	state = { 
		userTotalUp:{userTotalNo:0,monthAverRecharge:0,hisAverRecharge:0,monthAverConsume:0,hisAverConsume:0},
		categories: [] ,
		data01:  [],
	}
	loaDataFromServer=()=>{
		const token = window.localStorage["token"];
		$.ajax({
			url:'/usertotal',
			dataType:'json',
			headers: {
	          'Authorization': token,
	        },
			success:function(data){
				this.setState({
					userTotalUp:data.userTotalUp,
					categories:data.userTotalDown.date,
					data01:data.userTotalDown.newUserNo,
				});
			}.bind(this),
			error:function(xhr,status,err){
				console.error(this.props.url,status,err.toString());
			}.bind(this)
		});
	}
	componentDidMount(){
		this.loaDataFromServer();
		this.timeUserTotal = setInterval(this.loaDataFromServer,120000);
	}
	componentWillUnmount(){
		clearInterval(this.timeUserTotal);
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
						<p className="Title">用户总数（个）</p>
						<p className="Data">{this.state.userTotalUp.userTotalNo} </p>
					</Col>
					<Col lg={4} className="Box">
						<p className="Title">月平均充值（元）</p>
						<p className="Data">{this.state.userTotalUp.monthAverRecharge.toFixed(2)} </p>
					</Col>
					<Col lg={4} className="Box">
						<p className="Title">历史平均充值（元）</p>
						<p className="Data">{this.state.userTotalUp.hisAverRecharge.toFixed(2)} </p>
					</Col>
					<Col lg={4} className="Box">
						<p className="Title">月平均消费（元）</p>
						<p className="Data">{this.state.userTotalUp.monthAverConsume.toFixed(2)} </p>
					</Col>
					<Col lg={4} className="Box">
						<p className="Title">历史平均消费（元）</p>
						<p className="Data">{this.state.userTotalUp.hisAverConsume.toFixed(2)} </p>
					</Col>
				</Row>
				<Row style={{paddingTop:'20px'}}>
					<p className="dataTitle">30天数据</p>
					<Col lg={20} offset={2}>
						<ReactHighcharts config = {config}></ReactHighcharts>
					</Col>
				</Row>
			</div>
			) 
	}
}