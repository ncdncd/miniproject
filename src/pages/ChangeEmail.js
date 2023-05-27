import React from 'react'
import { Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Label, TextInput, Button } from 'flowbite-react';



function ChangeEmail() {

  const navigate = useNavigate();

  const handleSubmit = (values, action) => {
    console.log(values);

    const token = localStorage.getItem("token");

    try{
      axios.patch(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/changeEmail",values
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
    currentEmail: '',
    newEmail: '',
  }

  const validationSchema = Yup.object({
    currentEmail: Yup.string()
    .required('Required'),
    newEmail: Yup.string()
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
                htmlFor="email1"
                value="Your current email"
              />
            </div>

              <TextInput
              type='text'
              placeholder='current email'
              name='currentEmail'
              onChange={props.handleChange}
              value={props.values.currentEmail}
              />

            <div className="mb-2 block">
              <Label
                htmlFor="email2"
                value="Your new email"
              />
            </div>

              <TextInput
              type='text'
              placeholder='new email'
              name='newEmail'
              onChange={props.handleChange}
              value={props.values.newEmail}
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

export default ChangeEmail