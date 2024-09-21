// 정적 렌더링 강제
export const dynamic = "force-static";

export default function notFound() {
  return (
    <div className="detail-border">
      <h4>페이지를 찾을 수 없습니다.🤣</h4>
    </div>
  );
}
