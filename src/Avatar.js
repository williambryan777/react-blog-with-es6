/**
 *  头像
 */


import React, {Component} from 'react'

class Avatar extends Component {
	static propTypes={
		userId: React.PropTypes.number.isRequired
	};
	render() {
		return (
			<div className='userimgbox'>
				<a href={this.getUserPageUrl()} target="_blank">
					<img src={this.getAvataUrl()} className="imgShadow" alt="" />
				</a>
			</div>

		);
	}
	getAvataUrl() {//获取头像地址
		return 'http://www.followme.com/Avata/' + this.props.userId;
	}
	getUserPageUrl() {//获取主页面
		return 'http://www.followme.com/UserPage/' + this.props.userId;
	}
}

export default Avatar

