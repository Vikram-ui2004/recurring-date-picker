import { create } from "zustand";

export type Frequency = "daily" | "weekly" | "monthly" | "yearly";

interface RecurrenceState {
  frequency: Frequency;
  interval: number;
  weekdays: number[];
  monthOption: "day" | "weekday";
  monthDay: number;
  monthWeekday: { weekday: number; week: number };
  startDate: string;
  endDate: string | null;
  setFrequency: (value: Frequency) => void;
  setInterval: (value: number) => void;
  setWeekdays: (value: number[]) => void; 
  setMonthOption: (value: "day" | "weekday") => void;
  setMonthDay: (value: number) => void;
  setMonthWeekday: (value: { weekday: number; week: number }) => void;
  setStartDate: (value: string) => void;
  setEndDate: (value: string | null) => void;
}

export const useRecurrenceStore = create<RecurrenceState>((set) => ({
  frequency: "daily",
  interval: 1,
  weekdays: [],
  monthOption: "day",
  monthDay: 1,
  monthWeekday: { weekday: 1, week: 1 },
  startDate: new Date().toISOString().split("T")[0],
  endDate: null,
  setFrequency: (frequency) => set({ frequency }),
  setInterval: (interval) => set({ interval }),
  setWeekdays: (days) => set({ weekdays: days }), 
  setMonthOption: (monthOption) => set({ monthOption }),
  setMonthDay: (monthDay) => set({ monthDay }),
  setMonthWeekday: (monthWeekday) => set({ monthWeekday }),
  setStartDate: (startDate) => set({ startDate }),
  setEndDate: (endDate) => set({ endDate }),
}));
