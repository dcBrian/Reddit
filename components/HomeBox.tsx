type Props = {};

const HomeBox = (props: Props) => {
    return (
        <div className='card flex flex-col space-y-2 mt-5 max-w-[350px] px-4'>
            <div className='-mx-4'>
                <img
                    className='w-full'
                    src='https://www.redditstatic.com/desktop2x/img/id-cards/home-banner@2x.png'
                    alt='premium icon'
                />
            </div>

            <div className='flex space-x-4'>
                <img
                    className='w-10 -mt-6'
                    src='https://www.redditstatic.com/desktop2x/img/id-cards/snoo-home@2x.png'
                    alt='premium icon'
                />
                <p className='font-bold self-center'>Home</p>
            </div>

            <div>
                <p className='break-words text-sm'>
                    Your personal Reddit frontpage. Come here to check in with your favorite
                    communities.
                </p>
            </div>
            <div className='flex flex-col pb-2 space-y-2'>
                <button className='button w-full bg-blue-500'>Create Post</button>

                <button className='button w-full bg-white text-blue-500 border-blue-500 border'>
                    Create Community
                </button>
            </div>
        </div>
    );
};

export default HomeBox;
