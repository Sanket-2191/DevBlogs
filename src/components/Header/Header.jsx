import React from 'react'
import { Logo, LogoutBtn, Container } from '../index.js'
import { useSelector } from 'react-redux'
import { authSelector } from '../../store/authSlice.js'

const Header = () => {
    const authStatus = useSelector(authSelector).loggedIn;
    return (
        <div className='bg-gray-600'>
            <h1>Header</h1>
        </div>
    )
}

export default Header
