import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Search } from "semantic-ui-react";
import { listSearch } from "../post/Apiuser";

const Searchf = () => {
  const [values, setValues] = useState({
    search: undefined,
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
      results: [],
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
    });
  };
  const searchedBlogs = (results = []) => {
    return (
      <div
        className="bg-white"
        style={{ borderRadius: "8px", marginTop: "8px" }}
      >
        {message && <p className="pt-1 text-muted font-italic">{message}</p>}
        {results.map((post, i) => {
          return (
            <div key={i}>
              <Link to={`/post/${post._id}`}>
                <a className="text-primary">{post.title}</a>
              </Link>
            </div>
          );
        })}
      </div>
    );
  };
  const searchForm = () => {
    return (
      <form onSubmit={searchSubmit}>
        <div className="row">
          <div className="col-md-8">
            <input
              type="search"
              className="form-control"
              placeholder="Search blogs"
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <button
              className="btn overflow-hidden btn-block btn-outline-primary"
              type="submit"
            >
              Search
            </button>
          </div>
        </div>
      </form>
    );
  };
  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="pt-3">{searchForm()}</div>
        {searched && (
          <div
            style={{ position: "absolute", width: "100%", display: "block" }}
          >
            {searchedBlogs(results)}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
export default Searchf;
