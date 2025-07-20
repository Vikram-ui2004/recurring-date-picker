"use client";
import React from "react";
import { useRecurrenceStore } from "../store/useRecurrenceStore";

const options = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
] as const;

const FrequencySelector: React.FC = () => {
  const { frequency, setFrequency } = useRecurrenceStore();

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">
        Frequency
      </label>
      <select
        value={frequency}
        onChange={(e) => setFrequency(e.target.value as typeof frequency)}
        className="w-full border border-gray-300 rounded-md dark:text-black p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FrequencySelector;
