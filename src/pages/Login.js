import React from 'react'

function Login() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='bg-sky-700'>
        <h1 className='text-size'>Login</h1>
        <form className='flex flex-col '>
            <input type='text' placeholder='Username'/>
            <input type='text' placeholder='Password'/>
            <button>login</button>
        </form>
      </div>
    </div>
  )
}

export default Login