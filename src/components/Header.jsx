import React from "react";
import {Link} from "react-router-dom";
import "./header.css";
import {profileIcon, cartIcon} from "../icons.js";

const Header = () => {
    return (
      <div className="header">
      <Link to={"/"}>
        <img className="header__logo" src="./pics/logo.png" />
      </Link>
      <div className="header__buttons">
        <Link className="header_button" to="/login">
        <img src={profileIcon} alt=""/>
        <div className="header_button-text">Login /<br/>Signup</div>
        </Link>
        <Link className="header_button" to="/cart">
        <img src={cartIcon} alt=""/>
        <div className="header_button-text">Cart</div>
        </Link>
      </div>
    </div>
    );
};

export default Header;