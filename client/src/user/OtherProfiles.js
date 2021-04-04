import { Fragment, useEffect, useState } from "react";
import { isAuthenticated } from "../auth/index";
import { Link } from "react-router-dom";
import DefaultAvatar from "../images/DefaultAvatar.png";
import FollowProfileButtton from "./FollowProfileButton";
import { read } from "./apiUser";
import ProfileTabs from "./ProfileTabs";
import OtherMenu from "../core/OtherMenu";
import Footer from "../core/Footer";
import Loading from "../core/Loading";
import {API} from '../Config'
const OtherProfile = (props) => {
  const [state, setState] = useState({
    user: { following: [], followers: [] },
    error: false,
    following: false,
    loading: false,
  });
  const { user, error, following, loading } = state;

  useEffect(() => {
    setState({ ...state, loading: true });
    const userId = props.match.params.userId;
    getuserdata(userId);
  }, []);
  const getuserdata = (userId) => {
    const token = isAuthenticated().token;
    read(userId, token).then((data) => {
      if (data.error) {
        setState({ ...state, error: data.error, loading: false });
      } else {
        let isfollowing = checkFollow(data);
        setState({
          ...state,
          user: data,
          following: isfollowing,
          loading: false,
        });
      }
    });
  };
  const check = (follower) => {
    const jwt = isAuthenticated();
    return follower._id === jwt.user._id;
  };
  const clickedFollowButton = (callApi) => {
    const token = isAuthenticated().token;
    callApi(isAuthenticated().user._id, token, user._id).then((data) => {
      if (data.error) {
        setState({ ...state, error: data.error });
      } else {
        setState({ ...state, user: data, following: !following });
      }
    });
  };
  const checkFollow = (user) => {
    let match = user.followers.find(check);
    if (match == undefined) {
      match = false;
    }
    return match;
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
  return !loading ? (
    <Fragment>
      <OtherMenu />
      <div className="container">
        {showerror(error)}
        <h2 className="mt-5">Profile</h2>
        <div className="row" style={{ marginTop: "10px" }}>
          <div className="col-md-6">
            <img
              className="avatar_image"
              alt={user.name}
              style={{
                width: "100%",
                height: "15vw",
                objectFit: "contain",
                marginBottom: "20px",
              }}
              src={
                user.photo
                  ? `${API}/user/photo/${user._id}`
                  : DefaultAvatar
              }
              onError={(i) => (i.target.src = `${DefaultAvatar}`)}
            />
          </div>
          <div className="col-md-6">
            <p>Hello: {user.name} </p>
            <p>Email: {user.email}</p>
            {isAuthenticated().user && (
              <FollowProfileButtton
                following={following}
                onButtonClick={clickedFollowButton}
              />
            )}
          </div>
        </div>
        <ProfileTabs follower={user.followers} following={user.following} />
      </div>
      <Footer />
    </Fragment>
  ) : (
    <Loading />
  );
};
export default OtherProfile;
