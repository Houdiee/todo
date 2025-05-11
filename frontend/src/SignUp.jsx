import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  // const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await axios.post("http://localhost:8000/api/user", {
      username: formData.username,
      password: formData.password,
    })

    console.log(response.data);
    navigate("/");
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  return (
    <div className="container" id="login">
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit}>
        <input
          className="text-input"
          type="text"
          placeholder="Create a username"
          name="username"
          onChange={handleInputChange}
          value={formData.username}
          required
        />

        <input
          className="text-input"
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleInputChange}
          value={formData.password}
          required
        />

        <input
          className="text-input"
          type="password"
          placeholder="Confirm Password"
          name="password"
          onChange={handleInputChange}
          value={formData.password}
          required
        />

        <Link to="/login">
          <button className="small-link">Already have an account? Log in instead</button>
        </Link>

        <button className="entry-button" id="signup" type="submit" onSubmit={handleSubmit}>
          Sign Up
        </button>
      </form>

    </div >
  );
}

export default Signup;
