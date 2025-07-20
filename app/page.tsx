"use client";

import React, { useMemo } from "react";
import FrequencySelector from "./components/FrequencySelector";
import IntervalInput from "./components/IntervalInput";
import WeekdaySelector from "./components/WeekdaySelector";
import MonthlyPatternSelector from "./components/MonthlyPatternSelector";
import DateRangePicker from "./components/DateRangePicker";
import CalendarPreview from "./components/CalendarPreview";
import { useRecurrenceStore } from "./store/useRecurrenceStore";

import { generateRecurrenceDates } from "./utils/generateRecurrenceDates";

const RecurrenceDialog = () => {
  const {
    frequency,
    interval,
    weekdays,
    monthOption,
    monthDay,
    monthWeekday,
    startDate,
    endDate,
  } = useRecurrenceStore();

  const recurrenceDates = useMemo(() => {
    return generateRecurrenceDates({
      frequency,
      interval,
      weekdays,
      monthOption,
      monthDay,
      monthWeekday,
      startDate,
      endDate,
    });
  }, [
    frequency,
    interval,
    weekdays,
    monthOption,
    monthDay,
    monthWeekday,
    startDate,
    endDate,
  ]);

  return (
    <main>
      <div className="max-w-3xl w-full p-6 mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-md space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Recurring Date Picker
        </h2>

        <FrequencySelector />
        <IntervalInput />

        {frequency === "weekly" && <WeekdaySelector />}
        {frequency === "monthly" && <MonthlyPatternSelector />}
        <DateRangePicker />

        <CalendarPreview />

        {/* Optional Display of Generated Recurrence Dates */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-2">
            Generated Recurrence Dates
          </h3>
          <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 max-h-60 overflow-y-auto">
            {recurrenceDates.length > 0 ? (
              recurrenceDates.map((date, index) => (
                <li key={index}>{new Date(date).toDateString()}</li>
              ))
            ) : (
              <li>No dates generated</li>
            )}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default RecurrenceDialog;
