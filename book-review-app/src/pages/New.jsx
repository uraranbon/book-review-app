import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../const";
import BookReviewListHeader from "../components/BookReviewListHeader";
import "./New.css";

export const New = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [bookUrl, setBookUrl] = useState("");
  const [detail, setDetail] = useState("");
  const [review, setReview] = useState("");

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleBookUrlChange = (e) => setBookUrl(e.target.value);
  const handleDetailChange = (e) => setDetail(e.target.value);
  const handleReviewChange = (e) => setReview(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authToken = localStorage.getItem("authToken");

    try {
      await axios.post(
        `${url}/books`,
        {
          title: title,
          url: bookUrl,
          detail: detail,
          review: review,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      alert("レビューが登録されました");
      navigate("/");
    } catch (error) {
      console.error("Error creating review:", error);
      alert("レビューの登録に失敗しました");
    }
  };

  return (
    <div>
      <BookReviewListHeader />
      <main className="new">
        <div className="inner">
          <h2>書籍レビュー登録</h2>
          <form className="new-form" onSubmit={handleSubmit}>
            <table className="new-table">
              <tbody>
                <tr>
                  <th>タイトル</th>
                  <td>
                    <input
                      type="text"
                      value={title}
                      onChange={handleTitleChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <th>URL</th>
                  <td>
                    <input
                      type="text"
                      value={bookUrl}
                      onChange={handleBookUrlChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <th>詳細</th>
                  <td>
                    <textarea
                      value={detail}
                      onChange={handleDetailChange}
                      rows={10}
                      cols={50}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <th>レビュー</th>
                  <td>
                    <textarea
                      value={review}
                      onChange={handleReviewChange}
                      rows={10}
                      cols={50}
                      required
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="button-wrap">
              <Link to="/" className="button">
                一覧へ戻る
              </Link>
              <button type="submit" className="button">
                登録
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
