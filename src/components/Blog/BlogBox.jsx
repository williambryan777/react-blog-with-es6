import React, { Component } from 'react';

import Attention from './Attention';
import Avatar from './Avatar';
import Blog from './Blog';
import UserDetail from './UserDetail';

export default class BlogBox extends Component {
  static propTypes= {
    blogList: React.PropTypes.array.isRequired,
  }
  constructor(props) {
    super(props);
  }

  render() {
    const microBlogs = this.props.blogList.map((item, i) => (
      <li className="weibo_block clearfix" key={i}>
        <div className="left_box">
          <Avatar userId={item.MicroBlog.UserId} />
          <Attention userId={item.MicroBlog.UserId} isAttention={item.IsAttention} isOwnerBlog={item.IsOwnerBlog} />
        </div>
        <div className="right_box">
          <UserDetail userId={item.MicroBlog.UserId} accountRole={item.AccountRole} userDisplayName={item.MicroBlog.UserDisplayName} />
          <Blog blog={item} />
        </div>
      </li>
            ));
    return (
      <div className="weibo_wrap weibo_detail_wrap">
        <ul className="weibo_detail_list">
          {microBlogs}
        </ul>
      </div>
    );
  }
}

// module.exports = BlogBox;

