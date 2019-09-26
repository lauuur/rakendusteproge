import React from "react";
import {Link} from "react-router-dom";

const Header = () => {
    return (
      <div class="header">
      <Link to={"/"}>
        <img class="header__logo" src="pics/logo.png" />
      </Link>
      <div class="header__buttons">
        <button>Login/Signup</button>
        <button>Cart</button>
      </div>
    </div>
    )
};

export default Header;