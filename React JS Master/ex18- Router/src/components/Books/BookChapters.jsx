import { useOutletContext } from "react-router-dom";

export default function BookChapters() {
  const { chapters } = useOutletContext();

  if (!chapters || chapters.length === 0) {
    return <p>No chapters available.</p>; // 예외 처리 추가
  }

  return (
    <div>
      <h3>Chapters</h3>
      <ul>
        {chapters.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
