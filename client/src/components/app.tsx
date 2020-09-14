import React from 'react';
import { Switch, Route } from "react-router-dom";
import { Layout } from 'antd';
import Splash from '../screens/Splash';
import Navbar from './navbar';
import NotepadScreen from '../screens/Notepad';
import PostScreen from '../screens/Post';
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
              <Route path='/Notepads/:notepadId/Posts/:postId' component={PostScreen} />
              <Route exact path='/Notepads/:id' component={NotepadScreen} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;