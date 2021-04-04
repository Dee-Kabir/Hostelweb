import { Fragment, useEffect, useState } from "react";
import { subcomments } from "./Apiuser";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";
const SubComment = ({ id }) => {
  const [subcomment, setSubComments] = useState([]);
  useEffect(() => {
    console.log(id);
    loadSubComments(id);
  }, []);
  const loadSubComments = (id) => {
    subcomments(id).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setSubComments(data.comments);
      }
    });
  };
  return (
    <div className="subcomments">
      {subcomment.map((com, i) => {
        return (
          <Fragment>
            <div key={i} className="comment">
              <div className="" style={{ width: "100%" }}>
                <p className="lead">
                  {com.body} -{" "}
                  <Link to={`/user/${com.postedBy ? com.postedBy._id : ""}`}>
                    {com.postedBy ? com.postedBy.name : "Anonymous"}
                  </Link>{" "}
                  <span>{new Date(com.created).toDateString()}</span>{" "}
                  {com.comments.length > 0 ? (
                    <Icon style={{ cursor: "pointer" }} name="angle down" />
                  ) : (
                    ""
                  )}
                  {com.comments.length > 0 && <SubComment id={com._id} />}{" "}
                </p>
              </div>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};
export default SubComment;
