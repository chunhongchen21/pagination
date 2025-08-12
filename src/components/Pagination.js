export default Pagination = ({
  pages_number,
  setCurr,
  curr,
  goToPrevPage,
  goToNextPage,
}) => {
  const pageNumbers = Array(pages_number)
    .fill(0)
    .map((_, i) => i + 1);
  return (
    <div>
      {curr !== 0 && <button onClick={() => goToPrevPage()}>←</button>}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => setCurr(page - 1)}
          className={page == curr + 1 ? "active" : ""}
        >
          {page}
        </button>
      ))}
      {curr !== pages_number - 1 && (
        <button onClick={() => goToNextPage()}>→</button>
      )}
    </div>
  );
};
