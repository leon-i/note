import React from 'react';
import { Switch, Route } from "react-router-dom";
import { Layout } from 'antd';
import Splash from '../screens/Splash';
import Navbar from './navbar/navbar';
import NotepadScreen from '../screens/Notepad';
import PostScreen from '../screens/Post';
import Sidebar from '../components/sidebar/sidebar';
import { ThemeProvider } from "styled-components";
import {theme} from "../styles/theme";
import {GlobalStyle} from "../styles/global";

const { Header, Sider, Content } = Layout;

const App : React.FC = () => {
  return (
      <ThemeProvider theme={theme}>
          <GlobalStyle />
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
      </ThemeProvider>
  );
}

export default App;