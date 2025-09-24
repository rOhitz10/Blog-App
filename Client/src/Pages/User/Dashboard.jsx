import React from 'react'
import Sidebar01 from '../../Components/common/Sidebar01'
import Sidebar02 from '../../Components/common/Sidebar02'
import { BlogList } from '../../Components/blog/BlogList'


function Dashboard() {
  return (
    <div className='flex justify-around '>
      {/* <Sidebar01 /> */}
      {/* <Sidebar02/> */}
     <BlogList />
    </div>
  )
}

export default Dashboard
