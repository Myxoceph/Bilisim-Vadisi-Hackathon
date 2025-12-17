import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import CalendarView from '../components/calendar/CalendarView';
import AppointmentModal from '../components/calendar/AppointmentModal';

export default function Calendar() {
  const { user, isVet } = useAuth();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedAppointments, setSelectedAppointments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data - Backend'den gelecek
  const mockAppointments = [
    { 
      id: 1, 
      date: '2025-01-17', 
      time: '09:00', 
      petName: 'Max', 
      ownerName: 'Ahmet Yılmaz', 
      type: 'Routine Checkup', 
      status: 'confirmed',
      notes: 'First visit, vaccination records needed'
    },
    { 
      id: 2, 
      date: '2025-01-17', 
      time: '10:30', 
      petName: 'Luna', 
      ownerName: 'Ayşe Demir', 
      type: 'Vaccination', 
      status: 'confirmed' 
    },
    { 
      id: 3, 
      date: '2025-01-18', 
      time: '11:00', 
      petName: 'Charlie', 
      ownerName: 'Mehmet Kaya', 
      type: 'Emergency', 
      status: 'pending',
      notes: 'Limping on right front leg'
    },
    { 
      id: 4, 
      date: '2025-01-20', 
      time: '14:00', 
      petName: 'Bella', 
      ownerName: 'Fatma Özkan', 
      type: 'Surgery Follow-up', 
      status: 'confirmed' 
    },
    { 
      id: 5, 
      date: '2025-01-22', 
      time: '15:30', 
      petName: 'Rocky', 
      ownerName: 'Can Arslan', 
      type: 'Dental Cleaning', 
      status: 'pending' 
    },
  ];

  const [appointments, setAppointments] = useState(mockAppointments);
  const [unavailableDates, setUnavailableDates] = useState(['2025-01-25', '2025-01-26']);

  const handleDayClick = (date, dayAppointments) => {
    setSelectedDate(date);
    setSelectedAppointments(dayAppointments);
    setIsModalOpen(true);
  };

  const handleStatusChange = (appointmentId, newStatus) => {
    setAppointments(prev =>
      prev.map(apt =>
        apt.id === appointmentId ? { ...apt, status: newStatus } : apt
      )
    );
  };

  const handleMarkUnavailable = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    if (!unavailableDates.includes(dateStr)) {
      setUnavailableDates(prev => [...prev, dateStr]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {isVet ? 'Appointment Calendar' : 'My Calendar'}
              </h1>
              <p className="text-gray-600 mt-1">
                {isVet 
                  ? 'Manage your clinic appointments and availability' 
                  : 'View your upcoming veterinary appointments'}
              </p>
            </div>

            {isVet && (
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-white border-2 border-secondary text-secondary rounded-lg font-medium hover:bg-secondary hover:text-white transition-all">
                  📊 Analytics
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-secondary to-secondary/90 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                  ➕ New Appointment
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Appointments</p>
                <p className="text-2xl font-bold text-gray-800">{appointments.length}</p>
              </div>
              <span className="text-3xl">📅</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Confirmed</p>
                <p className="text-2xl font-bold text-green-600">
                  {appointments.filter(a => a.status === 'confirmed').length}
                </p>
              </div>
              <span className="text-3xl">✅</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {appointments.filter(a => a.status === 'pending').length}
                </p>
              </div>
              <span className="text-3xl">⏳</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-secondary">
                  {appointments.filter(a => {
                    const aptDate = new Date(a.date);
                    const now = new Date();
                    const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
                    return aptDate >= now && aptDate <= weekFromNow;
                  }).length}
                </p>
              </div>
              <span className="text-3xl">📆</span>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <CalendarView
          appointments={appointments}
          unavailableDates={unavailableDates}
          onDayClick={handleDayClick}
        />

        {/* Modal */}
        <AppointmentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedDate={selectedDate}
          appointments={selectedAppointments}
          onStatusChange={handleStatusChange}
          onMarkUnavailable={handleMarkUnavailable}
        />
      </div>
    </div>
  );
}
