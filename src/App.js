import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import { Layout, Menu,Avatar,Dropdown,Icon} from 'antd';
import './App.css';
import Record from './Record';
import Manage from './Manage';
import Recharge from './Recharge';
import Test from './Test';

const { Header, Content, Footer, Sider } = Layout;	

export default class App extends Component { 
  getCookie=(cname)=>{
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) 
    {
      var c = ca[i].trim();
      if (c.indexOf(name)===0) return c.substring(name.length,c.length);
    }
    return "1";
   }
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
            </p>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Layout style={{ padding: '24px 0', background: '#fff' ,margin:'40px 0 0 0'}}>
            <Sider width={200} style={{ background: '#fff' }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                style={{ height: '100%' }}
              >
              <Menu.Item key="1" ><Link to='/app'><Icon type="database" />记录管理</Link></Menu.Item>
              <Menu.Item key="2" ><Link to='/app/manage'><Icon type="shop" />经营管理</Link></Menu.Item>
              <Menu.Item key="3" ><Link to='/app/recharge'><Icon type="bank" />充值管理</Link></Menu.Item>
              <Menu.Item key="4" ><Link to='/app/test'><Icon type="fork" />测试用例</Link></Menu.Item>          
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 730 }}>        
                <Route  exact path='/app' component={Record}/>
                <Route path='/app/manage' component={Manage}/>
                <Route path='/app/recharge' render={() => <Recharge admin={admin} />} /> 
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

