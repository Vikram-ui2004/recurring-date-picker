import { useRecurrenceStore } from "../store/useRecurrenceStore";

const orders = ["first", "second", "third", "fourth", "last"];
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MonthlyPatternSelector: React.FC = () => {
  const monthWeekday = useRecurrenceStore((s) => s.monthWeekday);
  const setMonthWeekday = useRecurrenceStore((s) => s.setMonthWeekday);

  const handleOrderChange = (week: number) => {
    setMonthWeekday({
      ...monthWeekday,
      week,
    });
  };

  const handleWeekdayChange = (weekday: number) => {
    setMonthWeekday({
      ...monthWeekday,
      weekday,
    });
  };

  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
        Monthly Pattern:
      </label>
      <div className="flex flex-wrap gap-2 mb-2">
        {orders.map((order, idx) => (
          <button
            key={order}
            type="button"
            onClick={() => handleOrderChange(idx + 1)} // weeks: 1 = first, ..., 5 = last
            className={`px-3 py-1 rounded-full border text-sm font-medium transition ${
              monthWeekday.week === idx + 1
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {order}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {weekdays.map((day, idx) => (
          <button
            key={day}
            type="button"
            onClick={() => handleWeekdayChange(idx)}
            className={`px-3 py-1 rounded-full border text-sm font-medium transition ${
              monthWeekday.weekday === idx
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MonthlyPatternSelector;
