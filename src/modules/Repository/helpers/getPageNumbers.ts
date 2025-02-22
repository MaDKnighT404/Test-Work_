import { MAX_VISIBLE_PAGES } from "../../../conts";

export const getPageNumbers = (totalPages: number, page: number) => {
  const numbers: number[] = [];

  if (totalPages <= MAX_VISIBLE_PAGES) {
    for (let i = 1; i <= totalPages; i++) {
      numbers.push(i);
    }
  } else {
    if (page <= Math.ceil(MAX_VISIBLE_PAGES / 2)) {
      for (let i = 1; i <= MAX_VISIBLE_PAGES; i++) {
        numbers.push(i);
      }
    } else if (page > totalPages - Math.floor(MAX_VISIBLE_PAGES / 2)) {
      for (let i = totalPages - MAX_VISIBLE_PAGES + 1; i <= totalPages; i++) {
        numbers.push(i);
      }
    } else {
      const offset = Math.floor(MAX_VISIBLE_PAGES / 2);
      for (let i = page - offset; i <= page + offset; i++) {
        numbers.push(i);
      }
    }
  }

  return numbers;
};
