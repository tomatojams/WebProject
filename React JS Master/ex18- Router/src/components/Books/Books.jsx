import { Link, Outlet, useOutletContext, useParams } from "react-router-dom";

export default function Books() {
  const { id } = useParams();
  const { books = [] } = useOutletContext();

  const paramedBook = books.find((item) => item.id === id);

  if (!paramedBook) {
    return <p>Book not found</p>;
  }

  return (
    <div>
      <h2>{paramedBook.title}</h2>
      <ul>
        <li>
          <Link to="chapters">Chapters</Link>
        </li>
        <li>
          <Link to="characters">Characters</Link>
        </li>
      </ul>

      <Outlet
        context={{
          chapters: paramedBook.chapters || [],
          characters: paramedBook.characters || [],
        }}
      />
    </div>
  );
}
