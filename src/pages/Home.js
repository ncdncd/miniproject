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
import { Formik, Form, Field } from 'formik';
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
        
      <div className='py-12 bg-gray-100 min-h-screen'>
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
          <Carousel>
          {blogData.map((blog) => ( 
          <div className='relative h-full w-full'>
              <div>
                  <Link to={`/post/${blog.id}`}>
                    <div ><img className='h-full w-full object-cover' alt='image' src={`https://minpro-blog.purwadhikabootcamp.com/${blog.imageURL}`}/></div>
                      <div className='absolute inset-0 grid h-full w-full place-items-center bg-black/25' >
                        <div className="w-3/4 text-center md:w-2/4">
                          <h1 className='mb-4 text-3xl md:text-4xl lg:text-5xl text-white '>{blog.title}</h1>
                        <div className="">
                          <Badge color="info">
                            {blog.Category.name}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Link>
              </div>
          </div>
      ))}
          </Carousel>
        </div>
        <div className='container mx-auto px-4 flex'>
            <div className='w-3/12'>
              <div className='bg-white shadow-sm rounded-sm p-4'>
                <h3 className='text-xl font-semibold text-gray-700 mb-3'>Categories</h3>
                <div className='text-gray-700 space-y-2'>
                  <Link to="/bisnis" className='flex items-center font-semibold leading-4 uppercase text-sm hover:text-blue-500 transition'>
                      <span>Bisnis</span>
                  </Link>
                  <Link to="/bekonomi" className='flex items-center font-semibold leading-4 uppercase text-sm hover:text-blue-500 transition'>
                      <span>Ekonomi</span>
                  </Link>
                  <Link to="/btekno" className='flex items-center font-semibold leading-4 uppercase text-sm hover:text-blue-500 transition'>
                      <span>Teknologi</span>
                  </Link>
                  <Link to="/bolahraga" className='flex items-center font-semibold leading-4 uppercase text-sm hover:text-blue-500 transition'>
                      <span>Olahraga</span>
                  </Link>
                  <Link to="/bkuli" className='flex items-center font-semibold leading-4 uppercase text-sm hover:text-blue-500 transition'>
                      <span>Kuliner</span>
                  </Link>
                  <Link to="/binter" className='flex items-center font-semibold leading-4 uppercase text-sm hover:text-blue-500 transition'>
                      <span>Internasional</span>
                  </Link>
                  <Link to="/bfiksi" className='flex items-center font-semibold leading-4 uppercase text-sm hover:text-blue-500 transition'>
                      <span>Fiksi</span>
                  </Link>
                </div>
              </div>

            </div>
        

        <div className='w-6/12 mx-6'>
          <div className='bg-white shadow-sm rounded-sm'>
                <Link to={`/post/${blogData[0].id}`} className='overflow-hidden block'>
                      <img className='w-full h-96 object-cover rounded transform hover:scale-110 transition' alt='image' 
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
                  <div className='flex mt-3'>
                    <div className='flex items-center text-gray-400 text-sm'>
                    {blogData[0].User.username}
                    </div>

                  </div>
                </div>

          </div>
          
          </div>
        </div>

      </div>
      <div className='grid grid-cols-2 mt-4'>
      {blogData.map((blog) => ( 
          
              <div className='bg-white p-4 shadow-sm rounded-sm'>
                  <Link to={`/post/${blog.id}`} className='overflow-hidden block'>
                    <div >{blog.id}</div> 
                      <img className='w-full h-60 object-cover rounded transform hover:scale-110 transition duration-500' alt='image' 
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