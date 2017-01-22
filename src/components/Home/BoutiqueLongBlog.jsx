import React, { Component} from 'react';
import BoutiqueItem from './BoutiqueItem'
/**精品长微博 */
export default class BoutiqueLongBlog extends Component {
    static propTypes={
        attentionList : React.PropTypes.array.isRequired
    }

    
    constructor(props) {
        super(props);
    }

    render () {
        let contentItems=this.props.attentionList.map(
            item=>{
             return (
                  <BoutiqueItem  item={item} />
             )
        });
        return (
           <div className="micro_blog left">
                <div className="ht_title">
                    <span>精品长微博</span>
                    <a href="/social" target="_blank">更多<i>>></i></a>
                </div>
                <div className='mb_box'>
                    {contentItems}
                </div>
            </div>
        )
    }
}


