import { useOutletContext } from "react-router-dom";

export default function BookCharacters() {
  const { characters } = useOutletContext();

  if (!characters || characters.length === 0) {
    return <p>No characters available.</p>;
  }

  return (
    <div>
      <h3>Characters</h3>
      <ul>
        {characters.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
