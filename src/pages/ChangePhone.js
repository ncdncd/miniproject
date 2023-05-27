import React from 'react'
import { Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Label, TextInput, Button } from 'flowbite-react';



function ChangePhone() {

  const navigate = useNavigate();

  const handleSubmit = (values, action) => {
    console.log(values);

    const token = localStorage.getItem("token");

    try{
      axios.patch(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/changePhone",values
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
    currentPhone: '',
    newPhone: '',
  }

  const validationSchema = Yup.object({
    currentPhone: Yup.string()
    .required('Required'),
    newPhone: Yup.string()
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
                htmlFor="phone1"
                value="Your current phone number"
              />
            </div>

              <TextInput
              type='text'
              placeholder='current phone number'
              name='currentPhone'
              onChange={props.handleChange}
              value={props.values.currentPhone}
              />

            <div className="mb-2 block">
              <Label
                htmlFor="phone2"
                value="Your new phone number"
              />
            </div>

              <TextInput
              type='text'
              placeholder='new Phone number'
              name='newPhone'
              onChange={props.handleChange}
              value={props.values.newPhone}
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

export default ChangePhone