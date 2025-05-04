import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="container" id="login">
      <h1>Login</h1>

      <input
        className="text-input"
        type="text"
        placeholder="Username"
      />
      <input
        className="text-input"
        type="password"
        placeholder="Password"
      />

      <Link to="/signup">
        <button className="entry-button" id="signup">
          Sign Up
        </button>
      </Link>

      <Link to="/">
        <button className="entry-button" id="login">
          Log In
        </button>
      </Link>

    </div >
  );
}

export default Login;
