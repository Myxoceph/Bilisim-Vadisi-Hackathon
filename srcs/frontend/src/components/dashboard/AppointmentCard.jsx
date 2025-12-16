export default function AppointmentCard({ appointment }) {
  const { time, petName, ownerName, type, status } = appointment;

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    confirmed: "bg-green-100 text-green-700 border-green-200",
    completed: "bg-gray-100 text-gray-700 border-gray-200",
    cancelled: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-center bg-gradient-to-br from-secondary/10 to-primary/10 p-3 rounded-lg">
            <p className="text-lg font-bold text-primary">{time.split(':')[0]}</p>
            <p className="text-xs text-gray-600">{time.split(':')[1]}</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800">{petName}</h3>
            <p className="text-sm text-gray-600">{ownerName}</p>
            <p className="text-xs text-gray-500 mt-1">{type}</p>
          </div>
        </div>

        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
    </div>
  );
}
