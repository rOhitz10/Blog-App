import { Outlet } from "react-router-dom"
import Sidebar02 from "../common/Sidebar02"

export const DashboardLayout = ()=>{
 return <div className="min-h-screen bg-gray-50 flex">
  <aside className="hidden md:block w-64 sm:w-[80px] shrink-0 border-r bg-white">
 <Sidebar02 />
  </aside>
 <main className="flex-1  ">
  <Outlet />
 </main>
 </div>
}