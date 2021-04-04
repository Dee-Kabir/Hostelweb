import { Fragment, useEffect, useState } from "react";
import { singlePost, deletepost, like, unlike } from "./Apiuser";
import { isAuthenticated } from "../auth";
import { Link, Redirect } from "react-router-dom";
import DefaultAvatar from "../images/mount.jfif";
import Comment from "./comment";
import Footer from "../core/Footer";
import OtherMenu from "../core/OtherMenu";
const SinglePost = (props) => {
  const [state, setState] = useState({
    post: "",
    deleted: false,
    liked: false,
    likes: 0,
    signinpl: false,
    comments: [],
    loading: false,
    error: "",
  });
  const {
    post,
    deleted,
    liked,
    likes,
    signinpl,
    comments,
    loading,
    error,
  } = state;

  useEffect(() => {
    const postId = props.match.params.postId;
    setState({ ...state, loading: true });
    singlePost(postId).then((data) => {
      if (data.error) {
        console.log(data.error);
        setState({ ...state, loading: false, error: data.error });
      } else {
        setState({
          post: data,
          likes: data.likes.length,
          liked: checklike(data.likes),
          comments: data.comments,
          loading: false,
        });
      }
    });
  }, []);

  const checklike = (likes) => {
    if (isAuthenticated()) {
      const userId = isAuthenticated().user._id;
      let match = likes.indexOf(userId) !== -1;
      return match;
    } else {
      return false;
    }
  };

  const removepost = (id) => {
    let val = window.confirm("Do you want to delete this post ?");
    if (val) {
      deletepost(id).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setState({ ...state, deleted: true });
        }
      });
    }
  };
  const redirectToHome = (value) => {
    if (value) {
      return <Redirect to="/" />;
    }
  };
  const redirectToSignIn = (value) => {
    if (value) {
      return <Redirect to="/signin" />;
    }
  };
  const liketoggle = () => {
    if (!isAuthenticated()) {
      setState({ ...state, signinpl: true });
    } else {
      let callApi = liked ? unlike : like;
      const userId = isAuthenticated().user._id;
      callApi(userId, isAuthenticated().token, props.match.params.postId).then(
        (data) => {
          if (data.error) {
            console.log(data.error);
          } else {
            setState({
              ...state,
              liked: checklike(data.likes),
              likes: data.likes.length,
            });
          }
        }
      );
    }
  };
  const updateComments = (comments) => {
    setState({ ...state, comments: comments });
  };
  const renderPost = (post) => {
    const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
    const posterName = post.postedBy ? post.postedBy.name : "unknown";
    return (
      <div className="card mt-5  mr-2">
        <div className="card-header name ">{post.title}</div>
        <div className="card-body carduser">
          <img
            className="img-thumbnail mb-5"
            style={{ height: "300px", width: "100%" }}
            src={
              post.photo
                ? `http://localhost:8000/p/post/photo/${post._id}`
                : DefaultAvatar
            }
          />
          <div className="lead">
            <p className="mt-2">{post.body}...</p>

            {liked ? (
              <p onClick={liketoggle}>
                <i className="far fa-thumbs-up text-success bg-dark" />
                likes: {likes}
              </p>
            ) : (
              <p
                style={{ padding: "10px", borderRadius: "50%" }}
                onClick={liketoggle}
              >
                <i className="far fa-thumbs-up text-warning bg-dark" />
                likes: {likes}
              </p>
            )}

            <hr />
            <p className="font-italic mark">
              Posted by <Link to={`${posterId}`}>{posterName} </Link>
              on {new Date(post.created).toDateString()}
            </p>
          </div>
          <div className="d-inline block">
            <Link
              to={`/`}
              className="btn btn-raised btn-primary btn-sm mr-5 mt-4"
            >
              See all posts{" "}
            </Link>

            {isAuthenticated().user &&
              post.postedBy &&
              post.postedBy._id === isAuthenticated().user._id && (
                <Fragment>
                  <Link
                    className="btn btn-raised btn-warning mr-5 mt-4"
                    to={`/edit/post/${post._id}`}
                  >
                    Update Post{" "}
                  </Link>
                  <button
                    className="btn btn-raised btn-warning mr-5 mt-4"
                    onClick={() => removepost(post._id)}
                  >
                    Delete Post
                  </button>
                </Fragment>
              )}
          </div>
        </div>
      </div>
    );
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
    return loading ? (
      <div className="text-center">
        <h1>Loading...</h1>
      </div>
    ) : (
      ""
    );
  };

  return !loading ? (
    <Fragment>
      <OtherMenu />
      <div className="container">
        {redirectToSignIn(signinpl)}
        {redirectToHome(deleted)}
        <p className="display-2 mt-5 mb-5">{post.title}</p>
        {renderPost(post)}
        <Comment
          postId={post._id}
          updateComments={updateComments}
          comments={comments}
        />
      </div>
      <Footer />
    </Fragment>
  ) : (
    loadingdata(loading)
  );
};
export default SinglePost;
