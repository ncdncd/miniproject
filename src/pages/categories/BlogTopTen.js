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
    <div>
        {blogData.map((blog) => ( 
          <div className='flex flex-col items-center justify-evenly'>
              <div className='border-solid border-4 border-sky-800 bg-sky-600'>
                  <Link to={`/post/${blog.id}`}>
                    <div >{blog.id}</div>
                    <div ><img className='max-w-xs' alt='image' src={`https://minpro-blog.purwadhikabootcamp.com/${blog.imageURL}`}/></div>
                    <div className='font-bold' >{blog.title}</div>
                    <div>total favorites {blog.total_fav}</div>
                    <div className="flex flex-wrap gap-2">
                      <Badge color="info">
                        {blog.Category.name}
                      </Badge>
                    </div>
                  </Link>
              </div>
          </div>
      ))}
    </div>
  )
}

export default BlogTopTen