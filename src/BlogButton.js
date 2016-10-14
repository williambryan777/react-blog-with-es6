import React, {Component, PropTypes} from 'react';

class BlogButton extends Component {
   static propTypes={
       Id:PropTypes.number.isRequired,
       IsFavorites:PropTypes.bool.isRequired,
       IsPraise:PropTypes.bool.isRequired,
       ForwardedCount:PropTypes.number.isRequired,
       ReplyCount:PropTypes.number.isRequired,
       PraiseCount:PropTypes.number.isRequired,
       ReportTimeStr:PropTypes.string.isRequired
   };

    render() {
        let {Id,IsFavorites,IsPraise,ForwardedCount,ReplyCount,PraiseCount,ReportTimeStr}=this.props;
        let cssPraise = IsPraise ? 'handle handle-zan_a' :'handle handle-zan';
        return (
            <div className="feed_list_options">
                <ul className="feed_list clearfix">
                    <a href="javascript:void(0);" name="Favorites" >
                        <li >
                            <span>{IsFavorites ? "取消收藏" : "收藏" }</span>
                        </li>
                    </a>
                    <li>
                        <p className="fl vertical-line-h1 vertical-line"></p>
                    </li>
                    <a href="javascript:void(0);" >
                        <li>转发(<span >{ForwardedCount}</span>)</li>
                    </a>
                    <li>
                        <p className="fl vertical-line-h1 vertical-line"></p>
                    </li>
                    <a href="javascript:void(0);">
                        <li >评论(<span >{ReplyCount}</span>)</li>
                    </a>
                    <li>
                        <p className="fl vertical-line-h1 vertical-line"></p>
                    </li>
                    <a href="javascript:void(0);"  title={IsPraise ? '取消赞':'赞'} name="Praice" >
                        <li  className={cssPraise} >
                            赞(<span >{PraiseCount }</span>)
                    </li>
                    </a>
                </ul>
                { ReportTimeStr }
            </div>
        );
    }
}

export default BlogButton;