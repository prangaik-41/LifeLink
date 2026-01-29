import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import data from '../data.json';

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

import { useTheme } from '../context/ThemeContext';

const LocationMarker = () => {
    const [position, setPosition] = useState(null);
    const map = useMap();

    useEffect(() => {
        map.locate().on("locationfound", function (e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        });
    }, [map]);

    return position === null ? null : (
        <Marker position={position}>
            <Popup>You are here</Popup>
        </Marker>
    );
};



const MapComponent = ({ incidentReports }) => {
    const { theme } = useTheme();

    const [heatmapMode, setHeatmapMode] = useState(false);

    return (
        <div className="relative h-screen w-full">
            <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url={theme === 'dark'
                        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />
                <LocationMarker />

                {/* Heatmap Layer (Visualized as low-opacity circles) */}
                {heatmapMode && incidentReports && incidentReports.map((report) => (
                    <Circle
                        key={`heat-${report.id}`}
                        center={[report.location.lat, report.location.lng]}
                        radius={50000} // Large radius for heatmap effect
                        pathOptions={{
                            color: 'red',
                            fillColor: 'red',
                            fillOpacity: 0.2,
                            stroke: false
                        }}
                    />
                ))}

                {/* Standard Layers (Hidden when Heatmap is active for cleaner view, or kept for detail) */}
                {!heatmapMode && (
                    <>
                        {data.disasterZones.map((zone) => (
                            <Circle
                                key={zone.id}
                                center={[zone.lat, zone.lng]}
                                radius={zone.radius}
                                pathOptions={{ color: zone.risk === 'High' ? 'red' : 'orange', fillColor: zone.risk === 'High' ? 'red' : 'orange' }}
                            >
                                <Popup>
                                    <strong>{zone.name}</strong><br />
                                    Type: {zone.type}<br />
                                    Risk: {zone.risk}
                                </Popup>
                            </Circle>
                        ))}

                        {data.shelters.map((shelter) => (
                            <Marker key={shelter.id} position={[shelter.lat, shelter.lng]}>
                                <Popup>
                                    <strong>{shelter.name}</strong><br />
                                    Capacity: {shelter.capacity}
                                </Popup>
                            </Marker>
                        ))}

                        {incidentReports && incidentReports.map((report) => (
                            <Marker key={report.id} position={[report.location.lat, report.location.lng]}>
                                <Popup>
                                    <div className="min-w-[150px]">
                                        <strong className="text-red-600 block mb-1">{report.type} Reported</strong>
                                        <p className="text-sm mb-1"><strong>By:</strong> {report.name}</p>
                                        <p className="text-sm mb-2">{report.description}</p>
                                        {report.photo && (
                                            <img src={report.photo} alt="Evidence" className="w-full h-24 object-cover rounded border" />
                                        )}
                                        <p className="text-xs text-gray-500 mt-1">Status: Pending Review</p>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </>
                )}
            </MapContainer>

            {/* Heatmap Toggle Button */}
            <button
                onClick={() => setHeatmapMode(!heatmapMode)}
                className="absolute top-20 right-4 z-[1000] bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="Toggle Heatmap"
            >
                <div className={`flex items-center space-x-2 ${heatmapMode ? 'text-red-600' : 'text-gray-600 dark:text-gray-300'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-flame"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-2.072-4.143-3-6 1.5 0 3 1.5 5 2.5C13 6.5 15 7 15 9c0 .5-.5 1-1 1.5-2 2-2 5-2 5a3 3 0 0 0 6 0c0-1.185-.333-2.333-1-3.5-.5 2-1 3.5-3 4.5-1.5.75-3 3-3 5.5a2.5 2.5 0 0 0 5 0c0-1.5-.5-2-1.5-3C17 14.5 19 16 19 18c0 2.5-2 5-4.5 5-2 0-2.5-2-4.5-2C7.5 21 6 21.5 5 21c-1-1-2.5-1-2.5-3 0-1.5.5-2.5 1-3.5.5-1 1-2 2-3 1 1 2.5 2 3 3z" /></svg>
                    <span className="font-semibold text-sm hidden md:inline">Heatmap</span>
                </div>
            </button>
        </div>
    );
};

export default MapComponent;
