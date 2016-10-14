//关注某个人
import React, { Component } from 'react'
class Attention extends Component {
    static propTypes = {
        isAttention: React.PropTypes.bool.isRequired,
        isOwnerBlog: React.PropTypes.bool.isRequired,
        userId: React.PropTypes.number.isRequired
    };  

    constructor(props) {
        super(props);
        this.state = {
            isAttention: this.props.isAttention
        };
    }

    AttentionUser() {
        var state=this.state.isAttention;
        this.setState({ isAttention: !state });
    }

    render() {
        if (!this.props.IsOwnerBlog) {
            let setfollow = this.props.isAttention ? 'setfollow' : '';
            let cssClass = `normalFollowBtn btn ${setfollow} attr_${this.props.userId} `;//样式
            return (
                <div className="btnbox">
                    <a href="javascript:void(0);" className={cssClass} onClick={this.AttentionUser.bind(this)} title={this.state.isAttention ? '点击取消关注' : '点击添加关注'}>{this.state.isAttention ? '已关注' : '关注'}</a>
                </div>
            )
        }else{
            return null;
        }
      

    }
}

export default Attention



