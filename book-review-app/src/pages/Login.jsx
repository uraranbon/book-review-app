import React, { useState } from "react";
import { Link } from "react-router-dom";
import { url } from "../const";
import axios from "axios";
import "./Login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async () => {
    if (!email || !password) {
      setErrorMessage("メールアドレスとパスワードを入力してください");
    } else if (!isValidEmail(email)) {
      setErrorMessage("正しいメールアドレスを入力してください");
    } else {
      try {
        const response = await axios.post(`${url}/signin`, {
          email: email,
          password: password,
        });
        console.log(response);
        if (response.status === 200) {
          setErrorMessage("ログインできました");
        } else {
          throw new Error("ログインに失敗しました");
        }
      } catch (error) {
        setErrorMessage(`サインインに失敗しました。${error}`);
      }
    }
  };

  const isValidEmail = (value) => {
    // メールアドレスのバリデーションチェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  return (
    <div>
      <main className="login">
        <div className="inner">
          <h2>ログイン</h2>
          <p className="error-message">{errorMessage}</p>
          <form className="login-form">
            <div className="wrap">
              <label className="email-label" htmlFor="email">
                メールアドレス
              </label>
              <input
                type="email"
                id="email"
                className="email-input"
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
                className="password-input"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              className="button"
            >
              ログイン
            </button>
          </form>
          <Link to="/signup">サインアップはこちら</Link>
        </div>
      </main>
    </div>
  );
};
