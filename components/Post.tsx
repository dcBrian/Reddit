import {
  ArrowDownIcon,
  ArrowUpIcon,
  BookmarkAltIcon,
  ChatAltIcon,
  DotsHorizontalIcon,
  GiftIcon,
  ShareIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ReactTimeago from "react-timeago";
import Avatar from "./Avatar";
import { Jelly } from "@uiball/loaders";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { GET_ALL_VOTES_BY_POST_ID } from "../graphql/queries";
import { ADD_VOTE } from "../graphql/mutations";
import { useMutation, useQuery } from "@apollo/client";
interface IProps {
  post: Post;
  disable?: boolean;
}

const Post = ({ post, disable: disableBorder }: IProps) => {
  const { data: session } = useSession();
  const [vote, setVote] = useState<boolean>();
  const upVote = async (isUpvote: boolean) => {
    if (!session) {
      toast("You need to sign in to vote!");
      return;
    }

    if (vote && isUpvote) return;
    if (vote == false && !isUpvote) return;

    setVote(isUpvote);
    await addVote({
      variables: {
        post_id: post.id,
        username: session?.user?.name,
        upvote: isUpvote,
      },
    });
  };

  const { data, loading } = useQuery(GET_ALL_VOTES_BY_POST_ID, {
    variables: {
      post_id: post?.id,
    },
  });
  const [addVote] = useMutation(ADD_VOTE, {
    refetchQueries: [GET_ALL_VOTES_BY_POST_ID, "getVotesByPostId"],
  });

  useEffect(() => {
    const votes: Vote[] = data?.getVotesByPostId;
    const vote = votes?.find((v) => v.username == session?.user?.name)?.upvote;
    setVote(vote);
  }, [data]);

  const displayVote = (data: any) => {
    const votes: Vote[] = data?.getVotesByPostId;
    const displayed = votes?.reduce(
      (total, vote) => (vote.upvote ? (total += 1) : (total -= 1)),
      0
    );
    if (votes?.length === 0) return 0;
    if (displayed === 0) {
      return votes[0]?.upvote ? 1 : -1;
    }
    return displayed;
  };

  if (!post) {
    return (
      <div className="flex w-full items-center justify-center p-10 text-xl">
        <Jelly size={50} color="#FF4501" />
      </div>
    );
  }
  return (
    <Link href={`/post/${post.id}`}>
      <div
        className={`flex rounded-md border border-gray-300 bg-white shadow-sm ${
          !disableBorder && "hover:border-gray-400 cursor-pointer "
        }`}
      >
        <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-2 sm:p-4 text-gray-400">
          <ArrowUpIcon
            onClick={() => upVote(true)}
            className={`voteButton hover:text-red-400 ${vote && "text-red-400"}`}
          />
          <p>{displayVote(data)}</p>
          <ArrowDownIcon
            onClick={() => upVote(false)}
            className={`voteButton hover:text-blue-400 ${vote == false && "text-blue-400"}`}
          />
        </div>
        <div className="p-3 pb-1">
          <div className="flex space-x-2 items-center">
            <Avatar seed={post.username} />
            <p className="text-xs text-gray-400">
              <Link href={`/subreddit/${post?.subreddit[0]?.topic}`}>
                <span className="font-bold text-black hover:text-blue-400">
                  r/{post.subreddit[0]?.topic}
                </span>
              </Link>{" "}
              • Posted by u/
              {post.username} <ReactTimeago date={post.created_at} />
            </p>
          </div>

          {/*Body */}
          <div className="py-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-sm font-light">{post.body}</p>
          </div>
          <img className="w-full" src={post.image} alt="" />

          <div className="flex space-x-4 text-gray-400">
            <div className="postButtons">
              <ChatAltIcon className="h-6 w-6" />
              <p className="hidden sm:inline">{post.comments.length} Comments</p>
            </div>

            <div className="postButtons">
              <GiftIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Award</p>
            </div>

            <div className="postButtons">
              <ShareIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Share</p>
            </div>

            <div className="postButtons">
              <BookmarkAltIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Save</p>
            </div>

            <div className="postButtons">
              <DotsHorizontalIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Post;
