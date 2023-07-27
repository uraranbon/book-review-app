import React, { useState, useEffect } from "react";
import { url } from "../const";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./BookReviewList.css";
import Pagination from "./Pagination";

const BookReviewList = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 10;

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
                <p className="book-review-list__info">URL：<Link to={review.url}>{review.url}</Link></p>
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
