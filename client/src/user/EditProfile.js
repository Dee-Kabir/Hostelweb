import { Fragment, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { read, update } from "./apiUser";
import DefaultAvatar from "../images/DefaultAvatar.png";
import OtherMenu from "../core/OtherMenu";
import Footer from "../core/Footer";
import Loading from "../core/Loading";
import {API} from '../Config'

const EditProfile = (props) => {
  const [state, setState] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    redirecttohome: false,
    photo: "",
    fileSize: 0,
    error: "",
    loading: false,
    formData: "",
  });
  const getuserdata = (Id) => {
    read(Id).then((data) => {
      if (data.error) {
        window.alert("There is an error while loading data!!");
      } else {
        setState({
          id: data._id,
          name: data.name,
          email: data.email,
          password: "",
          confirmpassword: "",
          photo: data.photo,
          formData: new FormData(),
        });
      }
    });
  };
  const {
    id,
    name,
    photo,
    email,
    password,
    error,
    redirecttohome,
    fileSize,
    loading,
    formData,
    confirmpassword,
  } = state;
  useEffect(() => {
    setState({ ...state, loading: true });
    const userId = props.match.params.userId;
    getuserdata(userId);
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
    if (checkdata()) {
      setState({ ...state, loading: true });
      update(formData).then((data) => {
        if (data.error) {
          window.alert("There is an error while updating!!");
        } else {
          if (typeof window != undefined) {
            let auth = JSON.parse(localStorage.getItem("jwt"));
            auth.user = {
              _id: data._id,
              name: data.name,
              email: data.email,
              role: data.role,
            };
            localStorage.setItem("jwt", JSON.stringify(auth));
          }
          setState({ redirecttohome: true });
        }
      });
    }
  };
  const loadingdata = (l) => {
    return l ? <Loading /> : "";
  };
  const redirecting = (redirec) => {
    return redirec ? <Redirect to="/" /> : "";
  };

  const checkdata = () => {
    if (fileSize > 4000000) {
      setState({ ...state, error: "File size should be less than 4Mb" });
      return false;
    } else if (name.length == 0) {
      setState({ ...state, error: "Enter name" });
      return false;
    } else if (password.length > 0 && password.length < 8) {
      console.log(password.length);
      setState({ ...state, error: "Enter password" });
      return false;
    } else if (password != confirmpassword) {
      setState({
        ...state,
        error: "Confirm Password and Password must be same",
      });
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
  return !loading ? (
    <Fragment>
      <OtherMenu />
      <div className="container col-md-8 " style={{ margin: "auto" }}>
        <h2 className="mt-5 mb-5">Edit Profile</h2>
        {showerror(error)}
        <img
          src={
            photo ? `${API}/user/photo/${id}` : DefaultAvatar
          }
          style={{
            maxWidth: "200px",
            height: "200px",
            width: "200px",
            borderRadius: "50%",
          }}
          className="img-thumbnail mb-5"
          alt={name}
        />
        <form onSubmit={clickSubmit}>
          <div className="form-group">
            <label className="text-muted">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image/*"
              />
            </label>
          </div>
          <div className="form-group">
            <label className="text-muted">Name</label>
            <input
              value={name}
              onChange={handleChange("name")}
              type="text"
              className="form-control"
            ></input>
          </div>

          <div className="form-group">
            <label className="text-muted">Email</label>
            <input
              value={email}
              onChange={handleChange("email")}
              type="email"
              className="form-control"
            ></input>
          </div>

          <div className="form-group">
            <label className="text-muted">Password</label>
            <input
              value={password}
              onChange={handleChange("password")}
              type="password"
              className="form-control"
            ></input>
          </div>
          <div className="form-group">
            <label className="text-muted">Confirm Password</label>
            <input
              value={confirmpassword}
              onChange={handleChange("confirmpassword")}
              type="password"
              className="form-control"
            ></input>
          </div>

          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>

        {redirecting(redirecttohome)}
        {loadingdata(loading)}
      </div>
      <Footer style={{ position: "absolute", bottom: "0", width: "100%" }} />
    </Fragment>
  ) : (
    loadingdata(loading)
  );
};

export default EditProfile;
