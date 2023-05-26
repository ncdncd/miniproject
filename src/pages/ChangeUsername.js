import React from 'react'
import { Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Label, TextInput, Button } from 'flowbite-react';



function ChangeUsername() {

  const navigate = useNavigate();

  const handleSubmit = (values, action) => {
    console.log(values);

    const token = localStorage.getItem("token");

    try{
      axios.patch(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/changeUsername",values
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
    currentUsername: '',
    newUsername: '',
  }

  const validationSchema = Yup.object({
    currentUsername: Yup.string()
    .required('Required'),
    newUsername: Yup.string()
    .required('Required')
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
                value="Your current username"
              />
            </div>

              <TextInput
              type='text'
              placeholder='current username'
              name='currentUsername'
              onChange={props.handleChange}
              value={props.values.currentUsername}
              />

            <div className="mb-2 block">
              <Label
                htmlFor="username2"
                value="Your new Username"
              />
            </div>

              <TextInput
              type='text'
              placeholder='new username'
              name='newUsername'
              onChange={props.handleChange}
              value={props.values.newUsername}
              />

            <Button className='' type="submit">Change</Button>
          </form>
        )
        }
      </Formik>
      </div>
    </div>
  )
}

export default ChangeUsername