
import React from 'react'
import logo from '../assets/DevBlog.png'

const Logo = ({ width = '100px' }) => {
    return (<div className='lg:w-20 md:w-16 sm:w-20'>
        <img src={logo} width={width} alt="Logo" className='scale-125' />
    </div>)
}

export default Logo
