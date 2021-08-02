import React, { useState } from "react";

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");
  //const history = useHistory();
  //   useEffect(() => {
  //     console.log(keyword);
  //   }, []);
  function searchHandler(e) {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  }
  return (
    <div className="d-flex col-md-4 col-lg-6 col-xs-2 search">
      <input
        type="text "
        className="form-control rounded-0"
        placeholder="Enter Product Name..."
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button
        className="btn text-secondary bg-warning rounded-0 ml-0"
        type="button"
        onClick={searchHandler}
      >
        <i className="fa fa-search"></i>
      </button>
    </div>
  );
};

export default Search;
