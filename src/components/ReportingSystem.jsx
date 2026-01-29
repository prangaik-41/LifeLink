import React, { useState } from 'react';
import { Camera, MapPin, Loader, CheckCircle } from 'lucide-react';

const ReportingSystem = ({ addIncidentReport }) => {
    const [report, setReport] = useState({
        name: '',
        type: 'Flood',
        description: '',
        photo: null,
        location: null
    });
    const [status, setStatus] = useState(0); // 0: None, 1: Sent, 2: Gram Panchayat, 3: Taluka, 4: District, 5: NDRF
    const [submitted, setSubmitted] = useState(false);
    const [preview, setPreview] = useState(null);
    const [loadingLocation, setLoadingLocation] = useState(false);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                setReport({ ...report, photo: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const getLocation = () => {
        setLoadingLocation(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setReport({
                        ...report,
                        location: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    });
                    setLoadingLocation(false);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    setLoadingLocation(false);
                    alert("Unable to retrieve location. Please enable GPS.");
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
            setLoadingLocation(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!report.location) {
            alert("Please add location to your report.");
            return;
        }

        setSubmitted(true);
        setStatus(1);

        // Add to global state (Mock DB)
        if (addIncidentReport) {
            addIncidentReport(report);
        }

        // Simulate hierarchy progression
        setTimeout(() => setStatus(2), 2000); // Gram Panchayat
        setTimeout(() => setStatus(3), 5000); // Taluka
        setTimeout(() => setStatus(4), 8000); // District
        setTimeout(() => setStatus(5), 11000); // NDRF
    };

    const steps = [
        "Report Submitted",
        "Gram Panchayat Verified",
        "Taluka Level Escalated",
        "District Administration Notified",
        "NDRF Dispatched"
    ];

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md m-2 max-w-lg mx-auto transition-colors duration-300">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 border-b dark:border-gray-700 pb-2">Report Incident</h2>
            {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Your Name</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white dark:bg-gray-700 dark:text-white"
                            value={report.name}
                            onChange={e => setReport({ ...report, name: e.target.value })}
                            required
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Disaster Type</label>
                        <select
                            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-700 dark:text-white"
                            value={report.type}
                            onChange={e => setReport({ ...report, type: e.target.value })}
                        >
                            <option>Flood</option>
                            <option>Earthquake</option>
                            <option>Fire</option>
                            <option>Landslide</option>
                            <option>Cyclone</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Location</label>
                        <div className="flex items-center space-x-2">
                            <button
                                type="button"
                                onClick={getLocation}
                                disabled={loadingLocation || report.location}
                                className={`flex-1 flex items-center justify-center px-4 py-2 rounded border transition ${report.location
                                    ? 'bg-green-50 dark:bg-green-900/30 border-green-500 text-green-700 dark:text-green-400'
                                    : 'bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50'
                                    }`}
                            >
                                {loadingLocation ? <Loader className="animate-spin mr-2" size={18} /> : <MapPin className="mr-2" size={18} />}
                                {loadingLocation ? "Locating..." : report.location ? "Location Locked" : "Auto-Locate GPS"}
                            </button>
                        </div>
                        {report.location && (
                            <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center">
                                <CheckCircle size={12} className="mr-1" />
                                Lat: {report.location.lat.toFixed(4)}, Lng: {report.location.lng.toFixed(4)}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Description</label>
                        <textarea
                            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none h-24 resize-none bg-white dark:bg-gray-700 dark:text-white"
                            value={report.description}
                            onChange={e => setReport({ ...report, description: e.target.value })}
                            placeholder="Describe the situation..."
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Upload Photo Evidence</label>
                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition relative">
                            <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={handlePhotoChange}
                            />
                            {!preview ? (
                                <div className="flex flex-col items-center text-gray-500 dark:text-gray-400">
                                    <Camera size={32} className="mb-2" />
                                    <span className="text-sm">Tap to upload photo</span>
                                </div>
                            ) : (
                                <div className="relative h-40 w-full">
                                    <img src={preview} alt="Preview" className="h-full w-full object-contain rounded" />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition rounded text-white text-sm font-medium">
                                        Change Photo
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 shadow-lg transform active:scale-95 transition duration-200"
                    >
                        Submit Report
                    </button>
                </form>
            ) : (
                <div className="space-y-6 animate-fade-in-up">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                            <CheckCircle size={40} className="text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Report Submitted!</h3>
                        <p className="text-gray-600 dark:text-gray-400">Your report has been sent to local authorities.</p>
                    </div>

                    {preview && (
                        <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-semibold uppercase tracking-wide">Evidence</p>
                            <img src={preview} alt="Report Attachment" className="w-full h-48 object-cover rounded shadow-sm" />
                        </div>
                    )}

                    <div className="relative border-l-4 border-blue-200 dark:border-blue-800 ml-4 pl-6 space-y-8 py-2">
                        {steps.map((step, index) => (
                            <div key={index} className={`relative ${status > index ? 'text-blue-800 dark:text-blue-300 font-bold' : 'text-gray-400 dark:text-gray-600'}`}>
                                <div className={`absolute -left-[34px] top-1 w-5 h-5 rounded-full border-4 border-white dark:border-gray-800 shadow-sm ${status > index ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                                    }`}></div>
                                <span className="text-sm">{step}</span>
                                {status === index + 1 && <span className="ml-2 text-xs text-blue-600 dark:text-blue-400 animate-pulse font-medium">(Processing...)</span>}
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => {
                            setSubmitted(false);
                            setReport({ name: '', type: 'Flood', description: '', photo: null, location: null });
                            setPreview(null);
                            setStatus(0);
                        }}
                        className="w-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-semibold py-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    >
                        Submit Another Report
                    </button>
                </div>
            )}
        </div>
    );
};

export default ReportingSystem;

