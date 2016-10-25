import React, {Component, PropTypes} from 'react';
import CommentList from './CommentList'
import $ from 'jquery';
import Emotion from '../Scripts/User/react-jquery.qqFace';

class CommentBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: 0//用户id
            
        };
    }

    static propTypes={
        id: React.PropTypes.number.isRequired,//微博的id
        itemList: React.PropTypes.array,//评论列表
        rowCount:React.PropTypes.number
    };
    componentDidMount() {
        Emotion(".p123").qqFace({
            id: 'facebox', //表情盒子的ID
            assign: '', //给那个控件赋值
            path: 'face/' //表情存放的路径
         })

        this.refs.commentInput.value = '';
        this.refs.commentInput.focus();
    }

    handleAddComment(){//提交评论
        var commentValue=this.refs.commentInput.value;
        console.log(commentValue);
        this.refs.commentInput.value='';
        this.refs.commentInput.focus();
    }
 
    render() {
        return (
           <div className="interact_tabcont_box" style={{ display: 'block' }}>
                <div className="interact_tabcont forward_detail" id={'commit-box-' + this.props.id} style={{ display: 'block' }}>
                    <div>
                        <div className="myweibo_pic">
                            <a href={'http://www.followme.com/UserPage/' + this.state.userId} target="_blank">
                                <img src={"http://www.followme.com/Avata/" + this.state.userId} />
                            </a>
                        </div>
                        <div className="right_interactbox">
                            <textarea className="W_input" id={'comment_txt_' + this.props.id} ref='commentInput' ></textarea>
                              <div className="p_opt clearfix">
                                  <ul className='rp_tool_list clearfix' style={{'position':'relative'}}>
                                    <a href="javascript:void(0)" className="weibo_rpbtn" onClick={this.handleAddComment.bind(this)}>评论</a>
                                    <li data-id={this.props.id}>
                                        <a style={{'cursor':'pointer'}} data-id={'comment_txt_' + this.props.id} className="p123" ><em className="weibo-icon i-face"></em>表情</a>
                                    </li>
                                    <li>
                                    <span>
                                        <a style={{'cursor':'pointer'}} input-id={'comment_txt_' + this.props.id} div-id={'comment_box_'+this.props.id}>
                                            <em className="weibo-icon i-user"></em>用户
                                        </a>
                                    </span>
                                    <div id={'comment_box_'+this.props.id} style={{'display':'none','position':'absolute','top':'14px'}}>
                                        <img src="/Themes/DefaultClean/images/box-cn-arrow.png" className="box-cn-arrow" />

                                    </div>
                                    </li>
                                    <li>

                                    </li>
                                  </ul>
                              </div>
                              {//数据列表
                                (() => {
                                    if(this.props.rowCount>0 && this.props.itemList.length>0){
                                        return (
                                           <div>
                                                <CommentList itemList={this.props.itemList} rowCount={this.props.rowCount} />
                                                <div className="clearfix">
                                                    <div className="turn-page" id={'pager'+this.props.id}>
                                                    </div>
                                                </div>
                                           </div>
                                        )
                                    }
                                })()
                              }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CommentBox;