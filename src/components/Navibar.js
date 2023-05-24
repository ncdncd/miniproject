import React from 'react'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Link
} from "react-router-dom";
import { Navbar } from 'flowbite-react';

const Navibar = () => {
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
      <div className="flex md:order-2 bg-sky-600">
        <Link to="/login">
          <button className='p-2 text-gray-100'>
            Login
          </button>
        </Link>
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

export default Navibar