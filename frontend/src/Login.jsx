import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  // const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await axios.get("http://localhost:8000/api/user", {
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

    </div >
  );
}

export default Login;
