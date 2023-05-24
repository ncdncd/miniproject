import React from 'react'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Link,
  useNavigate
} from "react-router-dom";
import { Navbar, Dropdown, Avatar } from 'flowbite-react';

const NavibarLogged = () => {

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
      label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded={true}/>}
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
        Dashboard
      </Dropdown.Item>
      <Dropdown.Item>
        Settings
      </Dropdown.Item>
      <Dropdown.Item>
        Earnings
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item >
        Sign out
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