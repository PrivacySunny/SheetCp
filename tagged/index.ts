import type { NextApiRequest, NextApiResponse } from "next";
import { fetchTagInfo } from "@/lib/fetchTagInfo";

type Data = {
  title: string;
  description: string;
};

type Error = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  const { tag } = req.query;

  if (typeof tag !== "string") {
    return res
      .status(400)
      .json({ error: "Tag is required and must be a string" });
  }

  try {
    const tagInfo = await fetchTagInfo(tag);
    return res.status(200).json(tagInfo);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch tag information" });
  }
}
