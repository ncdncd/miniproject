import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { Badge, Modal, Button, Label, TextInput, Checkbox, Avatar } from 'flowbite-react';


import withAuth from '../components/withAuth'

function Profile() {

    const token = localStorage.getItem("token");

    const navigate = useNavigate();
    
    const [userData, setUserData] = useState({});
    const [myBlogData, setMyBlogs] = useState([]);
    const [favBlog, setMyFavBlogs] = useState([]);
    const [currentBlog, setCurrentBlog] = useState("")
    const [modalOpen, setModalOpen] = useState(false);


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

  useEffect(() => {
    axios("https://minpro-blog.purwadhikabootcamp.com/api/blog/pagLike",
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
      setMyFavBlogs(blogs1.result);
    })
    .catch((err) => console.log(err))

  }, [])

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

  const handleToggleModal = () => {
    setModalOpen(!modalOpen);
  };


  const handleCloseModal = () => {
    setModalOpen(false);
  };


  const profileImg = (imgsrc) => {
    if(imgsrc === null){
      return 'https://images.gamebanana.com/img/ss/mods/5c6976de51561.jpg'
    }else{
      return `https://minpro-blog.purwadhikabootcamp.com/${imgsrc}`
    }
  }

  return (
    <div>
        <div className=''>
            <img className='w-60 m-6' src={profileImg(userData.imgProfile)}/>
          <div>
            <Link to="/changepp" className=''><i class='bx bxs-camera'></i></Link>
          </div>
          <div className=''>
            <div className=''><h1>Username:</h1><h1>{userData.username}</h1></div>
            <h1 className=''><Link className="hover:bg-sky-600" to="/cusername">change username</Link></h1>
            <div className=''><h1>e-mail: {userData.email}</h1></div>
            <h1><Link className="hover:bg-sky-600" to="/cemail">change email</Link></h1>
            <div className=''><h1>Phone Number: {userData.phone}</h1></div>
            <h1><Link className="hover:bg-sky-600" to="/cphone">change phone number</Link></h1>
            <div className=''><h1><Link className="hover:bg-sky-600" to="/cpass">change password</Link></h1></div>
            <div className=''><h1><Link className="hover:bg-sky-600" to="/resetpass">reset password</Link></h1></div>
            <br/>
        </div>
            {/* <Button onClick={handleToggleModal}>
              Toggle modal
            </Button> */}

            <h1> My Posts: 
            <div className='grid grid-cols-2 mt-4'>
      {myBlogData.map((blog) => ( 
          
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
                      <button onClick={() => { if (window.confirm('Are you sure you wish to delete this post?')) handleDelete(blog.id) }}><i class='bx bxs-trash bx-burst-hover'></i></button>
                    </div>
                    </div>
                  
                

      
                  {/* <Modal
                    onClose={handleCloseModal}
                    popup
                    show = {modalOpen}
                    size="md"
                  >
                    <Modal.Header />
                      <Modal.Body>
                        <div className="text-center">
                          
                          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            are you sure you want to delete this post?
                          </h3>
                          <div className="flex justify-center gap-4">
                            <Button
                              color="failure"
                              onClick={() => handleDelete(blog.id)}
                            >
                              Yes, I'm sure
                              {blog.id}
                            </Button>
                            <Button
                              color="gray"
                              onClick={handleCloseModal}
                            >
                              No, cancel
                              </Button>
                            </div>
                    
                          </div>
                        </Modal.Body>
                      </Modal> */}
                  {/* <button onClick={handleToggleModal}><i class='bx bxs-trash bx-burst-hover'></i></button> */}
                </div>
  

              ))}
              </div>
            </h1>
            <h1> My Favorite Posts: 
            <div className='grid grid-cols-2 mt-4'>
          {favBlog.map((blog) => ( 
          <div className='bg-white p-4 shadow-sm rounded-sm'>
              <div className='border-solid border-4 border-sky-800 bg-sky-600'>
                  <Link to={`/post/${blog.BlogId}`}>
                    <div >{blog.BlogId}</div>
                    <div ></div>
                    <div className='font-bold' >{blog.Blog.title}</div>
                    <div>{blog.Blog.content}</div>
                    <div className="flex flex-wrap gap-2">
                      <Badge color="info">
                        {blog.Blog.Category.name}
                      </Badge>
                    </div>
                  </Link>
                  </div>
                </div>
              ))}
              </div>
            </h1>
        </div>
    </div>
  )
}

export default withAuth(Profile)