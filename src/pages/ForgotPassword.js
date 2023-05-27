import React from 'react'

function ForgotPassword() {

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

  return (
    <div>ForgotPassword
        
    </div>
  )
}

export default ForgotPassword