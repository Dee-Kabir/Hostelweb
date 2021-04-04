import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Profile from "./user/Profile";
import Users from "./user/Users";
import OtherProfile from "./user/OtherProfiles";
import EditProfile from "./user/EditProfile";
import PrivateRoute from "./auth/PrivateRoute";
import NewPost from "./post/NewPost";
import SinglePost from "./post/SinglePost";
import EditPost from "./post/EditPost";
const MainRouter = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home}></Route>
      <Route path="/signup" exact component={Signup}></Route>
      <Route path="/signin" exact component={Signin}></Route>
      <Route path="/user/:userId" exact component={Profile}></Route>
      <Route path="/users" exact component={Users}></Route>

      <PrivateRoute
        path="/edit/post/:postId"
        exact
        component={EditPost}
      ></PrivateRoute>
      <PrivateRoute
        path="/user/profile/:userId"
        exact
        component={OtherProfile}
      ></PrivateRoute>
      <PrivateRoute
        path="/user/edit/:userId"
        exact
        component={EditProfile}
      ></PrivateRoute>
      <PrivateRoute
        path="/post/create"
        exact
        component={NewPost}
      ></PrivateRoute>
      <Route path="/post/:postId" exact component={SinglePost}></Route>
    </Switch>
  );
};
export default MainRouter;
