import BookReviewList from "../components/BookReviewList";

export const Home = () => {
  return (
    <main className="home">
      <div className="inner">
        <h1>書籍レビュー一覧</h1>
        <BookReviewList />
      </div>
    </main>
  );
};
