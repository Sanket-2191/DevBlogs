

import React from 'react'

const Button = ({
    children,
    type = 'button',
    bgColor = '',
    textColor = 'text-white',
    className = '',
    ...props
}) => {
    return (
        <button
            className={` rounded-full min-w-[90px]
             items-center justify-center p-2 my-2 text-center text-base font-medium
              text-white inline-block sm:px-5 px-2 py-2 
             hover:cursor-pointer hover:bg-body-color hover:border-body-color 
             disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5 
             ${className ? className : ''} ${bgColor ? bgColor : ''}`}
            type={type}
            {...props}
        >
            {children}
        </button>

    );
}

export default Button
