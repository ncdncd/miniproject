import React from 'react'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Link,
  useSearchParams
} from "react-router-dom";
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Badge, Avatar } from 'flowbite-react';

function Single() {
  
  const getLastItem = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)

  const currurl = getLastItem(window.location.href)

  console.log(currurl)

  const [blogData, setBlogs] = useState([]);

  useEffect(() => {
    axios(`https://minpro-blog.purwadhikabootcamp.com/api/blog/${currurl}`)
    .then((response) => {
      console.log(response.data);
      setBlogs(response.data);
    })
    .catch((err) => console.log(err))

  }, [])

  console.log(blogData);

  if(blogData.length === 0) {
    return "blog not found"
  }

  const profileImg = (imgsrc) => {
    if(imgsrc === null){
      return 'https://images.gamebanana.com/img/ss/mods/5c6976de51561.jpg'
    }else{
      return `https://minpro-blog.purwadhikabootcamp.com/${imgsrc}`
    }
  }
 
  return (
    

            <div className='bg-white p-4 shadow-sm rounded-sm'>
                  <Link to={`/post/${blogData[0].id}`} className='overflow-hidden block'>
                    <div >{blogData[0].id}</div> 
                      <img className='w-full h-96 object-cover rounded transform hover:scale-110 transition duration-500' alt='image' 
                      src={`https://minpro-blog.purwadhikabootcamp.com/${blogData[0].imageURL}`}/>
                    </Link>
                    <div className='p-4'>
                      <Link to={`/post/${blogData[0].id}`}>
                      <h2 className='text-2xl font-semibold text-gray-700 hover:text-blue-500 transition'>
                        {blogData[0].title}
                      </h2>
                      </Link>
                      <p className='text-gray-500 text-sm mt-2'>
                        {blogData[0].content}
                      </p>
                    </div>
                    <div className='flex mt-3 space-x-5'>
                    <div className='mr-2 text-xs'>written by {blogData[0].User.username}</div>
                    <div className="">
                      <Avatar img={profileImg(blogData[0].User.imgProfile)} />
                    </div>
                    <div className='mr-2 text-xs'>date posted: {blogData[0].createdAt.slice(0,10)}</div>
                    <div className='mr-2 text-xs'>time posted: {blogData[0].createdAt.slice(11,16)}</div>
                    <div className="">
                      <Badge color="info">
                        {blogData[0].Category.name}
                      </Badge>
                    </div>
                    </div>
                  
                  </div>
  )
}

export default Single