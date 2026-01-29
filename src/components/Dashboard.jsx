import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { LayoutDashboard, TrendingUp, PieChart as PieIcon, Activity } from 'lucide-react';

const Dashboard = () => {
    // Mock Data for Reports per Week
    const weeklyData = [
        { name: 'Mon', reports: 4 },
        { name: 'Tue', reports: 3 },
        { name: 'Wed', reports: 7 },
        { name: 'Thu', reports: 2 },
        { name: 'Fri', reports: 6 },
        { name: 'Sat', reports: 9 },
        { name: 'Sun', reports: 5 },
    ];

    // Mock Data for Incident Types
    const incidentTypeData = [
        { name: 'Flood', value: 40 },
        { name: 'Fire', value: 25 },
        { name: 'Landslide', value: 15 },
        { name: 'Cyclone', value: 20 },
    ];

    // Mock Data for Risk Categories
    const riskData = [
        { name: 'High Risk', value: 30 },
        { name: 'Moderate Risk', value: 45 },
        { name: 'Low Risk', value: 25 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF4444', '#AA336A'];
    const RISK_COLORS = ['#EF4444', '#F97316', '#22C55E'];

    return (
        <div className="space-y-6 pb-20">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md transition-colors duration-300">
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100 flex items-center">
                    <LayoutDashboard className="mr-2 text-blue-600" /> Dashboard & Analytics
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Weekly Reports Chart */}
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200 flex items-center">
                            <TrendingUp size={18} className="mr-2 text-blue-500" /> Reports per Week
                        </h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={weeklyData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                                    <XAxis dataKey="name" stroke="#6B7280" />
                                    <YAxis stroke="#6B7280" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F3F4F6' }}
                                        itemStyle={{ color: '#F3F4F6' }}
                                    />
                                    <Bar dataKey="reports" fill="#3B82F6" radius={[4, 4, 0, 0]} animationDuration={1500} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Incident Types Pie Chart */}
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200 flex items-center">
                            <PieIcon size={18} className="mr-2 text-purple-500" /> Incident Types
                        </h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={incidentTypeData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                        animationDuration={1500}
                                    >
                                        {incidentTypeData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F3F4F6' }}
                                        itemStyle={{ color: '#F3F4F6' }}
                                    />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Risk Categories Pie Chart */}
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg shadow-sm md:col-span-2">
                        <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200 flex items-center">
                            <Activity size={18} className="mr-2 text-red-500" /> Risk Assessment Overview
                        </h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={riskData}
                                        cx="50%"
                                        cy="50%"
                                        startAngle={180}
                                        endAngle={0}
                                        innerRadius={60}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                        animationDuration={1500}
                                    >
                                        {riskData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={RISK_COLORS[index % RISK_COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F3F4F6' }}
                                        itemStyle={{ color: '#F3F4F6' }}
                                    />
                                    <Legend verticalAlign="top" height={36} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
