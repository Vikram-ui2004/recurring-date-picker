"use client";
import React from "react";
import { useRecurrenceStore } from "../store/useRecurrenceStore";

const DateRangePicker: React.FC = () => {
  const { startDate, endDate, setStartDate, setEndDate } = useRecurrenceStore();

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  return (
    <div className="mt-4 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white">
          Start Date
        </label>
        <input
          type="date"
          value={startDate ?? ""}
          onChange={handleStartDateChange}
          className="mt-1 px-3 py-2 border rounded-md dark:text-black w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white">
          End Date (optional)
        </label>
        <input
          type="date"
          value={endDate ?? ""}
          onChange={handleEndDateChange}
          className="mt-1 px-3 py-2 border dark:text-black rounded-md w-full"
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
