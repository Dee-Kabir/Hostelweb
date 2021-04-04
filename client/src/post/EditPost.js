import { Fragment, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import Footer from "../core/Footer";
import OtherMenu from "../core/OtherMenu";
import { singlePost, update } from "./Apiuser";

const EditPost = (props) => {
  const [state, setState] = useState({
    title: "",
    body: "",
    photo: "",
    error: "",
    formData: "",
    fileSize: "",
    loading: false,
    redirectToProfile: false,
  });

  const {
    title,
    body,
    photo,
    error,
    formData,
    fileSize,
    redirectToProfile,
    loading,
  } = state;
  useEffect(() => {
    let postId = props.match.params.postId;
    getpost(postId);
    setState({ ...state, loading: true });
  }, []);
  const getpost = (postId) => {
    singlePost(postId).then((data) => {
      if (data.error) {
        setState({ ...state, error: data.error });
      } else {
        setState({
          ...state,
          title: data.title,
          body: data.body,
          formData: new FormData(),
        });
      }
    });
  };
  const handleChange = (name) => (event) => {
    let val = name === "photo" ? event.target.files[0] : event.target.value;

    formData.set(name, val);
    setState({
      ...state,
      error: "",
      [name]: val,
      fileSize: name === "photo" ? event.target.files[0].size : 0,
    });
  };
  const clickSubmit = (event) => {
    event.preventDefault();
    setState({ ...state, loading: true });
    if (checkdata()) {
      const postId = props.match.params.postId;
      const token = isAuthenticated().token;

      update(postId, token, formData).then((data) => {
        if (data.error) {
          console.log(data);
          setState({ ...state, error: data.error });
          window.alert("There is an error while updating!!");
        } else {
          setState({ ...state, loading: true, redirectToProfile: true });
        }
      });
    }
  };
  const loadingdata = (l) => {
    return l ? (
      <div className="text-center">
        <h1>Loading...</h1>
      </div>
    ) : (
      ""
    );
  };
  const redirecting = (redirec) => {
    return redirec ? <Redirect to="/" /> : "";
  };

  const checkdata = () => {
    if (fileSize > 5000000) {
      setState({
        ...state,
        error: "File size should be less than 5Mb",
        loading: false,
      });
      return false;
    } else if (title.length === 0 || body.length === 0) {
      setState({ ...state, error: "All fields are required", loading: false });
      return false;
    } else {
      return true;
    }
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
  const editPostForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Post Photo</label>
        <input
          onChange={handleChange("photo")}
          type="file"
          name="photo"
          accept="image/*"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Title</label>
        <input
          value={title}
          onChange={handleChange("title")}
          type="text"
          className="form-control"
        ></input>
      </div>

      <div className="form-group">
        <label className="text-muted">Body</label>
        <textarea
          value={body}
          onChange={handleChange("body")}
          type="text"
          className="form-control"
        ></textarea>
      </div>

      <button onClick={clickSubmit} className="btn btn-raised btn-primary">
        Update Post
      </button>
    </form>
  );
  return (
    <Fragment>
      <OtherMenu />
      <div className=" col-md-8 " style={{ margin: "auto" }}>
        <h2 className="mt-5 mb-5">Update a Post</h2>
        {showerror(error)}

        {editPostForm()}
        {redirecting(redirectToProfile)}
        {loadingdata(loading)}
      </div>
      <Footer />
    </Fragment>
  );
};

export default EditPost;
