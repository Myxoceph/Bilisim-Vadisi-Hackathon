import { Link } from "react-router-dom";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import StatCard from "../components/dashboard/StatCard";
import AppointmentCard from "../components/dashboard/AppointmentCard";

export default function VetDashboard() {
  // Mock data - Backend'den gelecek
  const stats = {
    todayAppointments: 8,
    totalPatients: 124,
    pendingRequests: 3,
    monthlyRevenue: "₺12,450",
  };

  const todayAppointments = [
    {
      id: 1,
      time: "09:00",
      petName: "Max",
      ownerName: "Ahmet Yılmaz",
      type: "Routine Checkup",
      status: "confirmed",
    },
    {
      id: 2,
      time: "10:30",
      petName: "Luna",
      ownerName: "Ayşe Demir",
      type: "Vaccination",
      status: "confirmed",
    },
    {
      id: 3,
      time: "11:00",
      petName: "Charlie",
      ownerName: "Mehmet Kaya",
      type: "Emergency",
      status: "pending",
    },
    {
      id: 4,
      time: "14:00",
      petName: "Bella",
      ownerName: "Fatma Özkan",
      type: "Surgery",
      status: "confirmed",
    },
  ];

  const actions = (
    <>
      <Link
        to="/clinic-settings"
        className="px-4 py-2 bg-white border-2 border-secondary text-secondary rounded-lg font-medium hover:bg-secondary hover:text-white transition-all"
      >
        ⚙️ Clinic Settings
      </Link>
      <Link
        to="/calendar"
        className="px-4 py-2 bg-gradient-to-r from-secondary to-secondary/90 text-white rounded-lg font-medium hover:shadow-lg transition-all"
      >
        📅 View Calendar
      </Link>
    </>
  );

  return (
    <DashboardLayout
      title="Veterinarian Dashboard"
      subtitle="Manage your clinic and appointments"
      actions={actions}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Today's Appointments"
          value={stats.todayAppointments}
          icon="📅"
          color="secondary"
          trend="+2 from yesterday"
        />
        <StatCard
          title="Total Patients"
          value={stats.totalPatients}
          icon="🐾"
          color="primary"
          trend="+15 this month"
        />
        <StatCard
          title="Pending Requests"
          value={stats.pendingRequests}
          icon="⏳"
          color="warning"
        />
        <StatCard
          title="Monthly Revenue"
          value={stats.monthlyRevenue}
          icon="💰"
          color="success"
          trend="+12% from last month"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Today's Schedule
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <Link
            to="/appointments"
            className="text-secondary hover:text-secondary/80 font-medium text-sm"
          >
            View All →
          </Link>
        </div>

        <div className="space-y-3">
          {todayAppointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>

        {todayAppointments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No appointments scheduled for today
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/waitlist"
          className="bg-gradient-to-br from-secondary/10 to-primary/10 border border-secondary/20 rounded-xl p-6 hover:shadow-lg transition-all group"
        >
          <div className="text-4xl mb-3">📋</div>
          <h3 className="font-bold text-lg text-gray-800 mb-2">Waitlist</h3>
          <p className="text-sm text-gray-600">
            Manage pending appointment requests
          </p>
        </Link>

        <Link
          to="/patients"
          className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-6 hover:shadow-lg transition-all group"
        >
          <div className="text-4xl mb-3">🏥</div>
          <h3 className="font-bold text-lg text-gray-800 mb-2">
            Patient Records
          </h3>
          <p className="text-sm text-gray-600">
            View and update patient information
          </p>
        </Link>

        <Link
          to="/chat"
          className="bg-gradient-to-br from-secondary/10 to-primary/10 border border-secondary/20 rounded-xl p-6 hover:shadow-lg transition-all group"
        >
          <div className="text-4xl mb-3">💬</div>
          <h3 className="font-bold text-lg text-gray-800 mb-2">Messages</h3>
          <p className="text-sm text-gray-600">Chat with pet owners</p>
        </Link>
      </div>
    </DashboardLayout>
  );
}
