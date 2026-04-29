"use client";

import { useState } from "react";

export default function HomePage() {
  const [amount, setAmount] = useState("");
  const [location, setLocation] = useState("");
  const [result, setResult] = useState(null);

  const analyzeTransaction = () => {
    // fake simulation for UI (backend later)
    const risk = Math.random();

    if (risk > 0.7) {
      setResult({
        status: "FRAUD",
        color: "red",
        probability: risk.toFixed(2),
      });
    } else {
      setResult({
        status: "NORMAL",
        color: "green",
        probability: risk.toFixed(2),
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold">💸 Fraud Detection System</h1>
        <div className="text-sm text-gray-400">AI Banking Security Dashboard</div>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="bg-gray-900 p-4 rounded-xl">
          <h2 className="text-gray-400">Total Transactions</h2>
          <p className="text-2xl font-bold">12,430</p>
        </div>
        <div className="bg-gray-900 p-4 rounded-xl">
          <h2 className="text-gray-400">Fraud Detected</h2>
          <p className="text-2xl font-bold text-red-500">87</p>
        </div>
        <div className="bg-gray-900 p-4 rounded-xl">
          <h2 className="text-gray-400">Safety Rate</h2>
          <p className="text-2xl font-bold text-green-500">99.2%</p>
        </div>
      </div>

      {/* Analyzer */}
      <div className="bg-gray-900 p-6 rounded-xl mb-10">
        <h2 className="text-xl font-bold mb-4">🔍 Test Transaction</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            className="p-3 rounded bg-gray-800"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <input
            className="p-3 rounded bg-gray-800"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <button
          onClick={analyzeTransaction}
          className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded"
        >
          Run AI Analysis
        </button>

        {result && (
          <div className="mt-6 p-4 rounded bg-gray-800">
            <h3 className="text-lg font-bold">Result:</h3>
            <p className={result.color === "red" ? "text-red-500" : "text-green-500"}>
              {result.status}
            </p>
            <p className="text-gray-400">
              Fraud Probability: {result.probability}
            </p>
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-900 p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">📊 Recent Transactions</h2>

        <ul className="space-y-3">
          <li className="flex justify-between border-b border-gray-800 pb-2">
            <span>Transfer - $120</span>
            <span className="text-green-500">Normal</span>
          </li>
          <li className="flex justify-between border-b border-gray-800 pb-2">
            <span>Transfer - $2000</span>
            <span className="text-red-500">Fraud</span>
          </li>
          <li className="flex justify-between">
            <span>Payment - $45</span>
            <span className="text-green-500">Normal</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
