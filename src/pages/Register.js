import {React, useState} from 'react'
import { Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import { Link, useNavigate  } from 'react-router-dom';
import { Label, TextInput, Button } from 'flowbite-react';



function Register() {

  const navigate = useNavigate();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

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
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className=''>Register</h1>
      <div>
      <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      className=''
      >
        {(props) => (
          <form onSubmit={props.handleSubmit} className='flex flex-col gap-1'>
            <div className="mb-2 block">
              <Label
                htmlFor="username1"
                value="Your username"
              />
            </div>
              <TextInput
              type='text'
              placeholder='username'
              name='username'
              onChange={props.handleChange}
              value={props.values.username}
              />

            <div className="mb-2 block">
              <Label
                htmlFor="email1"
                value="Your email"
              />
            </div>

              <TextInput
              required
              type='email'
              placeholder='email'
              name='email'
              onChange={props.handleChange}
              value={props.values.email}
              />

            <div className="mb-2 block">
              <Label
                htmlFor="phonenumber1"
                value="Your phone number"
              />

            </div>
              <TextInput
              required
              type='phone number'
              placeholder='phone number'
              name='phone'
              onChange={props.handleChange}
              value={props.values.phone}
              />

            <div className="mb-2 block">
              <Label
                htmlFor="password1"
                value="Your password"
              />
            </div>

              <TextInput
              type={isPasswordVisible ? "text" : "password"}
              placeholder='password'
              name='password'
              onChange={props.handleChange}
              value={props.values.password}
              />
              <label className="flex items-center mt-2">
                <input
                  type="checkbox"
                  className="mr-2 w-4 h-4"
                  checked={isPasswordVisible}
                  onChange={togglePasswordVisibility}
                />
                <span className="text-sm text-gray-600">Show password</span>
              </label>

            <ErrorMessage name="password" component="div" />
              <TextInput
              type='password'
              placeholder='confirm password'
              name='confirmPassword'
              onChange={props.handleChange}
              value={props.values.confirmPassword}
              />
            <ErrorMessage name="confirmPassword" component="div" />
            <Button className='' type="submit">Register</Button>
            <span className='text-black'>
              Do you already have an account?   <Link className='hover:text-sky-600' to="/login">Login</Link>
            </span>
            
          
          </form>
        )

        }
        
      </Formik>
      </div>
    </div>
  )
}

export default Register