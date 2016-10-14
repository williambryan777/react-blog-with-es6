import React from 'react';
import ReactDOM from 'react-dom';
import BlogBox from './BlogBox'
window.fetch('/blogs.json').then(response=>{
   return response.json();
}).then(json=>{
    let initList = json.list.Items;
    ReactDOM.render(<BlogBox initBlogs={initList} />, document.getElementById('root'));
})


