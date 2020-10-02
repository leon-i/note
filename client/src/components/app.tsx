import React from 'react';
import { Switch, Route } from "react-router-dom";
import { Layout } from 'antd';
import Splash from '../screens/Splash';
import Navbar from './navbar/navbar';
import NotepadScreen from '../screens/Notepad';
import PostScreen from '../screens/Post';
import Sidebar from '../components/sidebar/sidebar';
import Footer from "./footer/footer";
import {useSider} from "../hooks/useSider";
import { ThemeProvider } from "styled-components";
import {theme} from "../styles/theme";
import {GlobalStyle} from "../styles/global";
import {useWindowSize} from "../hooks/useWindowSize";

const { Header, Sider, Content } = Layout;

const App : React.FC = () => {
    const [width] = useWindowSize();
    const {siderStatus, toggleSider} = useSider();

    const collapsed = width > 576 ? false : siderStatus;
  return (
      <ThemeProvider theme={theme}>
          <GlobalStyle />
        <Layout>
          <Sider id = 'sider'
                 breakpoint='sm'
                 collapsedWidth='0'
                 collapsed={collapsed}
                 zeroWidthTriggerStyle={{
                     display: 'none'
                 }} >
            <Sidebar isMobile={width <= 576} />
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
              {
                  width <= 576 &&
                  <Footer toggleSider={toggleSider} />
              }
          </Layout>
        </Layout>
      </ThemeProvider>
  );
}

export default App;