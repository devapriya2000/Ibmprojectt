import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Activity, 
  MapPin, 
  Stethoscope, 
  TrendingUp,
  Users,
  AlertCircle,
  CheckCircle,
  Calendar,
  Brain,
  ArrowRight,
  Plus
} from 'lucide-react';
import { User, HealthData } from '../types';

interface DashboardProps {
  user: User;
  healthData: HealthData[];
}

const Dashboard: React.FC<DashboardProps> = ({ user, healthData }) => {
  const quickActions = [
    {
      icon: Stethoscope,
      title: 'Symptom Checker',
      description: 'AI-powered health analysis',
      link: '/symptoms',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: MapPin,
      title: 'Find Healthcare',
      description: 'Nearby hospitals & clinics',
      link: '/finder',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Activity,
      title: 'Health Tracker',
      description: 'Log vitals & symptoms',
      link: '/tracker',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: Brain,
      title: 'AI Insights',
      description: 'Personalized health tips',
      link: '/insights',
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  const recentAlerts = [
    { 
      type: 'success', 
      message: 'Your blood pressure reading is within normal range',
      time: '2 hours ago'
    },
    { 
      type: 'warning', 
      message: 'Reminder: Time for your daily medication',
      time: '4 hours ago'
    },
    { 
      type: 'info', 
      message: 'New health insights available based on your recent data',
      time: '1 day ago'
    }
  ];

  const upcomingAppointments = [
    {
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      date: 'Tomorrow, 2:00 PM',
      type: 'Regular Checkup'
    },
    {
      doctor: 'Dr. Michael Chen',
      specialty: 'General Practice',
      date: 'Friday, 10:00 AM',
      type: 'Follow-up'
    }
  ];

  const healthScore = 85;
  const latestVitals = healthData
    .filter(data => data.type === 'vital')
    .slice(-3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Welcome back, {user.name}! 👋
                </h1>
                <p className="text-blue-100 text-lg">
                  Here's your health overview for today
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-blue-100 mb-1">Health Score</div>
                <div className="text-4xl font-bold">{healthScore}%</div>
                <div className="text-sm text-green-200">Excellent</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`bg-gradient-to-r ${action.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <action.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {action.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {action.description}
              </p>
              <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700">
                <span>Get started</span>
                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </Link>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Recent Alerts */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-blue-600" />
                Health Alerts
              </h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View all
              </button>
            </div>
            
            <div className="space-y-4">
              {recentAlerts.map((alert, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                  <div className={`p-1 rounded-full mt-1 ${
                    alert.type === 'success' ? 'bg-green-100' :
                    alert.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                  }`}>
                    {alert.type === 'success' ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : alert.type === 'warning' ? (
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                    ) : (
                      <Heart className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">{alert.message}</p>
                    <p className="text-gray-500 text-sm mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Vitals */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <Activity className="h-5 w-5 mr-2 text-green-600" />
                Latest Vitals
              </h2>
              <Link 
                to="/tracker"
                className="text-green-600 hover:text-green-700"
              >
                <Plus className="h-5 w-5" />
              </Link>
            </div>

            {latestVitals.length > 0 ? (
              <div className="space-y-4">
                {latestVitals.map((vital, index) => (
                  <div key={vital.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">
                        {vital.data.heartRate && `${vital.data.heartRate} BPM`}
                        {vital.data.bloodPressure && `${vital.data.bloodPressure.systolic}/${vital.data.bloodPressure.diastolic}`}
                        {vital.data.temperature && `${vital.data.temperature}°F`}
                        {vital.data.weight && `${vital.data.weight} lbs`}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(vital.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Activity className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No vitals recorded yet</p>
                <Link
                  to="/tracker"
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Vitals
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Appointments & Health Tips */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upcoming Appointments */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-purple-600" />
                Upcoming Appointments
              </h2>
              <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                Schedule new
              </button>
            </div>

            <div className="space-y-4">
              {upcomingAppointments.map((appointment, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-purple-50 rounded-xl">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{appointment.doctor}</div>
                    <div className="text-sm text-gray-600">{appointment.specialty}</div>
                    <div className="text-sm text-purple-600 font-medium">{appointment.date}</div>
                  </div>
                  <div className="text-sm text-gray-500">{appointment.type}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Health Tips */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-teal-600" />
                AI Health Tips
              </h2>
              <Link
                to="/insights"
                className="text-teal-600 hover:text-teal-700 text-sm font-medium"
              >
                View more
              </Link>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-teal-50 rounded-xl border-l-4 border-teal-500">
                <div className="font-medium text-gray-900 mb-2">💧 Stay Hydrated</div>
                <div className="text-sm text-gray-600">
                  Based on your activity level, aim for 8-10 glasses of water today.
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-xl border-l-4 border-green-500">
                <div className="font-medium text-gray-900 mb-2">🚶‍♂️ Move More</div>
                <div className="text-sm text-gray-600">
                  You've been sitting for 2 hours. Take a 5-minute walk to boost circulation.
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-xl border-l-4 border-blue-500">
                <div className="font-medium text-gray-900 mb-2">😴 Sleep Quality</div>
                <div className="text-sm text-gray-600">
                  Your optimal bedtime is 10:30 PM based on your sleep patterns.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;