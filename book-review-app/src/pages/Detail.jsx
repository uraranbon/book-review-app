import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { url } from "../const";
import BookReviewListHeader from "../components/BookReviewListHeader";
import "./Detail.css";
import { Link } from "react-router-dom";

export const Detail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [bookDetails, setBookDetails] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      const authToken = localStorage.getItem("authToken");

      try {
        const response = await axios.get(`${url}/books/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setBookDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setLoading(false);
      }
    };
    fetchBookDetails();
  }, [id]);

  return (
    <div>
      <BookReviewListHeader />
      {loading ? (
        <div className="loading">ロード中</div>
      ) : (
        <main className="new">
          <div className="inner">
            {bookDetails && (
              <div>
                <h2>{bookDetails.title}</h2>
                <table className="detail-table">
                  <tbody>
                    <tr>
                      <th>ID</th>
                      <td>{bookDetails.id}</td>
                    </tr>
                    <tr>
                      <th>URL</th>
                      <td>
                        <Link to={bookDetails.url} target="_blank">
                          {bookDetails.url}
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <th>詳細</th>
                      <td>{bookDetails.detail}</td>
                    </tr>
                    <tr>
                      <th>レビュー</th>
                      <td>{bookDetails.review}</td>
                    </tr>
                    <tr>
                      <th>レビューした人</th>
                      <td>{bookDetails.reviewer}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            <Link to="/" className="button">
              一覧へ戻る
            </Link>
          </div>
        </main>
      )}
    </div>
  );
};
