/**
 *  头像
 */
import React, { Component } from 'react'
import { API_ROOT } from './config'
export default class Avatar extends Component {
	static propTypes = {
		userId: React.PropTypes.number.isRequired
	};
	getAvataUrl() {
		return API_ROOT + '/Avata/' + this.props.userId;
	}
	getUserPageUrl() {
		return API_ROOT + '/UserPage/' + this.props.userId;
	}
	render() {
		return (
			<div className='userimgbox'>
				<a href={this.getUserPageUrl()} target="_blank">
					<img src={this.getAvataUrl()} className="imgShadow" alt="" />
				</a>
			</div>

		);
	}

};


