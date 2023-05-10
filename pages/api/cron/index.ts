import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const URL = process.env.SUPABASE_URL || '';

export default function handler(request: NextApiRequest, response: NextApiResponse) {
  axios.defaults.headers['apikey'] = process.env.SUPABASE_ANON || '';
  axios.get(URL);
  return response.end(`ok`);
}
