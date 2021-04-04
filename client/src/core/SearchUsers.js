import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Search } from "semantic-ui-react";
import { SearchUser } from "../post/Apiuser";
const SearchUsers = () => {
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
    SearchUser({ search }).then((data) => {
      setValues({
        ...values,
        results: data,
        searched: true,
        message: `${data.length} users found`,
      });
      console.log(data);
    });
  };
  const searchedBlogs = (results = []) => {
    return (
      <div
        className="bg-white"
        style={{ borderRadius: "8px", width: "65%", marginTop: "8px" }}
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

        {results.map((user, i) => {
          return (
            <div
              key={i}
              style={{
                borderBottom: "1px solid #ddd",
                borderBottomRightRadius: "8px",
                borderBottomLeftRadius: "8px",
              }}
            >
              <Link to={`/user/${user._id}`}>
                <p className="text-primary">{user.name}</p>
              </Link>
            </div>
          );
        })}
      </div>
    );
  };
  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <div className="row">
        <div className="col-md-8">
          <input
            type="search"
            className="form-control"
            placeholder="Search blogs"
            onChange={handleChange}
            placeholder="search a user"
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
  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="pt-3">{searchForm()}</div>
        {searched && (
          <div
            style={{
              position: "absolute",
              width: "100%",
              display: "block",
              zIndex: 100,
            }}
          >
            {searchedBlogs(results)}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
export default SearchUsers;
