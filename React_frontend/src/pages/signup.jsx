import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthentication } from '../Authentication';
import Button from '../components/Button';
import InputField from '../components/inputField';
import Layout from '../components/layout';


export default function Signup() {
    const { login, register } = useAuthentication();
    const [authenticated, setAuthenticated] = useState(!!localStorage.getItem("accessToken") || false);

    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    //navigate back to homepage, if user is already authenticated
    useEffect(() => {
        if (authenticated) {
            navigate("/");
        }
    }, [authenticated,]);


    // triggers submitform
    const handleUserSignup = (e) => {
        e.preventDefault();
        submitForm();
    };

    // validates the user credentials and then proceeds to register, then signup the user
    const submitForm = async () => {
        setShowError(false);
        setErrorMessage("");

        if (username === "" || email === "" || firstName === "" || lastName === "" || password === "" || confirmPassword === "") {
            setShowError(true);
            setErrorMessage("Please enter all credentials");
            return;
        }

        if (password !== confirmPassword) {
            setShowError(true);
            setErrorMessage("Passwords do not match");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('email', email);
            formData.append('password', password);

            console.log("Registering user:", formData);

            await register(formData);

            const loginFormData = new FormData();
            loginFormData.append('username', username);
            loginFormData.append('password', password);

            console.log("Logging in user:", loginFormData);

            await login(loginFormData);
            navigate("/");

        } catch (error) {
            console.error('Error while registering user:', error);

            if (error.response && error.response.data) {
                const errorData = error.response.data;

                if (errorData.username && Array.isArray(errorData.username)) {
                    setErrorMessage(errorData.username[0]);
                } else if (errorData.email && Array.isArray(errorData.email)) {
                    setErrorMessage(errorData.email[0]);
                } else {
                    setErrorMessage(errorData.detail || "Unable to create an account.");
                }
            } else {
                setErrorMessage("An unexpected error occurred.");
            }

            setShowError(true);
        }
    };


    return (
        <Layout>
            {
                authenticated ?
                    navigate('/dashboard')
                    :
                    <div className='flex flex-col md:w-1/3 h-full md:h-1/2 justify-center max-w-7xl'>
                        <span className='text-5xl font-bold text-[#2C2C2C] text-left pb-8'>Sign up</span>
                        <div className='flex flex-col items-center justify-center w-full h-fit shadow-lg bg-gradient-to-b from-[#DBD5A4] to-[#649173] border-2 border-[#2C2C2C] rounded-lg p-6'>
                            <InputField type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            <InputField type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            <InputField type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <InputField type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <InputField type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <InputField type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            <Button name="Sign up" click={(e) => handleUserSignup(e)} />
                            <span className='text-black text-center my-4'>Already have an account? <a className='font-semibold text-[#2C2C2C]' href="/login">Login</a></span>
                            {showError ? (
                                <p className="mt-4 text-sm text-red-600 dark:text-red-400 text-center">{errorMessage}</p>
                            ) :
                                (<div>
                                </div>)}
                        </div>
                    </div>
            }
        </Layout>
    )
}