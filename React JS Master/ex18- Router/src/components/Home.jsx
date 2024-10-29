import { Link } from "react-router-dom";
import { authors } from "../db";

export default function Home() {
  return (
    <div>
      <h1>Best Seller Authors</h1>
      <ul>
        {authors.map((item) => (
          <li key={item.id}>
            <Link to={`/author/${item.link}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
