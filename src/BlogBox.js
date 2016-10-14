import React, { Component } from 'react';
import Avatar from './Avatar';
import ShortBlog from "./ShortBlog";
import UserDetail from './UserDetail';
import ImageList from './ImageList';
import Attention from './Attention';
import Blog from './Blog';

class BlogBox extends Component {
    static propTypes = {
        initBlogs: React.PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            blogList: this.props.initBlogs,
            page: 1,
            hasMore: true,
            loadingMore: false
        }
    }

    render() {
        var microBlogs = this.state.blogList.map((item,i) => {
           return(
               <li className='weibo_block clearfix' key={i}>
                   <div className='left_box'>
                       <Avatar  userId={item.MicroBlog.UserId} />
                       <Attention  userId={item.MicroBlog.UserId} isAttention={item.IsAttention} isOwnerBlog={item.IsOwnerBlog} />
                   </div>
                   <div className='right_box'>
                       <UserDetail userId={item.MicroBlog.UserId} accountRole={item.AccountRole} userDisplayName={item.MicroBlog.UserDisplayName} />
                       <Blog  blog={item}  />
                   </div>
               </li>
           );
        })
        return (
            <div className="weibo_wrap weibo_detail_wrap">
                <ul className='weibo_detail_list'>
                    {microBlogs}
                </ul>
            </div>
        )
    }
}

export default BlogBox;




