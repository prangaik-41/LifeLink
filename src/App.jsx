import React, { useState } from 'react';
import MapComponent from './components/MapComponent';
import RiskChecker from './components/RiskChecker';
import ShelterFinder from './components/ShelterFinder';
import ReportingSystem from './components/ReportingSystem';
import Alerts from './components/Alerts';
import Login from './components/Login';
import Signup from './components/Signup';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Dashboard from './components/Dashboard';
import UserProfile from './components/UserProfile';
import { Map, ShieldAlert, Home, FileText, Bell, LogOut, Sun, Moon, LayoutDashboard, User, AlertOctagon, AlertTriangle } from 'lucide-react';

const AppContent = () => {
  const [activeTab, setActiveTab] = useState('map');
  const [userLocation, setUserLocation] = useState(null);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [authView, setAuthView] = useState('login'); // 'login' or 'signup'
  const [incidentReports, setIncidentReports] = useState([]);

  const addIncidentReport = (report) => {
    setIncidentReports(prev => [...prev, { ...report, id: Date.now() }]);
  };

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  if (!user) {
    return authView === 'login'
      ? <Login onSwitchToSignup={() => setAuthView('signup')} />
      : <Signup onSwitchToLogin={() => setAuthView('login')} />;
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-100 dark:bg-gray-900 font-sans transition-colors duration-300">
      {/* Header */}
      <header className="bg-blue-900 dark:bg-gray-800 text-white p-4 shadow-lg z-50 flex justify-between items-center transition-colors duration-300">
        <h1 className="text-2xl font-bold flex items-center">
          <ShieldAlert className="mr-2" /> Disaster Risk Management
        </h1>
        <div className="flex items-center space-x-4">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-white/10 transition">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <div className="text-sm bg-blue-800 dark:bg-gray-700 px-3 py-1 rounded-full hidden sm:block transition-colors duration-300">
            {userLocation ? "📍 Location Active" : "Searching Location..."}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('profile')}
              className="flex items-center space-x-2 hover:bg-white/10 px-2 py-1 rounded transition"
            >
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.name} className="w-8 h-8 rounded-full border-2 border-white" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
              )}
              <span className="hidden md:inline font-medium text-sm">{user.name}</span>
            </button>
            <button onClick={logout} className="text-red-300 hover:text-red-100 ml-2">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative overflow-hidden">
        {activeTab === 'map' && <MapComponent incidentReports={incidentReports} />}

        {activeTab !== 'map' && (
          <div className="p-4 h-full overflow-y-auto max-w-2xl mx-auto animate-fade-in-up">
            {activeTab === 'risk' && <RiskChecker userLocation={userLocation} />}
            {activeTab === 'shelters' && <ShelterFinder userLocation={userLocation} />}
            {activeTab === 'report' && <ReportingSystem addIncidentReport={addIncidentReport} />}
            {activeTab === 'alerts' && <Alerts />}
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'profile' && <UserProfile incidentReports={incidentReports} />}
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-around p-2 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] transition-colors duration-300">
        <button
          onClick={() => setActiveTab('map')}
          className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${activeTab === 'map' ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-700 scale-105' : 'text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300'}`}
        >
          <Map size={24} />
          <span className="text-xs mt-1">Map</span>
        </button>
        <button
          onClick={() => setActiveTab('risk')}
          className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${activeTab === 'risk' ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-gray-700 scale-105' : 'text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-300'}`}
        >
          <ShieldAlert size={24} />
          <span className="text-xs mt-1">Check Risk</span>
        </button>
        <button
          onClick={() => setActiveTab('shelters')}
          className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${activeTab === 'shelters' ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-gray-700 scale-105' : 'text-gray-500 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-300'}`}
        >
          <Home size={24} />
          <span className="text-xs mt-1">Shelters</span>
        </button>
        <button
          onClick={() => setActiveTab('report')}
          className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${activeTab === 'report' ? 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-gray-700 scale-105' : 'text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-300'}`}
        >
          <FileText size={24} />
          <span className="text-xs mt-1">Report</span>
        </button>
        <button
          onClick={() => setActiveTab('alerts')}
          className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${activeTab === 'alerts' ? 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-gray-700 scale-105' : 'text-gray-500 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-300'}`}
        >
          <Bell size={24} />
          <span className="text-xs mt-1">Alerts</span>
        </button>
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${activeTab === 'dashboard' ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-gray-700 scale-105' : 'text-gray-500 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-300'}`}
        >
          <LayoutDashboard size={24} />
          <span className="text-xs mt-1">Stats</span>
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${activeTab === 'profile' ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-700 scale-105' : 'text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300'}`}
        >
          <User size={24} />
          <span className="text-xs mt-1">Profile</span>
        </button>
      </nav>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
