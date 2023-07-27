import React, { useState, useEffect } from "react";
import { url } from "../const";
import axios from "axios";
import { useDispatch } from "react-redux";
import "./BookReviewList.css";

const BookReviewList = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const userData = {
        name: "cat",
        email: "cat@cat.com",
        password: "cat",
      };

      try {
        const responseToken = await axios.post(`${url}/users`, userData);
        const token = responseToken.data.token;
        const responseBook = await axios.get(`${url}/books`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
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
  }, dispatch);

  const goToPrevPage = () => {

  };

  const goToNextPage = () => {

  };

  return (
    <div className="book-review">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul className="book-review-list__list">
            {reviews.map((review) => (
              <li key={review.id} className="book-review-list__item">
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
              </li>
            ))}
          </ul>
          <button onClick={goToPrevPage}>
            前へ
          </button>
          <button onClick={goToNextPage}>
            次へ
          </button>
        </>
      )}
    </div>
  );
};

export default BookReviewList;
