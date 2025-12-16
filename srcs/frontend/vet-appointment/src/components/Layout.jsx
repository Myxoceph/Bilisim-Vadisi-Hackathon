import { Outlet, NavLink } from 'react-router-dom';

export function NavItem({ to, children }) {
    return (
        <NavLink
            to={to}

            className={({ isActive }) =>
                `flex items-center hover:text-blue-500 transition-colors ${
                    isActive
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-600"
                }`
        }>
            {children}
        </NavLink>
    );
}

export default function Layout() {
    return (
        <div className="min-h-screen bg-gray-500">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex space-x-8 h-16">

                        <NavItem to="/">Dashboard</NavItem>
                        <NavItem to="/calendar">Calendar</NavItem>
                        <NavItem to="/appointments">Appointments</NavItem>
                        <NavItem to="/waitlist">Waitlist</NavItem>
                        <NavItem to="/chat">Chat</NavItem>

                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 py-8">
                <Outlet />
            </main>
        </div>
    )
}
