import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, MapPin, Bell, Save, Clock, FileText } from 'lucide-react';

const UserProfile = ({ incidentReports }) => {
    const { user, updateProfile } = useAuth();
    const [name, setName] = useState(user?.name || '');
    const [homeLocation, setHomeLocation] = useState(user?.homeLocation || '');
    const [preferences, setPreferences] = useState(user?.preferences || { severe: true, moderate: true, mild: false });
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (user) {
            setName(user.name);
            setHomeLocation(user.homeLocation || '');
            setPreferences(user.preferences || { severe: true, moderate: true, mild: false });
        }
    }, [user]);

    const handleSave = async () => {
        setMessage('');
        await updateProfile({ name, homeLocation, preferences });
        setMessage('Profile updated successfully!');
        setIsEditing(false);
        setTimeout(() => setMessage(''), 3000);
    };

    const myReports = incidentReports ? incidentReports.filter(r => r.name === user?.name) : [];

    if (!user) return <div className="p-8 text-center">Please log in to view your profile.</div>;

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-6 pb-20">
            {/* Profile Header */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center space-x-4 transition-colors duration-300">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-4 rounded-full">
                    <User size={40} className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{user.name}</h2>
                    <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Settings Section */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-300">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center">
                            <Save size={20} className="mr-2 text-green-600" /> Settings
                        </h3>
                        <button
                            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                            className={`px-4 py-2 rounded text-sm font-bold transition ${isEditing ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                        >
                            {isEditing ? 'Save Changes' : 'Edit Profile'}
                        </button>
                    </div>

                    {message && <div className="bg-green-100 text-green-800 p-2 rounded mb-4 text-sm">{message}</div>}

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Display Name</label>
                            <input
                                type="text"
                                disabled={!isEditing}
                                className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-gray-50 dark:bg-gray-700 dark:text-white disabled:opacity-60"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                                <MapPin size={16} className="mr-1" /> Home Location (Lat, Lng)
                            </label>
                            <input
                                type="text"
                                disabled={!isEditing}
                                className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-gray-50 dark:bg-gray-700 dark:text-white disabled:opacity-60"
                                value={homeLocation}
                                onChange={(e) => setHomeLocation(e.target.value)}
                                placeholder="e.g. 20.5937, 78.9629"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                                <Bell size={16} className="mr-1" /> Alert Preferences
                            </label>
                            <div className="space-y-2">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        disabled={!isEditing}
                                        checked={preferences.severe}
                                        onChange={(e) => setPreferences({ ...preferences, severe: e.target.checked })}
                                        className="rounded text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-gray-700 dark:text-gray-300">Severe Alerts (Red)</span>
                                </label>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        disabled={!isEditing}
                                        checked={preferences.moderate}
                                        onChange={(e) => setPreferences({ ...preferences, moderate: e.target.checked })}
                                        className="rounded text-orange-600 focus:ring-orange-500"
                                    />
                                    <span className="text-gray-700 dark:text-gray-300">Moderate Alerts (Orange)</span>
                                </label>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        disabled={!isEditing}
                                        checked={preferences.mild}
                                        onChange={(e) => setPreferences({ ...preferences, mild: e.target.checked })}
                                        className="rounded text-yellow-600 focus:ring-yellow-500"
                                    />
                                    <span className="text-gray-700 dark:text-gray-300">Mild Alerts (Yellow)</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reports History Section */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-300">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                        <FileText size={20} className="mr-2 text-blue-600" /> My Reports History
                    </h3>

                    {myReports.length > 0 ? (
                        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                            {myReports.map((report, idx) => (
                                <div key={idx} className="border dark:border-gray-700 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <span className="font-bold text-red-600 dark:text-red-400 block">{report.type}</span>
                                            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{report.description}</p>
                                        </div>
                                        <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-2 py-1 rounded">
                                            Pending
                                        </span>
                                    </div>
                                    <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
                                        <Clock size={12} className="mr-1" /> {new Date().toLocaleDateString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                            <FileText size={48} className="mx-auto mb-2 opacity-20" />
                            <p>No reports submitted yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
