import axios from "axios";
import { API_URL } from "../app/(home)/page";

async function getVideos(tomato: string) {
  console.log(`Fetching videos", ${Date.now()}`);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    throw new Error("I can't find videos");
//   const res = await axios(`${API_URL}/${tomato}/videos`);
//   return res.data;
}

export default async function MovieVideos({ tomato }: { tomato: string }) {
  const videos = await getVideos(tomato);
//   console.log("video", videos[0]);
  return <h6>{videos[0].name}</h6>;
}
