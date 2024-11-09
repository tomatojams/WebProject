import { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import firebase from "firebase/compat/app";

const useBoardFunctions = () => {
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");
  const [adminComments, setAdminComments] = useState({}); // 각 게시글의 댓글을 개별적으로 관리
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [userPassword, setUserPassword] = useState(localStorage.getItem("password") || "");
  const [user, setUser] = useState(null);
  const [rememberMe, setRememberMe] = useState(localStorage.getItem("rememberMe") === "true");

  useEffect(() => {
    const unsubscribePosts = db
      .collection("forestPosts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
      });

    const unsubscribeAuth = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribePosts();
      unsubscribeAuth();
    };
  }, []);

  const handlePostSubmit = () => {
    if (!name || !content || !password) {
      alert("모든 필드를 입력해주세요.");
      return;
    }
    db.collection("forestPosts").add({
      name,
      content,
      password,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      adminComments: [], // 새로운 포스트의 adminComments 필드를 배열로 초기화
    });
    setName("");
    setContent("");
    setPassword("");
  };

  const handleDeletePost = (id, postPassword) => {
    if (user) {
      const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
      if (confirmDelete) {
        db.collection("forestPosts").doc(id).delete();
      }
    } else {
      const inputPassword = prompt("삭제를 위해 비밀번호를 입력해주세요:");
      if (inputPassword === postPassword) {
        db.collection("forestPosts").doc(id).delete();
      } else {
        alert("비밀번호가 일치하지 않습니다.");
      }
    }
  };

  const handleAdminComment = (id) => {
    if (user) {
      const newComment = adminComments[id]; // 특정 게시글의 새로운 댓글
      db.collection("forestPosts").doc(id).update({
        adminComments: firebase.firestore.FieldValue.arrayUnion(newComment), // 기존 배열에 새로운 댓글 추가
      });
      setAdminComments((prev) => ({ ...prev, [id]: "" })); // 댓글 저장 후 해당 입력 필드 초기화
    } else {
      alert("관리자만 댓글을 작성할 수 있습니다.");
    }
  };

  const setAdminComment = (id, comment) => {
    setAdminComments((prev) => ({ ...prev, [id]: comment }));
  };

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, userPassword)
      .then((userCredential) => {
        setUser(userCredential.user);
        setEmail("");
        setUserPassword("");

        if (rememberMe) {
          localStorage.setItem("email", email);
          localStorage.setItem("password", userPassword);
          localStorage.setItem("rememberMe", "true");
        } else {
          localStorage.removeItem("email");
          localStorage.removeItem("password");
          localStorage.setItem("rememberMe", "false");
        }
      })
      .catch((error) => {
        alert("로그인 실패: " + error.message);
      });
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        setUser(null);
        setEmail(localStorage.getItem("email") || "");
        setUserPassword(localStorage.getItem("password") || "");
        setRememberMe(localStorage.getItem("rememberMe") === "true");
      })
      .catch((error) => alert("로그아웃 실패: " + error.message));
  };

  return {
    posts,
    name,
    setName,
    content,
    setContent,
    password,
    setPassword,
    adminComments,
    setAdminComment,
    email,
    setEmail,
    userPassword,
    setUserPassword,
    user,
    rememberMe,
    setRememberMe,
    handlePostSubmit,
    handleDeletePost,
    handleAdminComment,
    handleLogin,
    handleLogout,
  };
};

export default useBoardFunctions;
