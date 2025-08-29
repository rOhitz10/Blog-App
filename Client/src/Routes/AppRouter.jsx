import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ROUTES } from '../Config/routesConfig'
import Home  from '../Pages/Home'
import Login from '../Pages/Auth/Login'
import Register from '../Pages/Auth/Register'


function AppRouter() {
return(
 <Routes>
  <Route path={ROUTES.HOME} element={<Home />} />
  <Route index element={<Home />} />

  <Route path={ROUTES.LOGIN} element={<Login/>}/>
  <Route path={ROUTES.REGISTER} element={<Register/>}/>
 </Routes>
)
}

export default AppRouter
