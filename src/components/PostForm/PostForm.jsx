import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Input, Select, RealTimeEditor } from '../index.js';
import { service } from '../../appwrite/config.js';
import { authSelector, login } from '../../store/authSlice.js';
import { authService } from '../../appwrite/auth.js';

const PostForm = ({ post }) => {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            contentImage: post?.contentImage || "",
            status: post?.status || "active",
        }
    });
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        authService.getCurrUser()
            .then((user) => {
                // console.log("User: useeffect", user);

                dispatch(login({ user }))

            })
    }, [])


    const { user } = useSelector(authSelector);


    const submit = async (data) => {
        // console.log("user: ", user);
        setLoading(true);
        if (post) {
            const file = await data.image[0] ? service.uploadFile(data.image[0]) : null;

            if (file) {

                service.deleteFile(post.contentImage);
            }

            const updatedPost = await service.updateBlog(post.$id, { ...data, contentImage: file ? file?.$id : post.contentImage });
            setLoading(false);
            if (updatedPost) {
                navigate(`/post/${updatedPost.$id}`);
            }
        } else {
            const file = await service.uploadFile(data.contentImage[0]);

            if (file) {
                const fileId = file.$id;
                // data.contentImage = fileId;
                const newBlog = {
                    title: data.title,
                    slug: data.slug,
                    content: data.content,
                    status: data.status,
                    contentImage: fileId,
                    userId: user.$id
                }

                console.log("New Blog: ", newBlog);
                const dbPost = await service.createBlog(newBlog);
                setLoading(false);
                if (dbPost) {
                    navigate(`/post/${dbPost.slug}`);
                }
            }
        }

    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-z0-9_.-]/g, '-') // Replace disallowed characters
                .replace(/^-+/, '')            // Remove leading hyphens
                .substring(0, 36);             // Limit to 36 characters
        }
        return '';
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title), {
                    shouldValidate: true
                });
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [watch, slugTransform, setValue])

    return (
        // <Container >
        <form onSubmit={handleSubmit(submit)} className='flex sm:flex-row flex-col'>
            <div className='sm:w-2/3 px-2'>
                <Input
                    label='Title: '
                    placeholder='Title'
                    className='mb-4'
                    {...register('title', { required: true })}
                />
                <Input
                    label='Slug: '
                    placeholder='Slug'
                    className='mb-4'
                    {...register('slug', { required: true })}
                    onInput={(e) => setValue("slug", slugTransform(e.currentTarget.value, {
                        shouldValidate: true
                    }))}
                />
                <RealTimeEditor label="Content: " name="content" control={control} defaultValue={getValues("content") || ""} />
            </div>
            <div className="sm:w-1/3 px-2">
                <Input
                    label='Content Image: '
                    type='file'
                    className='mb-4'
                    accept="image/png, image/jpg, image/jpeg, image/gif image/webp"
                    {...register('contentImage', { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={service.getFilePreview(post.contentImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className='mb-4'
                    {...register("status", { required: true })}
                />
                <Button type='submit' bgColor='bg-gray-400'
                    className="inline-block sm:px-5 px-5 py-2 duration-200 rounded-full hover:bg-gray-600"  >
                    {loading ? (post ? "Updating..." : "Submitting...") : (post ? "Update" : "Submit")}
                </Button>
            </div>
        </form >

        // </Container>

    )
}

export default PostForm
