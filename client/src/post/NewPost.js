import { Fragment, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { create } from "./Apiuser";
import DefaultAvatar from "../images/DefaultAvatar.png";
import Footer from "../core/Footer";
import MainMenu from "../core/Menu";
const NewPost = (props) => {
  const [state, setState] = useState({
    title: "",
    body: "",
    photo: "",
    error: "",
    user: {},
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
    user,
    formData,
    fileSize,
    redirectToProfile,
    loading,
  } = state;
  useEffect(() => {
    setState({
      ...state,
      user: isAuthenticated().user,
      formData: new FormData(),
    });
  }, []);

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
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;

      create(userId, token, formData).then((data) => {
        if (data.error) {
          setState({ ...state, error: data.error });
          window.alert("There is an error while updating!!");
        } else {
          setState({
            ...state,
            loading: false,
            title: "",
            body: "",
            redirectToProfile: true,
          });
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
  return (
    <div>
      <MainMenu />
      <div className="container col-md-8 " style={{ margin: "auto" }}>
        <h2 className="mt-5 mb-5">Create a Post</h2>
        {showerror(error)}

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
            Create Post
          </button>
        </form>

        {redirecting(redirectToProfile)}
        {loadingdata(loading)}
      </div>
      <Footer />
    </div>
  );
};

export default NewPost;
