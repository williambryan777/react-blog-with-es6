//关注某个人
import React, { Component } from 'react'
export default class Attention extends Component {
    static propTypes = {
        isAttention: React.PropTypes.bool.isRequired,
        isOwnerBlog: React.PropTypes.bool.isRequired,
        userId: React.PropTypes.number.isRequired
    }
    constructor(props) {
        super(props)
        this.state = {
            isAttention: this.props.isAttention
        }
    }

    handleAttentionUser() {//关注
        let state = this.state.isAttention;
        requiredLogin(() => $.post('/Social/Blog/AttentionOrNo', { id: this.props.userId }, () => {
            this.setState({ isAttention: !state });
            window.location.href = '/social';
        }));
    }

    render() {
        if (!this.props.IsOwnerBlog) {
            let setfollow = !this.state.isAttention ? 'setfollow' : '';
            let cssClass = `normalFollowBtn btn ${setfollow} attr_${this.props.userId} `;//样式
            return (
                <div className="btnbox">
                    <a href='javascript:void(0);' onClick={this.handleAttentionUser.bind(this)} className={cssClass} >{this.state.isAttention ? '已关注' : '关注'}</a>
                </div>
            )
        } else {
            return null;
        }

    }
}
