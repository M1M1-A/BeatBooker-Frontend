import React, { useState } from 'react';

const formValues = [
    { id: 1, name: 'username', type: 'text' },
    { id: 2, name: 'password', type: 'password' },
    { id: 3, name: 'confirm_password', type: 'password' }, 
    { id: 4, name: 'email', type: 'email' },
    { id: 5, name: 'first_name', type: 'text' },
    { id: 6, name: 'last_name', type: 'text' },
];

function SignUp({ navigate }) {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirm_password: '', 
        email: '',
        first_name: '',
        last_name: '',
    });

    const emailIsValid = formData.email.includes('@') && formData.email.includes('.');
    const passwordsMatch = formData.password === formData.confirm_password;
    const isFormValid = passwordsMatch && formData.username && emailIsValid;

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
            const response = await fetch('/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.status === 200) {
                navigate('/');
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
                                {formValue.name.replace('_', ' ')} 
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
                        {!passwordsMatch && (
                            <div data-testid='password_error'>
                                Passwords do not match
                            </div>
                        )}
                        {!emailIsValid && (
                            <div data-testid='email_error'>
                                Email is not valid
                                </div>
                        )}

                </div>
                <button type='submit' id='signup-button' disabled={!isFormValid}>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default SignUp;
