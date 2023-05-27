import {React, useState} from 'react'
import { Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import { Link, useNavigate  } from 'react-router-dom';
import { Label, TextInput, Button } from 'flowbite-react';

function ForgotPassword() {

    const navigate = useNavigate();

    const handleSubmit = ( email, action ) =>{
        console.log(email);
    
        try{
          axios
            .put(
              "https://minpro-blog.purwadhikabootcamp.com/api/auth/forgotPass",
                email
            )
            .then((response) => {
                return "please check your email"
              })
            } catch (error){
              console.error(error);
              return;
            }
    
            setTimeout(() => {
              navigate("/login");
          }, 3000);
      };

      const initialValues = {
        email: '',
      }
    
      const validationSchema = Yup.object({
        email: Yup.string()
          .email('Invalid email format')
          .required('Required'),
      })

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className=''>
        <Formik 
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        className=''
        >
          {(props) => (
            <form onSubmit={props.handleSubmit} className='flex flex-col gap-4'>
            <div className="mb-2 block">
              <Label
                htmlFor="email1"
                value="input email for recovery"
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
            
            <Button className='' type="submit">send to email</Button>
            </form>
          )}


        </Formik>
        </div>
    </div>
  )
}

export default ForgotPassword