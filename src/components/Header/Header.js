import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import "./style.css";
import { Menu } from "antd";
import { DollarOutlined } from "@ant-design/icons";
import axios from "axios";

class AppHeader extends Component {
  constructor(props) {
    super(props);
    // this.getMenuItems = this.getMenuItems.bind(this);

    this.state = {
      list: [],
    };
  }

  getMenuItems() {
    return this.state.list.map((item) => {
      return (
        <Menu.Item key={item.id} icon={<DollarOutlined />}>
          <Link to={`/${item.id}`}>{item.title}</Link>
        </Menu.Item>
      );
    });
  }

  componentDidMount() {
    axios.get("http://www.dell-lee.com/react/api/header.json").then((res) => {
      const data = res.data.data;
      this.setState({
        list: data,
      });
    });
  }

  render() {
    return (
      <Fragment>
        <Link to="/">
          <img src={logo} alt="logo" className="app-header-logo" />
        </Link>
        <Menu mode="horizontal" className="app-header-menu">
          {this.getMenuItems()}
        </Menu>
      </Fragment>
    );
  }
}
export default AppHeader;
