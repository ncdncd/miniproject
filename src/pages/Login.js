import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from 'axios'
import * as Yup from "yup"
import { Label, TextInput, Button } from 'flowbite-react';

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

        setTimeout(() => {
          navigate("/");
      }, 3000);
  };

  const initialValues = {
    username:'',
    email: '',
    password: '',
    phone:'',
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className=''>
        <Formik 
        initialValues={initialValues}
        validationSchema={CreateSchema}
        onSubmit={handleSubmit}
        className=''
        >
          {(props) => (
            <form onSubmit={props.handleSubmit} className='flex flex-col gap-4'>
              <div>
              <TextInput
              type='text'
              placeholder='username'
              name='username'
              onChange={props.handleChange}
              value={props.values.username}
              /></div>
              <TextInput
              required
              type='email'
              placeholder='email'
              name='email'
              onChange={props.handleChange}
              value={props.values.email}
              />
              <TextInput
              type='phone number'
              placeholder='phone number'
              name='phone'
              onChange={props.handleChange}
              value={props.values.phone}
              />
              <TextInput
              type='password'
              placeholder='password'
              name='password'
              onChange={props.handleChange}
              value={props.values.password}
              />

              <ErrorMessage name='password' component="div"/>

              <Button className='text-white' type="submit">Login</Button>
              <span className='text-black'>
                Don't have an account yet?  <Link className='hover:text-sky-600' to="/register">Register</Link>
              </span>
            </form>
          )}


        </Formik>
      </div>
    </div>
  )
}

export default Login