import BookReviewListHeader from "../components/BookReviewListHeader";
import UpdateProfile from "../components/UpdateProfile";

export const Profile = () => {
  return (
    <>
      <BookReviewListHeader />
      <main className="profile">
        <div className="inner">
          <h1>ユーザー名変更</h1>
          <UpdateProfile />
        </div>
      </main>
    </>
  );
};
