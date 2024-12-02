'use client';

import React, { useState, useEffect } from 'react';

const ProfilePage = () => {
    const [userInfo, setUserInfo] = useState({ username: '', email: '' });
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [mobileMoneyAccount, setMobileMoneyAccount] = useState('');
    const [message, setMessage] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        // Fetch user info from backend when the component is mounted
        fetchUserInfo();
    }, []);

    const fetchUserInfo = async () => {
        const response = await fetch('http://localhost:5000/profile', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const data = await response.json();
        setUserInfo(data.user);
    };

    const handleUsernameChange = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/profile/username', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ username: newUsername }),
        });

        const result = await response.json();
        setMessage(result.message);
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/profile/password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ password: newPassword }),
        });

        const result = await response.json();
        setMessage(result.message);
    };

    const handleMobileMoneyLink = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/profile/mobile-money', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ mobileMoneyAccount }),
        });

        const result = await response.json();
        setMessage(result.message);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <div className="container mx-auto p-6 "> {/* Add margin-top to move profile content below header */}
            
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <div className="mb-6">
                    <h2 className="text-2xl font-medium">Username: {userInfo.username}</h2>
                    <form onSubmit={handleUsernameChange} className="mt-4">
                        <input
                            type="text"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            placeholder="New username"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                        >
                            Change Username
                        </button>
                    </form>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-medium">Email: {userInfo.email}</h2>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-medium mb-2">Change Password</h3>
                    <form onSubmit={handlePasswordChange}>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="New password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                        >
                            Change Password
                        </button>
                    </form>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-medium mb-2">Link Mobile Money Account</h3>
                    <form onSubmit={handleMobileMoneyLink}>
                        <input
                            type="text"
                            value={mobileMoneyAccount}
                            onChange={(e) => setMobileMoneyAccount(e.target.value)}
                            placeholder="Mobile Money Account"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                        >
                            Link Account
                        </button>
                    </form>
                </div>

                <div>
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-200"
                    >
                        Logout
                    </button>
                </div>

                {message && (
                    <div className="mt-4 text-center text-sm text-green-500">
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
