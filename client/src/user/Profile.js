import { Fragment, useEffect, useState } from "react";
import { isAuthenticated } from "../auth/index";
import { Link } from "react-router-dom";
import DefaultAvatar from "../images/DefaultAvatar.png";
import DeleteProfile from "./DeleteProfile";
import { listByUser } from "../post/Apiuser";
import { read } from "./apiUser";
import ProfileTabs from "./ProfileTabs";
import OtherMenu from "../core/OtherMenu";
import Footer from "../core/Footer";
import Loading from "../core/Loading";
import { API } from "../Config";

const Profile = (props) => {
  const [state, setState] = useState({
    user: "",
    redirectToSignin: false,
    userposts: [],
    loading: false,
    error: "",
  });
  let user1;
  const { user, redirectToSignin, userposts, loading, error } = state;
  const getuserdata = (userId) => {
    read(userId).then((data) => {
      if (data.error) {
        setState({
          ...state,
          redirectToSignin: false,
          loading: false,
          error: data.error,
        });
      } else {
        user1 = data;
        loadposts(userId);
        setState({ ...state, user });
      }
    });
  };

  useEffect(() => {
    const userId = props.match.params.userId;
    setState({ ...state, loading: true });
    getuserdata(userId);
  }, [props.match.params.userId]);

  const loadposts = (userId) => {
    listByUser(userId, isAuthenticated().token).then((userposts) => {
      if (userposts.error) {
        setState({
          ...state,
          redirectToSignin: false,
          loading: false,
          error: userposts.error,
        });
      } else {
        setState({ ...state, userposts, user: user1, loading: false });
      }
    });
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
  return !loading && user ? (
    <Fragment>
      <OtherMenu />
      <div
        style={{
          marginBottom: "2rem",
          paddingBottom: "2rem",
          marginLeft: "4px",
        }}
      >
        {showerror(error)}
        <h2 className="mt-5 "> Profile </h2>

        <div className="row " style={{ marginTop: "10px" }}>
          <div className="lead col-md-6" style={{ textAlign: "center" }}>
            <img
              src={user.photo ? `${API}/user/photo/${user._id}` : DefaultAvatar}
              style={{ width: "200px", height: "200px", borderRadius: "50%" }}
              className="avatar_image"
            />
          </div>
          <div className="col-md-6 mt-4">
            <p className="userdetails">Hello: {user.name} </p>
            <p className="userdetails">Email: {user.email}</p>

            {isAuthenticated().user && user._id == isAuthenticated().user._id && (
              <div className="d-inline-block mt-5">
                <Link
                  className="btn btn-raised btn-success mt-5"
                  to={`/user/edit/${user._id}`}
                >
                  Edit Profile
                </Link>
                <DeleteProfile id={user._id} />
              </div>
            )}
          </div>
        </div>

        <ProfileTabs
          follower={user.followers}
          following={user.following}
          userposts={userposts}
        />
      </div>
      <Footer />
    </Fragment>
  ) : (
    loadingdata(loading)
  );
};
export default Profile;
