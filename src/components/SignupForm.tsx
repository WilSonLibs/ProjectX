"use client";

import { useState } from "react";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // New state for loading

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setMessage(data.message);
      alert(data.message);
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block w-full p-2 mb-3 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full p-2 mb-3 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-2 mb-3 border rounded"
          required
        />
        <button
          type="submit"
          className={`w-full text-white p-2 rounded transition-all ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-green-500"
          }`}
          disabled={loading} // Disable button when loading
        >
          {loading ? (
            <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 border-t-transparent border-blue-600 rounded-full"></div>
          ) : (
            "Register"
          )}
        </button>
      </form>
      {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
    </div>
  );
}
