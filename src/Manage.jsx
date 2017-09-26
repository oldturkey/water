import React from 'react';
import $ from 'jquery';
import { Row, Col } from 'antd';
var ReactHighcharts = require('react-highcharts');

//金额统计
export default class Mannage extends React.Component {
	state = { 
		manageToday:{recharge:0,present:0,todayrecharge:0,todayconsume:0,remain:0},
		categories: [] ,
		data01:  [],
		data02: []
	}
	loaDataFromServer=()=>{
		const token = window.localStorage["token"];
		$.ajax({
			url:'/manage',
			dataType:'JSON',
			headers: {
			    'Authorization': token,
			  },
			success:function(data){
				this.setState({
					manageToday:data.manageToday,
					categories:data.manageMonth.date,
					data01:data.manageMonth.recharge,
					data02:data.manageMonth.payment
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
	           text: '月充值消费折线图',
	           margin:30
	        },
	        xAxis: {
	           categories: this.state.categories
	        },
	        yAxis: {
	           title: {
	                text: '金额(元)'
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
	        series: [{
	            name: '充值',
	            data: this.state.data01
	        }, {
	            name: '消费',
	            data: this.state.data02
	        }]
  			};
		return(
			<div>
				<Row style={{borderBottom:'2px solid #eee'}}> 
				<p className="dataTitle">经营数据</p>
					<Col lg={4} offset={2} className="Box">
						<p className="Title">今日充值金额(元)</p>
						<p className="Data">{this.state.manageToday.recharge.toFixed(1)} </p>
					</Col>
					<Col lg={4} className="Box">
						<p className="Title">今日赠送金额(元)</p>
						<p className="Data">{this.state.manageToday.present.toFixed(1)} </p>
					</Col>
					<Col lg={4} className="Box">
						<p className="Title">今日充值总金额(元)</p>
						<p className="Data">{this.state.manageToday.todayrecharge.toFixed(1)} </p>
					</Col>
					<Col lg={4} className="Box">
						<p className="Title">今日消费金额(元)</p>
						<p className="Data">{this.state.manageToday.todayconsume.toFixed(1)} </p>
					</Col>
					<Col lg={4} className="Box">
						<p className="Title">账户总余额(元)</p>
						<p className="Data">{this.state.manageToday.remain.toFixed(1)} </p>
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