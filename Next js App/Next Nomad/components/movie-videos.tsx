import axios from "axios";
const API_URL = "https://nomad-movies.nomadcoders.workers.dev/movies";
import styles from "../app/styles/movie-videos.module.css";

async function getVideos(tomato: string) {
  console.log(`Fetching videos", ${Date.now()}`);
  await new Promise((resolve) => setTimeout(resolve, 3000));
  // throw new Error("I can't find videos");
  const res = await axios(`${API_URL}/${tomato}/videos`);
  return res.data;
}

export default async function MovieVideos({ tomato }: { tomato: string }) {
  const videos = await getVideos(tomato);

  return (
    <div className={styles.container}>
      {videos.map((video) => (
        <iframe
          key={video.id}
          src={`https://youtube.com/embed/${video.key}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={video.name}
        />
      ))}
    </div>
  );
}
