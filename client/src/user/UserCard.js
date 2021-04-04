import { Link } from "react-router-dom";
import DefaultAvatar from "../images/DefaultAvatar.png";
const UserCard = ({ user }) => {
  return (
    <div className="usercard">
      <div className="username">{user.name}</div>
      <hr />
      <div className="usercard-image-div">
        <img
          src={
            `http://localhost:8000/api/user/photo/${user._id}` || DefaultAvatar
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
        to={`/user/profile/${user._id}`}
      >
        <button className="viewprofile-button btn btn-primary btn-raised">
          ViewProfile
        </button>
      </Link>
    </div>
  );
};
export default UserCard;
