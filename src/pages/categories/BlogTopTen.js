import { React, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Badge } from "flowbite-react";

function BlogTopTen() {

    const [blogData, setBlogs] = useState([]);
    const [likes, setLikes] = useState("")

  const url = "https://minpro-blog.purwadhikabootcamp.com/api/blog/pagFav";

  useEffect(() => {
    axios(url)
    .then((response) => {
      console.log(response.data);
      const blogs1 = response.data;
      let array = blogs1.result.slice(0,10);
      setBlogs(array);
    })
    .catch((err) => console.log(err))

  }, [likes])

  return (
    <div className='flex flex-col mt-4'>
      {blogData.map((blog) => ( 
          
              <div className='bg-gray-800 p-4 border-solid border-black border-4 shadow-sm rounded-sm'>
                  <Link to={`/post/${blog.id}`} className='overflow-hidden block'>
                    <div className="text-gray-300">{blog.id}</div> 
                
                    </Link>
                    <div className='p-4'>
                      <Link to={`/post/${blog.id}`}>
                      <h2 className='text-2xl font-semibold text-gray-200 hover:text-blue-500 transition'>
                        {blog.title}
                      </h2>
                      </Link>
                      <p className='text-gray-300 text-sm mt-2'>
                        amount of likes: {blog.total_fav}
                      </p>
                    </div>
                    <div className='flex mt-3 space-x-5'>
                    <div className="">
                      <Badge color="info">
                        {blog.Category.name}
                      </Badge>
                    </div>
                    </div>
                  
                  </div>

      ))}
      </div>
  )
}

export default BlogTopTen