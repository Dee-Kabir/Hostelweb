import { Link } from "react-router-dom";
import DefaultAvatar from "../images/DefaultAvatar.png";
import PostCard from "../post/PostCard";
import FriendCard from "./FriendCard";
const ProfileTabs = ({ follower, following, userposts }) => {
  const clicked = (name) => (event) => {
    // var clickedname = document.getElementsByName(name)[0]
    if (name == "followings") {
      var clickednameList = document.getElementsByClassName(
        "followings-list"
      )[0];
    } else if (name == "followers") {
      var clickednameList = document.getElementsByClassName(
        "followers-list"
      )[0];
    } else if (name == "posts") {
      var clickednameList = document.getElementsByClassName("posts-list")[0];
    }
    clickednameList.classList.toggle("show");
  };
  return (
    <div>
      <div className="row mt-5">
        <div className="col-sm-4">
          <h3
            className="text-primary"
            name="followers"
            onClick={clicked("followers")}
          >
            Followers{" "}
            <span className="num_follow">{follower && follower.length}</span>
          </h3>
          <hr />
          <div className="followers-list">
            {follower &&
              follower.map((person, i) => {
                return <FriendCard person={person} key={i} />;
              })}
          </div>
        </div>
        <div className="col-sm-4">
          <h3
            className="text-primary"
            name="followings"
            onClick={clicked("followings")}
          >
            Following{" "}
            <span className="num_follow">{following && following.length}</span>
          </h3>
          <hr />
          <div className="followings-list">
            {following &&
              following.map((person, i) => {
                return <FriendCard person={person} key={i} />;
              })}
          </div>
        </div>
        <div className="col-sm-4">
          <h3 className="text-primary" name="posts" onClick={clicked("posts")}>
            Posts{" "}
            <span className="num_follow">{userposts && userposts.length}</span>
          </h3>
          <hr />
          <div className="posts-list">
            {userposts &&
              userposts.map((post, i) => {
                return <PostCard post={post} key={i} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileTabs;
