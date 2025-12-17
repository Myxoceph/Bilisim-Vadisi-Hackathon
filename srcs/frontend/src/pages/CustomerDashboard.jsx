import { Link } from 'react-router-dom';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import StatCard from '../components/dashboard/StatCard';
import AppointmentCard from '../components/dashboard/AppointmentCard';

export default function CustomerDashboard() {
  const stats = {
    upcomingAppointments: 0,
    totalVisits: 0,
    favoriteClinics: 0,
  };

  const upcomingAppointments = [];

  const favoriteClinics = [];

  const actions = (
    <Link
      to="/appointments/new"
      className="px-6 py-2 bg-gradient-to-r from-secondary to-secondary/90 text-white rounded-lg font-medium hover:shadow-lg transition-all"
    >
      ➕ New Appointment
    </Link>
  );

  return (
    <DashboardLayout 
      title="My Dashboard" 
      subtitle="Manage your pet's health appointments"
      actions={actions}
    >

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Upcoming Appointments"
          value={stats.upcomingAppointments}
          icon="📅"
          color="secondary"
        />
        <StatCard
          title="Total Visits"
          value={stats.totalVisits}
          icon="🏥"
          color="primary"
        />
        <StatCard
          title="Favorite Clinics"
          value={stats.favoriteClinics}
          icon="⭐"
          color="warning"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Upcoming Appointments</h2>
            <p className="text-gray-600 text-sm mt-1">Your scheduled visits</p>
          </div>
          <Link
            to="/appointments"
            className="text-secondary hover:text-secondary/80 font-medium text-sm"
          >
            View All →
          </Link>
        </div>

        <div className="space-y-3">
          {upcomingAppointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>

        {upcomingAppointments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-4">No upcoming appointments</p>
            <Link
              to="/appointments/new"
              className="inline-block px-6 py-2 bg-secondary text-white rounded-lg font-medium hover:bg-secondary/90 transition-all"
            >
              Book Your First Appointment
            </Link>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Favorite Clinics</h2>
          <div className="space-y-3">
            {favoriteClinics.map((clinic) => (
              <div 
                key={clinic.id} 
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
              >
                <div>
                  <h3 className="font-semibold text-gray-800">{clinic.name}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-sm text-yellow-500">⭐ {clinic.rating}</span>
                    <span className="text-sm text-gray-500">📍 {clinic.distance}</span>
                  </div>
                </div>
                <Link
                  to={`/clinic/${clinic.id}`}
                  className="text-secondary hover:text-secondary/80 font-medium text-sm"
                >
                  View →
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                to="/find-vet"
                className="flex items-center gap-4 p-4 bg-gradient-to-br from-secondary/10 to-primary/10 border border-secondary/20 rounded-xl hover:shadow-md transition-all"
              >
                <span className="text-3xl">🔍</span>
                <div>
                  <h3 className="font-semibold text-gray-800">Find Veterinarian</h3>
                  <p className="text-sm text-gray-600">Search nearby clinics</p>
                </div>
              </Link>

              <Link
                to="/my-pets"
                className="flex items-center gap-4 p-4 bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-xl hover:shadow-md transition-all"
              >
                <span className="text-3xl">🐾</span>
                <div>
                  <h3 className="font-semibold text-gray-800">My Pets</h3>
                  <p className="text-sm text-gray-600">Manage pet profiles</p>
                </div>
              </Link>

              <Link
                to="/chat"
                className="flex items-center gap-4 p-4 bg-gradient-to-br from-secondary/10 to-primary/10 border border-secondary/20 rounded-xl hover:shadow-md transition-all"
              >
                <span className="text-3xl">💬</span>
                <div>
                  <h3 className="font-semibold text-gray-800">Messages</h3>
                  <p className="text-sm text-gray-600">Chat with veterinarians</p>
                </div>
              </Link>
            </div>
          </div>
        </div>

      </div>

    </DashboardLayout>
  );
}
