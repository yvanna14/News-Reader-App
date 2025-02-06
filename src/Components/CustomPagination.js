import { Pagination } from "react-bootstrap";

function CustomPagination(props) {
  const { currentPage, totalPages, handleCLick } = props;

  const renderPageItems = () => {
    const pageItems = [];

    for (let i = 1; i <= totalPages; i++) {
      pageItems.push(
        <Pagination 
        key= {i} 
        active={i === currentPage}
        onClick={() => handleCLick(i)}>
          {i}
        </Pagination>
      );
    }
    return pageItems;
  };
  return <div className="d-flex justify-content-center">
    <Pagination>
        <Pagination.Prev />
        {renderPageItems()}
        <Pagination.Next />
    </Pagination>
  </div>
}

export default CustomPagination;
