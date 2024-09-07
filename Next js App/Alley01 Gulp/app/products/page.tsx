import Link from "next/link";
const productList = ["shirt", "pants", "shoes", "coat"];

export default function product() {
  return (
    <>
      <h1>제품 페이지</h1>
      <ul>
        {productList.map((id, index) => (
          <li key={index}>
            {/* 여기서 id는 네이밍이 아니라 단순히 변수라서 받아갈때는 product나 다른걸로 받아도 됨 */}
            <Link href={`/products/${id}`}>{id}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
