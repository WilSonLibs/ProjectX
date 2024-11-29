"use client"; // Mark this as a client component

import scaleImg from "public/scale.jpg";
import { useState } from "react";

export default function WithdrawPage() {
  const [withdrawAmount, setWithdrawAmount] = useState("");

  // Handle Withdraw Form
  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/withdraw", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: withdrawAmount }),
    });
    const data = await res.json();
    setWithdrawAmount("");
    alert(data.message || "Withdrawal successful!");
  };

  return (
    <div className="relative h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${scaleImg.src})`,
          filter: "blur(2px)",
        }}
      ></div>

      {/* Glass Effect Container */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          backdropFilter: "blur(10px)",
        }}
      >
        <div
          className="glass-bg mx-auto p-6 rounded-lg shadow-md max-w-3xl"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Make a Withdrawal
          </h2>

          {/* Withdraw Form */}
          <form onSubmit={handleWithdraw} className="mb-6">
            <div className="mb-4">
              <label
                htmlFor="withdrawAmount"
                className="block text-sm font-medium mb-2 text-gray-700"
              >
                Withdrawal Amount
              </label>
              <input
                type="number"
                id="withdrawAmount"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                required
                style={{ border: "1px solid #ccc" }}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Withdraw
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
