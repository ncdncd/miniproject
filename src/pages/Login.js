import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from 'axios'
import * as Yup from "yup"

import { LoginContext } from '../App'

const CreateSchema = Yup.object({
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-z]).{6,}$/,
      "Password must contain atleast 1 uppercase letter, 1 symbol, and 1 lowercase letter"
    ),
});

function Login() {

  const { setToken } = useContext(LoginContext);

  const navigate = useNavigate();

  const handleSubmit = ( values, action ) =>{
    console.log(values);

    try{
      axios
        .post(
          "https://minpro-blog.purwadhikabootcamp.com/api/auth/login",
            values
        )
        .then((response) => {
            localStorage.setItem("token", response.data.token);
            setToken(response.data.token);
          })
        } catch (error){
          console.error(error);
          return;
        }

        navigate("/");
  };

  const initialValues = {
    username:'',
    email: '',
    password: '',
    phone:'',
    password: '',
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='bg-gray-900 flex items-center justify-center flex-col'>
        <h1 className='text-white'>Welcome</h1>
        <Formik 
        initialValues={initialValues}
        validationSchema={CreateSchema}
        onSubmit={handleSubmit}
        className=''
        >
          {(props) => (
            <form onSubmit={props.handleSubmit} className='flex flex-col items-center justify-center'>
              <input
              type='text'
              placeholder='username'
              name='username'
              onChange={props.handleChange}
              value={props.values.username}
              />
              <input
              required
              type='email'
              placeholder='email'
              name='email'
              onChange={props.handleChange}
              value={props.values.email}
              />
              <input
              type='phone number'
              placeholder='phone number'
              name='phone'
              onChange={props.handleChange}
              value={props.values.phone}
              />
              <input
              type='password'
              placeholder='password'
              name='password'
              onChange={props.handleChange}
              value={props.values.password}
              />

              <ErrorMessage name='password' component="div"/>

              <button className='text-white' type="submit">Login</button>
              <span className='text-white'>
                Don't have an account yet? <Link to="/register">Register</Link>
              </span>
            </form>
          )}


        </Formik>
      </div>
    </div>
  )
}

export default Login