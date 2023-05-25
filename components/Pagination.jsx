import React from "react";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  return (
    <div className="btn-group">
      {Array(totalPages)
        .fill(0)
        .map((page, index) => {
          return (
            <button
              onClick={() => setCurrentPage(index + 1)}
              className={`btn btn-lg ${
                index + 1 === currentPage && "btn-active"
              }`}
            >
              {index + 1}
            </button>
          );
        })}
    </div>
  );
};

export default Pagination;
