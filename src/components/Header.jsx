import React from "react";
import {Link} from "react-router-dom";
import "./header.css";
import {profileIcon, cartIcon} from "../icons.js";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ItemProps} from "../pages/CartPage.jsx";
import { UserPropTypes } from "../store/reducer";
import * as selectors from "../store/selectors";

const Header = ({user, cart}) => {
    return (
      <div className="header">
      <Link to={"/"}>
        <img className="header__logo" src="./static/pics/logo.png" />
      </Link>
      <div className="header__buttons">

        {user  && <WelcomeIcon user={user}/>}
        {!user  && <LoginRegisterIcon/>}

        <Link className="header__button" to="/checkout/cart">
        <img src={cartIcon}/>
        <div className="header__button-text">Ostukorv</div>
        <Badge>{cart.length}</Badge>
        </Link>
      </div>
    </div>
    );
};

Header.propTypes = {
  token: PropTypes.string,
  user: PropTypes.shape(UserPropTypes),
  cart: PropTypes.arrayOf(ItemProps).isRequired,
};

const Badge = ({children}) =>{
  if(children===0){
    return null;
  }
  return(
    <span className="badge">
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.number.isRequired,
};

const LoginRegisterIcon = () =>(
  <Link className="header__button" to="/login">
    <img src={profileIcon}/>
    {<div className="header__button-text">Logi sisse /<br/>Registreeri</div>}
  </Link>
);

const WelcomeIcon = ({user}) =>(
  <Link className="header__button" to={`/users/${user._id}`}>
    <img src={profileIcon}/>
    <div className="header__button-text">Tere, {user.email}</div>
  </Link>
);

WelcomeIcon.propTypes = {
  user: PropTypes.shape(UserPropTypes),
};

const mapStateToProps = (store) =>{
  return{
    cart: selectors.getCart(store),
    user: selectors.getUser(store)
  };
};

export default connect(mapStateToProps)(Header);