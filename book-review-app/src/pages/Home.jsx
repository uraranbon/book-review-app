import BookReviewList from "../components/BookReviewList";
import BookReviewListHeader from "../components/BookReviewListHeader";

export const Home = () => {
  return (
    <>
      <BookReviewListHeader />
      <main className="home">
        <div className="inner">
          <h1>書籍レビュー一覧</h1>
          <BookReviewList />
        </div>
      </main>
    </>
  );
};
