import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { message, Modal, Button } from "antd";
import axios from "axios";
import "./style.css";
import { Input } from "antd";
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";

class Login extends Component {
  constructor(props) {
    super(props);
    this.showModal = this.showModal.bind(this);
    this.state = {
      login: false,
      modal: false,
      user: "",
      password: "",
    };
  }

  showModal() {
    this.setState({
      modal: true,
    });
  }

  checkLogin = (e) => {
    const { user, password } = this.state;
    console.log(user, password);
    const url = `http://www.dell-lee.com/react/api/login.json?user=${user}&password=${password}`;
    axios
      .get(url, {
        withCredentials: true,
      })
      .then((res) => {
        const login = res.data.data.login;
        if (login) {
          message.success("登陆成功！");
          this.setState({
            modal: false,
            login: true,
          });
        } else {
          message.error("登陆失败！");
        }
      });
  };

  handleCancel = (e) => {
    this.setState({
      modal: false,
    });
  };

  changeUser = (e) => {
    this.setState({
      user: e.target.value,
    });
  };

  changePwd = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  logOut = () => {
    axios
      .get("http://www.dell-lee.com/react/api/logout.json", {
        withCredentials: true,
      })
      .then((res) => {
        const data = res.data.data;
        if (data.logout) {
          this.setState({
            login: false,
          });
        }
        this.props.history.push('/')
      });
      
  };

  render() {
    const { login } = this.state;
    return (
      <div className="login">
        {login ? (
          <Button type="primary" onClick={this.logOut}>
            退出
          </Button>
        ) : (
          <Button type="primary" onClick={this.showModal}>
            登录
          </Button>
        )}
        <Link to="/vip">
          <Button type="primary" style={{ marginLeft: 10 }}>
            Vip
          </Button>
        </Link>

        <Modal
          title="登录"
          visible={this.state.modal}
          onOk={this.checkLogin}
          onCancel={this.handleCancel}
        >
          <Input
            onChange={this.changeUser}
            size="large"
            value={this.state.user}
            placeholder="用户名"
            prefix={<UserOutlined />}
          />
          <Input.Password
            onChange={this.changePwd}
            value={this.state.password}
            className="login-pwd"
            placeholder="密码"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Modal>
      </div>
    );
  }

  componentDidMount() {
    axios
      .get("http://www.dell-lee.com/react/api/isLogin.json", {
        withCredentials: true,
      })
      .then((res) => {
        const login = res.data.data.login;
        this.setState({ login });
      });
     
  }
}

export default withRouter(Login);
