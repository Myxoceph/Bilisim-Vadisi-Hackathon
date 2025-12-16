import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
		const [password, setPassword] = useState('');

		const handleSubmit = (e) => {
			e.preventDefault();
			// API çağrısı eklenecek
			console.log('Login:', { email, password });
		};

		return (
			<div className="min-h-[80vh] flex items-center justify-center">
				<div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
					
					<h2 className="text-3xl font-bold text-center text-primary mb-6">
						Login
					</h2>

					<form onSubmit={handleSubmit} className="space-y-6">

						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
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
							<label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
								Şifre
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
								<span className="text-sm text-gray-600">Beni hatırla</span>
							</label>
							<a href="#" className="text-sm text-secondary hover:underline">
								Forget Password?
							</a>
						</div>

						<button
							type="submit"
							className="w-full bg-secondary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
						>
							Login
						</button>

					</form>

					<p className="text-center text-sm text-gray-600 mt-6">
						Don't have an account?{' '}
						<Link to="/register" className="text-secondary font-semibold hover:underline">
							Register
						</Link>
					</p>

				</div>
			</div>
		);
}