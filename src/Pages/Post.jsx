import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { useSelector } from "react-redux";


import { service } from "../appwrite/config.js";
import { Button, Container } from "../components/index.js";
import { authSelector } from "../store/authSlice.js";

const Post = () => {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector(authSelector);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            service.getABlog(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        service.deleteBlog(slug).then((status) => {
            if (status) {
                service.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return (
        <div className="py-8">
            <Container >
                {post ?
                    <>
                        <div className="max-w-5xl mb-4 relative rounded-xl p-2">
                            <img
                                src={service.getFilePreview(post.contentImage)}
                                alt={post.title}
                                className="rounded-xl"
                            />

                            {isAuthor && (
                                <div className="absolute sm:right-6 sm:top-6 -bottom-9 right-4">
                                    <Link to={`/edit-post/${post.$id}`}>
                                        <Button bgColor="bg-primary" className="mr-3 hover:scale-110 py-1">
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button
                                        bgColor="bg-red"
                                        className="hover:scale-110 py-1"
                                        onClick={deletePost}>
                                        Delete
                                    </Button>
                                </div>
                            )}
                        </div>
                        <div className="w-full text-center sm:text-start sm:pt-2 pt-6">
                            <h1 className="md:text-3xl text-2xl font-bold">{post.title}</h1>
                        </div>
                        <div className="browser-css sm:text-xl text-xs">
                            {parse(post.content)}
                        </div>
                    </>
                    :
                    <div className="w-full text-center sm:text-start sm:pt-2 pt-6">
                        <h1 className="md:text-3xl text-2xl font-bold">{slug} not Available.</h1>
                    </div>}
            </Container>
        </div>
    );
}

export default Post
