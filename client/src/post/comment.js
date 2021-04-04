import { Fragment, useState } from "react";
import { isAuthenticated } from "../auth";
import { comment, uncomment } from "./Apiuser";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import SubComment from "./SubComment";
import moment from "moment";
const Comment = ({ postId, comments, updateComments }) => {
  const [state, setState] = useState({
    text: "",
    error: "",
  });
  const { text, error } = state;
  const handleChange = (event) => {
    setState({ ...state, text: event.target.value, error: "" });
  };
  const addComment = (event) => {
    event.preventDefault();
    if (!isAuthenticated()) {
      setState({ ...state, error: "please sign in to comment" });
    }
    if (isValid()) {
      const userId = isAuthenticated().user._id;
      const postid = postId;
      const token = isAuthenticated().token;
      const coment = { text: text ? text : "" };
      comment(userId, token, postid, coment).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setState({ ...state, text: "" });
          updateComments(data.comments);
        }
      });
    }
  };
  const deleteComment = (coment) => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    const postid = postId;

    uncomment(userId, token, postid, coment).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        updateComments(data.comments);
      }
    });
  };
  const isValid = () => {
    if (text.length < 15 || text.length > 150) {
      setState({
        ...state,
        error:
          "Comment should contain at least 15 characters and less than 150 characters",
      });
      return false;
    }
    return true;
  };
  const opensubcomments = () => {
    document.getElementsByClassName("subcomments")[0].classList.toggle("show");

    console.log(document.getElementsByClassName("subcomments")[0]);
  };
  return (
    <div>
      <h2 className="mt-5 mb-5">Leave a comment</h2>
      <form onSubmit={addComment}>
        <div className="form-group">
          <input
            type="text"
            value={text}
            className="form-control"
            onChange={handleChange}
            placeholder="Leave a comment here"
          />
        </div>

        <div style={{ textAlign: "right" }}>
          <button className="post-btn">POST</button>
        </div>
      </form>
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
      <div className="col-md-12 col-md-offset-2">
        <h3 className="text-primary">{comments.length} Comments</h3>
        <hr />
        {comments &&
          comments.map((com, i) => {
            return (
              <Fragment key={i}>
                <div className="comment">
                  <div style={{ width: "100%", position: "relative" }}>
                    <p className="lead">
                      {com.body} -{" "}
                      <Link
                        to={
                          isAuthenticated().user._id != person._id
                            ? `/user/profile/${person._id}`
                            : `/user/${person._id}`
                        }
                      >
                        {com.postedBy ? com.postedBy.name : "Anonymous"}
                      </Link>{" "}
                      <span>{moment(com.created).fromNow()}</span>{" "}
                      {/*com.comments && com.comments.length>0?<Icon onClick={opensubcomments} style={{ cursor: "pointer" }} name="angle down" />:''*/}
                      {/*<SubComment id={com._id}/>{" "}*/}
                    </p>
                    {isAuthenticated().user &&
                      com.postedBy &&
                      isAuthenticated().user._id === com.postedBy._id && (
                        <button onClick={() => deleteComment(com._id)}>
                          Remove
                        </button>
                      )}
                  </div>
                </div>
              </Fragment>
            );
          })}
        <hr />
      </div>
    </div>
  );
};
export default Comment;
