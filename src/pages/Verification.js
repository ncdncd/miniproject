import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function Verification() {
    const {token} = useParams();
    const navigate = useNavigate();

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
    localStorage.setItem("token", token);

    try{
        axios.patch(
            "https://minpro-blog.purwadhikabootcamp.com/api/auth/verify",
            {},
            {
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            }
        )

        setIsVisible(true);
    } catch(error) {
        console.error(error);
        return;
    }

    setTimeout(() => {
        navigate("/login");
    }, 4000);
    }, []);

    return <div>Verification Succesful!</div>;
};

export default Verification