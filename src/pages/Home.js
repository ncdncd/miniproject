import React from 'react'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Link
} from "react-router-dom";
import { useEffect, useState } from "react"
import axios from 'axios';



const Home = () => {

  const [blogData, setBlogs] = useState([]);

  const url = "https://minpro-blog.purwadhikabootcamp.com/api/blog?id_cat=3&sort=ASC&page=1";

  useEffect(() => {
    axios(url)
    .then((response) => {
      console.log(response.data);
      const blogs1 = response.data;
      console.log(blogs1.result);
      setBlogs(blogs1.result);
    })
    .catch((err) => console.log(err))

  }, [])


  return (
    <div>
      <div>
      {blogData.map((blog) => ( 
          <div className='flex flex-col items-center justify-evenly'>
              <div className='border-solid border-4 border-sky-800 bg-sky-600'>
                  <Link to="/post/:${}">
                    <div >{blog.id}</div>
                    <div ><img alt='image' src="https://i.kym-cdn.com/photos/images/original/002/529/450/362.jpg"/></div>
                    <div className='font-bold' >{blog.title}</div>
                    <div>{blog.content}</div>
                  </Link>
              </div>
          </div>
      ))}
      </div>
    </div>
  )
}

export default Home