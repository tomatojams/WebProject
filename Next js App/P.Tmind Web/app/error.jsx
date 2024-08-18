"use client";

export default function Error({ error, reset }) {
  console.log("Error & Reset:", error, reset);
  return (
    <div className="detail_frame">
      <button className="simplebutton-sm" onClick={() => reset()}>
        에러 리셋
      </button>
    </div>
  );
}
