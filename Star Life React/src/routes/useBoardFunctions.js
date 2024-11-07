import { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import firebase from "firebase/compat/app";

const useBoardFunctions = () => {
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");
  const [adminComment, setAdminComment] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [userPassword, setUserPassword] = useState(localStorage.getItem("password") || "");
  const [user, setUser] = useState(null);
  const [rememberMe, setRememberMe] = useState(localStorage.getItem("rememberMe") === "true");

  useEffect(() => {
    const unsubscribePosts = db
      .collection("posts")
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
    db.collection("posts").add({
      name,
      content,
      password,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setName("");
    setContent("");
    setPassword("");
  };

  const handleDeletePost = (id, postPassword) => {
    if (user) {
      const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
      if (confirmDelete) {
        db.collection("posts").doc(id).delete();
      }
    } else {
      const inputPassword = prompt("삭제를 위해 비밀번호를 입력해주세요:");
      if (inputPassword === postPassword) {
        db.collection("posts").doc(id).delete();
      } else {
        alert("비밀번호가 일치하지 않습니다.");
      }
    }
  };

  const handleAdminComment = (id) => {
    if (user) {
      db.collection("posts").doc(id).update({
        adminComment,
      });
      setAdminComment("");
    } else {
      alert("관리자만 댓글을 작성할 수 있습니다.");
    }
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
        // 로그아웃 후 로컬 스토리지의 이메일, 비밀번호, 체크 상태를 다시 불러옵니다.
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
    adminComment,
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
