import React, { useState } from 'react';

function Signup() {
  return (
    <div className="container" id="login">
      <h1>Sign Up</h1>

      <input
        className="text-input"
        type="text"
        placeholder="Create a username"
      />
      <input
        className="text-input"
        type="password"
        placeholder="Password"
      />
      <input
        className="text-input"
        type="password"
        placeholder="Confirm Password"
      />

      <button className="entry-button" id="signup">
        Sign Up
      </button>

    </div >
  );
}

export default Signup;
