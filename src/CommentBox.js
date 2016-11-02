import React, { Component } from 'react'
import CommentList from './CommentList'
import { API_ROOT } from './config'
export default class CommentBox extends Component {
    static propTypes = {
        id: React.PropTypes.number.isRequired,//微博的id
        itemList: React.PropTypes.array,//评论列表
        rowCount: React.PropTypes.number
    }

    constructor(props) {
        super(props);
        this.state = {
            userId: 0//用户id
        }
    }

    componentDidMount() {
        // renderFace('.p123');//初始化表情盒子
        this.refs.commentInput.value = '';
        this.refs.commentInput.focus();
    }

    handleAddComment(event) {//提交评论
        event.preventDefault();
        let combody = this.refs.commentInput.value;//评论内容
        if (!(combody && Boolean($.trim(combody)))) {
            msg("请输入有效内容", 1);
            return false;
        }
        requiredLogin(() => $.post('/Social/Blog/CommentMicroBlog', { blogId: this.props.id, combody: combody }, () => {
            this.refs.commentInput.value = '';
            this.refs.commentInput.focus();
            window.location.href = '/social';
        }));

    }

    handleLoadUser(event) {//加载用户
        event.preventDefault();
        requiredLogin(() => window.location.href = '/social')
    }

    render() {
        return (
            <div className="interact_tabcont_box" style={{ display: 'block' }}>
                <div className="interact_tabcont forward_detail" id={'commit-box-' + this.props.id} style={{ display: 'none' }}>
                    <div>
                        <div className="myweibo_pic">
                            <a href={API_ROOT + '/UserPage/' + this.state.userId} target="_blank">
                                <img src={API_ROOT + "/Avata/" + this.state.userId} />
                            </a>
                        </div>
                        <div className="right_interactbox">
                            <textarea className="W_input" id={'comment_txt_' + this.props.id} ref='commentInput' ></textarea>
                            <div className="p_opt clearfix">
                                <ul className='rp_tool_list clearfix' style={{ 'position': 'relative' }}>
                                    <a style={{ 'cursor': 'pointer' }} className="weibo_rpbtn" onClick={this.handleAddComment.bind(this)}>评论</a>
                                    <li data-id={this.props.id}>
                                        <a style={{ 'cursor': 'pointer' }} data-id={'comment_txt_' + this.props.id} className="p123" ><em className="weibo-icon i-face"></em>表情</a>
                                    </li>
                                    <li>
                                        <span>
                                            <a onClick={this.handleLoadUser.bind(this)} style={{ 'cursor': 'pointer' }} input-id={'comment_txt_' + this.props.id} div-id={'comment_box_' + this.props.id}>
                                                <em className="weibo-icon i-user"></em>用户
                                            </a>
                                        </span>
                                        <div id={'comment_box_' + this.props.id} style={{ 'display': 'none', 'position': 'absolute', 'top': '14px' }}>
                                            <img src="/Themes/DefaultClean/images/box-cn-arrow.png" className="box-cn-arrow" />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            {
                                    do{
                                        if (this.props.rowCount > 0 && this.props.itemList.length > 0) {////数据列表
                                            <div>
                                                <CommentList itemList={this.props.itemList} rowCount={this.props.rowCount} />
                                                <div className="clearfix">
                                                    <div className="turn-page" id={'pager' + this.props.id}>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    }
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
