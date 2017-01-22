/**
 * 用户信息
 */

import React,{Component} from 'react'

import { CERTIFICATION_IMG} from '../config'

export default class  UserDetail extends Component{
    static propTypes= {
        accountRole: React.PropTypes.number.isRequired,
        userId: React.PropTypes.number.isRequired,
        userDisplayName: React.PropTypes.string.isRequired
    }
    getUserPageUrl(userId) {//个人用户主页
        return '/UserPage/' + this.props.userId;
    }
    render() {
        const {accountRole, userId, userDisplayName} = this.props;
        return (
            <div className="user_msg_txt">
                <a href={this.getUserPageUrl()} target="_blank" className="username"  >{userDisplayName}</a>
                {
                    do{
                        if(accountRole == 1) {
                            <span style={{ verticalAlign: 'middle', marginLeft: '1px' }}>
                        <img src={CERTIFICATION_IMG} width="48" height="20" />
                            </span>
                        }else if (accountRole == 2) {
                            <span style={{ verticalAlign: 'middle' }}>
                                <i className="icon v-official"></i>
                            </span>
                        }
                    }
                }
            </div>
        )
    }
}
