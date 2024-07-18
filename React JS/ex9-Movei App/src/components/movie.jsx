import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Movie({ title, summary, genres, coverImg }) {
  return (
    // JSX내에서는 함수실행부도 ()로 {} 쓰면 안됨 key는 내에서 지정할수있음
    <div>
      <h2>
        <Link to="/movie">{title}</Link>
      </h2>
      <p>{summary}</p>
      <ul>
        {!genres
          ? null // 장르가 존재하는지
          : genres.map(
              (
                g // 태그안에서 {} 잊지말것
              ) => (
                <li key={g}>{g}</li> // key는 유니크 하기만 하면 됨.
              )
            )}
      </ul>
      <img src={coverImg} alt={title} />
    </div>
  );
}

Movie.PropTypes = {
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};
