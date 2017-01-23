import React, { Component } from 'react';
import { BlogBox } from './components';
import $ from 'jquery';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogList: [],
    };
  }
  componentDidMount() {
    const postUrl = '/Social/Home/GetHotMicroBlogs';
    const queryParams = {
      rcount: 0,
      startId: 0,
      pageIndex: 1,
      time: 24,
      pageSize: 15,
    };
    $.post(postUrl, queryParams, (response) => {
      const listItems = response.list.Items;
      this.setState({
        blogList: listItems,
      });
    });
  }

  render() {
    return (
      <div>
        <BlogBox blogList={this.state.blogList} />
      </div>
    );
  }
}

export default App;
