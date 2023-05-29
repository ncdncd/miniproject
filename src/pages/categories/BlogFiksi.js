import React from 'react'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Link
} from "react-router-dom";
import { useEffect, useState } from "react"
import axios from 'axios';
import { Carousel, Badge, Avatar } from 'flowbite-react';

function BlogFiksi() {
    const [blogData, setBlogs] = useState([]);

    const url = "https://minpro-blog.purwadhikabootcamp.com/api/blog?id_cat=7&sort=DESC";
  
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
  
    const profileImg = (imgsrc) => {
      if(imgsrc === null){
        return 'https://images.gamebanana.com/img/ss/mods/5c6976de51561.jpg'
      }else{
        return `https://minpro-blog.purwadhikabootcamp.com/${imgsrc}`
      }
    }
  
    return (
      <div>
        <div className='flex flex-col mt-4'>
      {blogData.map((blog) => ( 
          
              <div className='bg-white p-4 shadow-sm rounded-sm'>
                  <Link to={`/post/${blog.id}`} className='overflow-hidden block'>
                    <div >{blog.id}</div> 
                      <img className='w-full h-96 object-cover rounded transform hover:scale-110 transition duration-500' alt='image' 
                      src={`https://minpro-blog.purwadhikabootcamp.com/${blog.imageURL}`}/>
                    </Link>
                    <div className='p-4'>
                      <Link to={`/post/${blog.id}`}>
                      <h2 className='text-2xl font-semibold text-gray-700 hover:text-blue-500 transition'>
                        {blog.title}
                      </h2>
                      </Link>
                      <p className='text-gray-500 text-sm mt-2'>
                        {blog.content}
                      </p>
                    </div>
                    <div className='flex mt-3 space-x-5'>
                    <div className='mr-2 text-xs'>written by {blog.User.username}</div>
                    <div className="">
                      <Avatar img={profileImg(blog.User.imgProfile)} />
                    </div>
                    <div className='mr-2 text-xs'>date posted: {blog.createdAt.slice(0,10)}</div>
                    <div className='mr-2 text-xs'>time posted: {blog.createdAt.slice(11,16)}</div>
                    <div className="">
                      <Badge color="info">
                        {blog.Category.name}
                      </Badge>
                      <button onClick={() => handleClick(blog.id)}><i className='bx bx-tada-hover bxs-heart'></i></button>
                    </div>
                    </div>
                  
                  </div>

      ))}
      </div>
      </div>
  )
}

export default BlogFiksi