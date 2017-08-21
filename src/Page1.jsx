import React from 'react';
import $ from 'jquery';
import { Row, Col ,Card } from 'antd';
var ReactHighcharts = require('react-highcharts');

export default class Content extends React.Component {
	state = { 
		categories: ['8.09', '8.10', '8.11', '8.12', '8.13', '8.14', '8.15', '8.16', '8.17', '8.18', '8.19', '8.20'] ,
		data01:  [70, 70, 95, 145, 184, 215, 252, 265, 233, 183, 139, 96],
		data02: [39, 42, 57, 85, 119, 152, 170, 166, 142, 103, 66, 48]
	}
	lodaDataFromServer=()=>{
		$.ajax({
			url:'http://192.168.31.14:8080/manage',
			dataType:'json',
			success:function(data){
				this.setState({
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
		this.lodaDataFromServer;
		setInterval(this.lodaDataFromServer,10000);
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
						      <p>265</p>
						    </Card>
					</Col>
					<Col lg={8}>
						<Card title="今日消费金额" bordered={true} style={{ width: 300,margin:'20px auto'  }}>
						      <p>36</p>
						    </Card>
					</Col>
					<Col lg={8}>
						<Card title="账户总余额" bordered={true} style={{ width: 300,margin:'20px auto 50px'  }}>
						      <p>36520</p>
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