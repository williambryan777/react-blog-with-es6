import React, { Component } from 'react';

import BlogButton from './BlogButton';
import ImageList from './ImageList';
import LongBlog from './LongBlog';
import ShortBlog from './ShortBlog';
import { getLongBlogDetail, getShortBlogDetail } from '../config.js';
export default class Blog extends Component {
  static propTypes={
    blog: React.PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.state = {
      isTop: this.props.blog.IsTop,
    };
  }

  getBlogDetail() {
    const createDate = this.props.blog.MicroBlog.CreateDate;
    const id = this.props.blog.MicroBlog.Id;
    if (this.props.blog.MicroBlog.longBlogId > 0) {
      return getLongBlogDetail(createDate, id);
    }
    return getShortBlogDetail(createDate, id);
  }

  render() {
    const longBlogId = this.props.blog.MicroBlog.longBlogId;
    const blogBody = this.props.blog.MicroBlog.BlogBody;
    const imgUrlList = this.props.blog.ImgUrlList;
    const originalBlog = this.props.blog.OriginalBlog;
    const microBlog = this.props.blog.MicroBlog;
    const originalId = this.props.blog.MicroBlog.OriginalId;
    const blogButtonContent = (
      <BlogButton
        Id={microBlog
                    .Id} IsFavorites={this.props.blog.IsFavorites} IsPraise={this.props.blog.IsPraise} ForwardedCount={microBlog
                    .ForwardedCount} ReplyCount={microBlog
                    .ReplyCount} PraiseCount={microBlog
                        .PraiseCount} ReportTimeStr={this.props.blog.ReportTimeStr} BlogDetail={this.getBlogDetail()}
      />
        );


        // 转发部分
    const cssZD = this.state.isTop ? 'webo_zd819' : '';
    const cssClass = `weibo_content  ${cssZD} `;// 样式
    const forwardContent = (// 转发发表的内容
      <div className={cssClass} dangerouslySetInnerHTML={{ __html: blogBody }} />
        );
    let oLongBlogId,
      oLongBlogBody,
      oImgUrlList,
      userId,
      userDisplayName;
    if (originalBlog) {
      oLongBlogId = originalBlog.MicroBlog.longBlogId;// 原微博
      oLongBlogBody = originalBlog.MicroBlog.BlogBody;// 原微博内容
      oImgUrlList = originalBlog.ImgUrlList;// 原微博内容
      userId = originalBlog.MicroBlog.UserId;
      userDisplayName = originalBlog.MicroBlog.UserDisplayName;
    }
    return (
            do{
              if (originalBlog == null || originalId == 0) {
                if (longBlogId <= 0) { // 短微博
                  <div>
                    <ShortBlog isTop={this.state.isTop} longBlogId={longBlogId} blogBody={blogBody} />
                    <ImageList imgUrlList={imgUrlList} longBlogId={longBlogId} />
                    {blogButtonContent}
                  </div>;
                } else {
                  <div>
                    <LongBlog initlongBlog={microBlog} />
                    {blogButtonContent}
                  </div>;
                }
              } else { // 转发的微博
                <div>
                  {forwardContent}
                  <div className="forward_cont_box">
                    <p>
                      <a
                        href={`/UserPage/${userId}`} target="_blank" className="color3 person-card" userid={
                                    userId}
                      ><strong style={{ color: '#ff6200' }}>@{userDisplayName}：</strong></a>
                    </p>
                    {
                                do{
                                  if (oLongBlogId <= 0) {
                                    <div>
                                      <ShortBlog blogBody={oLongBlogBody} />
                                      <ImageList imgUrlList={oImgUrlList} longBlogId={oLongBlogId} />
                                    </div>;
                                  } else {
                                    <LongBlog initlongBlog={originalBlog.MicroBlog} />;
                                  }
                                }
                            }
                  </div>
                  {blogButtonContent}
                </div>;
              }
            }
    );
  }

}

