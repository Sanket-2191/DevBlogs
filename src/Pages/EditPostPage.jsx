
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import { Container, PostForm } from '../components/index.js';
import { service } from '../appwrite/config.js';
import { useNavigate, useParams } from 'react-router-dom';
import { postSelector } from '../store/postSlice.js';

const EditPostPage = () => {
    // const [post, setPost] = useState(null);

    const { slug } = useParams();
    const navigate = useNavigate();
    const { currPost } = useSelector(postSelector);

    useEffect(() => {
        // console.log("Post to edit: ", currPost);

        if (!currPost) {
            navigate("/");
        }
        // else {
        //     navigate("/404");
        // }


    }, [slug, navigate])
    return (
        <div className='py-8'>
            <Container>
                {currPost ?
                    <PostForm post={currPost} />
                    :
                    <h1>
                        Post Unavailable.
                    </h1>
                }
            </Container>
        </div>
    )
}

export default EditPostPage
