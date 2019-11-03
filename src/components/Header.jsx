import React from "react";
import {Link} from "react-router-dom";
import "./header.css";
import {profileIcon, cartIcon} from "../icons.js";
import PropTypes from "prop-types";

const Header = ({token, user}) => {
    return (
      <div className="header">
      <Link to={"/"}>
        <img className="header__logo" src="./pics/logo.png" />
      </Link>
      <div className="header__buttons">

        {user.email  && <WelcomeIcon user={user}/>}
        {!user.email  && <LoginRegisterIcon/>}

        <Link className="header__button" to="/cart">
        <img src={cartIcon}/>
        <div className="header__button-text">Cart</div>
        </Link>
      </div>
    </div>
    );
};

Header.propTypes = {
  token: PropTypes.string,
  user: PropTypes.object,
};

const LoginRegisterIcon = () =>(
  <Link className="header__button" to="/login">
    <img src={profileIcon}/>
    {<div className="header__button-text">Login /<br/>Signup</div>}
  </Link>
);

const WelcomeIcon = ({user}) =>(
  <Link className="header__button" to={`/users/${user._id}`}>
    <img src={profileIcon}/>
    <div className="header__button-text">Welcome, {user.email}</div>
  </Link>
);

WelcomeIcon.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Header;