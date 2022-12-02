import React, { FC, useState, useEffect } from "react";
import styles from "./Pagination.module.css";

interface IPagination {
  totalRecords: number;
  pageLimit: number;
  onPageChanged: (
    e: React.MouseEvent<HTMLElement>,
    page?: string | number | boolean,
  ) => void;
  currentPage: number;
  cy?: string;
}

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

const range = (from: number, to: number) => {
  let i = from;
  let step = 1;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

export const Pagination: FC<IPagination> = (props) => {
  let { totalRecords, pageLimit, onPageChanged, currentPage, cy } = props;
  totalRecords = totalRecords > 100 ? 100 : totalRecords
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageNeighbours, setPageNeigbours] = useState<number>(1);
  useEffect(() => {
    setTotalPages(Math.ceil(totalRecords / pageLimit));
  }, [currentPage]);

  const fetchPageNumbers = () => {
    const totalNumbers = pageNeighbours;

    if (totalPages > totalNumbers) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

      let pages: (string | number | boolean)[] = range(startPage, endPage);

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 3);

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 5);
          pages = [
            LEFT_PAGE,
            1,
            "disabled",
            ...extraPages,
            ...pages,
            totalPages,
          ];
          break;
        }
        // handle: (1) < {4 5} [6] {7 8} > (10)
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [
            currentPage > 1 ? LEFT_PAGE : false,
            1,
            ...pages,
            "disabled",
            totalPages,
            RIGHT_PAGE,
          ];
          break;
        }
      }
      return [...pages];
    }
    return range(1, totalPages);
  };

  const pages = fetchPageNumbers() || [];
  return (
    <React.Fragment>
      <nav aria-label="Table Pagination" data-cy={cy}>
        <ul className={styles["pagination"]}>
          {pages.map((page, index) => {
            if (page === LEFT_PAGE)
              return (
                <React.Fragment key={index}>
                  <li key={"first" + index} className={styles["page_item"]}>
                    <a
                      className={`${styles.page_link} ${styles.link_arrow}`}
                      href="#"
                      aria-label="Previous"
                      onClick={(e) => onPageChanged(e, 1)}
                      data-cy={cy+'-first-page'}
                    >
                      <span
                        className={`${styles.arrow} ${styles.arrow_left}`}
                      ></span>
                      <span
                        className={`${styles.arrow} ${styles.arrow_left}`}
                      ></span>
                    </a>
                  </li>
                  <li key={"left" + index} className={styles["page_item"]}>
                    <a
                      className={`${styles.page_link} ${styles.link_arrow}`}
                      href="#"
                      aria-label="Previous"
                      onClick={(e) => onPageChanged(e, currentPage - 1)}
                      data-cy={cy+'-previous-page'}
                    >
                      <span
                        className={`${styles.arrow} ${styles.arrow_left}`}
                      ></span>
                    </a>
                  </li>
                </React.Fragment>
              );

            if (page === RIGHT_PAGE)
              return (
                <React.Fragment key={index}>
                  <li key={"right" + index} className={styles["page_item"]}>
                    <a
                      className={`${styles.page_link} ${styles.link_arrow}`}
                      href="#"
                      aria-label="Next"
                      onClick={(e) => onPageChanged(e, currentPage + 1)}
                      data-cy={cy+'-next-page'}
                    >
                      <span
                        className={`${styles.arrow} ${styles.arrow_right}`}
                      ></span>
                    </a>
                  </li>
                  <li key={"last" + index} className={styles["page_item"]}>
                    <a
                      className={`${styles.page_link} ${styles.link_arrow}`}
                      href="#"
                      aria-label="Next"
                      onClick={(e) => onPageChanged(e, totalPages)}
                      data-cy={cy+'-last-page'}
                    >
                      <span
                        className={`${styles.arrow} ${styles.arrow_right}`}
                      ></span>
                      <span
                        className={`${styles.arrow} ${styles.arrow_right}`}
                      ></span>
                    </a>
                  </li>
                </React.Fragment>
              );

            if (page === "disabled")
              return (
                <React.Fragment key={index}>
                  <li key={index} className={styles["page_item"]}>
                    <a
                      className={`${styles.page_link} ${styles.page_link_dots}`}
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      data-cy={cy+'-page-disabled'}
                    ></a>
                  </li>
                </React.Fragment>
              );

            if (page === false) return null;

            return (
              <li
                key={index}
                className={`page_item ${
                  currentPage === page ? `${styles.active}` : ""
                }`}
              >
                <a
                  className={`${styles.page_link}`}
                  href="#"
                  data-cy={cy + '-item-page-' + page}
                  onClick={(e) => onPageChanged(e, page)}
                >
                  {page}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </React.Fragment>
  );
};
