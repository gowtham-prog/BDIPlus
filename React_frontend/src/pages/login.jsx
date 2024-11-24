import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthentication } from '../Authentication';
import Button from '../components/Button';
import InputField from '../components/inputField';
import Layout from '../components/layout';

export default function Login() {
    const { login} = useAuthentication();
    const [authenticated, setAuthenticated] = useState(!!localStorage.getItem("accessToken") || false);


    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    //navigate back to homepage, if user is already authenticated
    useEffect(() => {
        if(authenticated){
            navigate("/");
        }
    }, [authenticated,]);

    // triigers submit form Function
    const handleUserLogin = (e) => {
        e.preventDefault();
        submitForm();
    };

    // validates the user credentials and then proceeds to signup the user
    const submitForm = async () => {
        setErrorMessage("");
        setShowError(false);
        console.log("Entered username and password", username, password);

        if (username === "" || password === "") {
            setErrorMessage("Enter valid username and password");
            setShowError(true);
            return;
        }

        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);

            await loginUser(formData);
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.detail || "An error occurred during login.");
            } else {
                setErrorMessage("Invalid username or password.");
            }
            setShowError(true);
        }
    };

    //calls the login function from useAuthentication, logs an error if any
    const loginUser = async (formData) => {
        try {
            const response = await login(formData);
            console.log("here is the response",response);
            navigate("/");
        } catch (error) {
            console.error("Error during login:", error);

            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.detail || "An error occurred during login.");
            } else {
                setErrorMessage("Invalid username or password.");
            }
            setShowError(true);
        }
    };

    return (
        <Layout>
            <div className='flex flex-col md:w-1/3 h-full md:h-1/2 justify-center max-w-7xl'>
                <span className='text-5xl font-bold text-[#2C2C2C] text-left pb-8'>Login</span>
                
                <div className='flex flex-col items-center justify-center w-full h-fit shadow-lg  bg-gradient-to-b from-[#DBD5A4] to-[#649173] border-2 border-[#2C2C2C] rounded-lg p-6'>
                    <InputField 
                        type="text" 
                        placeholder="Username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    <InputField 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <Button name="Login" click={(e) => handleUserLogin(e)} />
                    <span className='text-black text-center my-4'>
                        Don't have an account? 
                        <a className='font-semibold text-[#2C2C2C]' href="/signup">Signup</a>
                    </span>

                    {showError ? (
                        <p className="mt-4 text-sm text-red-600 dark:text-red-400 text-center">{errorMessage}</p>
                    ) : (<div></div>)}
                </div>
            </div>
        </Layout>
    );
}
