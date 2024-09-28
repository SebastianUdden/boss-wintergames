// SpinHistory.tsx
import React from "react";

interface SpinHistoryProps {
  history: { name: string; weight: number }[];
}

export const SpinHistory: React.FC<SpinHistoryProps> = ({ history }) => (
  <div className="w-full max-w-md mt-4">
    <h2 className="mb-2 text-lg font-semibold">Spin History</h2>
    <ul className="p-4 bg-black rounded shadow">
      {history.length === 0 ? (
        <p className="text-gray-500">No spins yet.</p>
      ) : (
        history.map((entry, index) => (
          <li key={index} className="flex justify-between py-2 border-b">
            <span>{entry.name}</span>
            <span>Weight: {entry.weight}</span>
          </li>
        ))
      )}
    </ul>
  </div>
);
