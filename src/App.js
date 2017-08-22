import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom'
import { Layout, Menu, Breadcrumb} from 'antd';
import './App.css';
import Home from './Home';
import Page1 from './Page1';
import Page2 from './Page2';

const { Header, Content, Footer, Sider } = Layout;	

class App extends Component { 
  render() {
    return (
  <Router>
      <Layout>
    <Header className="header">
      <div className="logo" />
      <p className="logo-title">钛比科技  智能饮水机管理平台<Link to="/login">退出登录</Link></p>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '12px 0' }}>
        <Breadcrumb.Item>首页</Breadcrumb.Item>
        <Breadcrumb.Item>管理页面</Breadcrumb.Item>
      </Breadcrumb>
      <Layout style={{ padding: '24px 0', background: '#fff' }}>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
          >
          <Menu.Item key="1"><Link to="/app">记录管理</Link></Menu.Item>
        	<Menu.Item key="2"><Link to="/page1">经营管理</Link></Menu.Item>
        	<Menu.Item key="3"><Link to="/page2">充值管理</Link></Menu.Item>          
          </Menu>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 730 }}>
            <Switch>
              <Route exact path="/app" component={Home}/>
	           <Route path="/page1" component={Page1}/>
	           <Route path="/page2" component={Page2}/> 
             </Switch>       
        </Content>
      </Layout>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      Ant Design ©2017 Created by TaiBi
    </Footer>
  </Layout>
  </Router>
    );
  }
}

export default App;
