/**
 * 金融资讯具体单项
 */

import React, { Component } from 'react';
import { getLongBlogDetail } from '../config.js';
class NewsItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: this.props.item.MicroBlog.LongBlogImg,
    };
    if (!this.state.imgUrl) {
      this.handleErrorImg();
    }
  }

  static propTypes = {
    item: React.PropTypes.object.isRequired,
  }

    /** handle error image */
  handleErrorImg() {
    this.setState({ imgUrl: '/Themes/DefaultClean/images/cwb_default_img.jpg' });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.item.MicroBlog.LongBlogImg != null && this.props.item.MicroBlog.LongBlogImg != nextProps.item.MicroBlog.LongBlogImg) {
      this.setState({ imgUrl: nextProps.item.MicroBlog.LongBlogImg });
    } else if (!nextProps.item.MicroBlog.LongBlogImg) {
      this.handleErrorImg();
    }
  }

  componentDidMount() {
    if (!this.state.imgUrl) {
      this.handleErrorImg();
    }
  }

  render() {
    const item = this.props.item;
    return (
      <div className="fh_line">
        <div className="fh_line_left left">
          <a
            href={getLongBlogDetail(item.MicroBlog.CreateDate, item.MicroBlog.Id)}
            target="_blank"
          >
            <img
              alt="followme"
              src={this.state.imgUrl}
              onError={this
                            .handleErrorImg
                            .bind(this)}
            />
          </a>
        </div>
        <div className="fh_line_right right">
          <a
            href={getLongBlogDetail(item.MicroBlog.CreateDate, item.MicroBlog.Id)}
            target="_blank"
          >{item.MicroBlog.LongBlogTitle}</a>
          <p className="color9">{item.MicroBlog.BlogBody}</p>
        </div>
      </div>
    );
  }
}

export default function FinanceItem({ news }) {
  const items = news.map((item, i) => (<NewsItem item={item} key={i} />));
  return (
    <div className="fh_box tabCont on">
      {items}
    </div>
  );
}
