

import React, { useState, useEffect, use } from 'react'

import { service } from '../appwrite/config.js'
import { Container, PostCard } from '../components/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { postSelector, setAllPosts } from '../store/postSlice.js';

const AllPostsPage = () => {
    // const [posts, setPosts] = useState([]);
    const { allPosts } = useSelector(postSelector);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await service.getBlogs();
                setLoading(false);

                dispatch(setAllPosts({ posts: response.documents }));
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();


    }, []);

    return (
        <div className='w-full py-8 md:pt-10'>
            <div className='w-full max-w-8xl mx-auto px-4'>
                <div className='flex flex-wrap justify-center'>
                    {!loading ? allPosts?.map((post) => (
                        <div key={post.$id} className='p-2 hover:scale-95 transition-all duration-200'>
                            <PostCard post={post} />
                        </div>
                    )) : <h1>Fetching posts...</h1>}
                </div>
            </div>
        </div>
    )
}

export default AllPostsPage
