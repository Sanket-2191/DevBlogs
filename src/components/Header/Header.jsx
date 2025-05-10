import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { Logo, LogoutBtn, Container } from '../index.js'
import { authSelector } from '../../store/authSlice.js'

const Header = () => {
    const authState = useSelector(authSelector);
    const { user, loggedIn } = authState;

    const navigate = useNavigate();

    const navItems = [
        {
            name: "Home",
            route: '/',
            active: true
        }, {
            name: "Login",
            route: "/login",
            active: !loggedIn,
        },
        {
            name: "Signup",
            route: "/signup",
            active: !loggedIn,
        },
        {
            name: "All Posts",
            route: "/all-posts",
            active: loggedIn,
        },
        {
            name: "Add Post",
            route: "/add-post",
            active: loggedIn,
        }
    ]

    return (
        <header className='py-3 shadow bg-gray-500'>
            <Container>
                <nav className='flex'>
                    <div className='mr-4'>
                        <Link to='/'>
                            <Logo width='70px' />

                        </Link>
                    </div>
                    <ul className='flex ml-auto'>
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.route)}
                                        className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                                    >{item.name}</button>
                                </li>
                            ) : null
                        )}
                        {loggedIn && (
                            <li key="logoutBtn">
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header
