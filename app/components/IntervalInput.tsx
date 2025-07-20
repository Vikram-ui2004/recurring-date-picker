"use client";
import React from "react";
import { useRecurrenceStore } from "../store/useRecurrenceStore";

const IntervalInput: React.FC = () => {
  const { interval, setInterval, frequency } = useRecurrenceStore();

  const labelMap: Record<string, string> = {
    daily: "days",
    weekly: "weeks",
    monthly: "months",
    yearly: "years",
  };

  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">
        Repeat every:
      </label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          min={1}
          value={interval}
          onChange={(e) => setInterval(Number(e.target.value))}
          className="w-20 border border-gray-300 dark:text-black rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <span className="text-sm text-gray-600 dark:text-white">
          {labelMap[frequency]}
        </span>
      </div>
    </div>
  );
};

export default IntervalInput;
