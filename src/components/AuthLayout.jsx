
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { authSelector } from '../store/authSlice.js'
import { useNavigate } from 'react-router-dom'

const AuthLayout = ({ children }) => {
    const { loggedIn } = useSelector(authSelector);
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        if (!loggedIn) {
            navigate('/login');
        }

        setLoader(false);
    }, [navigate, loggedIn])
    return (
        <>
            {loader ? <h1> "Loading...." </h1> : children}
        </>
    )
}

export default AuthLayout;