import React, {Component} from 'react'
import {BlogBox} from './components'
import $ from 'jquery'
class App extends Component {
    constructor(props){
        super(props);
        this.state={
            blogList:[]
        }
    }
    componentDidMount() {
        let postUrl = '/Social/Home/GetHotMicroBlogs';
        let queryParams = {
            rcount: 0,
            startId: 0,
            pageIndex: 1,
            time: 24,
            pageSize: 15
        }
        $.post(postUrl, queryParams, (response) => {
            let listItems = response.list.Items;
            this.setState({
                blogList: listItems
            })
        })
    }
    
    render () {
        return (
            <div>
                <BlogBox blogList={this.state.blogList} />
            </div>
        )
    }
}

export default App 