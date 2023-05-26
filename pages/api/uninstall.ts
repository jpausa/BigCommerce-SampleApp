import { NextApiRequest, NextApiResponse } from "next";
import { QueryParams, getBCVerify } from "../../lib/auth";

export default async function uninstall(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await getBCVerify(req.query as QueryParams);
    res.status(200).end();
  } catch (error) {
    const { message, response } = error;
    res.status(response?.status || 500).json(message);
  }
}