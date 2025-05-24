import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";


import { service } from "../appwrite/config.js";
import { Button, Container } from "../components/index.js";
import { authSelector } from "../store/authSlice.js";
import { currPost } from "../store/postSlice.js";
import Confirm from "./Confirm.jsx";

const Post = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [fileUrl, setFileUrl] = useState("");
    const [post, setPost] = useState(null);
    const dispatch = useDispatch();

    const { user } = useSelector(authSelector);

    const isAuthor = post && user ? post.userId === user.$id : false;

    // console.log("is Author: ", isAuthor);


    useEffect(() => {
        const postInfo = async () => {
            if (slug) {
                const post = await service.getABlog(slug);
                if (post) {
                    setPost(post);
                    dispatch(currPost({ post }));
                }
                else navigate("/");
                // console.log("Post: ", post);
            } else navigate("/");
        }

        postInfo();
    }, [slug, navigate]);

    const deletePost = () => {
        service.deleteBlog(slug).then((status) => {
            if (status) {
                service.deleteFile(post.contentImage);
                dispatch(currPost({ post: null }));
                navigate("/");
            }
        });
    };
    // let fileurl = "";
    service.getFilePreview(post?.contentImage).then((url) => {
        setFileUrl(url);
        // console.log("File URL: ", url);
    }).catch((error) => {
        console.error("Error fetching file preview:", error);
    });

    const [confirmationModal, setConfirmationModal] = useState(false);
    const handleButtonClick = () => setConfirmationModal(true);
    const handleCloseModal = () => setConfirmationModal(false);

    return (
        <div className="py-8">
            <Container >
                {confirmationModal ?
                    <Confirm
                        handleCloseModal={handleCloseModal}
                        confirmHandler={deletePost}
                        textContent={"Do you really want to delete?"}
                        btnText={'Delete'} />
                    : null}
                {post ?
                    <>
                        <div className=" aspect-auto mb-4 relative rounded-xl p-2">
                            <img
                                src={fileUrl}
                                alt={post.title}
                                className="rounded-xl max-w-[70vw] max-h-[40vh] object-cover"
                            />

                            {isAuthor && (
                                <div className="absolute sm:right-6 sm:top-6 -bottom-9 right-4 m-1">
                                    <Link to={`/edit-post/${post.$id}`}>
                                        <Button bgColor="bg-blue-500" className="mr-3 hover:scale-110 py-1">
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button
                                        bgColor="bg-red-700"
                                        className="hover:scale-110 py-1"
                                        onClick={handleButtonClick}

                                    >
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
