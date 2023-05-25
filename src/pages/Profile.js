import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

import withAuth from '../components/withAuth'

function Profile() {

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

  return (
    <div>
        <div className='flex flex-col align-middle justify-center'>Profile
            <img className='w-60' src="https://images.gamebanana.com/img/ss/mods/5c6976de51561.jpg"/>
            <div className='flex flex-nowrap gap-1'><h1>Username:</h1><h1>{userData.username}</h1></div>
            <div className='flex flex-nowrap gap-1'><h1>e-mail: {userData.email}</h1></div>
            <div className='flex flex-nowrap gap-1'><h1>Phone Number: {userData.phone}</h1></div>
            <div className='flex flex-nowrap gap-1'><h1><Link className="hover:bg-sky-600" to="/cpass">change password</Link></h1></div>
        </div>
    </div>
  )
}

export default withAuth(Profile)