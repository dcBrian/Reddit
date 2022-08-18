import Image from "next/image";
import React from "react";
import {
  BeakerIcon,
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  GlobeIcon,
  HomeIcon,
  MenuIcon,
  SearchIcon,
  SparklesIcon,
  SpeakerphoneIcon,
  VideoCameraIcon,
} from "@heroicons/react/solid";
import { StarIcon } from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const { data: session } = useSession();

  return (
    <div className="sticky top-0 z-50 flex bg-white px-4 py-2 shadow-sm items-center ">
      <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
        <Link href="/">
          <Image src="https://links.papareact.com/fqy" objectFit="contain" layout="fill" />
        </Link>
      </div>
      <div className="mx-5 hidden sm:flex items-center xl:min-w-[300px]">
        <HomeIcon className="w-5 h-5" />
        <p className="ml-2 flex-1 hidden lg:flex ">Home</p>
        <ChevronDownIcon className="w-5 h-5" />
      </div>

      <form className="flex flex-1 items-center space-x-2 border-gray-200 rounded-sm bg-gray-100 px-3 py-1 ml-5 sm:mx-0">
        <SearchIcon className="w-6 h-6 text-gray-400 hidden sm:inline" />
        <input
          size={1}
          className="flex-1 bg-transparent outline-none text-xs sm:text-base"
          type="text"
          placeholder="Search"
        />

        {/* Submit the form with Enter key */}
        <button type="submit" hidden></button>
      </form>
      {/* Icons are text */}
      <div className=" text-gray-500 mx-5 items-center space-x-2 hidden lg:inline-flex">
        <SparklesIcon className="icon" />
        <GlobeIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <hr className="h-10 border border-gray-100" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <SpeakerphoneIcon className="icon" />
      </div>
      <div className="ml-5 flex items-center lg:hidden">
        <MenuIcon className="icon" />
      </div>

      {/* Sign-in /  Sign-out */}
      {session ? (
        <div
          onClick={() => signOut()}
          className="hidden border  border-gray-100 lg:flex items-center space-x-2  cursor-pointer p-2"
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image objectFit="contain" src="https://links.papareact.com/23l" layout="fill" />
          </div>
          <div className="flex-1 text-xs">
            <p className="truncate">{session?.user?.name}</p>
            <p className="text-gray-400">1 Karma</p>
          </div>
          <ChevronDownIcon className="h-5 flex-shrink-0 text-gray-400" />
        </div>
      ) : (
        <div
          onClick={() => signIn()}
          className="hidden border  border-gray-100 lg:flex items-center space-x-2  cursor-pointer p-2"
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image objectFit="contain" src="https://links.papareact.com/23l" layout="fill" />
          </div>
          <p className="text-gray-400">Sign-in</p>
        </div>
      )}
    </div>
  );
};

export default Header;
