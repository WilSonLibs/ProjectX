"use client"; // Mark this as a client component

import reliabilityImg from "public/reliability.jpg";
import { useState, useEffect } from "react";

export default function ArchivesPage() {
  const [archives, setArchives] = useState([]);

  // Fetch archives history
  useEffect(() => {
    const fetchArchives = async () => {
      const res = await fetch("/api/archives");
      const data = await res.json();
      setArchives(data);
    };
    fetchArchives();
  }, []);

  return (
    <div className="relative h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${reliabilityImg.src})`,
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
            Archives Overview
          </h2>
          <p className="text-gray-700 mb-6 text-center">
            Explore your archived savings and transactions.
          </p>

          {/* Archives List */}
          <ul className="space-y-2">
            {archives.length ? (
              archives.map(
                (
                  archive: { amount: number; date: string; description: string },
                  index
                ) => (
                  <li
                    key={index}
                    className="p-4 border rounded-lg bg-white bg-opacity-70"
                    style={{
                      border: "1px solid #ddd",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                    }}
                  >
                    <p>
                      Amount: <strong>${archive.amount}</strong>
                    </p>
                    <p>Date: {archive.date}</p>
                    <p>Description: {archive.description}</p>
                  </li>
                )
              )
            ) : (
              <p className="text-center text-gray-500">No archives available.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
