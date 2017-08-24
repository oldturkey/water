import React from 'react';
import $ from 'jquery';
import { Row, Col } from 'antd';
var ReactHighcharts = require('react-highcharts');

export default class Content extends React.Component {
	state = { 
		manage1:{todayrecharge:0,todayconsume:0,remain:0},
		categories: [] ,
		data01:  [],
		data02: []
	}
	loaDataFromServer=()=>{
		$.ajax({
			url:'http://192.168.31.14:8080/manage',
			dataType:'JSON',
			success:function(data){
				this.setState({
					manage1:data.manage1,
					categories:data.manage2.date,
					data01:data.manage2.recharge,
					data02:data.manage2.payment
				});
			}.bind(this),
			error:function(xhr,status,err){
				console.error(this.props.url,status,err.toString());
			}.bind(this)
		});
	}
	componentDidMount=()=>{
		this.loaDataFromServer();
		this.time = setInterval(this.loaDataFromServer,120000);
	}
	componentWillUnmount=()=>{
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
	           text: '月充值消费折线图'
	        },
	        xAxis: {
	           categories: this.state.categories
	        },
	        yAxis: {
	           title: {
	                text: '充值金额(元)'
	            }
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
				<p className="dataTitle">经营数据：</p>
					<Col lg={8} className="Box">
						<p className="Title">今日充值金额(元)：</p>
						<p className="Data">{this.state.manage1.todayrecharge} <span style={{fontSize:'12pt',color:'#f04134'}}>1.23%↑</span></p>
					</Col>
					<Col lg={8} className="Box">
						<p className="Title">今日消费金额(元)：</p>
						<p className="Data">{this.state.manage1.todayconsume} <span style={{fontSize:'12pt',color:'#f04134'}}>1.23%↑</span></p>
					</Col>
					<Col lg={8} className="Box">
						<p className="Title">账户总余额(元)：</p>
						<p className="Data">{this.state.manage1.remain} <span style={{fontSize:'12pt',color:'#f04134'}}>1.23%↑</span></p>
					</Col>
				</Row>
				<Row style={{paddingTop:'20px'}}>
					<p className="dataTitle">当月数据：</p>
					<Col lg={20} offset={2}>
						<ReactHighcharts config = {config}></ReactHighcharts>
					</Col>
				</Row>
			</div>
			) 
	}
}