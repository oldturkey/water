import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import './index.css';
import App from './App';
import Login from './Login';
import registerServiceWorker from './registerServiceWorker';

function requireAuthentication(Component) {
  // 组件有已登陆的模块 直接返回 (防止从新渲染)
  if (Component.AuthenticatedComponent) {
    return Component.AuthenticatedComponent
  }

  // 创建验证组件
  class AuthenticatedComponent extends React.Component {
    // static contextTypes = {
    //   router: React.PropTypes.object.isRequired,
    // }

    componentWillMount() {
      this.checkAuth();
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth();
    }

    checkAuth() {

      // 判断登陆
      const token  = window.localStorage["token"];
      const login = token ? true : null;
      // 未登陆重定向到登陆页面
      if (!login) {
        this.props.history.replace('/');
        return;
      }
    }

    render() {
        return <Component {...this.props}/>
    }
  }
  return AuthenticatedComponent;
}
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
ReactDOM.render(
		<Router>
			<div>
				<Route exact path='/' component={Login}/>
				<Route  path='/app' component={requireAuthentication(App)}/>
			</div>
		</Router>
	, document.getElementById('root'));
registerServiceWorker();
