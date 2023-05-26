import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from 'flowbite-react';


import withAuth from '../components/withAuth'

function Profile() {

    const token = localStorage.getItem("token");

    const navigate = useNavigate();
    
    const [userData, setUserData] = useState({});
    const [myBlogData, setMyBlogs] = useState([]);

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


  useEffect(() => {
    axios("https://minpro-blog.purwadhikabootcamp.com/api/blog/pagUser",
    {
      headers:{
          Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => {
      console.log(response.data);
      const blogs1 = response.data;
      console.log(blogs1.result);
      setMyBlogs(blogs1.result);
    })
    .catch((err) => console.log(err))

  }, [])

  if(myBlogData.length === 0) {
    return "loading"
  }

  const handleDelete = (postId, action) => {
    console.log(postId);

    const token = localStorage.getItem("token");

    try{
      axios.patch(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog/remove/${postId}`, 
        {
            headers:{
                Authorization: `Bearer ${token}`,
            },
        }
      );
    }catch(error){
      console.error(error);
      return;
    }

    setTimeout(() => {
      navigate("/profile");
  }, 2000);

  };

  return (
    <div>
        <div className='flex flex-col align-middle justify-center'>Profile
            <img className='w-60' src="https://images.gamebanana.com/img/ss/mods/5c6976de51561.jpg"/>
            <div className='flex flex-nowrap gap-1'><h1>Username:</h1><h1>{userData.username}</h1></div>
            <h1><Link className="hover:bg-sky-600" to="/cusername">change username</Link></h1>
            <div className='flex flex-nowrap gap-1'><h1>e-mail: {userData.email}</h1></div>
            <div className='flex flex-nowrap gap-1'><h1>Phone Number: {userData.phone}</h1></div>
            <div className='flex flex-nowrap gap-1'><h1><Link className="hover:bg-sky-600" to="/cpass">change password</Link></h1></div>
            <br/>
            <h1> My Posts: 
              <div>
          {myBlogData.map((blog) => ( 
          <div className='flex flex-col items-center justify-evenly'>
              <div className='border-solid border-4 border-sky-800 bg-sky-600'>
                  <Link to={`/post/${blog.id}`}>
                    <div >{blog.id}</div>
                    <div ><img className='max-w-xs' alt='image' src={`https://minpro-blog.purwadhikabootcamp.com/${blog.imageURL}`}/></div>
                    <div className='font-bold' >{blog.title}</div>
                    <div>{blog.content}</div>
                    <div>written by {blog.User.username}</div>
                    <div className="flex flex-wrap gap-2">
                      <Badge color="info">
                        {blog.Category.name}
                      </Badge>
                    </div>
                  </Link>
                  </div>
                  <button onClick={() => handleDelete(blog.id)}><i class='bx bxs-trash bx-burst-hover'></i></button>
                </div>
              ))}
              </div>
            </h1>
        </div>
    </div>
  )
}

export default withAuth(Profile)