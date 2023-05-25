import React from 'react'
import { Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Label, TextInput, Button } from 'flowbite-react';



function ChangePassword() {

  const navigate = useNavigate();

  const handleSubmit = (values, action) => {
    console.log(values);

    const token = localStorage.getItem("token");

    try{
      axios.patch(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/changePass",values
        , 
        {
            headers:{
                Authorization: `Bearer ${token}`,
            },
        }
      );
    }catch(error){
      console.error(error);
      return;
    }

    navigate("/profile")
  };

  const initialValues = {
    currentPassword: '',
    password: '',
    confirmPassword:'',
  }

  const validationSchema = Yup.object({
    currentPassword: Yup.string()
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
                htmlFor="password1"
                value="Your current password"
              />
            </div>

              <TextInput
              type='password'
              placeholder='current password'
              name='currentPassword'
              onChange={props.handleChange}
              value={props.values.currentPassword}
              />

            <div className="mb-2 block">
              <Label
                htmlFor="password2"
                value="Your new password"
              />
            </div>

              <TextInput
              type='password'
              placeholder='password'
              name='password'
              onChange={props.handleChange}
              value={props.values.password}
              />
            <ErrorMessage name="password" component="div" />
              <TextInput
              type='password'
              placeholder='confirm password'
              name='confirmPassword'
              onChange={props.handleChange}
              value={props.values.confirmPassword}
              />
            <ErrorMessage name="confirmPassword" component="div" />
            <Button className='' type="submit">Change</Button>
            
          
          </form>
        )
        }
      </Formik>
      </div>
    </div>
  )
}

export default ChangePassword