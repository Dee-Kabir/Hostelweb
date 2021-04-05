import React from "react";
import { Card, Icon } from "semantic-ui-react";
import DefaultAvatar from "../images/TwoRoadsTaken.jpg";
import moment from "moment";
import { Link } from "react-router-dom";
import {API_POST} from '../Config'
import { isAuthenticated } from "../auth/index";
const PostCard = ({ post }) => (
  <div className="card-div">
    <Link to={`/post/${post._id}`}>
      <div className="card-title-div">
        <h2>{post.title}</h2>
      </div>
      <div className="card-image-div">
        <img
          src={
            post.photo
              ? `${API_POST}/post/photo/${post._id}`
              : DefaultAvatar
          }
        />
      </div>
      <div className="card-description-div">
        <p>{post.body.substr(0, 200)}</p>
      </div>
    </Link>
    <div className="card-by-when">
      postedBy{" "}
      <Link to={
        isAuthenticated().user._id != post.postedBy._id
          ? `/user/profile/${post.postedBy._id}`
          : `/user/${post.postedBy._id}`
      }>{post.postedBy.name}</Link> on{" "}
      {moment(post.created).fromNow()}
    </div>
  </div>
);

export default PostCard;

