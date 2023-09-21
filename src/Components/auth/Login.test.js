import React from 'react';
import { render } from '@testing-library/react';
import Login from '../auth/Login'; 

describe('Login Component', () => {
  it('renders the login form', () => {
    const { getByTestId } = render(<Login />);

    expect(getByTestId('login-heading')).toBeInTheDocument();
    expect(getByTestId('username')).toBeInTheDocument();
    expect(getByTestId('password')).toBeInTheDocument();
  }); 

  // Once sign up functionality complete, add test which signs up a user, and then deletes them after
  // And checks that login is successful for an existing user


  //Test for login unsuccessful with incorrect email

  //Test for login unsuccessful with incorrect password


});
