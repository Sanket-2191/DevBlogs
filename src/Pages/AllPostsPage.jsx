

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
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPostsPage
