import { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, Link, useNavigate } from 'react-router-dom'

import { Logo, LogoutBtn, Container, Button } from '../index.js'
import { authSelector } from '../../store/authSlice.js'
import Confirm from '../../Pages/Confirm.jsx'

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
        <>
            <header className="flex justify-center sm:py-1 py-2 shadow-lg bg-background backdrop-blur-2xl sticky top-0 z-10">
                <Container>
                    <nav className="flex flex-col justify-center items-center md:flex-row md:justify-between ">
                        <div className=" mx-5 w-14">
                            <Link>
                                <Logo width="100px" />
                            </Link>
                        </div>
                        <div
                            className=" flex items-center justify-between
                          overflow-auto">
                            <ul className="flex sm:space-x-7 space-x-3 md:mr-2">
                                {navItems.map((item) =>
                                    item.active ? (
                                        <li key={item.name}>
                                            <NavLink
                                                to={item.route}
                                                className={({ isActive }) => ""}
                                            >
                                                {({ isActive }) => (
                                                    <Button
                                                        className={` hover:bg-gray-600 text-nowrap
                                                          ${isActive ? "" : "bg-gray-500 text-amber-950"}`}
                                                    >
                                                        {item.name}
                                                    </Button>
                                                )}
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


        </>
    )
}

export default Header
