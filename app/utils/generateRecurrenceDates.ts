
interface RecurrenceOptions {
    frequency: "daily" | "weekly" | "monthly" | "yearly";
    interval: number;
    weekdays: number[]; 
    monthOption: "day" | "weekday";
    monthDay: number;
    monthWeekday: { weekday: number; week: number };
    startDate: string;
    endDate: string | null;
  }
  
  export function generateRecurrenceDates({
    frequency,
    interval,
    weekdays,
    monthOption,
    monthDay,
    monthWeekday,
    startDate,
    endDate,
  }: RecurrenceOptions): string[] {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date(start);
    end.setFullYear(end.getFullYear() + 1); 
    const result: string[] = [];
    let current = new Date(start);
  
    while (current <= end) {
      switch (frequency) {
        case "daily":
          result.push(current.toISOString());
          current.setDate(current.getDate() + interval);
          break;
  
        case "weekly":
          if (weekdays.includes(current.getDay())) {
            result.push(current.toISOString());
          }
          current.setDate(current.getDate() + 1);
          break;
  
        case "monthly":
          if (monthOption === "day") {
            if (current.getDate() === monthDay) {
              result.push(current.toISOString());
            }
            current.setDate(current.getDate() + 1);
          } else {
           
            const temp = new Date(current);
            if (temp.getDay() === monthWeekday.weekday) {
              const weekNumber = Math.floor((temp.getDate() - 1) / 7) + 1;
              if (weekNumber === monthWeekday.week) {
                result.push(temp.toISOString());
              }
            }
            current.setDate(current.getDate() + 1);
          }
          break;
  
        case "yearly":
          result.push(current.toISOString());
          current.setFullYear(current.getFullYear() + interval);
          break;
      }
    }
  
    return result;
  }
  