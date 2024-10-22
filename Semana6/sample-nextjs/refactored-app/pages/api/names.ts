// pages/api/names.ts
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseItemType = {
  id: string;
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseItemType[]>
) {
  const url = "https://www.usemodernfullstack.dev/api/v1/users";
  let data: ResponseItemType[];

  try {
    const response = await fetch(url);
    data = (await response.json()) as ResponseItemType[];
  } catch (err) {
    console.error(err);
    return res.status(500).json([]);
  }

  const names = data.map((item) => ({
    id: item.id,
    name: item.name,
  }));

  return res.status(200).json(names);
}
