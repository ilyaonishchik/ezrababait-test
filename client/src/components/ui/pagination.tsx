export type PaginationProps = {
  paginationProps: {
    page: number;
    setPage: (value: React.SetStateAction<number>) => void;
    take: number;
    setTake: (value: React.SetStateAction<number>) => void;
    count: number;
  };
};

export default function Pagination({ paginationProps }: PaginationProps) {
  const { count, page, setPage, take } = paginationProps;
  return (
    <div className='join justify-center'>
      <button className='btn join-item' onClick={() => setPage((prev) => prev - 1)} disabled={page === 1}>
        «
      </button>
      <button className='btn join-item'>{page}</button>
      <button
        className='btn join-item'
        onClick={() => setPage((prev) => prev + 1)}
        disabled={page === Math.ceil(count / take)}
      >
        »
      </button>
    </div>
  );
}
