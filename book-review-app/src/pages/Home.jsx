import BookReviewList from "../components/BookReviewList";
import BookReviewListHeader from "../components/BookReviewListHeader";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <BookReviewListHeader />
      <main className="home">
        <div className="inner">
          <h1>書籍レビュー一覧</h1>
          <Link to="/new" className="button">投稿する</Link>
          <BookReviewList />
        </div>
      </main>
    </>
  );
};
