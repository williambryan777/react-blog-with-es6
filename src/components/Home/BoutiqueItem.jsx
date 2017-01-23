import React, { Component, PropTypes } from 'react';
import { getLongBlogDetail } from '../config.js';
export default class BoutiqueItem extends Component {
  static propTypes = {
    item: React.PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: this.props.item.ImgUrl,
      userImgUrl: `/Avata/${this.props.item.UserId}/20/20`,
    };
  }
  handleErrorImg(type) {
    if (type === 1) { // 微博缩列图
      this.setState({ imgUrl: '/Themes/DefaultClean/images/cwb_default_img.jpg' });
    } else if (type === 2) { // 头像
      this.setState({ userImgUrl: '/Themes/DefaultClean/images/onerror_50.png' });
    }
  }
  render() {
    const item = this.props.item;
    return (
      <div className="mb_line">
        <div className="mb_line_left left">
          <a target="_blank" href={getLongBlogDetail(item.CreateDate, item.RId)}>
            <img src={this.state.imgUrl} style={{ width: 150, height: 100 }} alt="followme" onError={this.handleErrorImg.bind(this, 1)} />
          </a>
        </div>
        <div className="mb_line_right right" style={{ width: 595 }}>
          <div className="mbline_title">
            <a target="_blank" href={getLongBlogDetail(item.CreateDate, item.RId)} className="left" title={item.ContentTitle}>{item.ContentTitle}</a>
          </div>
          <p className="color9">{item.ContentIntro}</p>
          <div className="mbline_bot">
            <div className="mbline_bot_l left " >
              <img className="person" data-id={item.UserId} src={this.state.userImgUrl} onError={this.handleErrorImg.bind(this, 2)} />
              <span><a href={`/UserPage/${item.UserId}`} className="maxw930_134 ellipsis930 person" data-id={item.UserId} title={item.UserDisplayName} target="_blank">{item.UserDisplayName}</a></span>
            </div>
            <span className="right" style={{ color: '#999', fontSize: 12 }}>{item.CreateDateStr}</span>
          </div>
        </div>
      </div>

    );
  }
}
