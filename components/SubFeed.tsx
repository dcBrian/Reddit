import SubredditRow from './SubredditRow';

type Props = {
    subreddits: any[];
};

const SubFeed = ({ subreddits }: Props) => {
    return (
        <div className='card'>
            <div className='h-[75px] bg-[url("/reddit.png")] flex items-end object-cover bg-center rounded-t-md'>
                <p className='text-lg px-4 py-2  text-white align-bottom'>Top Communities</p>
            </div>
            <div className=''>
                {subreddits?.map((s, i) => (
                    <SubredditRow key={s.id} topic={s.topic} index={i} />
                ))}
            </div>
            <div className='flex items-center justify-center p-2'>
                <button className='flex-1 bg-blue-500 button'>View All</button>
            </div>
        </div>
    );
};

export default SubFeed;
