import { useMutation } from '@apollo/client';
import { LinkIcon, PhotographIcon } from '@heroicons/react/solid';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import client from '../apollo-client';
import { ADD_POST, ADD_SUBreddit } from '../graphql/mutations';
import { GET_ALL_POSTS, GET_SUBreddit_BY_TOPIC } from '../graphql/queries';
import Avatar from './Avatar';

type FormData = {
    postTitle: string;
    postBody: string;
    postImage: string;
    subreddit: string;
};

interface IProps {
    subreddit?: string;
}

const Postbox = ({ subreddit }: IProps) => {
    const { data: session } = useSession();
    const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false);
    const [addPost] = useMutation(ADD_POST, {
        // Triger refresh after mutation
        refetchQueries: [GET_ALL_POSTS, 'getPostList'],
    });

    const [addSubreddit] = useMutation(ADD_SUBreddit);
    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = handleSubmit(async (formData: FormData) => {
        const notification = toast.loading('Creating new post ...');
        try {
            // Query for the subreddit topic
            const {
                data: { getSubredditListByTopic },
            } = await client.query({
                query: GET_SUBreddit_BY_TOPIC,
                variables: { topic: subreddit || formData.subreddit },
            });

            const subredditExists = getSubredditListByTopic.length > 0;
            console.log(getSubredditListByTopic);

            if (!subredditExists) {
                console.log('Creating subreddit');
                const {
                    data: { insertSubreddit: newSubreddit },
                } = await addSubreddit({
                    variables: {
                        topic: subreddit || formData.subreddit,
                    },
                });
                console.log(newSubreddit);
                console.log('Creating post ...', formData);
                const image = formData.postImage || '';

                const {
                    data: { insertPost: newPost },
                } = await addPost({
                    variables: {
                        body: formData.postBody,
                        image: image,
                        subreddit_id: newSubreddit.id,
                        title: formData.postTitle,
                        username: session?.user?.name,
                    },
                });
                console.log('New post created');
            } else {
                console.log('Using existing subreddit');
                const image = formData.postImage || '';

                const {
                    data: { insertPost: newPost },
                } = await addPost({
                    variables: {
                        body: formData.postBody,
                        image: image,
                        subreddit_id: getSubredditListByTopic[0].id,
                        title: formData.postTitle,
                        username: session?.user?.name,
                    },
                });
            }
            toast.success('New Post created!', {
                id: notification,
            });
        } catch (error) {
            console.log(error);
            toast.error('Whoops... Something went wrong !', {
                id: notification,
            });
        }
        setValue('postBody', '');
        setValue('postImage', '');
        setValue('postTitle', '');
        setValue('subreddit', '');
    });

    return (
        <form className='card p-2 ' onSubmit={onSubmit}>
            <div className='flex items-center space-x-3 '>
                <Avatar seed={session?.user?.name} />
                <input
                    {...register('postTitle', { required: true })}
                    disabled={!session}
                    autoComplete='off'
                    type='text'
                    className={`rounded-md flex-1 bg-gray-50 p-2 pl-5 outline-none ${
                        session ? 'input' : 'border border-gray-200'
                    }`}
                    placeholder={
                        session
                            ? subreddit
                                ? `Create a post in r/${subreddit}`
                                : 'Create a post by entering a title!'
                            : 'Sign in to post'
                    }
                />
                <PhotographIcon
                    onClick={() => setImageBoxOpen((prev) => !prev)}
                    className={`h-6 text-gray-300 cursor-pointer ${
                        imageBoxOpen && 'text-blue-300'
                    }`}
                />

                <LinkIcon className='h-6 text-gray-300' />
            </div>
            {!!watch('postTitle') && (
                <div className='flex flex-col'>
                    <div className='flex items-center px-2'>
                        <p className='min-w-[90px]'>Body:</p>
                        <input
                            className='m-2 flex-1 bg-blue-50 outline-none p-2 text-sm'
                            {...register('postBody')}
                            type='text'
                            placeholder='Text (optional)'
                        />
                    </div>

                    {!subreddit && (
                        <div className='flex items-center px-2'>
                            <p className='min-w-[90px]'>Subreddit:</p>
                            <input
                                className='m-2 flex-1 bg-blue-50 outline-none p-2 text-sm'
                                {...register('subreddit', { required: true })}
                                type='text'
                                placeholder='i.e. reactjs'
                            />
                        </div>
                    )}

                    {imageBoxOpen && (
                        <div className='flex items-center px-2'>
                            <p className='min-w-[90px]'>Image URL:</p>
                            <input
                                className='m-2 flex-1 bg-blue-50 outline-none p-2'
                                {...register('postImage')}
                                type='text'
                                placeholder='Optional'
                            />
                        </div>
                    )}
                    {/* Errors */}
                    {Object.keys(errors).length > 0 && (
                        <div className='text-red-500 space-y-2 p-2'>
                            {errors.postTitle?.type === 'required' && (
                                <p>- A post title is required</p>
                            )}
                            {errors.subreddit?.type === 'required' && (
                                <p>- A subreddit is required</p>
                            )}
                        </div>
                    )}

                    {!!watch('postTitle') && (
                        <button type='submit' className='w-full bg-blue-500 button'>
                            Create Post
                        </button>
                    )}
                </div>
            )}
        </form>
    );
};

export default Postbox;
