import { SERVER_URL } from "./config";
import axios from "axios";
import { useState, useEffect } from "react";


// Global Auth function
export const useAuthentication = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        setIsAuthenticated(!!token);
    }, []);

    // login with the help of accesssToken , generates a new access token if it is expired
    const checkAuthentication = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            console.log('Access Token:', accessToken);

            if (!accessToken) {
                setIsAuthenticated(false);
                return false;
            }

            const response = await axios.get(
                `${SERVER_URL}/apis/users/get/`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (response.status === 200) {
                console.log('Token is valid:', response.data);
                setIsAuthenticated(true);
                return true;
            }

            setIsAuthenticated(false);
            return false;
        } catch (error) {
            console.error('Token validation failed:', error);

            const refreshed = await refreshToken();
            if (refreshed) {
                return checkAuthentication();
            }

            setIsAuthenticated(false);
            return false;
        }
    };

    // generates a new accessToken with the help of refreshToken
    const refreshToken = async () => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
                console.log('No refresh token available.');
                return false;
            }

            const response = await axios.post(`${SERVER_URL}/token/refresh/`, {
                refresh: refreshToken,
            });

            const { access } = response.data;
            localStorage.setItem('accessToken', access);

            console.log('Token refreshed successfully.');
            return true;
        } catch (error) {
            console.error('Token refresh failed:', error);
            return false;
        }
    };

    // Logs in the user, throws an error if login fails
    const login = async (formData) => {
        try {
            logout();
            const response = await axios.post(`${SERVER_URL}/token/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            console.log("Response received:", response);
            const { access: accessToken, refresh: refreshToken } = response.data;
    
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            const user = await getUser();
            localStorage.setItem('user', JSON.stringify(user)); 
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    // Registers the user, throws an error if registration fails
    const register = async (formData) => {
        try {
            const response = await axios.post(`${SERVER_URL}/apis/users/create`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                console.log('User registered successfully:', response.data);
            }
        } catch (error) {
            throw error;
        }
    };

    // Fetches the user details
    const getUser = async () => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            throw new Error('Access token is missing.');
        }
        try {
            const request = await axios.get(`${SERVER_URL}/apis/users/get/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (request.status === 200) {
                console.log('User fetched successfully:', request.data);
                return request.data;
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('Access token is invalid:', error);
                return null;
            } else {
                throw error;
            }
        }
    };

    // Logs out the user, clear the necessary local storage
    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        console.log('Logged out successfully.');
    };

    return {
        isAuthenticated,
        checkAuthentication,
        login,
        register,
        getUser,
        logout,
    };
};
