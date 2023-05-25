import { React, useEffect, useState } from "react";
import axios from "axios";

function BlogTopTen() {

    const [blogData, setBlogs] = useState([]);


  const url = "https://minpro-blog.purwadhikabootcamp.com/api/blog/pagFav";

  useEffect(() => {
    axios(url)
    .then((response) => {
      console.log(response.data);
      const blogs1 = response.data;
      console.log(blogs1.result);
      setBlogs(blogs1.result);
    })
    .catch((err) => console.log(err))

  }, [])

  return (
    <div>
        {blogData.map((blog) => ( 
          <div className='flex flex-col items-center justify-evenly'>
              <div className='border-solid border-4 border-sky-800 bg-sky-600'>
                  <Link to={`/post/${blog.id}`}>
                    <div >{blog.id}</div>
                    <div ><img className='max-w-xs' alt='image' src="https://i.kym-cdn.com/photos/images/original/002/529/450/362.jpg"/></div>
                    <div className='font-bold' >{blog.title}</div>
                    <div>{blog.content}</div>
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