import React from "react";

const Pagination = ({ currentPage, setCurrentPage, hasMore }) => {
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="pagination">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1} //disabled属性（最初のページ）
        className="pagination__button"
      >
        前のページ
      </button>
      <button
        onClick={handleNextPage}
        disabled={!hasMore} //disabled属性
        className="pagination__button"
      >
        次のページ
      </button>
    </div>
  );
};

export default Pagination;