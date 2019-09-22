import React from "react";

const Header = () => {
    return (
        <div class="header">
    <a href="index.html">
        <img class="header__logo" src="pics/logo.png" />
    </a>
    <div class="header__buttons">
      <button>Login/Signup</button>
      <button>Cart</button>
    </div>
  </div>
    )
};

export default Header;