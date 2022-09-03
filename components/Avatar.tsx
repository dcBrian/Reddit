import { useSession } from 'next-auth/react';
import Image from 'next/image';

interface IProps {
    seed?: string;
    large?: boolean;
}

const Avatar = ({ seed, large }: IProps) => {
    const { data: session } = useSession();
    const img = seed
        ? `https://avatars.dicebear.com/api/open-peeps/${
              seed || session?.user?.name || 'placeholder'
          }.svg`
        : '/unknown.png';

    return (
        <div
            className={`relative overflow-hidden h-10 w-10 rounded-full border-gray-300 bg-white -mt-1 ${
                large && 'h-20 w-20'
            }`}
        >
            <Image className='' layout='fill' src={img} />
        </div>
    );
};

export default Avatar;
