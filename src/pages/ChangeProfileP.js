import React, { useContext, useEffect, useState } from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from 'axios'
import * as Yup from "yup"
import { Label, TextInput, Button, FileInput } from 'flowbite-react';

function ChangeProfileP() {
 
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [profile, setProfile] = useState("");  
    
    const handleSubmit = (profileFile, action) => {

    console.log(profileFile.file, "deez")

    const formData = new FormData();
      formData.append("file", profileFile.file);

    axios
      .post("https://minpro-blog.purwadhikabootcamp.com/api/profile/single-uploaded", formData , {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((response) => {
        console.log(response);
        setProfile(response.data);
      })
      .catch((err) => console.log(err));

      console.log(profile, "nuts")

      setTimeout(() => {
        navigate("/")
    }, 3000);
  };
    
      const initialValues = {
            file: null,
      }
    
      return (
        <div className='flex flex-col items-center justify-center h-screen'>
          <div className=''>
            <Formik 
            initialValues={initialValues}
            onSubmit={handleSubmit}
            className=''
            >
              {(props) => (
                <form onSubmit={props.handleSubmit} className='flex flex-col gap-4'>
                    <div id="fileUpload">
                        <div className="mb-2 block">
                        <Label
                            htmlFor="file"
                            value="Upload picture file here"
                        />
                        <FileInput
                        type="file"
                        name="file"
                        id="file"
                        className="file" 
                        htmlFor="file"
                        onChange={(e) => {
                            props.setFieldValue("file", e.currentTarget.files[0]);
                        }}
                        />
                        <Button className='text-white' size="small" type="submit">Upload</Button>
                    
                        </div>
                    </div>
                </form>
                
              )}

            </Formik>
          </div>
        </div>
      )

}

export default ChangeProfileP