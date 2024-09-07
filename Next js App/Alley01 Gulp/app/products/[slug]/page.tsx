type Props = {
  // 객체라는 표시
  params: {
    // 객체내부의 속성 + 객체라는 표시
    slug: string; // 객체내부의 속성: type
  };
};

// metadata의  타이틀을 바꿔줌

export function generateMetadata({ params }: Props) {
  return {
    title: `제품의 이름:${params.slug}`,
  };
}

// 생성은 id로 해도 받아오는 것은 폴더명의 [slug]로 받아옴
export default function productPants({ params }: Props) {
  // 주소창의 글짜를 디코딩해줌
  const decoded = decodeURIComponent(params.slug);
  return <h1>{decoded} 정보</h1>;
}

// SSG로 만들기위한 json 생성함수 params에 전달
export function generateStaticParams() {
  const products = ["pants", "skirt"];
  return products.map((product) =>
    // params 내부에 들어가는 형태로 객체를 만들어주면됨
    // 배열형태로 두개의 객체가 리턴됨
    // SSG 형태로 만들어짐
    ({
      slug: product,
    })
  );
}
