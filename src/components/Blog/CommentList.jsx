import React, { Component} from 'react'

import { API_ROOT } from '../config'

export default class  CommentList extends Component{
   static propTypes={
        rowCount: React.PropTypes.number.isRequired,
        itemList: React.PropTypes.array.isRequired
    }
    handlePraiseComment(id) { //点赞
        let currentNode = this.refs['praiseCount' + id];
        let count = currentNode.innerText;
        let isPraise = currentNode.getAttribute('data-praise')==='true';
        let cid = currentNode.getAttribute('data-id');//评论ID
        requiredLogin(() => $.post('/Social/Blog/PraiseComment', { id: cid }, () => {
            let oldCount = currentNode.innerText;
            if (isPraise) {//在操作之前已被关注
                let newCount = parseInt(oldCount) - 1;
                currentNode.innerText = newCount;
                currentNode.parentNode.setAttribute('class','handle handle-zan-b');
            } else {
                let newCount = parseInt(oldCount) + 1;
                currentNode.innerText = newCount;
                currentNode.parentNode.setAttribute('class', 'handle handle-zan-c')
            }
            currentNode.setAttribute('data-praise', !isPraise);
            window.location.href = '/social';
        }));

    }
    render() {
        let commentItems = this.props.itemList.map((itemComment, i) => {//评论列表项
            let replayContent;//回复标题栏
            let commentBody;//评论内容
            if (itemComment.Comment.ParentId > 0) {
                replayContent = (
                    <span>
                        <a href={API_ROOT+'/UserPage/' + itemComment.Comment.UserId} className="ellipsis930 maxw930_134" title="{{itemComment.Comment.UserDisplayName}}" target="_blank" >{itemComment.Comment.UserDisplayName}</a>
                        <span dangerouslySetInnerHTML={{ __html: itemComment.Comment.CommentsBody }} ></span>
                    </span>
                );
            } else {
                replayContent = (
                    <a href={API_ROOT + '/UserPage/' + itemComment.Comment.UserId} className="ellipsis930 maxw930_134" title={itemComment.Comment.UserDisplayName} target="_blank" >{itemComment.Comment.UserDisplayName}</a>
                )

                commentBody = (
                    <div className="wb_txt" >
                        <span dangerouslySetInnerHTML={{ __html: itemComment.Comment.CommentsBody }}></span>
                    </div>
                )

            }
            return (
                <li key={i}>
                    <div className="myweibo_pic">
                        <a href={API_ROOT + '/UserPage/' + itemComment.Comment.UserId} target="_blank">
                            <img src={API_ROOT + '/Avata/' + itemComment.Comment.UserId} />
                        </a>
                    </div>
                    <div className='right_interactbox' >
                        <p className="username">
                            {replayContent}
                        </p>
                        {commentBody}
                        <div className="feed_list_options">
                            <ul className="feed_list clearfix">
                                <li >
                                    <a onClick={this.handlePraiseComment.bind(this, itemComment.Comment.Id)} className={itemComment.IsPraise ? 'handle handle-zan-c' : 'handle handle-zan-b'} title={itemComment.IsPraise ? '取消赞' : '赞'} href="javascript:;" >赞(<span ref={'praiseCount' + itemComment.Comment.Id} data-praise={itemComment.IsPraise} data-id={itemComment.Comment.Id}>{itemComment.Comment.PraiseCount}</span>)</a>
                                </li>
                            </ul>
                            <span>{itemComment.ReportTimeStr}</span>
                        </div>
                    </div>
                </li>
            )
        });

        return (
            <div className='interact_list'>
                <div className='screened_tab_box'>
                    <div>
                        <span className="all_num">共 {this.props.rowCount}条</span>
                        <div className="screened_tabbtn_box">
                            <a href="javascript:;" className="screened_tabbtn current" >全部</a>
                        </div>
                    </div>
                </div>
                <div className="screened_cont_box">
                    <div className="screened_cont">
                        <ul className="interact_comment_list">
                            {commentItems}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }


}
