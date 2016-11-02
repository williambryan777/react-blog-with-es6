import React, { Component } from 'react'
import CommentBox from './CommentBox'
export default class BlogButton extends Component {
    static propTypes = {
        Id: React.PropTypes.number.isRequired,
        IsFavorites: React.PropTypes.bool.isRequired,
        IsPraise: React.PropTypes.bool.isRequired,
        ForwardedCount: React.PropTypes.number.isRequired,
        ReplyCount: React.PropTypes.number.isRequired,
        PraiseCount: React.PropTypes.number.isRequired,
        ReportTimeStr: React.PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            cList: [],
            pageIndex: 1,
            pageSize: 10,
            rowCount: 0,
            isFavorite: this.props.IsFavorites,//是否已收藏
            isPraise: this.props.IsPraise//是否已点赞
        }
    }

    handleCollection() {//收藏操作
        let state = this.state.isFavorite;

        $.post('/Social/Blog/CollectMicroBlog', { id: this.props.Id }, () => {
            this.setState({ isFavorite: !state });
            window.location.href = '/social';
        });
    }

    handleForward() {//转发操作
        requiredLogin(() => window.location.href = '/social')
    }

    handlePraise() {//点赞操作
        let state = this.state.isPraise;
        requiredLogin(() => $.post('/Social/Blog/PraiseMicroBlog', { id: this.props.Id }, () => {
            this.setState({ isPraise: !state });
            let oldCount = $('#praiseCount_' + this.props.Id).text();
            if (state) {
                let newCount = parseInt(oldCount) - 1;
                $('#praiseCount_' + this.props.Id).text(newCount)
            } else {
                let newCount = parseInt(oldCount) + 1;
                $('#praiseCount_' + this.props.Id).text(newCount)
            }
            window.location.href = '/social';
        }));
    }

    handleCommit() { //查看微博评论
        let bid = this.props.Id;
        if ($('#commit-box-' + bid).is(':visible')) {
            $('#commit-box-' + bid).slideUp();
            return false;
        }
        // getPosition();
        _IsInitPaging = true;
        this.handlePageComment(0);
        $('.interact_tabcont').not('#commit-box-' + bid).hide();
        $('#comment_txt_' + bid).focus().val('');
        $('#commit-box-' + bid).slideDown();

        // this.handleMove();

    }

    handleMove() {
        var currentNode = $("#replayCount_" + this.props.Id)[0];
        var parent = $(currentNode).parent()[0];
        var offset1 = parent.offsetTop;
        var offset2 = parent.offsetParent.offsetTop;
        var offset = offset1 + offset2 - 230;
        if ($(document).scrollTop() > offset) {
            offset = offset >= 0 ? offset : 0;
            $(document).scrollTop(offset);
        }
    }

    handlePageComment(page) {
        page++;
        $.getJSON('/Social/Blog/LoadCommentsByBlogId', { id: this.props.Id, pageIndex: page, pageSize: this.state.pageSize }, (data) => {
            this.setState({
                rowCount: data.RowCount,
                totalPages: data.TotalPages,
                pageIndex: data.PageIndex,
                cList: data.Items,
            });

            if ($('#pager' + this.props.Id)) {
                createPager("pager" + this.props.Id,
                    data.RowCount,
                    data.PageSize,
                    this.handlePageComment.bind(this));
            }
            this.handleMove();
        });
    }

    render() {
        let { Id, IsFavorites, IsPraise, ForwardedCount, ReplyCount, PraiseCount, ReportTimeStr } = this.props;
        let cssPraise = this.state.isPraise ? 'handle handle-zan_a' : 'handle handle-zan';
        return (
            <div>
                <div className="feed_list_options">
                    <ul className="feed_list clearfix">
                        <a href="javascript:void(0);" name="Favorites" onClick={this.handleCollection.bind(this)}>
                            <li>
                                <span>{this.state.isFavorite ? "取消收藏" : "收藏"}</span>
                            </li>
                        </a>
                        <li>
                            <p className="fl vertical-line-h1 vertical-line"></p>
                        </li>
                        <a href="javascript:void(0);" onClick={this.handleForward.bind(this)}>
                            <li>转发(<span >{ForwardedCount}</span>)</li>
                        </a>
                        <li>
                            <p className="fl vertical-line-h1 vertical-line"></p>
                        </li>
                        <a href="javascript:void(0);">
                            <li onClick={this.handleCommit.bind(this)}>评论(<span id={'replayCount_' + this.props.Id}>{ReplyCount}</span>)</li>
                        </a>
                        <li>
                            <p className="fl vertical-line-h1 vertical-line"></p>
                        </li>
                        <a onClick={this.handlePraise.bind(this)} href="javascript:void(0);" title={this.state.isPraise ? '取消赞' : '赞'} name="Praice">
                            <li className={cssPraise}>
                                赞(<span id={'praiseCount_' + this.props.Id}>{PraiseCount}</span>)
                            </li>
                        </a>
                    </ul>
                    {ReportTimeStr}
                </div>
                <CommentBox id={this.props.Id} itemList={this.state.cList} rowCount={this.state.rowCount} ></CommentBox>
            </div>
        );
    }
}