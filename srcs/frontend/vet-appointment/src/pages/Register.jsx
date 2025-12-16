import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
    const [userType, setUserType] = useState("customer");
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // API çağrısı eklenecek
        console.log('Register:', { userType, ...formData });
    };

    return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
            
            <h2 className="text-3xl font-bold text-center text-primary mb-6">
            Register
            </h2>

            <div className="flex gap-4 mb-6">

            <button
                type="button"
                onClick={() => setUserType('customer')}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                userType === 'customer'
                    ? 'bg-secondary text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
            >
            Pet Owner
            </button>

            <button
                type="button"
                onClick={() => setUserType('vet')}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                userType === 'vet'
                    ? 'bg-secondary text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
            >

            Veterinarian
            </button>

            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
                </label>
                <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
                placeholder="Your Full Name"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
                </label>
                <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
                placeholder="example@email.com"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
                </label>
                <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
                placeholder="05XX XXX XX XX"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
                </label>
                <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
                placeholder="••••••••"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
                </label>
                <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
                placeholder="••••••••"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-secondary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all mt-6"
            >
            Register
            </button>

            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-secondary font-semibold hover:underline">
                Login
            </Link>
            </p>

        </div>
    </div>
    );
}
