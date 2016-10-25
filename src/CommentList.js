import React, {Component, PropTypes} from 'react';

class CommentList extends Component {
    static propTypes={
        rowCount:PropTypes.number.isRequired,
        itemList:PropTypes.array.isRequired
    }
    constructor(props){
        super(props);
        this.state ={
            itemList:this.props.itemList
        }
    }
    render() {
        var commentItems = this.state.itemList.map((itemComment, i)=>{//评论列表项
            let replayContent;//回复标题栏
            let commentBody;//评论内容
            if (itemComment.Comment.ParentId > 0) {
                replayContent= (
                    <span>
                        <a href={'http://www.followme.com/UserPage/' + itemComment.Comment.UserId} className="ellipsis930 maxw930_134" title="{{itemComment.Comment.UserDisplayName}}" target="_blank" >{itemComment.Comment.UserDisplayName}</a>
                        <span dangerouslySetInnerHTML={{ __html: itemComment.Comment.CommentsBody }} ></span>
                    </span>
                )
            }else{
                replayContent = (
                    <a href={'http://www.followme.com/UserPage/' + itemComment.Comment.UserId} className="ellipsis930 maxw930_134" title={itemComment.Comment.UserDisplayName} target="_blank" >{itemComment.Comment.UserDisplayName}</a>
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
                        <a href={'http://www.followme.com/UserPage/'+itemComment.Comment.UserId} target="_blank">
                            <img src={'http://www.followme.com/Avata/'+itemComment.Comment.UserId} />
                        </a>
                    </div>
                    <div className='right_interactbox' >
                        <p className="username">
                          {replayContent}
                        </p>
                        {commentBody}
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

export default CommentList;