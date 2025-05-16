import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, Link, useNavigate } from 'react-router-dom'

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
        <header className="sm:py-3 py-2 shadow-lg bg-background sticky top-0 z-10">
            <Container>
                <nav className="flex flex-wrap items-center justify-center">
                    <div className="sm:mr-4 w-14">
                        <Link>
                            <Logo width="100px" />
                        </Link>
                    </div>
                    <div className="ml-auto flex items-center justify-between">
                        <ul className="flex sm:space-x-7 space-x-3 md:mr-2">
                            {navItems.map((item) =>
                                item.active ? (
                                    <li key={item.name}>
                                        <NavLink to={item.route}
                                            className={({ isActive }) => `${isActive ? "text-primary" : "text-text"} hover:text-primary `}
                                            onClick={() => navigate(item.route)}
                                        >
                                            {item.name}
                                        </NavLink>
                                    </li>
                                ) : null
                            )}
                            {loggedIn && (
                                <li className="list-none rounded-full text-text md:hover:bg-accent hover:text-background " key="logoutBtn">
                                    <LogoutBtn />
                                </li>
                            )}
                        </ul>
                    </div>
                </nav>
            </Container>
        </header >
    )
}

export default Header
