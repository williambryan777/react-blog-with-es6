/**
 * 短微博
 */

import React, { Component } from 'react';

export default class ShortBlog extends Component {
  static propTypes={
    isTop: React.PropTypes.bool,
    blogBody: React.PropTypes.string.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      isTop: this.props.isTop,
    };
  }
  render() {
    const { isTop, blogBody } = this.props;
    const classZD = isTop ? 'webo_zd819' : '';
    const cssClass = `weibo_content ${classZD}`;
    return (
      <div className={cssClass} dangerouslySetInnerHTML={{ __html: blogBody }} />
    );
  }
}
