import DefaultAvatar from "../images/DefaultAvatar.png";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import {API} from '../Config'

const FriendCard = ({ person }) => {
  return (
    <div className="row" style={{ width: "100%" }}>
      <Link
        className="float-left mr-2"
        to={
          isAuthenticated().user._id != person._id
            ? `/user/profile/${person._id}`
            : `/user/${person._id}`
        }
        style={{ width: "100%" }}
      >
        <div className="card mb-2" style={{ width: "100%" }}>
          <div className="card-body" style={{ display: "flex", width: "100%" }}>
            <img
              alt={person.name}
              style={{
                width: "100%",
                height: "5vw",
                objectFit: "contain",
                borderRadius: "70%",
              }}
              src={`${API}/user/photo/${person._id}`}
              onError={(i) => (i.target.src = `${DefaultAvatar}`)}
            />

            <p className="lead float-right mr-5">{person.name}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default FriendCard;
