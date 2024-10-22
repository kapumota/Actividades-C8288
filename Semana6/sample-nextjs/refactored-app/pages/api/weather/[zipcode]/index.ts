// pages/api/weather/[zipcode]/index.ts
import type { NextApiRequest, NextApiResponse } from "next";

type WeatherDetailType = {
  zipcode: string;
  weather: string;
  temp?: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<WeatherDetailType>
) {
  const { zipcode } = req.query;

  res.status(200).json({
    zipcode: typeof zipcode === "string" ? zipcode : "unknown",
    weather: "sunny",
    temp: 35,
  });
}
