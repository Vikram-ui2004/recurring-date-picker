"use client";
import React from "react";
import { useRecurrenceStore } from "../store/useRecurrenceStore";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const WeekdaySelector: React.FC = () => {
  const selectedWeekdays = useRecurrenceStore((state) => state.weekdays);
  const setWeekdays = useRecurrenceStore((state) => state.setWeekdays);

  const isSelected = (dayIndex: number) =>
    Array.isArray(selectedWeekdays) && selectedWeekdays.includes(dayIndex);

  const toggleWeekday = (dayIndex: number) => {
    if (!Array.isArray(selectedWeekdays)) return;

    if (selectedWeekdays.includes(dayIndex)) {
      setWeekdays(selectedWeekdays.filter((d) => d !== dayIndex));
    } else {
      setWeekdays([...selectedWeekdays, dayIndex]);
    }
  };

  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
        Select Days of the Week:
      </label>
      <div className="flex flex-wrap gap-2">
        {weekdays.map((day, idx) => (
          <button
            key={day}
            type="button"
            onClick={() => toggleWeekday(idx)}
            className={`px-3 py-1 rounded-full border text-sm font-medium transition 
              ${
                isSelected(idx)
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WeekdaySelector;
