import React, { Component } from 'react'
import ShortBlog from './ShortBlog'
import ImageList from './ImageList'
import LongBlog from './LongBlog'
import BlogButton from './BlogButton'
export default class Blog extends Component {
    static propTypes = {
        blog: React.PropTypes.object
    }
    constructor(props) {
        super(props);
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
        let blogButtonContent = (
            <BlogButton Id={this.state.microBlog
                .Id} IsFavorites={this.state
                    .IsFavorites} IsPraise={this.state
                        .IsPraise} ForwardedCount={this.state.microBlog
                            .ForwardedCount} ReplyCount={this.state.microBlog
                                .ReplyCount} PraiseCount={this.state.microBlog
                                    .PraiseCount} ReportTimeStr={this.state.ReportTimeStr} />
        );


        //转发部分
        let cssZD = this.state.isTop ? 'webo_zd819' : '';
        let cssClass = `weibo_content  ${cssZD} `;//样式
        let forwardContent = (//转发发表的内容
            <div className={cssClass} dangerouslySetInnerHTML={{ __html: blogBody }}></div>
        );
        let oLongBlogId, oLongBlogBody, oImgUrlList, userId, userDisplayName;
        if (originalBlog) {
            oLongBlogId = originalBlog.MicroBlog.longBlogId;//原微博
            oLongBlogBody = originalBlog.MicroBlog.BlogBody;//原微博内容
            oImgUrlList = originalBlog.ImgUrlList;//原微博内容
            userId = originalBlog.MicroBlog.UserId;
            userDisplayName = originalBlog.MicroBlog.UserDisplayName;
        }
        return (
            do{
            if (originalBlog == null || this.state.originalId == 0) {
                if (longBlogId <= 0) {//短微博
                    <div>
                        <ShortBlog isTop={this.state.isTop} longBlogId={longBlogId} blogBody={blogBody} />
                        <ImageList imgUrlList={imgUrlList} longBlogId={longBlogId} />
                        {blogButtonContent}
                    </div>
                } else {
                    <div>
                        <LongBlog initlongBlog={this.state.microBlog} />
                        {blogButtonContent}
                    </div>
                }
            } else {//转发的微博
                <div>
                    {forwardContent}
                    <div className="forward_cont_box">
                        <p>
                            <a href={'/UserPage/' + userId} target="_blank" className="color3 person-card" userid={
                                userId}><strong style={{ color: '#ff6200' }}>@{userDisplayName}：</strong></a>
                        </p>
                        {
                                do{
                                    if (oLongBlogId <= 0){
                            <div>
                                <ShortBlog blogBody={oLongBlogBody} />
                                <ImageList imgUrlList={oImgUrlList} longBlogId={oLongBlogId} />
                            </div>
                        }else{
                            <LongBlog initlongBlog={originalBlog.MicroBlog} />
                        }
                        }
                            }
                        </div>
                    {blogButtonContent}
                </div>

            }
        }
        )

    }

}


