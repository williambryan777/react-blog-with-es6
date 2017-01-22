/**
 * 微博图片列表
 */

import React, { Component } from 'react'
// let ImageZoom = require('react-medium-image-zoom');
export default class ImageList extends Component{
    static propTypes= {
        imgUrlList: React.PropTypes.array,
        longBlogId: React.PropTypes.number.isRequired,
    }

    componentDidMount () {
        renderSlideImg('.imgList');//渲染滑动图片
        $(document).on('click', '.imgList', function () {
            renderSlideImg('.imgList');
        })
    }

    render() {
        const {imgUrlList, longBlogId} = this.props;
        const isShow = imgUrlList && imgUrlList.length > 0 && longBlogId <= 0;
        if (isShow) {
            return (
                <div className="clearfix" >
                    <ul className="line-content-pic mt10 imgList" >
                        {
                            imgUrlList.map((imgUrl, i) => {
                                return (
                                    <li className='fl mr5' key={i}>
                                        <img src={imgUrl} width="80" height="80"/>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            )
        } else {
            return null;
        }
    }
}
