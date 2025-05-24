

import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { authService } from '../../appwrite/auth.js';
import { logout } from '../../store/authSlice.js';
import Button from '../Button.jsx';
import Confirm from '../../Pages/Confirm.jsx';
import { setAllPosts, currPost } from '../../store/postSlice.js';

const LogoutBtn = () => {
    const dispatch = useDispatch();


    const logoutHandler = () => {
        authService.logout()
            .then(() => {
                dispatch(logout());
                dispatch(currPost({ post: null }));
                dispatch(setAllPosts({ posts: null }));
            })
    }

    const [confirmationModal, setConfirmationModal] = useState(false);
    const handleButtonClick = () => setConfirmationModal(true);
    const handleCloseModal = () => setConfirmationModal(false);

    useEffect(() => {
        // console.log("Confirmation Modal visible: ", confirmationModal);
    }, [confirmationModal]);

    return (
        <>
            <Button
                onClick={handleButtonClick}
                className='inline-block sm:px-5 px-5 py-2 duration-200
                 hover:bg-blue-100 rounded-full'>
                Logout
            </Button>
            {
                confirmationModal ?
                    <Confirm
                        handleCloseModal={handleCloseModal}
                        confirmHandler={logoutHandler}
                        textContent={"You will be logged out."}
                        btnText={'Logout'} />
                    : null
            }
        </>

    )
}

export default LogoutBtn
