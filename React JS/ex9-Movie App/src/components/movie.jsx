import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Movie({ id, title, summary, genres, coverImg }) {
  return (
    // JSX내에서는 함수실행부도 ()로 {} 쓰면 안됨 key는 내에서 지정할수있음
    <div className="Movie">
      <h2 className="title">
        <Link
          to={
            `/movie/${id}`
            // 변수지정될때는 곧바로 `` 이 아닌 {} 그속에서 ``을 쓴다.
          }>
          {title}
        </Link>
      </h2>
      <ul>
        {!genres // 태그안에서 {} 잊지말것
          ? null // 장르가 존재하는지
          : genres.map((g) => (
              <li key={g}> `{g}` </li> // key는 유니크 하기만 하면 됨.
            ))}
      </ul>
      <div className={`summary ${!summary ? "hidden" : ""}`}>
        <p>{summary.length > 255 ? `${summary.slice(0, 255)}...` : summary}</p>
      </div>

      <div className="imgbox">
        <img src={coverImg} alt={title} />
      </div>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  // 컴포넌트의 속성일때는 소문자로 시작
  title: PropTypes.string.isRequired, // 객체을 뜻하기때문에 대문자 , 객체일때는 항상 대문자
  coverImg: PropTypes.string.isRequired,

  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};
