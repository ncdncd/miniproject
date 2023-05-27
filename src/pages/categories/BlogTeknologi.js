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

function BlogTeknologi() {
    const [blogData, setBlogs] = useState([]);

    const url = "https://minpro-blog.purwadhikabootcamp.com/api/blog?id_cat=3&sort=DESC";
  
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
        <div>
        {blogData.map((blog) => ( 
            <div className='flex flex-col items-center justify-evenly'>
            <div className='border-solid border-4 border-sky-800 bg-sky-600'>
                <Link to={`/post/${blog.id}`}>
                  <div >{blog.id}</div>
                  <div ><img className='max-w-xs' alt='image' src={`https://minpro-blog.purwadhikabootcamp.com/${blog.imageURL}`}/></div>
                  <div className='font-bold' >{blog.title}</div>
                  <div>{blog.content}</div>
                  <div>written by {blog.User.username}</div>
                  <div className="flex flex-wrap gap-2">
                    <Avatar img={profileImg(blog.User.imgProfile)} />
                  </div>
                  <div>date posted: {blog.createdAt.slice(0,10)}</div>
                  <div>time posted: {blog.createdAt.slice(11,16)}</div>
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

export default BlogTeknologi