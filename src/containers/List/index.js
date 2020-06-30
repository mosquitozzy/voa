import React, { Component } from "react";
import { Link } from "react-router-dom";
import { List } from "antd";
import axios from "axios";
class PageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  UNSAFE_componentWillReceiveProps(nextprops) {
    const id = nextprops.match.params.id;
    axios
      .get("http://www.dell-lee.com/react/api/List.json?id=" + id)
      .then((res) => {
        const resdata = res.data.data;

        this.setState({
          data: resdata,
        });
      });
  }
  render() {
    
    return (
      <List
        style={{ background: "#fff" }}
        size="small"
        bordered
        dataSource={this.state.data}
        renderItem={(item) => (
          <List.Item>
            <Link to={`/detail/${item.id}`}>{item.title}</Link>
          </List.Item>
        )}
      />
    );
  }

  componentDidMount() {
    let url = "http://www.dell-lee.com/react/api/List.json";
    const id = this.props.match.params.id;
    if (id) {
      url = url + "?id=" + id;
    }
    axios.get(url).then((res) => {
      const resdata = res.data.data;

      this.setState({
        data: resdata,
      });
    });
  }
}
export default PageList;
