import { Link, Outlet, useParams } from "react-router-dom";
import { authors } from "../db";

const stringFromUrl = (str) => str.replaceAll("_", " ");

export default function Author() {
  const { name } = useParams();

  const stringedName = stringFromUrl(name);
  const author = authors?.find((item) => item?.name === stringedName) || null;

  return (
    <div>
      <h1>{stringedName}</h1>
      <ul>
        {author.books.map((item) => (
          <li key={item.id}>
            <Link to={item.id}>{item.title}</Link>
          </li>
        ))}
      </ul>

      <Outlet context={{ books: author.books }} />
    </div>
  );
}
