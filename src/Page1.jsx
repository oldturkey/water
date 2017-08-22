import React from 'react';
import $ from 'jquery';
import { Row, Col ,Card } from 'antd';
var ReactHighcharts = require('react-highcharts');

export default class Content extends React.Component {
	state = { 
		manage1:{},
		categories: [] ,
		data01:  [],
		data02: []
	}
	loaDataFromServer=()=>{
		$.ajax({
			url:'/manage',
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
				<Row style={{textAlign:'center'}}>
					<Col lg={8} >
						<Card title="今日充值金额" bordered={true} style={{ width: 300,margin:'20px auto' }}>
						      <p>{this.state.manage1.todayrecharge}</p>
						    </Card>
					</Col>
					<Col lg={8}>
						<Card title="今日消费金额" bordered={true} style={{ width: 300,margin:'20px auto'  }}>
						      <p>{this.state.manage1.todayconsume}</p>
						    </Card>
					</Col>
					<Col lg={8}>
						<Card title="账户总余额" bordered={true} style={{ width: 300,margin:'20px auto 50px'  }}>
						      <p>{this.state.manage1.remain}</p>
						    </Card>
					</Col>
					<Col lg={20} offset={2}>
					<ReactHighcharts config = {config}></ReactHighcharts>
					</Col>
				</Row>
			</div>
			) 
	}
}