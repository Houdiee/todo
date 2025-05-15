import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        username: formData.username,
        password: formData.password,
      })

      const token = response.data.token;
      localStorage.setItem('token', token);

      console.log(response.data);
      navigate("/");
    }
    catch (error) {
      setError(error.response.data)
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
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          className="text-input"
          type="text"
          placeholder="Username"
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

        <Link to="/signup">
          <button className="entry-button" id="signup">
            Sign Up
          </button>
        </Link>

        <button className="entry-button" id="login" type="submit" onSubmit={handleSubmit}>
          Log In
        </button>
      </form>
      {error && <div style={{ color: 'red', marginTop: "1em" }}>{error}</div>}
    </div >
  );
}

export default Login;
