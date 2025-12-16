import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom iconlar
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
        <div className='min-h-screen bg-primary'>
            <section className='h-screen relative'>
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
                        Find the Nearest Veterinarian
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Book an appointment in seconds
                    </p>

                    <div className="space-y-3">
                        <Link
                        to="/login"
                        className="block w-full bg-secondary text-white text-center py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
                        >
                        Are you a pet owner?
                        </Link>
                        <Link
                        to="/login"
                        className="block w-full border-2 border-secondary text-secondary text-center py-3 rounded-lg font-semibold hover:bg-secondary hover:text-white transition"
                        >
                        Are you a veterinarian?
                        </Link>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-3xl font-bold text-primary">0+</p>
                            <p className="text-sm text-gray-600">Registered Veterinarians</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-primary">0K</p>
                            <p className="text-sm text-gray-600">Happy Pet Owners</p>
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
                <div className="grid md:grid-cols-3 gap-6"> {/* gerçek kullanıcı yorumları çekilecek */}
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
                        <div className="mt-3 text-yellow-500">★★★★★</div> {/* dinamik hale getirilebilir */}
                    </div>
                    ))}
                </div>
                </div>   
            </section>
        </div>
    )
}
