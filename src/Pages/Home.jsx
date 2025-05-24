
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { service } from '../appwrite/config.js';
import { Container, PostCard } from '../components/index.js';
import { useSelector } from 'react-redux';
import { authSelector } from '../store/authSlice.js';
import { Button } from '../components/index.js';

const Home = () => {
    const [posts, setPosts] = useState([])

    const { loggedIn } = useSelector(authSelector);
    // using same logic to fetch posts as in AllPostsPage
    // TODO: shift the logic to post store actions using async thunk.
    useEffect(() => {
        service.getBlogs().then((allPosts) => {
            if (allPosts) {
                setPosts(allPosts.documents)
            }
        })
    }, [])

    if (posts.length == 0 && !loggedIn) {
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='min-h-[50vh] flex flex-wrap'>
                        <div className='p-2 w-full'>
                            <h1 className='text-2xl font-bold mb-4 font-mono'>
                                SignUp / Login to read posts
                            </h1>
                            <div className='flex flex-col gap-6'>
                                <Link to='/signup'>
                                    <Button bgColor='bg-black'>
                                        Signup
                                    </Button>
                                </Link>
                                <Link to='/login'>
                                    <Button bgColor='bg-black'>
                                        Login
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    if (posts.length === 0 && loggedIn) {
        return (
            <div className='h-[70vh] flex justify-center items-center'>
                <div className="p-2 w-full">
                    <h1 className="text-2xl font-bold hover:text-gray-500">
                        No Posts Available Yet.
                    </h1>
                </div>
            </div>
        )
    }

    return (
        <div className='w-full py-2 bg-background md:pt-10'>
            <div className='w-full max-w-8xl mx-auto px-4'>
                <div className='w-full flex flex-wrap justify-center'>
                    {
                        posts.map((post) => (
                            <div key={post.$id} className='p-2 hover:scale-95 transition-all duration-200'>
                                <PostCard post={post} />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default Home
