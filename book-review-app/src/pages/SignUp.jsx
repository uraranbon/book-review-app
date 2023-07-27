import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { url } from "../const";
import axios from "axios";
import Compressor from "compressorjs";
import "./SignUp.css";

export const SignUp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      navigate('/');
    }
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [iconFile, setIconFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      new Compressor(file, {
        quality: 0.6,
        maxWidth: 300,
        maxHeight: 300,
        success: (result) => {
          setIconFile(result);
        },
        error: (error) => {
          console.error(error.message);
        },
      });
    }
  };

  const handleSubmit = async () => {
    if (!email || !password || !name) {
      setErrorMessage("フォームは全て入力してください");
      return;
    } else if (!isValidEmail(email)) {
      setErrorMessage("正しいメールアドレスを入力してください");
      return;
    } else if (!iconFile) {
      setErrorMessage("アイコンを登録してください");
      return;
    }

    const userData = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(`${url}/users`, userData);
      // ユーザー登録後に返ってきたトークンを取得
      const token = response.data.token;

      if (!token) {
        setErrorMessage("認証トークンがありません");
        return;
      }

      // 画像アップロードのリクエスト
      const iconFormData = new FormData();
      iconFormData.append("icon", iconFile);
      await axios.post(`${url}/uploads`, iconFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      //ローカルストレージに認証トークンを保存
      localStorage.setItem("authToken", token);

      navigate("/");
    } catch (error) {
      console.error(error);
      setErrorMessage(`サインアップに失敗しました。 ${error}`);
    }
  };

  const isValidEmail = (value) => {
    // メールアドレスのバリデーションチェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  return (
    <div>
      <main className="signup">
        <div className="inner">
          <h1>サインアップ</h1>
          <p className="error-message">{errorMessage}</p>
          <form className="signup-form">
            <div className="wrap">
              <label className="name-label" htmlFor="name">
                名前
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                required
              />
            </div>
            <div className="wrap">
              <label className="email-label" htmlFor="email">
                メールアドレス
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="wrap">
              <label className="password-label" htmlFor="password">
                パスワード
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="wrap">
              <label className="file-label" htmlFor="file">
                ユーザーアイコン画像
              </label>
              <input
                type="file"
                id="file"
                accept="image/*"
                onChange={handleIconChange}
              />
            </div>
            {iconFile && (
              <div className="compressed-image">
                <p>圧縮されました</p>
                <img
                  src={URL.createObjectURL(iconFile)}
                  alt="圧縮後"
                  width="300"
                />
              </div>
            )}
            <button type="button" onClick={handleSubmit} className="button">
              サインアップ
            </button>
          </form>
          <Link to="/login">ログインはこちら</Link>
        </div>
      </main>
    </div>
  );
};
