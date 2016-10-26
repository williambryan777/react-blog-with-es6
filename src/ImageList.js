
import React, { Component } from 'react'
import ImageZoom from 'react-medium-image-zoom'
class ImageList extends Component {
    static propTypes = {
        imgUrlList: React.PropTypes.array,
        longBlogId: React.PropTypes.number.isRequired,
    };
    constructor(props) {
        super(props);
    }
    
    render() {

        const {imgUrlList,longBlogId}=this.props;
        const isShow = imgUrlList && imgUrlList.length > 0 && longBlogId <= 0;
        if(isShow){
            return (
                <div className="clearfix" >
                    <ul className="line-content-pic mt10 imgList">
                        {
                            imgUrlList.map((imgUrl, i) => {
                               return (
                                   <li className='f1 mr5' key={i}>
                                      <ImageZoom
                                          image={{
                                              src: imgUrl,
                                              className: 'img',
                                              style: { width:'80px',height:'80px' }
                                          }}
                                          zoomImage={{
                                               src: imgUrl.replace('w=80&h=80&centerCut=1', 'w=650&h=400&centerCut=0')
                                          }}
                                          />
                                   </li>
                               )
                            })
                        }
                    </ul>
                </div>
            )
        }else{
            return null;
        }
       
    }

}

export default ImageList

