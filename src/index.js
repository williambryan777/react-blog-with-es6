import React from 'react';
import ReactDOM from 'react-dom';
// import {BlogBox} from './components'
import BlogBox from './components/Blog/BlogBox.jsx'
import $ from 'jquery'

// window.fetch('/data/blogs.json').then(response=>{
//    return response.json();
// }).then(json=>{
//     let initList = json.list.Items;
//     ReactDOM.render(<BlogBox initBlogs={initList} />, document.getElementById('root'));
// })

$.getJSON('/data/blogs.json',function(response){
    let initList = response.list.Items;
    ReactDOM.render(<BlogBox blogList={initList} />, document.getElementById('root'));
})


