import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";


const Search = () => {

    const [keyword, setKeyword] = useState("")
    const navigate = useNavigate(); 

    const searchHandler = (e) => {
        e.preventDefault();

        if (keyword.trim()) {
            navigate(`/search/${keyword}`)
        } else {
            navigate("/")
        }
    }
  return (
    <form onSubmit={searchHandler}>
      <div class="input-group mb-3 mx-auto my-auto">
        <input
          type="text"
          id="search_field"
          className="input"
          placeholder="¿Que buscas?..."
          onChange={(e) => setKeyword(e.target.value)}
        ></input>
        <div class="input-group-append">
          <button id="search-btn" class="btn btn-outline-secondary search">
            <i className="fa fa-search-plus" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </form>
  );
};

export default Search;
