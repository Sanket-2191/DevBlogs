
import React, { useEffect, useState } from 'react'


import { Container, PostForm } from '../components/index.js';
import { service } from '../appwrite/config.js';
import { useNavigate, useParams } from 'react-router-dom';

const EditPostPage = () => {
    const [post, setPost] = useState(null);

    const slug = useParams();
    const navigate = useNavigate();

    useEffect(async () => {
        if (slug) {
            const post = await service.getBlog(slug);
            if (post) {
                setPost(post);
            }
            // else {
            //     navigate("/404");
            // }
        }
    }, [slug, navigate])
    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null;
}

export default EditPostPage
