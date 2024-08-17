// 서버 컴포넌트로 합쳐도 됨
//

"use client";

export default function FormInput({ id, inititle, initext }) {
  return (
    <form className="postform" onSubmit={handleSubmit}>
      <input
        id="write-title-input"
        name="title"
        type="text"
        required
        defaultValue={inititle}
        // defaultValue를 쓰면 state를 안써도 수정가능
      />
      <textarea id="write-content-input" name="content" rows="10" defaultValue={initext} required />
      <input type="hidden" name="_id" value={id} />
      <button className="simplebutton-sm" type="submit">
        수정
      </button>
    </form>
  );
}

// patch를 위한 eventhandler

function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  fetch("/api/post/edit", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "/list";
      } else {
        response.json().then((errorData) => {
          alert(errorData.message);
        });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("서버 오류가 발생했습니다.");
    });
}
