
import React from 'react'
import logo from '../assets/DevBlog.png'

const Logo = ({ width = '100px' }) => {
    return (<div className='lg:w-20 md:w-16 w-20 m-auto'>
        <img src={logo} width={width} alt="Logo"
            className='m-auto my-2 scale-200 md:scale-170' />
    </div>)
}

export default Logo
