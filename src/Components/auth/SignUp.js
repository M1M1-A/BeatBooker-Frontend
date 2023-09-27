import React, { useState } from 'react';

const formValues = [
    { id: 1, name: 'name', type: 'text', display: 'Username'},
    { id: 2, name: 'password', type: 'password', display: 'Password' },
    { id: 3, name: 'confirm_password', type: 'password', display: 'Confirm Password' }, 
    { id: 4, name: 'email', type: 'email', display: 'Email' },
    { id: 5, name: 'firstname', type: 'text', display: 'First Name' },
    { id: 6, name: 'lastname', type: 'text', display: 'Last Name' },
];

const API_URL = process.env.REACT_APP_LOCAL_BACKEND_URL;

function SignUp({ navigate }) {
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        confirm_password: '', 
        email: '',
        firstname: '',
        lastname: '',
    });

    

    const emailIsValid = formData.email.includes('@') && formData.email.includes('.');
    const passwordsMatch = formData.password === formData.confirm_password;
    const passwordIsValid = formData.password.length >= 8;
    const isFormValid = passwordsMatch && formData.name && emailIsValid && passwordIsValid;
    const errorMessages = [];
    if (!passwordsMatch) {
        errorMessages.push('Passwords do not match');
    }
    if (!passwordIsValid) {
        errorMessages.push('Password must be at least 8 characters');
    }
    if (!emailIsValid) {
        errorMessages.push('Email is not valid');
    }

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
            const response = await fetch(`${API_URL}api/users/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.status === 201) {
                navigate('/login');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <div className='SignUp'>
            <h2 data-testid='signup-heading'>Sign Up</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    {formValues.map((formValue) => (
                        <div key={formValue.id}>
                            <label htmlFor={formValue.name} data-testid={formValue.name}>
                                {formValue.display} 
                            </label>
                            <input
                                data-testid={`${formValue.name}-input`}
                                type={formValue.type}
                                id={formValue.name}
                                name={formValue.name}
                                value={formData[formValue.name]}
                                onChange={handleInputChange}
                            />
                        </div>
                        ))}
                    {errorMessages.map((errorMessage) => (
                        <div key={errorMessage} data-testid={`${errorMessage}-error`}>
                            {errorMessage}
                            </div>
                        ))}

                </div>
                <button type='submit' id='signup-button' disabled={!isFormValid}>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default SignUp;
