import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ROUTES } from '../Config/routesConfig'
import Home  from '../Pages/Home'
import Login from '../Pages/Auth/Login'
import Register from '../Pages/Auth/Register'
import Dashboard from '../Pages/User/Dashboard'
import { CreateBlog } from '../Pages/Blog/CreateBlog'
import { Profile } from '../Pages/User/Profile'
import MainLayout from '../Components/layout/MainLayout'
import { BlogList } from '../Components/blog/BlogList'
import { PublicRoutes } from './PublicRoutes'
import { PrivateRoutes } from './PrivateRoutes'
import { DashboardLayout } from '../Components/layout/DashboardLayout'
import MyBlogs from '../Pages/Blog/MyBlogs'
import { BlogDetail } from '../Pages/Blog/BlogDetail'


function AppRouter() {
return(
 <Routes>
  {/* Public Routes  */}
  <Route path={ROUTES.HOME} element={<MainLayout />}>
  <Route index element={<Home />} />
  <Route path={ROUTES.BLOGS} element={<BlogList />} />
  <Route path={ROUTES.BLOG_DETAIL} element={<BlogDetail />} />
  
  <Route path={ROUTES.LOGIN} element={
    <PublicRoutes hideIfAuthenticated={true}>
    <Login/>
    </PublicRoutes>
    }/>
  <Route path={ROUTES.REGISTER} element={
    <PublicRoutes hideIfAuthenticated={true}>
    <Register/>
    </PublicRoutes>
    }/>
    </Route>

{/* Protected routes  */}
  <Route path={ROUTES.DASHBOARD} element={
    <PrivateRoutes>
    <DashboardLayout/>
    </PrivateRoutes>
    } >
    <Route index element={<Dashboard />} />
    <Route path={ROUTES.CREATE_BLOG} element={<CreateBlog/>} />
    <Route path={ROUTES.PROFILE} element={<Profile/>} />
    <Route path={ROUTES.MY_BLOGS} element={<MyBlogs />} />
    </Route>

 </Routes>
)
}

export default AppRouter
