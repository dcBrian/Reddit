import {
    BellIcon,
    ChatIcon,
    ChevronDownIcon,
    GlobeIcon,
    SearchIcon,
    SparklesIcon,
    SpeakerphoneIcon,
    VideoCameraIcon,
} from '@heroicons/react/outline';
import { HomeIcon } from '@heroicons/react/solid';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
    const { data: session } = useSession();

    return (
        <div className='sticky top-0 z-50 flex bg-white shadow-sm items-center h-[49px] px-5 space-x-3'>
            <div className='relative h-10 w-20 flex-shrink-0 cursor-pointer'>
                <Link href='/'>
                    <Image src='/reddit_logo.png' objectFit='contain' layout='fill' />
                </Link>
            </div>

            <div className='hidden sm:flex items-center space-x-1 p-[6px] cursor-pointer min-w-[150px] lg:min-w-[200px] border-transparent border hover:border-gray-200 rounded-[4px]'>
                <HomeIcon className='h-5 w-6' />
                <p className='text-sm'>Home</p>
                <span className='flex-1'></span>
                <ChevronDownIcon className='h-4 w-4 text-gray-600' />
            </div>

            <form className='flex flex-1 min-h-[34px] items-center space-x-2  rounded-[4px] bg-gray-100 px-3 py-1 input'>
                <SearchIcon className='w-5 h-5 text-gray-400' />
                <input
                    size={1}
                    className='flex-1 bg-transparent outline-none text-xs lg:text-sm font-light'
                    type='text'
                    placeholder='Search Reddit'
                />

                {/* Submit the form with Enter key */}
                <button type='submit' hidden></button>
            </form>

            {/* Icons are text */}
            <div className=' mx-5 items-center space-x-2 hidden lg:inline-flex'>
                <SparklesIcon className='icon' />
                <GlobeIcon className='icon' />
                <VideoCameraIcon className='icon' />
                <hr className='h-10 border border-gray-100' />
                <ChatIcon className='icon' />
                <BellIcon className='icon' />
                <SpeakerphoneIcon className='icon' />
            </div>

            {/* Sign-in /  Sign-out */}
            {session ? (
                <div
                    onClick={() => signOut()}
                    className='border flex border-gray-100  items-center lg:space-x-2  cursor-pointer p-1 ml-5 lg:ml-0 text-xs lg:text-base'
                >
                    <div className='relative h-5 w-5 flex-shrink-0 hidden lg:inline'>
                        <Image
                            objectFit='contain'
                            src='https://links.papareact.com/23l'
                            layout='fill'
                        />
                    </div>
                    <div className='flex-1 text-xs hidden lg:inline'>
                        <p className='truncate'>{session?.user?.name}</p>
                        <p className='text-gray-400'>1 Karma</p>
                    </div>
                    <ChevronDownIcon className='h-5 flex-shrink-0 text-gray-400 hidden lg:inline' />
                    <p className='text-gray-400 inline lg:hidden'>Sign-out</p>
                </div>
            ) : (
                <div
                    onClick={() => signIn()}
                    className=' border border-transparent flex items-center lg:space-x-2  cursor-pointer h-[36px] px-2 ml-5 lg:ml-0 text-xs lg:text-base hover:border-gray-200 rounded-[4px]'
                >
                    <div className='relative h-5 w-5 flex-shrink-0 hidden lg:inline'>
                        <Image
                            objectFit='contain'
                            src='https://links.papareact.com/23l'
                            layout='fill'
                        />
                    </div>
                    <p className=''>Sign-in</p>
                </div>
            )}
        </div>
    );
};

export default Header;
