export default function Movie({ params: { tomato } }: { params: { tomato: string } }) {
  /* 

테스트 
  http://localhost:3000/movies/123323?region=kr&page=2

params외에도 쿼리 파라미터도 찾아줌

  params: { tomato: '123323' },
  searchParams: { region: 'kr', page: '2' } */

  console.log(tomato);

  return <h1>Movie {tomato}</h1>;
}
