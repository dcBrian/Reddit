import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const URL = process.env.SUPABASE_URL || "";

const config = {
  headers: {
    apikey: process.env.SUPABASE_ANON,
    Authorization: `Bearer ${process.env.SUPABASE_ANON}`,
  },
};

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  axios.get(URL, config);
  return response.end(`ok`);
}
