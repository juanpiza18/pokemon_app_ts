import React from "react";
import styles from "./pagination.module.css";

interface PaginationProps {
  paginationNext: () => void;
  paginationPrev: () => void;
}

const Pagination = ({ paginationNext, paginationPrev }: PaginationProps) => {
  return (
    <div className={styles.list__actions} data-testid="pagination">
      <button className="btn" onClick={paginationPrev}>
        &larr; Prev
      </button>
      <button className="btn" onClick={paginationNext}>
        Next &rarr;
      </button>
    </div>
  );
};

export default Pagination;
