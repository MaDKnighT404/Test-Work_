import Button from "../../../shared/components/Button";

import { getPageNumbers } from "../helpers/getPageNumbers";

const Pagination = ({
  page,
  setPage,
  totalPages = 1,
  disabled,
}: {
  page: number;
  setPage: (page: number) => void;
  totalPages: number | undefined;
  disabled: boolean;
}) => {
  const handlePrevious = () => {
    setPage(page - 1);
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  const pageNumbers = getPageNumbers(totalPages, page);

  return (
    <div className="mx-auto flex w-full max-w-[600px] items-center justify-center gap-6">
      <Button onClick={handlePrevious} disabled={page === 1 || disabled}>
        Previous
      </Button>

      <ul className="flex flex-wrap items-center gap-2">
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber}>
            <Button
              size="sm"
              variant={pageNumber === page ? "primary" : "secondary"}
              onClick={() => setPage(pageNumber)}
              disabled={disabled}
              className="h-8 w-8"
            >
              {pageNumber}
            </Button>
          </li>
        ))}
      </ul>

      <Button onClick={handleNext} disabled={page === totalPages || disabled}>
        Next
      </Button>
    </div>
  );
};

export default Pagination;
