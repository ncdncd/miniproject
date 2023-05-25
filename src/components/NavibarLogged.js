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
import { Navbar, Dropdown, Avatar, Button } from 'flowbite-react';
import axios from 'axios';

const NavibarLogged = () => {

  const [search, setSearch] = useState('');

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
        );
      }catch(error){
        console.error(error);
        return;
      }
  
      // navigate("/verify")
    };

  return (
  <div className=''>
    <Navbar
    class='bg-gray-800'
    fluid={true}
    rounded={true}
    >
    <Navbar.Brand>
      <Link to="/"><h1 className='text-xl font-serif text-gray-100'>"The" Blog</h1></Link>
    </Navbar.Brand>
    <div className="flex md:order-2">
    <Dropdown
      arrowIcon={false}
      inline={true}
      label={<Avatar alt="User settings" img="https://images.gamebanana.com/img/ss/mods/5c6976de51561.jpg" rounded={true}/>}
    >
      <Dropdown.Header>
        <span className="block text-sm">
          Bonnie Green
        </span>
        <span className="block truncate text-sm font-medium">
          name@flowbite.com
        </span>
      </Dropdown.Header>
      <Dropdown.Item>
        <Link to="/profile">Profile</Link>
      </Dropdown.Item>
      <Dropdown.Item>
        Settings
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item >
        <a href="/" onClick={handleLogOut}>Sign Out</a>
      </Dropdown.Item>
    </Dropdown>
        <Navbar.Toggle />
        </div>
          <Navbar.Collapse className='text-gray-100'>
            <Navbar.Link href="/" class='text-gray-100'>
              Home
            </Navbar.Link>
            <Navbar.Link href="/write" class='text-gray-100'>
              Write
            </Navbar.Link>
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
          </Navbar.Collapse>
    </Navbar>
  </div>
  )
}

export default NavibarLogged