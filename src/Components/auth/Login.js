import React, { useState } from 'react';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        window.location.href = '/';
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
          <label htmlFor="username" data-testid='username'>Username</label>
          <input
            data-testid="username-input"
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password" data-testid="password">Password</label>
          <input
            data-testid="password-input"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button data-testid='login-button' type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
