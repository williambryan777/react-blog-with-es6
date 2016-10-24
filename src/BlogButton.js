import React, {Component, PropTypes} from 'react';
import CommentList from './CommentList'
import $ from 'jquery'
// var $ = require('jquery');
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

    constructor(props){
        super(props)
        this.state={
            isShow: false,
            cList: []
        }
    }
    handleCommit() {//查看微博评论
        console.log('打开评论列表：' + this.props.Id);
        // this.setState({ isShow: !this.state.isShow})
        this.setState({ isShow: true })
        let bid = this.props.Id;
        if ($('#commit-box-' + bid).is(':visible')) {
            $('#commit-box-' + bid).slideUp();
            return false;
        }
        $('.interact_tabcont').not('#commit-box-' + bid).hide();
        $('#commit-box-' + bid).slideDown();
    }
    render() {
        let {Id,IsFavorites,IsPraise,ForwardedCount,ReplyCount,PraiseCount,ReportTimeStr}=this.props;
        let cssPraise = IsPraise ? 'handle handle-zan_a' :'handle handle-zan';
        return (
            <div>
                <div className="feed_list_options">
                    <ul className="feed_list clearfix">
                        <a href="javascript:void(0);" name="Favorites" >
                            <li >
                                <span>{IsFavorites ? "取消收藏" : "收藏"}</span>
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
                            <li onClick={this.handleCommit.bind(this)}>评论(<span >{ReplyCount}</span>)</li>
                        </a>
                        <li>
                            <p className="fl vertical-line-h1 vertical-line"></p>
                        </li>
                        <a href="javascript:void(0);" title={IsPraise ? '取消赞' : '赞'} name="Praice" >
                            <li className={cssPraise} >
                                赞(<span >{PraiseCount}</span>)
                    </li>
                        </a>
                    </ul>
                    {ReportTimeStr}
                </div>


                {(() => {
                    if (this.state.isShow) {
                        return (<CommentList id={this.props.Id} itemList={this.state.cList} />)
                    }
                })()}

            </div>
        );
    }
}

export default BlogButton;