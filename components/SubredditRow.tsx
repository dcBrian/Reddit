import { ChevronUpIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import Avatar from './Avatar';

interface IProps {
    index: number;
    topic: string;
}

const SubredditRow = ({ index, topic }: IProps) => {
    return (
        <div className='flex items-center space-x-2 first:border-0 border-t bg-white px-4 py-2'>
            <p className='font-bold text-sm'>{index + 1}</p>
            <ChevronUpIcon className='h-4 w-4 flex-shrink-0 text-green-400' />
            <Avatar seed={`/subreddit/${topic}`} />
            <p className='flex-1 truncate font-bold text-sm'>r/{topic}</p>
            <Link href={`/subreddit/${topic}`}>
                <div className='cursor-pointer rounded-full bg-blue-500 py-1 px-4 text-white text-xs hover:opacity-90'>
                    Join
                </div>
            </Link>
        </div>
    );
};

export default SubredditRow;
