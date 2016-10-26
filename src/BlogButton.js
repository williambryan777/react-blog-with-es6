import React, {Component, PropTypes} from 'react';
import CommentBox from './CommentBox'
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
            cList: [],
            pageIndex:1,
            pageSize:10,
            rowCount:0
        }
    }
    handleCommit() {//查看微博评论
        this.setState({ isShow: true })
        let bid = this.props.Id;
        if ($('#commit-box-' + bid).is(':visible')) {
            $('#commit-box-' + bid).slideUp();
            return false;
        }
        _IsInitPaging=true;
        this.handlePageComment(0);
        $('.interact_tabcont').not('#commit-box-' + bid).hide();
        $('#comment_txt_' + bid).focus().val('');
        $('#commit-box-' + bid).slideDown();
    }
    handlePageComment(page){
        page++;
        $.getJSON('/data/comments.json',
            { id: this.props.Id, pageIndex: page, pageSize: this.state.pageSize },
            function (data) {
                this.setState({
                    rowCount: data.RowCount,
                    totalPages: data.TotalPages,
                    pageIndex: data.PageIndex,
                    cList: data.Items,
                })
                if($('#pager'+this.props.Id)){
                    createPager("pager" + this.props.Id, data.RowCount, data.PageSize, this.handlePageComment.bind(this));
                }
            }.bind(this));
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
                        return (<CommentBox id={this.props.Id} itemList={this.state.cList} rowCount={this.state.rowCount}  />)
                    }
                })()}

            </div>
        );
    }
}

export default BlogButton;