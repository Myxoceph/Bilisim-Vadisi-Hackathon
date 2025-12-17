import { useAuth } from "../../context/AuthContext";

export default function DashboardLayout({
  children,
  title,
  subtitle,
  actions,
}) {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {title}
              </h1>
              <p className="text-gray-600 mt-1">
                {subtitle || `Welcome back, ${user?.name || "User"}!`}
              </p>
            </div>
            {actions && <div className="flex gap-3 flex-wrap">{actions}</div>}
          </div>
        </div>

        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
}
