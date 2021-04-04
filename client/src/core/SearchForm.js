import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Search } from "semantic-ui-react";
import { listSearch } from "../post/Apiuser";
const SearchForm = () => {
  const [values, setValues] = useState({
    search: "",
    results: [],
    searched: false,
    message: "",
  });
  const { search, results, searched, message } = values;

  const handleChange = (event) => {
    setValues({
      ...values,
      search: event.target.value,
      searched: false,
    });
  };
  const searchSubmit = (event) => {
    event.preventDefault();
    listSearch({ search }).then((data) => {
      setValues({
        ...values,
        results: data,
        searched: true,
        message: `${data.length} posts found`,
      });
      console.log(data);
    });
  };
  const searchedBlogs = (results = []) => {
    return (
      <div
        className="bg-white"
        style={{
          borderRadius: "8px",
          width: "50%",
          margin: "auto",
          marginTop: "8px",
        }}
      >
        {message && (
          <p
            className="text-muted font-italic"
            style={{
              marginBottom: "4px",
              borderBottom: "1px solid #ddd",
              borderBottomRightRadius: "8px",
              borderBottomLeftRadius: "8px",
            }}
          >
            {message}
          </p>
        )}

        {results.map((post, i) => {
          return (
            <div
              key={i}
              style={{
                borderBottom: "1px solid #ddd",
                borderBottomRightRadius: "8px",
                borderBottomLeftRadius: "8px",
              }}
            >
              <Link to={`/post/${post._id}`}>
                <p className="text-primary">{post.title}</p>
              </Link>
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <form onSubmit={searchSubmit}>
      <div style={{ padding: "none!important" }}>
        <div className="ui search" style={{ position: "relative" }}>
          <div className="ui icon input">
            <input
              type="text"
              autoComplete="off"
              tabIndex="0"
              className="prompt"
              onChange={handleChange}
              value={search}
              placeholder="search posts"
            />
            <i aria-hidden="true" className="search icon"></i>
          </div>

          {searched && (
            <div
              style={{ position: "absolute", width: "100%", display: "block" }}
            >
              {searchedBlogs(results)}
            </div>
          )}
        </div>
      </div>
    </form>
  );
};
export default SearchForm;
