import { useMutation, useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import ReactTimeago from 'react-timeago';
import Avatar from '../../components/Avatar';
import Post from '../../components/Post';
import { ADD_COMMENT } from '../../graphql/mutations';
import { GET_POST_BY_POST_ID } from '../../graphql/queries';

type FormData = {
    comment: string;
};

const PostPage = () => {
    const router = useRouter();
    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>();
    const { data: session } = useSession();

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const notification = toast.loading('Posting your comment');

        await addComment({
            variables: {
                post_id: router.query.postId,
                username: session?.user?.name,
                text: data.comment,
            },
        });
        setValue('comment', '');

        toast.success('Comment successfully posted!', {
            id: notification,
        });
    };

    const [addComment] = useMutation(ADD_COMMENT, {
        refetchQueries: [GET_POST_BY_POST_ID, 'getPostListByPostId'],
    });

    const { loading, error, data } = useQuery(GET_POST_BY_POST_ID, {
        variables: {
            post_id: router.query.postId,
        },
    });

    const post: Post = data?.getPostListByPostId;

    return (
        <div className='mx-auto max-w-5xl p-5'>
            <Post post={post} disable />
            {post && (
                <>
                    <div className='-mt-1 rounded-b-md border border-t-0 border-gray-300 bg-white p-5 p-pl-16 '>
                        {session && (
                            <p className='text-sm'>
                                Comment as{' '}
                                <span className='text-red-500'>{session?.user?.name}</span>
                            </p>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-2'>
                            <textarea
                                {...register('comment')}
                                placeholder={
                                    session
                                        ? 'What are you thoughts ? '
                                        : 'Please sign in to post a comment.'
                                }
                                className='h-24 rounded-md border border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-50 resize-none'
                            />
                            <button
                                disabled={!session}
                                type='submit'
                                className='rounded-full  bg-red-500 p-3 font-semibold text-white disabled:bg-gray-200'
                            >
                                Comment
                            </button>
                        </form>
                    </div>

                    <div className='-mt-5 rounded-b-md border border-t-0 border-gray-300 bg-white py-5 px-10 '>
                        <hr className='py-2 ' />
                        {post?.comments.map((comment) => (
                            <div className='relative flex flex-col px-2 py-2' key={comment.id}>
                                <div className='flex items-center space-x-2'>
                                    <Avatar seed={comment.username} small />
                                    <p className='text-xs text-gray-400 -mb-[6px]'>
                                        <span className='front-bold text-gray-600 mr-2'>
                                            {comment.username}
                                        </span>
                                        <ReactTimeago date={comment.created_at} />
                                    </p>
                                </div>
                                <div className='pl-10'>
                                    <p>{comment.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default PostPage;
