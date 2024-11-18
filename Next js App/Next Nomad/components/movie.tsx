'use client'

interface IMovieProps {
  title: string;
  id: string;
  poster_path: string;
}

import Link from "next/link";
import styles from "../app/styles/movie.module.css";
import { useRouter } from "next/navigation";

export default function Movie({ id, title, poster_path }: IMovieProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/movies/${id}`);
  };
  return (
    <div className={styles.movie} key={id}>
      <img src={poster_path} alt={title} onClick={handleClick} />
      <Link href={`/movies/${id}`}>{title}</Link>
    </div>
  );
}
