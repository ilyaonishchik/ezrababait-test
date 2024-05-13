import { useState } from 'react';

type UsePaginationProps = {
  initialPage: number;
  initialTake: number;
};

export const usePagination = ({ initialPage, initialTake }: UsePaginationProps) => {
  const [page, setPage] = useState<number>(initialPage);
  const [take, setTake] = useState<number>(initialTake);

  return { page, setPage, take, setTake };
};
