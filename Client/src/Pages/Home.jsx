import React from 'react';
import { Button } from '../Components/common/button';
import '../Styles/Home.css'
import { Link } from 'react-router-dom';

const Home = () => {
  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with React",
      excerpt: "Learn the fundamentals of React and how to build your first component.",
      author: "Jane Smith",
      date: "May 15, 2023",
      category: "Web Development"
    },
    {
      id: 2,
      title: "CSS Grid vs Flexbox",
      excerpt: "Understanding when to use CSS Grid and when to use Flexbox for layouts.",
      author: "John Doe",
      date: "April 28, 2023",
      category: "CSS"
    },
    {
      id: 3,
      title: "JavaScript ES6 Features",
      excerpt: "Explore the new features introduced in ES6 that make JavaScript more powerful.",
      author: "Sarah Johnson",
      date: "April 10, 2023",
      category: "JavaScript"
    },
    {
      id: 4,
      title: "Building Responsive Layouts",
      excerpt: "Best practices for creating websites that look great on all devices.",
      author: "Mike Chen",
      date: "March 22, 2023",
      category: "Web Design"
    }
  ];


  return (
    <div className="container">
      <div className='left-container'> LEFT container </div>
      <div className='right-container'>
        <div>
          <h1>Happy Blogs</h1>
        </div>
        <div >
          <h2>Join now.</h2>
          <div className='btn'>
            <Button variant='primary' children='Sign Up with Google' className='bg-white text-black hover:bg-blue-300 hover:border-blue-400'/>
            <Button variant='secondary' children='Sign Up with Apple'/>
            <p className='or-divider'>or</p>
            <Link to='/register' className='btn' >
            <Button className='bg-black text-white' variant='primary' children='Create Account' />
            </Link>
          </div>
          <h3>By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.</h3>
          <h3 className='font-extrabold'>
          Already have an account?
          </h3>
      
            <Link to='/login' className='btn'>
          <Button variant='secondary' children="Sign In" />
            </Link>
      
        </div>
        
        
      </div>

      </div>
  );
};

export default Home;


