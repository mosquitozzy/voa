import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Layout } from "antd";
import "./style.css";
import AppHeader from "./components/Header/Header";
import PageList from "./containers/List/index";
import Detail from "./containers/Detail/index";
import Login from "./components/Login/index";
import Vip from "./containers/Vip/index"

const { Header, Footer, Content } = Layout;

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Layout style={{ minWidth: 1300, height: "100%" }}>
          <Header className="header">
            <AppHeader />
          </Header>
          <Content className="content">
            <Login />
            <Switch>
              <Route path="/vip" component={Vip} />
              <Route path="/detail/:id" component={Detail} />
              <Route path="/:id?" component={PageList} />
            </Switch>
          </Content>
          <Footer className="footer">@copyright Zed 2020</Footer>
        </Layout>
      </HashRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
