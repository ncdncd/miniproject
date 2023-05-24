import React from 'react'
import axios from 'axios'

import withAuth from '../components/withAuth'

function Profile() {

    const token = localStorage.getItem("token");

    const [userData, setUserData] = useState([]);

  const url = "https://minpro-blog.purwadhikabootcamp.com/api/auth/";

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
    <div>Profile</div>
  )
}

export default withAuth(Profile)