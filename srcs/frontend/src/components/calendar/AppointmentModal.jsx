import { useAuth } from "../../context/AuthContext";

export default function AppointmentModal({
  isOpen,
  onClose,
  selectedDate,
  appointments = [],
  onStatusChange,
  onMarkUnavailable,
}) {
  const { user, isVet } = useAuth();

  if (!isOpen) return null;

  const dateStr = selectedDate?.toLocaleDateString("tr-TR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleStatusChange = (appointmentId, newStatus) => {
    onStatusChange?.(appointmentId, newStatus);
  };

  const handleMarkUnavailable = () => {
    onMarkUnavailable?.(selectedDate);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-1">{dateStr}</h2>
              <p className="text-white/90 text-sm">
                {appointments.length} appointment
                {appointments.length !== 1 ? "s" : ""}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-all"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(80vh-140px)]">
          {appointments.length > 0 ? (
            <div className="space-y-4">
              {appointments.map((apt) => (
                <div
                  key={apt.id}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg font-bold text-gray-800">
                          {apt.time}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            apt.status === "confirmed"
                              ? "bg-green-100 text-green-700"
                              : apt.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {apt.status}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-800">
                        {apt.petName}
                      </h3>
                      <p className="text-sm text-gray-600">{apt.ownerName}</p>
                      <p className="text-sm text-gray-500 mt-1">{apt.type}</p>
                    </div>

                    {isVet && apt.status !== "cancelled" && (
                      <div className="flex gap-2">
                        {apt.status === "pending" && (
                          <button
                            onClick={() =>
                              handleStatusChange(apt.id, "confirmed")
                            }
                            className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-all"
                          >
                            ✓ Confirm
                          </button>
                        )}
                        <button
                          onClick={() =>
                            handleStatusChange(apt.id, "cancelled")
                          }
                          className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-all"
                        >
                          ✕ Cancel
                        </button>
                      </div>
                    )}
                  </div>

                  {apt.notes && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Notes: </span>
                        {apt.notes}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📅</div>
              <p className="text-gray-500 text-lg mb-2">
                No appointments scheduled
              </p>
              <p className="text-gray-400 text-sm">This day is available</p>
            </div>
          )}
        </div>

        {isVet && (
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="flex gap-3">
              <button
                onClick={handleMarkUnavailable}
                className="flex-1 px-4 py-2 border-2 border-red-300 text-red-700 rounded-lg font-medium hover:bg-red-50 transition-all"
              >
                Mark as Unavailable
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-secondary text-white rounded-lg font-medium hover:bg-secondary/90 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {!isVet && (
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-secondary text-white rounded-lg font-medium hover:bg-secondary/90 transition-all"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
