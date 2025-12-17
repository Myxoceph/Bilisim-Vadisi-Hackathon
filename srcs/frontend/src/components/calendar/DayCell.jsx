export default function DayCell({
  day,
  appointments = [],
  isToday,
  isCurrentMonth,
  isAvailable = true,
  onClick,
}) {
  const safeAppointments = Array.isArray(appointments) ? appointments : [];
  const appointmentCount = safeAppointments.length;

  return (
    <button
      onClick={() => onClick(day, safeAppointments)}
      disabled={!isCurrentMonth}
      className={`
        min-h-28 p-2 border rounded-lg transition-all
        ${
          !isCurrentMonth
            ? "bg-gray-50 text-gray-300 cursor-not-allowed"
            : "bg-white hover:bg-gray-50 cursor-pointer"
        }
        ${isToday ? "ring-2 ring-secondary shadow-md" : "border-gray-200"}
        ${!isAvailable && isCurrentMonth ? "bg-red-50 border-red-200" : ""}
      `}
    >
      <div className="flex justify-between items-start mb-2">
        <span
          className={`text-sm font-semibold ${
            isToday
              ? "bg-secondary text-white px-2 py-1 rounded-full"
              : isCurrentMonth
              ? "text-gray-700"
              : "text-gray-400"
          }`}
        >
          {day}
        </span>

        {appointmentCount > 0 && isCurrentMonth && (
          <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">
            {appointmentCount}
          </span>
        )}
      </div>

      {isCurrentMonth && (
        <div className="space-y-1">
          {safeAppointments.slice(0, 2).map((apt, idx) => (
            <div
              key={idx}
              className={`text-xs px-2 py-1 rounded truncate text-left ${
                apt.status === "confirmed"
                  ? "bg-green-100 text-green-700"
                  : apt.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : apt.status === "cancelled"
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {apt.time}
            </div>
          ))}
          {appointmentCount > 2 && (
            <div className="text-xs text-gray-500 text-center">
              +{appointmentCount - 2} more
            </div>
          )}
        </div>
      )}

      {!isAvailable && isCurrentMonth && (
        <div className="text-xs text-red-600 mt-1">Unavailable</div>
      )}
    </button>
  );
}
