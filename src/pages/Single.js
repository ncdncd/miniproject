import React from 'react'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Link
} from "react-router-dom";

function Single() {
  return (
    <div>Single
      <div>
        <img className='h-72' alt='image' src="https://i.kym-cdn.com/photos/images/original/002/529/450/362.jpg"/>
      </div>
      <div className='flex gap-3'>
        <Link to={`/write?edit=2`}><h1>edit</h1></Link>
        <Link><h1>delete</h1></Link>
      </div>
      <div >
        <img className='w-12 rounded-full object-cover' src='https://media.cnn.com/api/v1/images/stellar/prod/180907100732-elon-musk-smokes-marijuana-podcast-1.jpg?q=x_716,y_122,h_658,w_1170,c_crop/w_850'/>
      </div>
      <div>
        <span>name</span>
      </div>
    </div>
  )
}

export default Single