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
      <div class="input-group mx-auto text-secondary">
        <input
          type="text"
          id="search_field"
          class="form-control me-2"
          placeholder="¿Que buscas?..."
          onChange={(e)=>setKeyword(e.target.value)}
        ></input>
        <div class="input-group-append">
          <button id="search-btn" class="btn">
            <i
              className="fa fa-search-plus"
              aria-hidden="true"
            ></i>
          </button>
        </div>
      </div>
    </form>
  );
};

export default Search;
