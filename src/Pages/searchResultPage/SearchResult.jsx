import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import "./searchResult.css";

const SearchResult = () => {
  const params = useParams();
  return (
    <>
      <Navbar />
      <div className="resultsPage">
        <div className="sr-page-header">
          Showing results for "{params.searchItem}"
        </div>
      </div>
    </>
  );
};

export default SearchResult;
