import { Outlet, NavLink } from 'react-router-dom';
import logo from '../assets/logo.webp';

export function NavItem({ to, children }) {
  return (
      <NavLink
          to={to}

          className={({ isActive }) =>
              `flex items-center hover:text-secondary transition-colors ${
                  isActive
                      ? "border-b-2 border-secondary text-secondary"
                      : "text-white"
              }`
      }>
          {children}
      </NavLink>
  );
}

export default function Layout() {
  return (
      <div className="min-h-screen bg-primary flex flex-col">
          <nav className="bg-gray-900 shadow-sm">
              <div className="max-w-7xl mx-auto px-4">
                  <div className="flex items-center justify-center space-x-8 h-16">

                      <div className="flex items-center">
                        <img src={logo} alt="Logo" className="h-10 w-auto" />
                      </div>

                      <NavItem to="/">Dashboard</NavItem>
                      <NavItem to="/calendar">Calendar</NavItem>
                      <NavItem to="/appointments">Appointments</NavItem>
                      <NavItem to="/waitlist">Waitlist</NavItem>
                      <NavItem to="/chat">Chat</NavItem>

                      <div className="w-10"></div>

                  </div>
              </div>
          </nav>
          
          <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
              <Outlet />
          </main>
          
          <footer className="bg-gray-900 text-white py-6 mt-auto">
              <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="text-sm">© 2025 Veteriner Randevu Sistemi</p>
              </div>
          </footer>
      </div>
  )
}
