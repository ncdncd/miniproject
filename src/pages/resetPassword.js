import { React, useState } from 'react'
import { Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Label, TextInput, Button } from 'flowbite-react';



function ResetPassword() {

  const navigate = useNavigate();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  const handleSubmit = (values, action) => {
    console.log(values);

    const token = localStorage.getItem("token");

    try{
      axios.patch(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/resetPass",values
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
    password: '',
    confirmPassword:'',
  }

  const validationSchema = Yup.object({
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
      <h1 className=''>Reset Password</h1>
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
                htmlFor="password2"
                value="Your new password"
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
            <Button className='' type="submit">Change</Button>
            
          
          </form>
        )
        }
      </Formik>
      </div>
    </div>
  )
}

export default ResetPassword