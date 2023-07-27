import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { url } from "../const";

const BookReviewListHeader = () => {
  const [userName, setUserName] = useState("");

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
        <p>ようこそ、{userName}さん</p>
      ) : (
        <Link to="/login">ログイン</Link>
      )}
    </header>
  );
};

export default BookReviewListHeader;
