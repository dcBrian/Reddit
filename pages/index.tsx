import { useQuery } from '@apollo/client';
import type { NextPage } from 'next';
import Head from 'next/head';
import Feed from '../components/Feed';
import HomeBox from '../components/HomeBox';
import Loader from '../components/Loader';
import SubFeed from '../components/SubFeed';
import { GET_SUBredditS_WITH_LIMIT } from '../graphql/queries';

const Home: NextPage = () => {
    const { data, error } = useQuery(GET_SUBredditS_WITH_LIMIT, {
        variables: {
            limit: 10,
        },
    });
    const subreddits: Subreddit[] = data?.getSubredditListLimit;
    return (
        <div className='mx-auto max-w-5xl p-5'>
            <Head>
                <title>Reddit clone</title>
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0, maximum-scale=1.0'
                />
            </Head>

            <div className='flex'>
                <div className='flex flex-col flex-1'>
                    <Feed />
                </div>

                <div className={`ml-5 hidden h-fit min-w-[300px] lg:inline`}>
                    {subreddits ? (
                        <>
                            <SubFeed subreddits={subreddits} />

                            <div className='card flex flex-col w-full mt-5 max-w-[350px]'>
                                <div className='px-4 pt-2 flex space-x-4 items-center'>
                                    <div className='h-full'>
                                        <img
                                            className='h-8 w-8'
                                            src='/redditi.png'
                                            alt='premium icon'
                                        />
                                    </div>
                                    <div className='text-xs '>
                                        <p className='font-medium'>Reddit Premium</p>
                                        <p className='break-words'>
                                            The best Reddit experience, with monthly Coins
                                        </p>
                                    </div>
                                </div>
                                <div className='p-2'>
                                    <button className='button w-full bg-[rgb(216,71,12)] brightness-125'>
                                        Try Now
                                    </button>
                                </div>
                            </div>
                            <HomeBox />
                        </>
                    ) : (
                        <Loader />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
