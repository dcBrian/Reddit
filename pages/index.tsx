import { useQuery } from "@apollo/client";
import type { NextPage } from "next";
import Head from "next/head";
import Feed from "../components/Feed";
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
        <title>reddit - The Reddit clone</title>
      </Head>

      <Postbox />

      <div className="flex">
        <Feed />
        <div className="sticky top-36 ml-5 mt-5 hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline">
          <p className="text-md mb-1 p-4 pb-3 font-bold">Top Communities</p>
          <div className="">
            {subreddits?.map((s, i) => (
              <SubredditRow key={s.id} topic={s.topic} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
