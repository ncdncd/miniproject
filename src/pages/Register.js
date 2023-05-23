import React from 'react'
import { Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';



function Register() {

  const navigate = useNavigate();

  const handleSubmit = (values, action) => {
    console.log(values);

    try{
      axios.post(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/",
        values
      );
    }catch(error){
      console.error(error);
      return;
    }

    navigate("/verify")
  };

  const initialValues = {
    username:'',
    email: '',
    password: '',
    phone:'',
    password: '',
    confirmPassword:'',
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Required'),
    password: Yup.string()
    .required('Required')
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-z]).{6,}$/,
      "Password must contain atleast 1 uppercase letter, 1 symbol, and 1 lowercase letter"
    ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Password must match')
      .required('Required'),
    phone: Yup.string().required('Required')
  })

  return (
    <div className='flex flex-col justify-center items-center '>
      <h1>Register</h1>

      <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      className='flex flex-col justify-center items-center  '
      >
        {(props) => (
          <form onSubmit={props.handleSubmit} className='flex flex-col justify-center items-center border-solid border border-black bg-gray-900'>
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
            required
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
          <ErrorMessage name="password" component="div" />
            <input
            type='password'
            placeholder='confirm password'
            name='confirmPassword'
            onChange={props.handleChange}
            value={props.values.confirmPassword}
            />
          <ErrorMessage name="confirmPassword" component="div" />
          <button className='text-white' type="submit">Register</button>
          <span className='text-white'>
            Do you already have an account?<Link to="/login">Login</Link>
          </span>
          </form>
        )

        }
        
      </Formik>
    </div>
  )
}

export default Register