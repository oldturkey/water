import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import { Layout, Menu,Avatar,Dropdown,Icon} from 'antd';
import './App.css';
import Home from './Home';
import Record from './Record';
import Manage from './Manage';
import userData from './userData';
import Recharge from './Recharge';

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
  // componentWillMount() {
  //   if(this.getCookie('user')===""){
  //     this.props.history.replace('/');
  //   }
  // }
  render() {
    const admin = this.getCookie('user');
    const menu = (
      <Menu style={{top:'5px',right: '15px'}}>
        <Menu.Item >
          <Link to="/"><Icon type="poweroff" /> 注销登录</Link>
        </Menu.Item>
      </Menu>
    );
    return (
    <Layout>
        <Header className="header">
          <div className="logo" />
          <p className="logo-title">智能饮水机管理平台</p>
          <p className = "user">
            <Dropdown overlay={menu}>
                <Avatar size="large" style={{top:'10px',backgroundColor: '#49a9ee'}}>{admin}</Avatar>
            </Dropdown>
            <span style={{color:'#fff',position:'relative',bottom:'3px',left:'13px'}}>{new Date().toLocaleTimeString()}</span>
            </p>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Layout style={{ padding: '24px 0', background: '#fff' ,margin:'40px 0 0 0'}}>
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
                  <Menu.Item key="3"><Link to='/app/manage'><Icon type="user" />用户统计</Link></Menu.Item>
                  <Menu.Item key="4"><Link to='/app/manage'><Icon type="pay-circle-o" />金额统计</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" title={<span><Icon type="setting" />设备管理</span>}>
                  <Menu.Item key="5"><Link to='/app/manage'><Icon type="tool" />设备管理</Link></Menu.Item>
                  <Menu.Item key="6"><Link to='/app/manage'><Icon type="bell" />设备监控</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub4" title={<span><Icon type="user" />用户</span>}>
                  <Menu.Item key="7" ><Link to='/app/userData'><Icon type="usergroup-add" />用户数据</Link></Menu.Item>
                  <Menu.Item key="8" ><Link to='/app/recharge'><Icon type="bank" />金额发放</Link></Menu.Item>
                </SubMenu>
              <Menu.Item key="9" ><Link to='/app/test'><Icon type="customer-service" />反馈</Link></Menu.Item>
              <Menu.Item key="10" ><Link to='/app/test'><Icon type="fork" />测试用例</Link></Menu.Item>          
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 730 }}>        
                <Route  exact path='/app' component={Home}/>
                 <Route  exact path='/app/record' component={Record}/>
                <Route path='/app/manage' component={Manage}/>
                <Route path='/app/recharge' render={() => <Recharge admin={admin} />} /> 
                <Route path='/app/userData' component={userData}/>
                <Route path='/app/test' component={Test}/>    
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          water ©2017 Created by TaiBi
        </Footer>
      </Layout>
    );
  }
}

