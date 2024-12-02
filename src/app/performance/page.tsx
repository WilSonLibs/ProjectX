"use client"; // Mark this as a client component

import performanceImg from 'public/performance.jpg';
import { useState, useEffect } from 'react';

interface HistoryEntry {
  amount: number;
  date: string;
}

export default function PerformancePage() {
  const [amount, setAmount] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([]); // Explicitly define the type of history

  // Fetch savings history
  useEffect(() => {
    const fetchHistory = async () => {
      const res = await fetch('/api/savings');
      const data: HistoryEntry[] = await res.json(); // Ensure the data matches the defined type
      setHistory(data);
    };
    fetchHistory();
  }, []);

  // Handle Add Savings Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/savings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });
    const data: HistoryEntry = await res.json(); // Ensure the response matches the defined type
    setAmount('');
    setHistory((prevHistory) => [...prevHistory, data]); // Type now matches
  };

  return (
    <div className="relative h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"        style={{
          backgroundImage: `url(${performanceImg.src})`,
          filter: 'blur(2px)',
        }}
      ></div>

      {/* Glass Effect Container */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          backdropFilter: 'blur(10px)',
        }}
      >
        <div
          className="glass-bg mx-auto p-6 rounded-lg shadow-md max-w-3xl"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Manage Your Savings
          </h2>

          {/* Add Savings Form */}
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="mb-4">
              <label
                htmlFor="amount"
                className="block text-sm font-medium mb-2 text-grey-400"
              >
                Enter Amount
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                required
                style={{ border: '1px solid #ccc' }}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Save
            </button>
          </form>

          {/* Savings History */}
          <h3 className="text-xl font-medium mb-4 text-gray-800">Savings History</h3>
          <ul className="space-y-2">
            {history.map((entry, index) => (
              <li
                key={index}
                className="p-4 border rounded-lg bg-white bg-opacity-70"
                style={{
                  border: '1px solid #ddd',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                }}
              >
                Amount: <strong>${entry.amount}</strong> | Date: {entry.date}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
