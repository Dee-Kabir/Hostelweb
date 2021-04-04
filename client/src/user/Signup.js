import React, { Component, Fragment, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Message,
  Segment,
} from "semantic-ui-react";
import { signup } from "../auth/index";
import OtherMenu from "../core/OtherMenu";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      error: "",
      passwordconfirmation: "",
      success: false,
    };
  }

  componentDidMount() {
    this.userData = new FormData();
  }

  handleChange = (name) => (event) => {
    this.userData.set(name, event.target.value);
    this.setState({ [name]: event.target.value, error: "", success: false });
  };
  clickSubmit = (event) => {
    event.preventDefault();
    if (this.isValid()) {
      signup(this.userData).then((data) => {
        if (data.error) {
          this.setState({ error: data.error });
          window.alert(this.state.error);
        } else {
          this.setState({
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      });
    }
  };

  isValid = () => {
    const pass = document.getElementById("mypass").value;
    if (this.state.name.length == 0) {
      this.setState({ error: "Name is required" });
      document.getElementById("myname").focus();

      return false;
    } else if (
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
    } else if (this.state.password != this.state.passwordconfirmation) {
      this.setState({
        error: "Password and Confirm password must match",
      });
      return false;
    } else {
      return true;
    }
  };

  showerror = (err) => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: err ? "" : "none" }}
      >
        {err}
      </div>
    );
  };
  showsuccess = (success) => {
    return (
      <div
        className="alert alert-success"
        style={{ display: success ? "" : "none" }}
      >
        <p>
          Account created Succesfully. please <Link to="/signin">Signin</Link>
        </p>
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
  signupForm = () => {
    return (
      <Grid
        className="registerpagegrid"
        textAlign="center"
        verticalAlign="middle"
        style={{ height: "100vh" }}
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="orange" textAlign="center">
            <Icon name="puzzle" color="orange" />
            Register Here
          </Header>
          <Form onSubmit={this.clickSubmit} size="large">
            <Segment stacked>
              <Form.Input
                fluid
                name="name"
                value={this.state.name}
                onChange={this.handleChange("name")}
                id="myname"
                type="text"
                icon="user"
                iconPosition="left"
                placeholder="Enter your name"
              />
              <Form.Input
                fluid
                name="email"
                value={this.state.email}
                onChange={this.handleChange("email")}
                type="email"
                id="myemail"
                icon="mail"
                iconPosition="left"
                placeholder="Enter Email Address"
              />
              <Form.Input
                fluid
                name="password"
                value={this.state.password}
                onChange={this.handleChange("password")}
                id="mypass"
                type="password"
                icon="lock"
                iconPosition="left"
                placeholder="Enter Password"
              />
              <Form.Input
                fluid
                name="passwordConfirmation"
                icon="repeat"
                iconPosition="left"
                placeholder="Enter password Again"
                value={this.state.passwordconfirmation}
                onChange={this.handleChange("passwordconfirmation")}
                type="password"
              />
              <Button color="orange" type="submit" fluid large>
                Submit
              </Button>
            </Segment>
            <Message>
              Already a user? <Link to="/signin">Login</Link>
            </Message>
            <p>{this.showerror(this.state.error)}</p>
            <p>{this.showsuccess(this.state.success)}</p>
          </Form>
        </Grid.Column>
      </Grid>
    );
  };

  render() {
    return (
      <Fragment>
        <OtherMenu />

        {this.signupForm()}
      </Fragment>
    );
  }
}
export default Signup;
