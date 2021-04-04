import React, { Component, Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import { signin } from "../auth/index";
import { Link } from "react-router-dom";
import OtherMenu from "../core/OtherMenu";

import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Icon,
} from "semantic-ui-react";
class Signin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
    };
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
    this.setState({ error: "" });
  };
  clickSubmit = (event) => {
    event.preventDefault();
    if (this.isValid()) {
      const { email, password } = this.state;
      const user = { email, password };
      signin(user).then((data) => {
        if (data.error) this.setState({ error: data.error });
        else {
          this.authenticate(data, () => {
            this.props.history.push("/");
          });
        }
      });
    }
  };
  authenticate(jwt, next) {
    if (typeof window !== "undefined") {
      localStorage.setItem("jwt", JSON.stringify(jwt));
      next();
    }
  }
  showerror = (error) => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };
  tooglepassword = () => {
    if (document.getElementById("mypass").type == "text") {
      document.getElementById("mypass").type = "password";
    } else {
      document.getElementById("mypass").type = "text";
    }
  };
  isValid = () => {
    const pass = document.getElementById("mypass").value;
    if (
      !document
        .getElementById("myemail")
        .value.match(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        )
    ) {
      this.setState({
        error: "Enter a valid email address",
      });
      document.getElementById("myemail").focus();
      return false;
    } else if (!pass.match(/[0-9]/g) || pass.length < 8) {
      this.setState({
        error: "password must include a number and minimum 8 charcaters ",
      });
      document.getElementById("mypass").focus();
      return false;
    } else {
      return true;
    }
  };
  signinForm = () => {
    return (
      <div className="loginpagegrid" style={{ height: "100vh" }}>
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450, padding: "-100px" }}>
            <Header as="h2" color="violet" textAlign="center">
              <Icon name="puzzle" color="violet" />
              Login to Account
            </Header>
            <Form onSubmit={this.clickSubmit} size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  name="email"
                  icon="mail"
                  iconPosition="left"
                  placeholder="Enter Email Address"
                  value={this.state.email}
                  id="myemail"
                  type="email"
                  onChange={this.handleChange("email")}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Enter Your Password"
                  value={this.state.password}
                  id="mypass"
                  onChange={this.handleChange("password")}
                  type="password"
                />
                <Button color="teal" type="submit" fluid size="large">
                  Login
                </Button>
              </Segment>
              <Message>
                Don't have an account? <Link to="/signup">Register</Link>
              </Message>
              {this.showerror(this.state.error)}
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  };

  render() {
    return (
      <Fragment>
        <OtherMenu />
        {this.signinForm()}
      </Fragment>
    );
  }
}
export default Signin;
