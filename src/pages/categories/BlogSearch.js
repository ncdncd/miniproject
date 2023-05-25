import React, { useEffect, useState } from 'react'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Link,
  useNavigate,
  Navigate,
  useSearchParams
} from "react-router-dom";
import { Navbar, Dropdown, Avatar, Button, Badge } from 'flowbite-react';
import axios from 'axios';

function BlogSearch() {

    const [search, setSearch] = useState('');
    
    const [blogData, setBlogs] = useState([]);

  const handleChange = event => {
    setSearch(event.target.value);

    console.log('value is:', event.target.value);
  };

    function handleLogOut(){
        localStorage.removeItem("token");
    }

    const handleSearch = (e) => {
      e.preventDefault();
      console.log(search);

      
  
      try{
        axios(
          `https://minpro-blog.purwadhikabootcamp.com/api/blog?sort=DESC&search=${search}`
        ).then((response) => {
            console.log(response.data);
            const blogs1 = response.data;
            console.log(blogs1.result);
            setBlogs(blogs1.result);
          });
      }catch(error){
        console.error(error);
        return;
      }

    };

  return (
    <div>
        <form onSubmit={handleSearch}>
        <div className="flex items-center">
            <div className="flex space-x-1">
              
                <input
                    type="text"
                    className="block w-full px-1 py-1 text-sky-600 bg-white border rounded-full focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Search for article"
                    onChange={handleChange}
                    value={search}
                />
                <button className="px-2 text-white bg-sky-600 rounded-full ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
                
            </div>
        </div>
    </form>
    <div>
    {blogData.map((blog) => ( 
          <div className='flex flex-col items-center justify-evenly'>
              <div className='border-solid border-4 border-sky-800 bg-sky-600'>
                  <Link to={`/post/${blog.id}`}>
                    <div >{blog.id}</div>
                    <div ><img className='max-w-xs' alt='image' src="https://i.kym-cdn.com/photos/images/original/002/529/450/362.jpg"/></div>
                    <div className='font-bold' >{blog.title}</div>
                    <div>{blog.content}</div>
                    <div className="flex flex-wrap gap-2">
                      <Badge color="info">
                        {blog.Category.name}
                      </Badge>
                    </div>
                  </Link>
              </div>
          </div>
      ))}
    </div>
  </div>
  )
}

export default BlogSearch