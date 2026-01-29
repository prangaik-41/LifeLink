import React from 'react';
import data from '../data.json';

const ShelterFinder = ({ userLocation }) => {
    const getDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371e3;
        const φ1 = lat1 * Math.PI / 180;
        const φ2 = lat2 * Math.PI / 180;
        const Δφ = (lat2 - lat1) * Math.PI / 180;
        const Δλ = (lon2 - lon1) * Math.PI / 180;

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    };

    const sortedShelters = userLocation ? [...data.shelters].sort((a, b) => {
        const distA = getDistance(userLocation.lat, userLocation.lng, a.lat, a.lng);
        const distB = getDistance(userLocation.lat, userLocation.lng, b.lat, b.lng);
        return distA - distB;
    }) : data.shelters;

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md m-2 transition-colors duration-300">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100 border-b dark:border-gray-700 pb-2">Nearest Shelters</h2>
            <ul className="space-y-4">
                {sortedShelters.map(shelter => (
                    <li key={shelter.id} className="border dark:border-gray-700 p-3 rounded-lg hover:shadow-md transition bg-gray-50 dark:bg-gray-700/50">
                        <div className="flex justify-between items-start">
                            <div>
                                <strong className="text-lg text-blue-900 dark:text-blue-300">{shelter.name}</strong>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Capacity: {shelter.capacity} people</p>
                                {userLocation && (
                                    <span className="text-sm font-semibold text-green-600 dark:text-green-400 block mt-1">
                                        Distance: {(getDistance(userLocation.lat, userLocation.lng, shelter.lat, shelter.lng) / 1000).toFixed(2)} km
                                    </span>
                                )}
                            </div>
                            <a
                                href={`https://www.google.com/maps/dir/?api=1&destination=${shelter.lat},${shelter.lng}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-600 text-white text-xs px-3 py-2 rounded hover:bg-blue-700 flex items-center transition"
                            >
                                Open in Maps
                            </a>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ShelterFinder;
