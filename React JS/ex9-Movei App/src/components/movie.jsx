import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Movie({ title, summary, genres, coverImg }) {
  return (
    // JSX내에서는 함수실행부도 ()로 {} 쓰면 안됨 key는 내에서 지정할수있음
    <div className="Movie">
      <h2 className="title">
        <Link to="/movie">{title}</Link>
      </h2>
      <ul>
        {!genres // 태그안에서 {} 잊지말것
          ? null // 장르가 존재하는지
          : genres.map((g) => (
              <li key={g}> `{g}` </li> // key는 유니크 하기만 하면 됨.
            ))}
      </ul>
      <div className={`summary ${!summary ? "hidden" : ""}`}>
        <p>{summary}</p>
      </div>

      <div className="imgbox">
        <img src={coverImg} alt={title} />
      </div>
    </div>
  );
}

Movie.PropTypes = {
  title: PropTypes.string.isRequired,
  coverImg: PropTypes.string.isRequired,

  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};
