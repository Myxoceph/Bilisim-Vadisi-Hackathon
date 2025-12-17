import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const userIcon = L.divIcon({
    className: 'custom-icon',
    html: '<div style="font-size: 32px;">👤</div>',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
});

const clinicIcon = L.divIcon({
    className: 'custom-icon',
    html: '<div style="font-size: 32px;">🏩</div>',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
});

export default function LandingPage() {
    const { user } = useAuth();
    const [userLocation, setUserLocation] = useState(null);
    const [nearbyVets, setNearbyVets] = useState([]);

    // API bağlanacak
    const mockVets = [
        { id: 1, name: 'Dr. Ahmet Bakırca', lat: 41.11, lng: 29, available: true },
        { id: 2, name: 'Dr. Yunus Emre Saraç', lat: 41.10, lng: 29, available: true },
    ];

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
        setNearbyVets(mockVets);
    })
    }, []);

    return (
        <main className='min-h-screen bg-primary'>
            <section className='h-screen relative' aria-label="Veterinary Map and Registration">
                <h1 className="sr-only">Find Veterinarians Near Me</h1>
                <div className='absolute inset-0 z-0'>
                    {userLocation && (
                        <MapContainer center={[userLocation[0], userLocation[1] - 0.008]} zoom={15} className="h-full w-full">
                        <TileLayer 
                            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        />

                        <Marker position={userLocation} icon={userIcon}>
                            <Popup>
                                <div className="p-2">
                                    <h3 className="font-bold text-blue-600">📍 My Location</h3>
                                    <p className="text-sm text-gray-600">You're here</p>
                                </div>
                            </Popup>
                        </Marker>

                        {nearbyVets.map((vet) => (
                            <Marker key={vet.id} position={[vet.lat, vet.lng]} icon={clinicIcon}>
                            <Popup>
                                <div className="p-2">
                                <h3 className="font-bold">{vet.name}</h3>
                                <p className="text-sm text-green-600">✓ Appointment Available</p>
                                <Link 
                                    to={user ? "/calendar" : "/register"} 
                                    className="mt-2 bg-white text-white px-3 py-1 rounded text-sm inline-block hover:bg-secondary/90 transition-colors"
                                    aria-label={user ? "Schedule an appointment" : "Register and book an appointment"}
                                >
                                    Book Appointment
                                </Link>
                                </div>
                            </Popup>
                            </Marker>
                        ))}
                        </MapContainer>
                    )}
                </div>

                <div className="absolute top-0 left-0 h-full w-96 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-md shadow-2xl p-8 z-10 border-r border-gray-200/50">
                    <div className="animate-fade-in">
                        <h2 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4 leading-tight">
                            Find the Nearest Veterinarian
                        </h2>
                        <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                            Book an appointment in seconds with trusted veterinarians near you.
                        </p>

                        <div className="space-y-4">
                            <Link
                            to="/login"
                            className="group block w-full bg-gradient-to-r from-secondary to-secondary/90 text-white text-center py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    🐾 Are you a pet owner?
                                </span>
                            </Link>
                            <Link
                            to="/login"
                            className="group block w-full border-2 border-secondary text-secondary text-center py-4 rounded-xl font-semibold hover:bg-secondary hover:text-white hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    ⚕️ Are you a veterinarian?
                                </span>
                            </Link>
                        </div>

                        <div className="mt-10 grid grid-cols-2 gap-4">
                            <div className="bg-gradient-to-br from-secondary/10 to-primary/10 p-4 rounded-xl border border-secondary/20 hover:shadow-lg transition-all">
                                <p className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">0+</p>
                                <p className="text-sm text-gray-600 mt-1 font-medium">Registered Veterinarians</p>
                            </div>
                            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-4 rounded-xl border border-primary/20 hover:shadow-lg transition-all">
                                <p className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">1K</p>
                                <p className="text-sm text-gray-600 mt-1 font-medium">Happy Pet Owners</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gradient-to-b from-white to-gray-50" aria-labelledby="testimonials">
                <div className="max-w-7xl mx-auto px-4">
                <h2 id="testimonials" className="text-4xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
                    What Our Users Say
                </h2>
                <p className="text-center text-gray-600 mb-16 text-lg">Trusted by thousands of pet owners and veterinarians</p>
                
                <div className="grid md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                    <article key={i} className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                        <div className="flex items-center mb-6">
                        <div className="w-14 h-14 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full mr-4 flex items-center justify-center text-2xl" aria-hidden="true">🐾</div>
                        <div>
                            <p className="font-bold text-lg text-gray-800">Yigit T.</p>
                            <p className="text-sm text-gray-500">Pet Owner</p>
                        </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-4">
                        "Great platform! I was able to quickly book an appointment in emergencies. The interface is intuitive and the service is reliable."
                        </p>
                        <div className="flex items-center">
                            <div className="text-yellow-400 text-lg" aria-label="5 star rating">★★★★★</div>
                            <span className="text-sm text-gray-500 ml-2">5.0</span>
                        </div>
                    </article>
                    ))}
                </div>
                </div>   
            </section>
        </main>
    )
}
