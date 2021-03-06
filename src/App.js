import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import { Layout, Menu,Avatar,Dropdown,Icon} from 'antd';
import './App.css';
import Home from './Home';
import Record from './Record';
import Manage from './Manage';
import userTotal from './userTotal';
import userData from './userData';
import Recharge from './Recharge';
import deviceManage from './deviceManage';
import feedBack from './feedBack';
import Clock from './Clock';
import Test from './Test';

const { Header, Content, Footer, Sider } = Layout;	
const { SubMenu } = Menu;

export default class App extends Component { 
  getCookie=(cname)=>{
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) 
    {
      var c = ca[i].trim();
      if (c.indexOf(name)===0) return c.substring(name.length,c.length);
    }
    return "";
   }
   //没有cookie直接返回登录页
   componentWillMount() {
     if(this.getCookie('user')===""){
       this.props.history.replace('/');
     }
   }
   //登出
   loginOut(){
    window.localStorage.removeItem('token');
   }
  render() {
    const admin = this.getCookie('user');
    const menu = (
      <Menu style={{top:'5px',right: '15px'}}>
        <Menu.Item >
          <a href="" onClick = {this.loginOut} ><Icon type="poweroff" /> 注销登录</a>
        </Menu.Item>
      </Menu>
    );
    return (
    <div>
    <Layout>
        <Header className="header">
          <div className="logo" />
            <p className="logo-title">智能饮水机管理平台</p>
            <p className = "user">
              <Dropdown overlay={menu}>
                  <Avatar size="large" style={{top:'10px',backgroundColor: '#49a9ee'}}>{admin}</Avatar>
              </Dropdown>
              <span style={{color:'#fff',position:'relative',bottom:'3px',left:'13px'}}><Clock /></span>
            </p>
        </Header>
          <Content style={{ padding: '0 30px' }}>
            <Layout style={{ padding: '24px 0', background: '#fff' ,margin:'20px 0 0 0'}}>
              <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  style={{ height: '100%' }}
                >
                <Menu.Item key="1" ><Link to='/app'><Icon type="home" />首页</Link></Menu.Item>
                 <SubMenu key="sub2" title={<span><Icon type="schedule" />统计管理</span>}>
                    <Menu.Item key="2"><Link to='/app/record'><Icon type="shop" />流量统计</Link></Menu.Item>
                    <Menu.Item key="3"><Link to='/app/userTotal'><Icon type="user" />用户统计</Link></Menu.Item>
                    <Menu.Item key="4"><Link to='/app/manage'><Icon type="pay-circle-o" />金额统计</Link></Menu.Item>
                  </SubMenu>
                    <Menu.Item key="5"><Link to='/app/deviceManage'><Icon type="tool" />设备管理</Link></Menu.Item>
                  <SubMenu key="sub4" title={<span><Icon type="user" />用户管理</span>}>
                    <Menu.Item key="7" ><Link to='/app/userData'><Icon type="usergroup-add" />用户数据</Link></Menu.Item>
                    <Menu.Item key="8" ><Link to='/app/recharge'><Icon type="bank" />金额发放</Link></Menu.Item>
                  </SubMenu>
                <Menu.Item key="9" ><Link to='/app/feedBack'><Icon type="customer-service" />反馈管理</Link></Menu.Item>
                <Menu.Item key="10" ><Link to='/app/test'><Icon type="fork" />测试用例</Link></Menu.Item>          
                </Menu>
              </Sider>
              <Content style={{ padding: '0 24px', minHeight: 750 }}>        
                  <Route  exact path='/app' component={Home}/>         
                   <Route  exact path='/app/record' component={Record}/>
                  <Route path='/app/manage' component={Manage}/>
                  <Route path='/app/recharge' render={() => <Recharge admin={admin} />} /> 
                  <Route path='/app/userTotal' component={userTotal}/>
                  <Route path='/app/userData' component={userData}/>
                  <Route path='/app/test' component={Test}/>  
                  <Route path='/app/deviceManage' component={deviceManage}/> 
                  <Route path='/app/feedBack' component={feedBack}/> 
              </Content>
            </Layout>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Smart Water©2017 Created by Terabits.cn
          </Footer>
        </Layout>
      </div>
    );
  }
}

