import React from 'react'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Link
} from "react-router-dom";
import { useEffect, useState } from "react"
import axios from 'axios';
import { Carousel } from 'flowbite-react';



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
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
          <Carousel>
            <img
              src="https://m.media-amazon.com/images/M/MV5BMzVlMDBhNTMtMzM1My00NDU3LWI3YjQtY2U5ZDgxY2MzZDAyXkEyXkFqcGdeQXVyNjMxNzQ2NTQ@._V1_.jpg"
              alt="..."
            />
            <img
              src="https://m.media-amazon.com/images/M/MV5BMzVlMDBhNTMtMzM1My00NDU3LWI3YjQtY2U5ZDgxY2MzZDAyXkEyXkFqcGdeQXVyNjMxNzQ2NTQ@._V1_.jpg"
              alt="..."
            />
            <img
              src="https://m.media-amazon.com/images/M/MV5BMzVlMDBhNTMtMzM1My00NDU3LWI3YjQtY2U5ZDgxY2MzZDAyXkEyXkFqcGdeQXVyNjMxNzQ2NTQ@._V1_.jpg"
              alt="..."
            />
            <img
              src="https://m.media-amazon.com/images/M/MV5BMzVlMDBhNTMtMzM1My00NDU3LWI3YjQtY2U5ZDgxY2MzZDAyXkEyXkFqcGdeQXVyNjMxNzQ2NTQ@._V1_.jpg"
              alt="..."
            />
            <img
              src="https://m.media-amazon.com/images/M/MV5BMzVlMDBhNTMtMzM1My00NDU3LWI3YjQtY2U5ZDgxY2MzZDAyXkEyXkFqcGdeQXVyNjMxNzQ2NTQ@._V1_.jpg"
              alt="..."
            />
          </Carousel>
      </div>
      {blogData.map((blog) => ( 
          <div className='flex flex-col items-center justify-evenly'>
              <div className='border-solid border-4 border-sky-800 bg-sky-600'>
                  <Link to={`/post/${blog.id}`}>
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