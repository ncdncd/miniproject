import React from 'react'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Link,
  useNavigate,
  Navigate
} from "react-router-dom";
import { Navbar, Dropdown, Avatar, Button } from 'flowbite-react';

const NavibarLogged = () => {

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
          <Navbar.Collapse>
            <Navbar.Link href="/" class="text-gray-100">
              Home
            </Navbar.Link>
            <Navbar.Link href="/write" class="text-gray-100">
              Write
            </Navbar.Link>
            <Navbar.Link href="/register" class="text-gray-100">
              Register
            </Navbar.Link>
          </Navbar.Collapse>
    </Navbar>
  </div>
  )
}

export default NavibarLogged