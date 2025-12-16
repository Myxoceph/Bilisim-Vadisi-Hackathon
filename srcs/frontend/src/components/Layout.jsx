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
          <nav className="bg-primary/95 backdrop-blur-md shadow-lg border-b border-white/10 sticky top-0 z-50">
              <div className="max-w-7xl mx-auto px-6">
                  <div className="flex items-center justify-between h-20">

                    <NavLink to="/" className="flex items-center group">
                      <img 
                        src={logo} 
                        alt="Logo" 
                        className="h-12 w-auto transition-transform group-hover:scale-105 duration-300" 
                      />
                    </NavLink>

                    <div className="flex items-center gap-4">
                      <NavLink
                        to="/login"
                        className="text-white/90 hover:text-white transition-all font-medium px-4 py-2 rounded-lg hover:bg-white/5"
                      >
                        Login
                      </NavLink>

                      <NavLink 
                        to="/register" 
                        className="bg-secondary text-white px-6 py-2.5 rounded-lg hover:bg-secondary/90 transition-all font-medium shadow-lg hover:shadow-xl hover:scale-105 duration-300"
                      >
                        Register
                      </NavLink>
                    </div>
                  </div>
              </div>
          </nav>
          
          <main className="flex-1 w-full">
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
