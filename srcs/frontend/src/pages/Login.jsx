import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(email, password);

    if (result.success) navigate("/dashboard");
    else setError(result.error);

    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          Login
        </h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-secondary hover:underline">
              Forget Password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-secondary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all disabled:opacity-50"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-secondary font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
