import { useQuery } from "@apollo/client";
import { Jelly } from "@uiball/loaders";
import type { NextPage } from "next";
import Head from "next/head";
import Feed from "../components/Feed";
import Loader from "../components/Loader";
import Postbox from "../components/Postbox";
import SubredditRow from "../components/SubredditRow";
import { GET_SUBredditS_WITH_LIMIT } from "../graphql/queries";

const Home: NextPage = () => {
  const { data, error } = useQuery(GET_SUBredditS_WITH_LIMIT, {
    variables: {
      limit: 10,
    },
  });
  const subreddits: Subreddit[] = data?.getSubredditListLimit;
  return (
    <div className="my-7 mx-auto max-w-5xl">
      <Head>
        <title>Reddit clone</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </Head>

      <Postbox />

      <div className="flex">
        <Feed />

        <div
          className={`sticky top-36 ml-5 mt-5 hidden h-fit min-w-[300px] lg:inline ${
            subreddits && " rounded-md border border-gray-300 bg-white"
          }`}
        >
          {subreddits ? (
            <>
              <p className="text-md mb-1 p-4 pb-3 font-bold text-center">Top Communities</p>
              <div className="">
                {subreddits?.map((s, i) => (
                  <SubredditRow key={s.id} topic={s.topic} index={i} />
                ))}
              </div>
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
