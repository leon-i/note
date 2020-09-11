import React from 'react';
import { Layout } from 'antd';
import { Switch, Route } from "react-router-dom";
import Splash from '../screens/Splash';
import Navbar from './navbar';
import NotepadForm from '../components/notepads/notepad_form';
import Sidebar from '../components/sidebar/sidebar';
// import '../styles/index.scss';

const { Header, Footer, Sider, Content } = Layout;

const App : React.FC = () => {
  return (
    <Layout>
      <Header>
        <Navbar />
      </Header>
      <Layout>
        <Sider>
          <Sidebar />
        </Sider>
        <Content>
          <Switch>
              <Route exact path='/' component={Splash} />
              <Route exact path='/new-notepad' component={NotepadForm} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;