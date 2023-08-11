import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../const";
import BookReviewListHeader from "../components/BookReviewListHeader";
import "./Edit.css";

export const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [bookUrl, setBookUrl] = useState("");
  const [detail, setDetail] = useState("");
  const [review, setReview] = useState("");

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`${url}/books/${id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        });
        setTitle(response.data.title);
        setBookUrl(response.data.url);
        setDetail(response.data.detail);
        setReview(response.data.review);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${url}/books/${id}`,
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

      alert("レビューが更新されました");
      navigate("/");
    } catch (error) {
      console.error("Error updating review:", error);
      alert("レビューの更新に失敗しました");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${url}/books/${id}`,{
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      alert("レビューが削除されました");
      navigate("/");
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("レビューの削除に失敗しました");
    }
  };

  return (
    <div>
      {loading ? (
        <p>ロード中</p>
      ) : (
        <>
          <BookReviewListHeader />
          <main className="edit">
            <div className="inner">
              <h2>書籍レビュー編集</h2>
              <form>
                <table className="edit-table">
                  <tbody>
                    <tr>
                      <th>タイトル</th>
                      <td>
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
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
                          onChange={(e) => setBookUrl(e.target.value)}
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>詳細</th>
                      <td>
                        <textarea
                          value={detail}
                          onChange={(e) => setDetail(e.target.value)}
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
                          onChange={(e) => setReview(e.target.value)}
                          rows={10}
                          cols={50}
                          required
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="button-wrap">
                  <button
                    type="button"
                    onClick={handleUpdate}
                    className="button"
                  >
                    更新
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="button"
                  >
                    削除
                  </button>
                </div>
              </form>
            </div>
          </main>
        </>
      )}
    </div>
  );
};
