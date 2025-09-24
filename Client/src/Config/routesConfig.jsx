export const ROUTES = {
 //public routes
 HOME:'/',
 BLOGS:'/blogs',
 BLOG_DETAIL: '/blogs/:id',
 LOGIN: '/login',
 REGISTER: '/register',

 //private routes
  DASHBOARD: '/dashboard',
  CREATE_BLOG: 'blogs/create',
  PROFILE: '/dashboard/:id',
  MY_BLOGS:'my-blogs'

  // Error routes
  // NOT_FOUND: '/404',
  // SERVER_ERROR: '/500',
  // FORBIDDEN: '/403'

}

const ROUTE_ROLE = Object.freeze({
 PUBLIC: 'public',
 USER: 'user',
 ADMIN: 'admin'
})

const  routesConfig = {
[ROUTES.HOME]:{
   title: 'Home - My Blog App',
    description: 'Welcome to our blog platform',
    role: ROUTE_ROLE.PUBLIC
}
}

export default routesConfig
