import React from 'react';
import { Layout } from 'antd';
import { Switch, Route } from "react-router-dom";
import Splash from '../screens/Splash';
import Navbar from './navbar';
import NotepadDisplay from './notepads/notepad_display';
import Sidebar from '../components/sidebar/sidebar';
// import '../styles/index.scss';

const { Header, Footer, Sider, Content } = Layout;

const App : React.FC = () => {
  return (
    <Layout>
      <Sider>
        <Sidebar />
      </Sider>
      <Layout>
        <Header>
          <Navbar />
        </Header>
        <Content>
          <Switch>
              <Route exact path='/' component={Splash} />
              <Route exact path='/Notepads/:id' component={NotepadDisplay} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;