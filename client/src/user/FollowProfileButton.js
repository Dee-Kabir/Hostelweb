import React from "react";
import { follow } from "./apiUser";
import { unfollow } from "./apiUser";

const FollowProfileButtton = ({ following, onButtonClick }) => {
  const clickedfollow = () => {
    onButtonClick(follow);
  };
  const clickedunfollow = () => {
    onButtonClick(unfollow);
  };
  return (
    <div className="d-inline-block mt-5">
      {!following ? (
        <button
          onClick={clickedfollow}
          className="btn btn-success btn-raised mt-5"
        >
          Follow
        </button>
      ) : (
        <button
          onClick={clickedunfollow}
          className="btn btn-secondary btn-raised ml-4 mt-5"
        >
          UnFollow
        </button>
      )}
    </div>
  );
};

export default FollowProfileButtton;
