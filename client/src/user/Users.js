import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import DefaultAvatar from "../images/DefaultAvatar.png";
import { list } from "./apiUser";
import MainMenu from "../core/Menu";
import UserCard from "./UserCard";
import Footer from "../core/Footer";
import SearchUsers from "../core/SearchUsers";
import Loading from "../core/Loading";
const Users = () => {
  const [values, setValues] = useState({
    users: [],
    laoding: false,
    error: "",
  });
  useEffect(() => {
    getallUsers();
  }, []);
  const getallUsers = () => {
    setValues({ ...values, loading: true });
    list().then((data) => {
      if (data.error) {
        window.alert("There is an error");
        setValues({ ...values, loading: false, error: data.error });
      } else {
        setValues({ ...values, loading: false, users: data });
      }
    });
  };
  const authentication = (id) => {
    if (!isAuthenticated()) {
      return true;
    } else if (isAuthenticated() && isAuthenticated().user._id == id) {
      return false;
    }
    return true;
  };
  const renderUsers = (users) => {
    return (
      <div className="row justify-content-center">
        {users[0] ? (
          users.map(
            (user, i) =>
              authentication(user._id) && <UserCard user={user} key={i} />
          )
        ) : (
          <h1 className="pt-2 mt-4">No user Exists</h1>
        )}
      </div>
    );
  };
  const showerror = (error) => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };
  const loadingdata = (loading) => {
    return loading ? <Loading /> : "";
  };

  const { users, loading, error } = values;
  return !loading ? (
    <Fragment>
      <MainMenu />
      <SearchUsers />
      <div className="container">
        <h2>Users</h2>
        {showerror(error)}
        {renderUsers(users)}
      </div>
      <Footer />
    </Fragment>
  ) : (
    loadingdata(loading)
  );
};
export default Users;
