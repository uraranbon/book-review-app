import React, { useState, useEffect } from "react";
import { url } from "../const";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./BookReviewList.css";
import Pagination from "./Pagination";

const BookReviewList = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 10;

  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const fetchReviews = async () => {
      try {
        const offset = (currentPage - 1) * reviewsPerPage;
        const responseBook = await axios.get(`${url}/books?offset=${offset}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        });
        setReviews(responseBook.data);
        setLoading(false); //データの取得が完了したらfalse
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setLoading(false);
      }
    };
    fetchReviews();
  }, [currentPage, dispatch]);

  //ログを送信
  const handleSelectBook = async (bookId) => {
    const authToken = localStorage.getItem("authToken");

    try {
      await axios.post(
        `${url}/logs`,
        { selectBookId: bookId },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      alert("ログを送信しました");
      navigate(`/detail/${bookId}`);
    } catch (error) {
      console.error("Error sending log:", error);
    }
  };

  return (
    <div className="book-review">
      {loading ? (
        <p>ロード中</p>
      ) : (
        <>
          <ul className="book-review-list__list">
            {reviews.map((review) => (
              <li className="book-review-list__item" key={review.id}>
                <h2 className="book-review-list__title">{review.title}</h2>
                <p className="book-review-list__info">ID：{review.id}</p>
                <p className="book-review-list__info">URL：{review.url}</p>
                <p className="book-review-list__info">詳細：{review.detail}</p>
                <p className="book-review-list__info">
                  レビュー：{review.review}
                </p>
                <p className="book-review-list__info">
                  レビューした人：{review.reviewer}
                </p>
                <div className="button-wrap">
                  <button
                    key={review.id}
                    onClick={() => handleSelectBook(review.id)}
                    className="button"
                  >
                    詳細を見る
                  </button>
                  {review.isMine && (
                    <Link to={`/edit/${review.id}`} className="button">編集する</Link>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            hasMore={reviews.length === reviewsPerPage}
          />
        </>
      )}
    </div>
  );
};

export default BookReviewList;
