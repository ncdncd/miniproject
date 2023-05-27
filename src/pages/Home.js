import React from 'react'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Link,
  useNavigate
} from "react-router-dom";
import { useEffect, useState } from "react"
import axios from 'axios';
import { Carousel, Badge, Dropdown, Navbar, Pagination, Avatar} from 'flowbite-react';
import { Formik,Form, Field } from 'formik';
import 'boxicons';



const Home = () => {
  const navigate = useNavigate();
  const [blogData, setBlogs] = useState([]);
  const [likes, setLikes] = useState("");
  const [favData, setFavData] = useState([]);
  const [allBlogData, setAllBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {

    axios(`https://minpro-blog.purwadhikabootcamp.com/api/blog/?sort=DESC`)
    .then((response) => {
      const blogs1 = response.data;
      setTotalPages(blogs1.page);
      setBlogs(blogs1.result);
    })
    .catch((err) => console.log(err))

  }, [])

  const fetchData = (page) => {
  
    try{
      axios(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog?sort=DESC&page=${page}`
      ).then((response) => {
          const blogs1 = response.data;
          setCurrentPage(page);
          setBlogs(blogs1.result);
        });
    }catch(error){
      console.error(error);
      return;
    }

  };

    const handleClick = (goblogId) => {
      const token = localStorage.getItem("token")

      if(token === null){
          navigate("/login");
      }else{
        axios.post(
          "https://minpro-blog.purwadhikabootcamp.com/api/blog/like",
          {BlogId: goblogId},
          {
            headers: {Authorization: `Bearer ${token}`},
          },

        ).then((response) => {
            setLikes(response);
          });
      }

    }

    const handleSearch = (values) => {
  

      try{
        axios(
          `https://minpro-blog.purwadhikabootcamp.com/api/blog?id_cat=${values.cat}&sort=${values.sort}&search=${values.search}`
        ).then((response) => {
            const blogs1 = response.data;
            setBlogs(blogs1.result);
          });
      }catch(error){
        console.error(error);
        return;
      }

    };

    const initialValues = {
      search:'',
      sort: '',
      cat:'',
    }

  

  useEffect(() => {
    axios("https://minpro-blog.purwadhikabootcamp.com/api/blog/pagFav")
    .then((response) => {
      const blogs1 = response.data;
      let array = blogs1.result
      setFavData(array);
    })
    .catch((err) => console.log(err))

  }, [likes])

  if(blogData.length === 0) {
    return "no blogs found"
  }

  const profileImg = (imgsrc) => {
    if(imgsrc === null){
      return 'https://images.gamebanana.com/img/ss/mods/5c6976de51561.jpg'
    }else{
      return `https://minpro-blog.purwadhikabootcamp.com/${imgsrc}`
    }
  }
  
  const onPageChange = (page) => {
    if (page != currentPage) {
        fetchData(page)
    }
};

  return (
    <div>
      <div>
      <Navbar
    class='bg-gray-800'
    fluid={true}
    rounded={true}
    ><Formik
    initialValues={initialValues}
    onSubmit={handleSearch}
    className=''
    >
      {(props) => (
      <Form>
        <div className="flex items-center">
            <div className="flex space-x-1">
              
                <input
                    type="text"
                    name="search"
                    className="block w-full px-1 py-1 text-sky-600 bg-white border rounded-full focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Search for article"
                    onChange={props.handleChange}
                    defaultValue={props.values.search}
                />
                <select className='rounded-full' name="sort" value={props.values.sort} onChange={props.handleChange}> 
                  <option name="ASC" >ASC</option>
                  <option name="DESC">DESC</option>
                </select>
                <select className='rounded-full' name="cat" value={props.values.cat} onChange={props.handleChange}> 
                  <option name="bisnis" >1</option>
                  <option name="ekonomi">2</option>
                  <option name="teknologi" >3</option>
                  <option name="olahraga">4</option>
                  <option name="kuliner" >5</option>
                  <option name="internasional">6</option>
                  <option name="fiksi">7</option>
                  <option name="semua"></option>
                </select>
                
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
    </Form>
      )}
    </Formik>
    </Navbar>
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
          <Carousel>
          {blogData.map((blog) => ( 
          <div className='flex h-full items-center justify-center  bg-sky-600 dark:bg-gray-700 dark:text-white'>
              <div>
                  <Link to={`/post/${blog.id}`} className='flex'>
                    <div ><img className='max-w-xs' alt='image' src={`https://minpro-blog.purwadhikabootcamp.com/${blog.imageURL}`}/></div>
                    <div className='font-bold' >{blog.title}</div>
                    <div className="flex flex-wrap gap-2">
                      <Badge color="info">
                        {blog.Category.name}
                      </Badge>
                    </div>
                  </Link>
              </div>
          </div>
      ))}
          </Carousel>
      </div>
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
                    <div className="flex flex-wrap gap-2">
                      <Badge color="info">
                        {blog.Category.name}
                      </Badge>
                    </div>
                  </Link>
                  </div>
                  <button onClick={() => handleClick(blog.id)}><i className='bx bx-tada-hover bxs-heart'></i></button>
            
        </div>
      ))}
        <Pagination
          currentPage={currentPage}
          onPageChange={onPageChange}
          showIcons={true}
          totalPages={totalPages}
          className=""  
        />
      </div>
      
    </div>
  )
}

export default Home