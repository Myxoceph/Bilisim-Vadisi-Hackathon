import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsDropdownOpen(false);
  };

  return (
      <div className="min-h-screen bg-primary flex flex-col">
          <header>
            <nav 
              className={`fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md shadow-lg border-b border-white/10 transition-all duration-300 ${
                showNavbar ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
              }`}
              aria-label="Main Navigation"
            >
              <div className="max-w-7xl mx-auto px-6">
                  <div className="flex items-center justify-between h-20">

                    <NavLink to="/" className="flex items-center group" aria-label="Ana sayfaya dön">
                      <img 
                        src={logo} 
                        alt="Veterinary Appointment System Logo" 
                        className="h-12 w-auto transition-transform group-hover:scale-105 duration-300" 
                      />
                    </NavLink>

                    {/* Kullanıcı girişi yoksa - Login/Register */}
                    {!user && (
                      <div className="flex items-center gap-4" role="navigation" aria-label="Kullanıcı işlemleri">
                        <NavLink
                          to="/login"
                          className="text-white/90 hover:text-white transition-all font-medium px-4 py-2 rounded-lg hover:bg-white/5"
                          aria-label="Login"
                        >
                          Login
                        </NavLink>

                        <NavLink 
                          to="/register" 
                          className="bg-secondary text-white px-6 py-2.5 rounded-lg hover:bg-secondary/90 transition-all font-medium shadow-lg hover:shadow-xl hover:scale-105 duration-300"
                          aria-label="Register"
                        >
                          Register
                        </NavLink>
                      </div>
                    )}

                    {/* Kullanıcı girişi varsa - Profile Dropdown */}
                    {user && (
                      <div className="relative">
                        <button
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className="flex items-center gap-3 hover:bg-white/10 p-2 rounded-lg transition-all"
                        >
                          <div className="text-right">
                            <p className="text-sm font-medium text-white">{user.name}</p>
                            <p className="text-xs text-white/70">{user.userType === 'vet' ? 'Veterinarian' : 'Pet Owner'}</p>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {user.name?.charAt(0).toUpperCase()}
                          </div>
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                          <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-fade-in">
                            <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-gray-100">
                              <p className="font-semibold text-gray-800">{user.name}</p>
                              <p className="text-sm text-gray-600">{user.email}</p>
                            </div>
                            
                            <div className="py-2" role="group">
                              <button
                                onClick={() => {
                                  navigate('/dashboard');
                                  setIsDropdownOpen(false);
                                }}
                                className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-all flex items-center gap-3 text-gray-700"
                                role="menuitem"
                                aria-label="Go to the Dashboard page"
                              >
                                <span className="text-xl" aria-hidden="true">📊</span>
                                <span className="font-medium">Dashboard</span>
                              </button>

                              <button
                                onClick={() => {
                                  navigate('/calendar');
                                  setIsDropdownOpen(false);
                                }}
                                className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-all flex items-center gap-3 text-gray-700"
                                role="menuitem"
                                aria-label="Go to the calendar page"
                              >
                                <span className="text-xl" aria-hidden="true">📅</span>
                                <span className="font-medium">Calendar</span>
                              </button>

                              <hr className="my-2" role="separator" />

                              <button
                                onClick={handleLogout}
                                className="w-full px-4 py-2 text-left hover:bg-red-50 transition-all flex items-center gap-3 text-red-600 font-medium"
                                role="menuitem"
                                aria-label="Logout"
                              >
                                <span className="text-xl" aria-hidden="true">🚪</span>
                                <span>Sign Out</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
              </div>
            </nav>
          </header>
          
          <main className="flex-1 w-full" role="main" id="main-content">
              <Outlet />
          </main>
          
          <footer className="bg-gray-900 text-white py-6 mt-auto" role="contentinfo">
              <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="text-sm">© 2025 Veteriner Randevu Sistemi</p>
              </div>
          </footer>
      </div>
  )
}
