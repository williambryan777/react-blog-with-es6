import React, { Component, PropTypes } from 'react'
import ShortBlog from './ShortBlog'
import ImageList from './ImageList'
import LongBlog from './LongBlog'
import BlogButton from './BlogButton'
class Blog extends Component {
    static propTypes = {
        blog: React.PropTypes.object
    };
    constructor(props) {
        super(props)
        this.state = {
            microBlog: this.props.blog.MicroBlog,
            originalId: this.props.blog.MicroBlog.OriginalId,
            isTop: this.props.blog.IsTop,
            imgUrlList: this.props.blog.ImgUrlList,
            originalBlog: this.props.blog.OriginalBlog,
            IsPraise: this.props.blog.IsPraise,
            IsFavorites: this.props.blog.IsFavorites,
            ReportTimeStr: this.props.blog.ReportTimeStr
        }
    }
    render() {

        let longBlogId = this.props.blog.MicroBlog.longBlogId;
        let blogBody = this.props.blog.MicroBlog.BlogBody;
        let imgUrlList = this.props.blog.ImgUrlList;
        let originalBlog = this.state.originalBlog;

        if (originalBlog == null || this.state.originalId == 0) {//原创的微博
            if(longBlogId<=0){//短微博
                return (
                    <div>
                        <ShortBlog  isTop={this.state.isTop} longBlogId={longBlogId} blogBody={blogBody} />
                        <ImageList imgUrlList={imgUrlList} longBlogId={longBlogId}/>
                        <BlogButton Id={this.state.microBlog.Id} IsFavorites={this.state.IsFavorites} IsPraise={this.state.IsPraise} ForwardedCount={this.state.microBlog.ForwardedCount} ReplyCount={this.state.microBlog.ReplyCount} PraiseCount={this.state.microBlog.PraiseCount} ReportTimeStr={this.state.ReportTimeStr} />
                    </div>
                    )
            }else{//长微博
                return (
                    <div>
                        <LongBlog initlongBlog={this.state.microBlog} />
                        <BlogButton Id={this.state.microBlog.Id} IsFavorites={this.state.IsFavorites} IsPraise={this.state.IsPraise} ForwardedCount={this.state.microBlog.ForwardedCount} ReplyCount={this.state.microBlog.ReplyCount} PraiseCount={this.state.microBlog.PraiseCount} ReportTimeStr={this.state.ReportTimeStr} />
                    </div>
                    )
            }
        }else{//转发的微博
            let cssZD=this.state.isTop ? 'webo_zd819':'';
            let cssClass = `weibo_content  ${cssZD} `;//样式
            let forwardContent=(//转发发表的内容
                <div className={cssClass} dangerouslySetInnerHTML={{ __html: blogBody }} ></div>
            )
            let original_longblogId = originalBlog.MicroBlog.longBlogId;//原微博
            let original_blogbody = originalBlog.MicroBlog.BlogBody;//原微博内容
            let original_imgUrlList = originalBlog.ImgUrlList;//原微博内容
            let userId = originalBlog.MicroBlog.UserId;
            let userDisplayName = originalBlog.MicroBlog.UserDisplayName;
            
            if (original_longblogId <= 0) {//短微博
                return (
                   <div>
                        {forwardContent}
                        <div className="forward_cont_box">
                            <p>
                                <a href={'/UserPage/' + userId} target="_blank" className="color3 person-card" userid={userId}><strong style={{ color: '#ff6200'}}>@{userDisplayName}：</strong></a>
                            </p>
                            <div>
                                <ShortBlog  blogBody={original_blogbody} />
                                <ImageList imgUrlList={original_imgUrlList} longBlogId={original_longblogId} />
                            </div>
                        </div>
                        <BlogButton Id={this.state.microBlog.Id} IsFavorites={this.state.IsFavorites} IsPraise={this.state.IsPraise} ForwardedCount={this.state.microBlog.ForwardedCount} ReplyCount={this.state.microBlog.ReplyCount} PraiseCount={this.state.microBlog.PraiseCount} ReportTimeStr={this.state.ReportTimeStr} />
                   </div>
                )
            } else {//长微博
                return (
                    <div>
                        {forwardContent}
                        <div className="forward_cont_box">
                            <p>
                                <a href={'/UserPage/' + userId} target="_blank" className="color3 person-card" userid={userId}>
                                  <strong style={{ color: '#ff6200' }}>@{userDisplayName}：</strong>
                                </a>
                            </p>
                            <LongBlog initlongBlog={originalBlog.MicroBlog} />
                        </div>
                        <BlogButton Id={this.state.microBlog.Id} IsFavorites={this.state.IsFavorites} IsPraise={this.state.IsPraise} ForwardedCount={this.state.microBlog.ForwardedCount} ReplyCount={this.state.microBlog.ReplyCount} PraiseCount={this.state.microBlog.PraiseCount} ReportTimeStr={this.state.ReportTimeStr} />
                    </div>
                )
            }
        }

    }
}

export default Blog