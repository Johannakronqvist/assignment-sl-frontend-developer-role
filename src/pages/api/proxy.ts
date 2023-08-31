// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: any, res: any) {
  const { method, body } = req;
  const endpoint = req.query.endpoint;

  console.log('body is: ', body);
  console.log('endpoint is: ', endpoint);
  const response = await fetch(
    `https://test-api-sl.vercel.app/api/${endpoint}`,
    {
      method: method,
      body: req.body,
    }
  );
  const data = await response.json();
  res.status(response.status).json(data);
}
