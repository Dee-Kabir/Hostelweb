import { Link } from "react-router-dom";
import DefaultAvatar from "../images/DefaultAvatar.png";
import {API} from '../Config'
import { isAuthenticated } from "../auth/index";
const UserCard = ({ user }) => {
  return (
    <div className="usercard" style={{minWidth:'140px'}}>
      <div className="username">{user.name}</div>
      <hr />
      <div className="usercard-image-div">
        <img
          src={
            `${API}/user/photo/${user._id}` || DefaultAvatar
          }
          onError={(i) => (i.target.src = `${DefaultAvatar}`)}
        />
      </div>

      <div className="useremail">{user.email}</div>

      <Link
        style={{
          textAlign: "center",
          display: "block",
          marginTop: "1rem",
          marginBottom: "1rem",
        }}
        to={
          isAuthenticated().user._id != user._id
            ? `/user/profile/${user._id}`
            : `/user/${user._id}`
        }
      >
        <button className="viewprofile-button btn btn-primary btn-raised">
          ViewProfile
        </button>
      </Link>
    </div>
  );
};
export default UserCard;
