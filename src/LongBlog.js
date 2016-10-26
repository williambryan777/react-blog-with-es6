import React, {Component} from 'react'

class LongBlog extends Component {
    static propTypes = {
        initlongBlog:React.PropTypes.object.isRequired,
        isTop: React.PropTypes.bool
    };

    constructor(props) {
        super(props)
        this.state = {
            isTop: this.props.isTop,
            id:this.props.initlongBlog.Id,
            longBlogId: this.props.initlongBlog.longBlogId,
            blogBody: this.props.initlongBlog.LongBlogBody,
            longBlogImg: this.props.initlongBlog.LongBlogImg,
            longBlogTitle:this.props.initlongBlog.LongBlogTitle.slice(0,36),
            longBlogIntro: this.props.initlongBlog.LongBlogIntro.slice(0,80),
            scroll_pos:0
        }
    }

    getBlogDetail(){
        return 'http://www.followme.com/Social/BlogDetail/Index/' + this.state.id
    }

    render () {
        let classZD = this.state.isTop ? 'webo_zd819' : '';
        let cssClass = `weibo_content ${classZD}`;
        let imgContent;
        if (this.state.longBlogImg != null) {//有图片
            imgContent = (<img src={this.state.longBlogImg} className="left_msgimg" width="80" height="80" alt="followme" />)
        } else {//没有图片的话给一个默认的图片
            imgContent =  (<img src="http://www.followme.com/Themes/DefaultClean/images/cwb_default_img.jpg" className="left_msgimg" width="80" height="80" alt="" />)
        }
        return (
            <div>
                <div  className={cssClass} >
                    <span style={{ color: '#ff6200' }}>[长微博]</span>{this.state.longBlogTitle}
                </div>
                <div className="cwb_mediasmallBox" style={{
                    display: 'block'}}>
                    <a  href={this.getBlogDetail()} target="_blank">
                      {imgContent}
                     </a>
                    <div className="right_txtintrobox">
                        <h3 className="title">
                            <a href={this.getBlogDetail() } target="_blank">{this.state.longBlogTitle}</a>
                        </h3>
                        <p className="jstxt" dangerouslySetInnerHTML={{ __html: this.state.longBlogIntro }}></p>
                    </div>
                    <a href={this.getBlogDetail()} target='_blank' className="readallbtn" id={'js_readallbtn' + this.state.id}>阅读</a>
                </div>
            </div>
        )
    }
}

export default LongBlog