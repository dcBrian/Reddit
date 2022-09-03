import { useQuery } from '@apollo/client';
import { GET_ALL_POSTS, GET_ALL_POSTS_BY_TOPIC } from '../graphql/queries';
import Loader from './Loader';
import Post from './Post';
import Postbox from './Postbox';

interface IProps {
    topic?: string;
}

const Feed = ({ topic }: IProps) => {
    const { data, error } = useQuery(!topic ? GET_ALL_POSTS : GET_ALL_POSTS_BY_TOPIC, {
        variables: { topic: topic },
    });

    const posts: Post[] = !topic ? data?.getPostList : data?.getPostListByTopic;

    if (!posts) return <Loader />;
    if (posts.length === 0)
        return (
            <>
                <Postbox subreddit={topic ? (topic as string) : undefined} />
                <div className='flex h-20 justify-center items-center text-gray-400'>
                    <p className=''>There are no posts yet. Be the first one to post something !</p>
                </div>
            </>
        );
    return (
        <>
            <Postbox subreddit={topic ? (topic as string) : undefined} />
            <div className='mt-5 space-y-5 flex-1'>
                {posts?.map((post) => (
                    <Post key={post.id} post={post} />
                ))}
            </div>
        </>
    );
};

export default Feed;
