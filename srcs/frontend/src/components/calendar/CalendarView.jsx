import { useState, useMemo } from "react";
import CalendarHeader from "./CalendarHeader";
import DayCell from "./DayCell";

export default function CalendarView({
  appointments = [],
  onDayClick,
  unavailableDates = [],
}) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const startPadding = firstDay.getDay();
    const prevMonthDays = new Date(year, month, 0).getDate();

    const endPadding = 6 - lastDay.getDay();

    const days = [];

    for (let i = startPadding - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, prevMonthDays - i),
      });
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        date: new Date(year, month, i),
      });
    }

    for (let i = 1; i <= endPadding; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        date: new Date(year, month + 1, i),
      });
    }

    return days;
  }, [currentDate]);

  const today = new Date();

  const isToday = (date) => {
    return date.toDateString() === today.toDateString();
  };

  const getAppointmentsForDay = (date) => {
    const dateStr = date.toISOString().split("T")[0];
    return unavailableDates.includes(dateStr);
  };

  const isUnavailable = (date) => {
    const dateStr = date.toISOString().split("T")[0];
    return unavailableDates.includes(dateStr);
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onToday={handleToday}
      />

      <div className="grid grid-cols-7 gap-2 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-semibold text-gray-600 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((dayInfo, index) => (
          <DayCell
            key={index}
            day={dayInfo.day}
            appointments={getAppointmentsForDay(dayInfo.date)}
            isToday={isToday(dayInfo.date)}
            isCurrentMonth={dayInfo.isCurrentMonth}
            isAvailable={!isUnavailable(dayInfo.date)}
            onClick={() =>
              onDayClick(dayInfo.date, getAppointmentsForDay(dayInfo.date))
            }
          />
        ))}
      </div>

      <div className="flex items-center gap-6 mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-100 border border-green-200 rounded"></div>
          <span className="text-xs text-gray-600">Confirmed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-100 border border-yellow-200 rounded"></div>
          <span className="text-xs text-gray-600">Pending</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-100 border border-red-200 rounded"></div>
          <span className="text-xs text-gray-600">Unavailable</span>
        </div>
      </div>
    </div>
  );
}
