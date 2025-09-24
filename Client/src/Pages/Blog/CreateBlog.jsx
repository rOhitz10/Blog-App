import React from 'react'
import Sidebar02 from '../../Components/common/Sidebar02'
import { BlogForm } from '../../Components/blog/BlogForm'

export const CreateBlog = ()=>{
  return (
    <div className='flex justify-around '>
      <BlogForm />
    </div>
  )
}