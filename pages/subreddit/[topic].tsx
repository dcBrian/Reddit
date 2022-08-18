import { useRouter } from "next/router";
import React from "react";
import Avatar from "../../components/Avatar";
import Feed from "../../components/Feed";
import Postbox from "../../components/Postbox";

const Subreddit = () => {
  const {
    query: { topic },
  } = useRouter();
  return (
    <>
      <div className="">
        <div className={`h-24 bg-red-400`}></div>
        <div className="px-2 -mt-6 bg-white">
          <div className="mx-auto flex max-w-5xl  space-x-4 pb-3">
            <div className="-mt-8">
              <Avatar seed={topic as string} large />
            </div>

            <div className="py-2">
              <h1 className="text-3xl font-semibold">Welcome to r/{topic} subreddit</h1>
              <p className="text-sm text-gray-400">r/{topic}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-5 max-w-5xl pb-10">
        <Postbox subreddit={topic as string} />
        <Feed topic={topic as string} />
      </div>
    </>
  );
};

export default Subreddit;
