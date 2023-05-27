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
    

    <div>
      <div className='flex h-full items-center justify-center  bg-sky-600'>
              <div>
                    <div><img src={`https://minpro-blog.purwadhikabootcamp.com/${blogData[0].imageURL}`}></img></div>
                    <div className='font-bold' >{blogData[0].title}</div>
                    <div>{blogData[0].content}</div>
                    <div>written by {blogData[0].User.username}</div>
                    <div className="flex flex-wrap gap-2">
                      <Avatar img={profileImg(blogData[0].User.imgProfile)} />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge color="info">
                        {blogData[0].Category.name}
                      </Badge>
                    </div>
              </div>
          </div>
    </div>
  )
}

export default Single