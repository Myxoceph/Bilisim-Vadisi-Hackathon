import { useAuth } from '../context/AuthContext';
import VetDashboard from './VetDashboard';
import CustomerDashboard from './CustomerDashboard';

export default function Dashboard() {
  const { user } = useAuth();

  if (user?.userType === 'vet') {
    return <VetDashboard />;
  }

  return <CustomerDashboard />;
}
