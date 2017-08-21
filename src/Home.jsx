import React from 'react';
import $ from 'jquery';

export default class product extends React.Component {
	lodaDataFromServer=()=>{
		$.ajax({
			url:this.props.url,
			dataType:'json',
			success:function(data){
				this.setState({data:data});
			}.bind(this),
			error:function(xhr,status,err){
				console.error(this.props.url,status,err.toString());
			}.bind(this)
		});
	}
	getInitialState =()=>{
		return {data:[]};
	}
	componentDidMount=()=>{
		this.lodaDataFromServer;
		setInterval(this.lodaDataFromServer,100);
	}
	render(){
		return(
			<div>home</div>
			) 
	}
}
