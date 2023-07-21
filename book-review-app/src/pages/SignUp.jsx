import React, { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { url } from "../const";
import axios from "axios";
import Compressor from "compressorjs";
import "./SignUp.css";

export const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [iconUrl, setIconUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState();

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
          setIconUrl(result);
        },
        error: (error) => {
          console.error(error.message);
        },
      });
    }
  };

  const handleSubmit = () => {
    const data = {
      name: name,
      email: email,
      password: password,
      iconUrl: iconUrl,
    };
    if (!email || !password || !name || !iconUrl) {
      setErrorMessage("フォームは全て入力してください");
    } else if (!isValidEmail(email)) {
      setErrorMessage("正しいメールアドレスを入力してください");
    } else {
      axios
        .post(`${url}/users`, data)
        .then((response) => {
          alert("サインアップできました");
          navigate("/");
        })
        .catch((error) => {
          setErrorMessage(`サインアップに失敗しました。 ${error}`);
        });
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
          <h2>サインアップ</h2>
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
            {iconUrl && (
              <div className="compressed-image">
                <p>圧縮されました</p>
                <img
                  src={URL.createObjectURL(iconUrl)}
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
