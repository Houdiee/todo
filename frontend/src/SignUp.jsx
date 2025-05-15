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

  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null)

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        username: formData.username,
        password: formData.password,
      })

      console.log(response.data);
      navigate("/login");
    } catch (error) {
      setError(error.response.data);
      console.log(error);
    }
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
          name="confirmPassword"
          onChange={handleInputChange}
          value={formData.confirmPassword}
          required
        />

        <Link to="/login">
          <button className="small-link">Already have an account? Log in instead</button>
        </Link>

        <button className="entry-button" id="signup" type="submit" onSubmit={handleSubmit}>
          Sign Up
        </button>
        {error && <div style={{ color: 'red', marginTop: "1em" }}>{error}</div>}
      </form>

    </div >
  );
}

export default Signup;
