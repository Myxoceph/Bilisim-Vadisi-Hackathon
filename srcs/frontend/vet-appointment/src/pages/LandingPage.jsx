import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

export default function LandingPage() {
    const [userLocation, setUserLocation] = useState(null);
    const [nearbyVets, setNearbyVets] = useState([]);

    // API bağlanacak
    const mockVets = [
        { id: 1, name: 'Dr. Ahmet Yılmaz', lat: 41.0082, lng: 28.9784, available: true },
        { id: 2, name: 'Dr. Ayşe Demir', lat: 41.0092, lng: 28.9794, available: true },
    ];

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
        setNearbyVets(mockVets);
    })
    }, []);

    return (
        <div className='min-h-screen bg-white'>
            <section className='h-screen relative'>
                <div className='absolute inset-0 z-0'>
                    {userLocation && (
                        <MapContainer center={userLocation} zoom={13} className="h-full w-full">
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                        {nearbyVets.map((vet) => (
                            <Marker key={vet.id} position={[vet.lat, vet.lng]}>
                            <Popup>
                                <div className="p-2">
                                <h3 className="font-bold">{vet.name}</h3>
                                <p className="text-sm text-green-600">✓ Appointment Available</p>
                                <button className="mt-2 bg-secondary text-white px-3 py-1 rounded text-sm">
                                    Book Appointment
                                </button>
                                </div>
                            </Popup>
                            </Marker>
                        ))}
                        </MapContainer>
                    )}
                </div>

        <div className="absolute top-0 left-0 h-full w-96 bg-white bg-opacity-95 shadow-2xl p-8 z-10">
                <h1 className="text-4xl font-bold text-primary mb-4">
                    Book an appointment with the nearest vet in seconds
                </h1>
                <p className="text-gray-600 mb-6">
                    Find the nearest available veterinarians in your area and book an appointment instantly.
                </p>

                <div className="space-y-3">
                    <Link
                    to="/register"
                    className="block w-full bg-secondary text-white text-center py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
                    >
                    Are you a pet owner? Join now
                    </Link>
                    <Link
                    to="/register?type=vet"
                    className="block w-full border-2 border-secondary text-secondary text-center py-3 rounded-lg font-semibold hover:bg-secondary hover:text-white transition"
                    >
                    Are you a veterinarian? Join now
                    </Link>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                    <div>
                    <p className="text-3xl font-bold text-primary">250+</p>
                    <p className="text-sm text-gray-600">Kayıtlı Veteriner</p>
                    </div>
                    <div>
                    <p className="text-3xl font-bold text-primary">5.2K</p>
                    <p className="text-sm text-gray-600">Mutlu Pet Sahibi</p>
                    </div>
                </div>
                </div>
            </section>

            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-primary mb-12">
                    How It Works?
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                    <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-2xl">📍</span>
                    </div>
                    <h3 className="font-bold mb-2">Select Your Location</h3>
                    <p className="text-gray-600">Mark your location on the map or enter an address</p>
                    </div>
                    <div className="text-center">
                    <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-2xl">🏥</span>
                    </div>
                    <h3 className="font-bold mb-2">View Veterinarians</h3>
                    <p className="text-gray-600">Discover available veterinarians near you</p>
                    </div>
                    <div className="text-center">
                    <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-2xl">✅</span>
                    </div>
                    <h3 className="font-bold mb-2">Book an Appointment</h3>
                    <p className="text-gray-600">Create your appointment with a single click</p>
                    </div>
                </div>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-primary mb-12">
                    What Our Users Say
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gray-300 rounded-full mr-3"></div>
                        <div>
                            <p className="font-semibold">Yigit T.</p>
                            <p className="text-sm text-gray-600">Pet Owner</p>
                        </div>
                        </div>
                        <p className="text-gray-600">
                        "Great platform! I was able to quickly book an appointment in emergencies."
                        </p>
                        <div className="mt-3 text-yellow-500">★★★★★</div>
                    </div>
                    ))}
                </div>
                </div>   
            </section>
        </div>
    )
}
