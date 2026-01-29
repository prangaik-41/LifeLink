import React, { useState } from 'react';
import { AlertTriangle, Droplets, Mountain, Waves, History, CheckCircle, AlertOctagon } from 'lucide-react';

const RiskChecker = ({ userLocation }) => {
    const [inputs, setInputs] = useState({
        rainfall: '',
        elevation: '',
        distanceToWater: '',
        history: 'No'
    });
    const [result, setResult] = useState(null);

    const calculateRisk = () => {
        const { rainfall, elevation, distanceToWater, history } = inputs;
        let score = 0;
        let reasons = [];

        // Simple Mock Logic
        if (Number(rainfall) > 100) {
            score += 3;
            reasons.push("Heavy rainfall detected (>100mm).");
        } else if (Number(rainfall) > 50) {
            score += 1;
        }

        if (Number(elevation) < 10) {
            score += 3;
            reasons.push("Low elevation area (<10m). High flood risk.");
        } else if (Number(elevation) < 50) {
            score += 1;
        }

        if (Number(distanceToWater) < 1) {
            score += 3;
            reasons.push("Very close to water body (<1km).");
        } else if (Number(distanceToWater) < 5) {
            score += 1;
        }

        if (history === 'Yes') {
            score += 2;
            reasons.push("History of disasters in this area.");
        }

        let level = "Low";
        let color = "green";

        if (score >= 6) {
            level = "High";
            color = "red";
        } else if (score >= 3) {
            level = "Moderate";
            color = "orange";
        }

        setResult({ level, color, reasons });
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md m-2 max-w-lg mx-auto transition-colors duration-300">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 border-b dark:border-gray-700 pb-2 flex items-center">
                <AlertOctagon className="mr-2 text-red-600" /> Risk Prediction System
            </h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                        <Droplets size={16} className="mr-1 text-blue-500" /> Rainfall (last 24h in mm)
                    </label>
                    <input
                        type="number"
                        className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-700 dark:text-white transition-colors"
                        value={inputs.rainfall}
                        onChange={e => setInputs({ ...inputs, rainfall: e.target.value })}
                        placeholder="e.g. 120"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                        <Mountain size={16} className="mr-1 text-gray-600 dark:text-gray-400" /> Elevation (meters)
                    </label>
                    <input
                        type="number"
                        className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-700 dark:text-white transition-colors"
                        value={inputs.elevation}
                        onChange={e => setInputs({ ...inputs, elevation: e.target.value })}
                        placeholder="e.g. 5"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                        <Waves size={16} className="mr-1 text-blue-400" /> Distance to Water Body (km)
                    </label>
                    <input
                        type="number"
                        className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-700 dark:text-white transition-colors"
                        value={inputs.distanceToWater}
                        onChange={e => setInputs({ ...inputs, distanceToWater: e.target.value })}
                        placeholder="e.g. 0.5"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                        <History size={16} className="mr-1 text-purple-500" /> History of Disasters?
                    </label>
                    <select
                        className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-700 dark:text-white transition-colors"
                        value={inputs.history}
                        onChange={e => setInputs({ ...inputs, history: e.target.value })}
                    >
                        <option>No</option>
                        <option>Yes</option>
                    </select>
                </div>

                <button
                    onClick={calculateRisk}
                    className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 shadow-lg transform active:scale-95 transition duration-200 mt-4"
                >
                    Analyze Risk
                </button>
            </div>

            {result && (
                <div className={`mt-6 p-4 rounded-lg border-l-4 animate-fade-in-up ${result.level === 'High' ? 'bg-red-50 dark:bg-red-900/20 border-red-500' :
                    result.level === 'Moderate' ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-500' :
                        'bg-green-50 dark:bg-green-900/20 border-green-500'
                    }`}>
                    <div className="flex items-center mb-2">
                        {result.level === 'High' && <AlertTriangle className="text-red-600 mr-2" size={24} />}
                        {result.level === 'Moderate' && <AlertTriangle className="text-orange-600 mr-2" size={24} />}
                        {result.level === 'Low' && <CheckCircle className="text-green-600 mr-2" size={24} />}
                        <h3 className={`text-xl font-bold ${result.level === 'High' ? 'text-red-800 dark:text-red-400' :
                            result.level === 'Moderate' ? 'text-orange-800 dark:text-orange-400' :
                                'text-green-800 dark:text-green-400'
                            }`}>
                            {result.level} Risk Detected
                        </h3>
                    </div>

                    {result.reasons.length > 0 ? (
                        <ul className="list-disc list-inside space-y-1 mt-2">
                            {result.reasons.map((reason, idx) => (
                                <li key={idx} className="text-sm font-medium opacity-80 dark:text-gray-300">{reason}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-green-700 dark:text-green-400 mt-2">Conditions appear stable based on your inputs.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default RiskChecker;
