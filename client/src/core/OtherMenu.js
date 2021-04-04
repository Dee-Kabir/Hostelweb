import React, { Component, Fragment, useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { createMedia } from "@artsy/fresnel";

import {
  Menu,
  Container,
  Header,
  Button,
  Icon,
  Visibility,
  Segment,
  Sidebar,
} from "semantic-ui-react";
import { isAuthenticated, signout } from "../auth/index";
const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: "#ff9900" };
  else return { color: "#ffffff" };
};
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
});
class DesktopContainer extends Component {
  state = {
    activeItem: "home",
  };

  handleItemClick = (name) => (event) => {
    this.setState({ activeItem: [name] });
  };

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <Media greaterThan="mobile">
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 53, padding: 0 }}
            vertical
          >
            <Menu
              fixed={fixed ? "top" : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container>
                <Menu.Item
                  as={Link}
                  to="/"
                  name="home"
                  active={this.state.activeItem == "home"}
                  onClick={this.handleItemClick("home")}
                />

                <Menu.Item
                  as={Link}
                  to="/users"
                  name="users"
                  active={this.state.activeItem == "users"}
                  onClick={this.handleItemClick("users")}
                />
                <Menu.Item
                  as={Link}
                  to="/post/create"
                  name="post"
                  active={this.state.activeItem == "post"}
                  onClick={this.handleItemClick("post")}
                />

                {!isAuthenticated() && (
                  <Menu.Item position="right">
                    <Button
                      as={Link}
                      to="/signin"
                      name="signin"
                      active={this.state.activeItem == "signin"}
                      onClick={this.handleItemClick("signin")}
                      inverted={!fixed}
                    >
                      Login
                    </Button>
                    <Button
                      as={Link}
                      to="/signup"
                      name="signup"
                      active={this.state.activeItem == "signup"}
                      onClick={this.handleItemClick("signup")}
                      inverted={!fixed}
                      primary={fixed}
                      style={{ marginLeft: "0.5em" }}
                    >
                      Signup
                    </Button>
                  </Menu.Item>
                )}
                {isAuthenticated() && (
                  <Fragment>
                    <Menu.Item position="right">
                      <Button
                        as={Link}
                        to="/"
                        name="logout"
                        active={this.state.activeItem == "logout"}
                        onClick={() => signout()}
                        inverted={!fixed}
                      >
                        Logout
                      </Button>
                    </Menu.Item>

                    <Menu.Item
                      to={`/user/${isAuthenticated().user._id}`}
                      as={Link}
                      name={isAuthenticated().user.name}
                      active={
                        this.state.activeItem === isAuthenticated().user.name
                      }
                      onClick={this.handleItemClick(
                        isAuthenticated().user.name
                      )}
                    />
                  </Fragment>
                )}
              </Container>
            </Menu>
          </Segment>
        </Visibility>

        {children}
      </Media>
    );
  }
}
DesktopContainer.propTypes = {
  children: PropTypes.node,
};
class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Media as={Sidebar.Pushable} at="mobile">
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="overlay"
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}
            style={{ height: "400px" }}
          >
            <Menu.Item as={Link} to="/" name="home" />
            <Menu.Item as={Link} to="/users" name="users" />

            {isAuthenticated().user && (
              <Fragment>
                <Menu.Item as={Link} to={`/user/${isAuthenticated().user._id}`}>
                  {isAuthenticated().user.name}
                </Menu.Item>
                <Menu.Item
                  as={Link}
                  name="Log out"
                  onClick={() =>
                    signout(() => {
                      this.props.history.push("/");
                    })
                  }
                />
              </Fragment>
            )}
            {!isAuthenticated().user && (
              <Fragment>
                <Menu.Item as={Link} to="/signin">
                  Log in
                </Menu.Item>
                <Menu.Item as={Link} to="/signup">
                  Sign Up
                </Menu.Item>
              </Fragment>
            )}
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              inverted
              textAlign="center"
              style={{ minHeight: 47, padding: "1em 0em" }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size="large">
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name="sidebar" />
                  </Menu.Item>
                  {!isAuthenticated().user && (
                    <Fragment>
                      <Menu.Item position="right">
                        <Button as={Link} inverted to="/signin">
                          Log in
                        </Button>
                        <Button
                          as={Link}
                          inverted
                          to="/signup"
                          style={{ marginLeft: "0.5em" }}
                        >
                          Sign Up
                        </Button>
                      </Menu.Item>
                    </Fragment>
                  )}
                  {isAuthenticated().user && (
                    <Menu.Item position="right">
                      <Button
                        inverted
                        as={Link}
                        name="Log out"
                        to="/"
                        onClick={() => signout()}
                      >
                        Logout
                      </Button>
                    </Menu.Item>
                  )}
                </Menu>
              </Container>
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Media>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
};
const ResponsiveContainer = ({ children, pathname }) => (
  /* Heads up!
   * For large applications it may not be best option to put all page into these containers at
   * they will be rendered twice for SSR.
   */
  <MediaContextProvider>
    <DesktopContainer pathname={pathname}>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </MediaContextProvider>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
};
const OtherMenu = ({ history }) => {
  return (
    <div>
      <ResponsiveContainer pathname={history.location.pathname} />

      {/*<ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, "/")} to="/">
            Home
          </Link>
        </li>
        {!isAuthenticated() && (
          <Fragment>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/signup")}
                to="/signup"
              >
                Sign Up
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/signin")}
                to="/signin"
              >
                Sign In
              </Link>
            </li>
          </Fragment>
        )}
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "/users")}
            to="/users"
          >
            Users
          </Link>
        </li>
        {isAuthenticated() && (
          <Fragment>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/post/create"
                style={isActive(history, "/post/create")}
              >
                post
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to=""
                onClick={() =>
                  signout(() => {
                    history.push("/");
                  })
                }
              >
                Signout
              </Link>
            </li>
            <Link
              className="nav-link namemenu justify-right"
              style={isActive(history, `/user/${isAuthenticated().user._id}`)}
              to={`/user/${isAuthenticated().user._id}`}
            >
              {isAuthenticated().user.name}
            </Link>
          </Fragment>
        )}
            </ul>*/}
    </div>
  );
};
export default withRouter(OtherMenu);
