

import React, { useState, useEffect, use } from 'react'

import { service } from '../appwrite/config.js'
import { Container, PostCard } from '../components/index.js';

const AllPostsPage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await service.getBlogs();
                setPosts(response.documents);
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
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 hover:scale-95 transition-all duration-200'>
                            <PostCard post={post} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AllPostsPage
