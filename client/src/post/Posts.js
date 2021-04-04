import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DefaultAvatar from "../images/DefaultAvatar.png";
import { list } from "./Apiuser";
import PostCard from "./PostCard";
const Posts = () => {
  const [values, setValues] = useState({
    posts: [],
    loading: false,
    error: "",
  });
  const getallPosts = () => {
    setValues({ ...values, loading: true });
    list().then((data) => {
      if (data.error) {
        window.alert("There is an error");
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({ ...values, loading: false, posts: data });
      }
    });
  };
  const renderUsers = (posts) => {
    return (
      <div className="row justify-content-center">
        {posts[0] ? (
          posts.map((post, i) => {
            const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
            const posterName = post.postedBy ? post.postedBy.name : "Anonymous";
            return <PostCard key={i} post={post} />;
          })
        ) : (
          <h1 className="mt-5">No Post Exists</h1>
        )}
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
  useEffect(() => {
    getallPosts();
  }, []);
  const { posts, loading, error } = values;
  return (
    <div className="container">
      <h2>Posts</h2>
      {showerror(error)}
      {!loading ? renderUsers(posts) : loadingdata(loading)}
    </div>
  );
};
export default Posts;
