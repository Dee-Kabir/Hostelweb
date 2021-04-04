import React from "react";
import { Link } from "react-router-dom";
import Posts from "../post/Posts";
import Footer from "./Footer";
import MainMenu from "./Menu";
import Searchf from "./Search";
const Home = () => {
  return (
    <div>
      <MainMenu />
      <div
        className="jumbotron homelayout"
        style={{ textAlign: "center", marginTop: "1em" }}
      >
        <p
          style={{
            color: "#def",
            fontFamily: "cursive",
            fontSize: "40px",
            verticalAlign: "middle",
            margin: "auto",
          }}
        >
          Read <Link to="#">here</Link> WRite{" "}
          <Link to="/post/create">there</Link>
        </p>
      </div>
      <Searchf />
      <div className="container">
        <Posts />
      </div>
      <Footer />
    </div>
  );
};
export default Home;
