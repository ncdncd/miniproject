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

  const token = localStorage.getItem("token");

  const [userData, setUserData] = useState({});

  useEffect(() => {
    axios(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/",
        {
            headers:{
                Authorization: `Bearer ${token}`,
            },
        }
    )
    .then((response) => {
      setUserData(response.data)
    })
    .catch((err) => console.log(err))

  }, [])

    function handleLogOut(){
        localStorage.removeItem("token");
    }


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
        {userData.username}
        </span>
        <span className="block truncate text-sm font-medium">
        {userData.email}
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
            <Dropdown
              label="Blog Categories"
              inline={true}
              className='text-white'
            >
              <Dropdown.Item>
                Bisnis
              </Dropdown.Item>
              <Dropdown.Item>
                Ekonomi
              </Dropdown.Item>
              <Dropdown.Item>
              <Link to="/btech">Teknologi</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                Olahraga
              </Dropdown.Item>
              <Dropdown.Item>
                Kuliner
              </Dropdown.Item>
              <Dropdown.Item>
                Internasional
              </Dropdown.Item>
              <Dropdown.Item>
                Fiksi
              </Dropdown.Item>
            </Dropdown>
          </Navbar.Collapse>
          
    </Navbar>
  </div>
  )
}

export default NavibarLogged