import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../const";
import "./BookReviewListHeader.css";

const BookReviewListHeader = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  const handleLogout = () => {
    //ローカルストレージ保存された認証トークンを削除
    localStorage.removeItem("authToken");
    navigate("/login");
  };


  useEffect(() => {
    const authToken = localStorage.getItem("authToken"); // 認証トークンをローカルストレージから取得

    if (authToken) {
      // 認証トークンがある場合はユーザー情報を取得
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`${url}/users`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });

          // ユーザー情報からユーザー名を取得して表示
          setUserName(response.data.name);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, []);

  return (
    <header>
      {userName ? (
        <>
        <p>ようこそ、{userName}さん</p>
        <Link to="/profile">ユーザー名を変更する</Link>
        <button onClick={handleLogout}>ログアウトする</button>
        </>
      ) : (
        <Link to="/login">ログインはこちら</Link>
      )}
    </header>
  );
};

export default BookReviewListHeader;
