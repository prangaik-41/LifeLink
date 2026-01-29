import React, { useState, useEffect } from 'react';
import data from '../data.json';
import { AlertTriangle, Wind, CloudRain, Flame, Info, Clock, MapPin } from 'lucide-react';

const Alerts = () => {
    const [mockAlerts, setMockAlerts] = useState([]);

    useEffect(() => {
        // Simulating fetching data
        const alertsData = [
            {
                id: 1,
                source: 'IMD',
                type: 'Cyclone Warning',
                severity: 'severe',
                location: 'Odisha Coast',
                timestamp: '10 mins ago',
                description: 'Severe Cyclonic Storm approaching coast. Wind speeds 120kmph.',
                icon: <Wind className="w-6 h-6" />
            },
            {
                id: 2,
                source: 'NASA EONET',
                type: 'Wildfire',
                severity: 'moderate',
                location: 'Uttarakhand Forests',
                timestamp: '2 hours ago',
                description: 'Forest fire detected in multiple sectors. Firefighters deployed.',
                icon: <Flame className="w-6 h-6" />
            },
            {
                id: 3,
                source: 'ReliefWeb',
                type: 'Flood Alert',
                severity: 'mild',
                location: 'Assam (Lower Districts)',
                timestamp: '5 hours ago',
                description: 'Water levels rising in Brahmaputra. Low-lying areas on alert.',
                icon: <CloudRain className="w-6 h-6" />
            }
        ];
        setMockAlerts(alertsData);
    }, []);

    const getSeverityStyles = (severity) => {
        switch (severity) {
            case 'severe':
                return 'bg-red-50 border-red-500 text-red-800';
            case 'moderate':
                return 'bg-orange-50 border-orange-500 text-orange-800';
            case 'mild':
                return 'bg-yellow-50 border-yellow-500 text-yellow-800';
            default:
                return 'bg-gray-50 border-gray-500 text-gray-800';
        }
    };

    const getIconColor = (severity) => {
        switch (severity) {
            case 'severe': return 'text-red-600';
            case 'moderate': return 'text-orange-600';
            case 'mild': return 'text-yellow-600';
            default: return 'text-gray-600';
        }
    };

    return (
        <div className="space-y-6">
            {/* Live Alerts Section */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md transition-colors duration-300">
                <h2 className="text-xl font-bold mb-4 flex items-center text-gray-800 dark:text-gray-100">
                    <span className="mr-2 relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                    Live Alerts
                </h2>

                <div className="space-y-4">
                    {mockAlerts.map((alert, index) => (
                        <div
                            key={alert.id}
                            className={`border-l-4 p-4 rounded-r-lg shadow-sm animate-fade-in-up ${getSeverityStyles(alert.severity)}`}
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex items-start space-x-3">
                                    <div className={`mt-1 ${getIconColor(alert.severity)}`}>
                                        {alert.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{alert.type}</h3>
                                        <p className="text-sm font-medium opacity-90 mb-1">{alert.source}</p>
                                        <p className="text-sm opacity-80">{alert.description}</p>

                                        <div className="flex items-center space-x-4 mt-2 text-xs opacity-75">
                                            <span className="flex items-center">
                                                <Clock size={12} className="mr-1" /> {alert.timestamp}
                                            </span>
                                            <span className="flex items-center">
                                                <MapPin size={12} className="mr-1" /> {alert.location}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${alert.severity === 'severe' ? 'bg-red-200 text-red-800' :
                                    alert.severity === 'moderate' ? 'bg-orange-200 text-orange-800' :
                                        'bg-yellow-200 text-yellow-800'
                                    }`}>
                                    {alert.severity}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Existing Active Alerts (from data.json) */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md transition-colors duration-300">
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100 flex items-center">
                    <AlertTriangle className="mr-2 text-yellow-600" />
                    Local Risk Zones
                </h2>
                <div className="space-y-3">
                    {data.disasterZones.filter(z => z.risk === 'High').map(zone => (
                        <div key={zone.id} className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-3 rounded-r-md">
                            <h3 className="font-bold text-red-700 dark:text-red-400">{zone.name} - {zone.type}</h3>
                            <p className="text-sm text-red-600 dark:text-red-300">Risk Level: {zone.risk}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Authority: District Administration</p>
                        </div>
                    ))}
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-3 rounded-r-md">
                        <h3 className="font-bold text-yellow-700 dark:text-yellow-400">Heavy Rainfall Warning</h3>
                        <p className="text-sm text-yellow-600 dark:text-yellow-300">Expected in next 24 hours.</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Authority: IMD</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Alerts;
