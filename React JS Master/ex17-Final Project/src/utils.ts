import { IMovieInfo } from "./type/IMovieInfo";

function makeImagePath(id?: string, format?: string) {
  if (!id) {
    return "";
  }
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}

const findIndexById = (id: number, detail: IMovieInfo[]) => {
  const index = detail.findIndex((movie) => movie.id === id);
  return index;
};

const findImageById = (id: string | undefined, detail: IMovieInfo[] | undefined) => {
  if (!id || !detail) {
    return undefined;
  }
  const index = findIndexById(+id, detail);
  return detail[index].poster_path;
};

export { makeImagePath, findImageById, findIndexById };
