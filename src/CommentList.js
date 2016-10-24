import React, {Component, PropTypes} from 'react';

class CommentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: 0//用户id
        };
    }
    render() {
        return (
            <div className="interact_tabcont_box" style={{ display: 'block' }}>
                <div className="interact_tabcont forward_detail" id={'commit-box-' + this.props.id} style={{ display: 'block' }}>
                    <div>
                        <div className="myweibo_pic">
                            <a href={'/UserPage/' + this.state.userId} target="_blank">
                                <img src={"/Avata/" + this.state.userId} />
                            </a>
                        </div>
                        <div className="right_interactbox">
                            <textarea className="W_input" id={'comment_txt_' + this.props.id}></textarea>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

CommentList.propTypes = {
    id: React.PropTypes.number.isRequired,//微博的id
    itemList: React.PropTypes.array//评论列表
};

export default CommentList;