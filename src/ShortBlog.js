/**
 * 短微博
 */
import  React,{Component} from 'react';
class  ShortBlog extends Component{
    static propTypes={
        isTop: React.PropTypes.bool,
        blogBody: React.PropTypes.string.isRequired
    };
    render() {
        const {isTop,blogBody}=this.props;
        let classZD = isTop ? 'webo_zd819' : '';
        let cssClass = `weibo_content ${classZD}`;
        return (
            <div className={cssClass}   dangerouslySetInnerHTML={{ __html: blogBody }} >
            </div>
        );
    }
}

export default ShortBlog