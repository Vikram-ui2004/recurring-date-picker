"use client";
import React, { useMemo } from "react";
import { useRecurrenceStore } from "../store/useRecurrenceStore";
import {
  addDays,
  addWeeks,
  addMonths,
  addYears,
  isAfter,
  parseISO,
} from "date-fns";

const getNextDates = (
  startDate: Date,
  endDate: Date | null,
  frequency: string,
  interval: number,
  weekdays: number[],
  monthlyPattern: { week: number; weekday: number }
): Date[] => {
  const dates: Date[] = [];
  let current = new Date(startDate);

  const maxIterations = 100;

  for (let i = 0; i < maxIterations; i++) {
    if (endDate && isAfter(current, endDate)) break;

    if (frequency === "daily") {
      dates.push(new Date(current));
      current = addDays(current, interval);
    } else if (frequency === "weekly") {
      for (let d = 0; d < 7; d++) {
        const date = addDays(current, d);
        if (weekdays.includes(date.getDay())) {
          if (!endDate || !isAfter(date, endDate)) dates.push(date);
        }
      }
      current = addWeeks(current, interval);
    } else if (frequency === "monthly") {
      const date = new Date(current.getFullYear(), current.getMonth(), 1);
      date.setDate(1 + (monthlyPattern.week - 1) * 7);

      while (date.getDay() !== monthlyPattern.weekday) {
        date.setDate(date.getDate() + 1);
      }

      if (!endDate || !isAfter(date, endDate)) {
        dates.push(new Date(date));
      }

      current = addMonths(current, interval);
    } else if (frequency === "yearly") {
      dates.push(new Date(current));
      current = addYears(current, interval);
    } else {
      break;
    }
  }

  return dates;
};

const CalendarPreview: React.FC = () => {
  const { startDate, endDate, frequency, interval, weekdays, monthWeekday } =
    useRecurrenceStore();

  const parsedStart = startDate ? parseISO(startDate) : null;
  const parsedEnd = endDate ? parseISO(endDate) : null;

  const previewDates = useMemo(() => {
    if (
      !parsedStart ||
      !frequency ||
      !interval ||
      (frequency === "monthly" &&
        (!monthWeekday ||
          monthWeekday.week === undefined ||
          monthWeekday.weekday === undefined))
    ) {
      return [];
    }

    return getNextDates(
      parsedStart,
      parsedEnd,
      frequency,
      interval,
      weekdays,
      monthWeekday
    );
  }, [parsedStart, parsedEnd, frequency, interval, weekdays, monthWeekday]);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Preview</h3>
      {previewDates.length === 0 ? (
        <p className="text-gray-500 dark:text-white">
          No recurring dates generated.
        </p>
      ) : (
        <ul className="grid grid-cols-2 gap-2 text-sm text-gray-700">
          {previewDates.slice(0, 10).map((date, index) => (
            <li
              key={index}
              className="px-2 py-1 border rounded dark:text-white"
            >
              {date.toDateString()}
            </li>
          ))}
        </ul>
      )}
      {previewDates.length > 10 && (
        <p className="text-xs text-gray-400 mt-1">
          Showing first 10 dates only
        </p>
      )}
    </div>
  );
};

export default CalendarPreview;
