import { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/index";
import { deleteaccount } from "./apiUser";
const DeleteProfile = (id) => {
  const [value, setValue] = useState(false);
  const confirmdelete = () => {
    let answer = window.confirm("Are you sure you want to delete your account");
    if (answer) {
      deleteaccount(id).then((data) => {
        if (data.error) {
          window.alert("There is an error");
        } else {
          signout(() => window.alert("Deleted Successfully"));
          setValue(true);
        }
      });
    }
  };
  const redirectToHome = (value) => {
    if (value) {
      return <Redirect to="/" />;
    }
  };

  return (
    <Fragment>
      {redirectToHome(value)}
      <button
        onClick={confirmdelete}
        className="btn btn-raised btn-danger mt-5 ml-4"
      >
        Delete Profile
      </button>
    </Fragment>
  );
};

export default DeleteProfile;
