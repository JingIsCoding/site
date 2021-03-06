import React from 'react';
import { Router, Route, browserHistory,IndexRoute, Redirect } from 'react-router'
import { ReduxRouter } from 'redux-router'
import Main from './container/main.jsx'
import App from './container/app.jsx'
import Home from './container/home.jsx'
import Blogs from './container/blogs.jsx'
import About from './container/about.jsx'
import Blog from './components/blog.jsx'

import Admin from './container/admin/admin.jsx'
import Login from './container/admin/login.jsx'
import DashBoard from './container/admin/dashboard.jsx'
import AdminBlogs from './container/admin/blogs.jsx'
import EditBlog from './container/admin/editBlog.jsx'
import Statics from './container/admin/statics.jsx'


function requireAuth(location, replaceWith){
    if(!localStorage.token){
        replaceWith("/admin/login")
    }
}

export default function(history,store){

   return (<Router history={history}>
            <Route path="/" component={App}>
              <IndexRoute component={Blogs} />
              <Route path="/blogs" component={Blogs} />
              <Route path="/about" component={About} />
              <Route path="/blog/:blogId" component={Blog} />
            </Route>

             <Route path="/admin"  component={ DashBoard }>
                <Route path="/admin/blogs" component={ AdminBlogs } />
                <Route path="/admin/create" component={ EditBlog } />
                <Route path="/admin/edit/:blogId" component={ EditBlog } />
                <Route path="/admin/statics" component={ Statics } />
             </Route>

             <Route path="/admin/login" component={Login} />

             <Redirect from="*" to="/" />

          </Router>
          )
}