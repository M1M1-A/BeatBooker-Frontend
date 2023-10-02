import React, { useState, useEffect } from 'react';

function Login({ navigate }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    async function fetchCsrfToken() {
      try {
        const response = await fetch('/get-token/'); 
        const data = await response.json();
        setCsrfToken(data.csrf_token);
      } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
      }
    }

    fetchCsrfToken();
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formBody = new URLSearchParams(formData).toString();

    try {
      const response = await fetch('/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-CSRFToken': csrfToken,
        },
        body: formBody,
      });

      console.log('form data', formData)
      console.log("status code", response.status)

      if (response.status === 200) {
        navigate('/');
      } else {
        console.error('Login failed.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
      <h2 data-testid='login-heading'>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor='username' data-testid='username'>
            username
          </label>
          <input
            data-testid='username-input'
            type='text'
            id='username'
            name='username'
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor='password' data-testid='password'>
            Password
          </label>
          <input
            data-testid='password-input'
            type='password'
            id='password'
            name='password'
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button id='login-button' type='submit'>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;