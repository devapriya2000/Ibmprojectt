import React, { useState } from 'react';
import { 
  Activity, 
  Heart, 
  Thermometer, 
  Scale, 
  Plus,
  Calendar,
  TrendingUp,
  Smile,
  Frown,
  Meh,
  Save
} from 'lucide-react';
import { HealthData } from '../types';

interface HealthTrackerProps {
  onUpdateHealth: (data: HealthData) => void;
}

const HealthTracker: React.FC<HealthTrackerProps> = ({ onUpdateHealth }) => {
  const [activeTab, setActiveTab] = useState<'vital' | 'symptom' | 'mood'>('vital');
  const [vitalData, setVitalData] = useState({
    heartRate: '',
    bloodPressureSystolic: '',
    bloodPressureDiastolic: '',
    temperature: '',
    weight: ''
  });
  const [symptomData, setSymptomData] = useState({
    symptom: '',
    severity: 3,
    notes: ''
  });
  const [moodData, setMoodData] = useState({
    mood: 5,
    notes: ''
  });

  const saveVitalData = () => {
    const healthData: HealthData = {
      id: Date.now().toString(),
      userId: '1',
      date: new Date().toISOString(),
      type: 'vital',
      data: {
        heartRate: vitalData.heartRate ? parseInt(vitalData.heartRate) : undefined,
        bloodPressure: vitalData.bloodPressureSystolic && vitalData.bloodPressureDiastolic ? {
          systolic: parseInt(vitalData.bloodPressureSystolic),
          diastolic: parseInt(vitalData.bloodPressureDiastolic)
        } : undefined,
        temperature: vitalData.temperature ? parseFloat(vitalData.temperature) : undefined,
        weight: vitalData.weight ? parseFloat(vitalData.weight) : undefined
      }
    };

    onUpdateHealth(healthData);
    setVitalData({
      heartRate: '',
      bloodPressureSystolic: '',
      bloodPressureDiastolic: '',
      temperature: '',
      weight: ''
    });
  };

  const saveSymptomData = () => {
    const healthData: HealthData = {
      id: Date.now().toString(),
      userId: '1',
      date: new Date().toISOString(),
      type: 'symptom',
      data: {
        symptom: symptomData.symptom,
        severity: symptomData.severity,
        notes: symptomData.notes
      }
    };

    onUpdateHealth(healthData);
    setSymptomData({
      symptom: '',
      severity: 3,
      notes: ''
    });
  };

  const saveMoodData = () => {
    const healthData: HealthData = {
      id: Date.now().toString(),
      userId: '1',
      date: new Date().toISOString(),
      type: 'mood',
      data: {
        mood: moodData.mood,
        notes: moodData.notes
      }
    };

    onUpdateHealth(healthData);
    setMoodData({
      mood: 5,
      notes: ''
    });
  };

  const getMoodIcon = (mood: number) => {
    if (mood <= 3) return <Frown className="h-8 w-8 text-red-500" />;
    if (mood <= 7) return <Meh className="h-8 w-8 text-yellow-500" />;
    return <Smile className="h-8 w-8 text-green-500" />;
  };

  const getMoodColor = (mood: number) => {
    if (mood <= 3) return 'text-red-600 bg-red-100';
    if (mood <= 7) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const tabs = [
    { id: 'vital' as const, label: 'Vitals', icon: Activity, color: 'text-blue-600' },
    { id: 'symptom' as const, label: 'Symptoms', icon: Heart, color: 'text-red-600' },
    { id: 'mood' as const, label: 'Mood', icon: Smile, color: 'text-green-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 pt-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-green-500 to-teal-500 p-3 rounded-xl">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Health Tracker</h1>
              <p className="text-gray-600">Record your daily health metrics and track your wellness journey</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-8">
          <div className="flex border-b border-gray-200">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? `${tab.color} border-b-2 border-current bg-blue-50`
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Vitals Tab */}
            {activeTab === 'vital' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-2 mb-6">
                  <Activity className="h-5 w-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">Record Vital Signs</h2>
                  <Calendar className="h-4 w-4 text-gray-400 ml-auto" />
                  <span className="text-sm text-gray-500">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Heart Rate */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span>Heart Rate (BPM)</span>
                    </label>
                    <input
                      type="number"
                      value={vitalData.heartRate}
                      onChange={(e) => setVitalData({ ...vitalData, heartRate: e.target.value })}
                      placeholder="72"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Temperature */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                      <Thermometer className="h-4 w-4 text-orange-500" />
                      <span>Temperature (°F)</span>
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={vitalData.temperature}
                      onChange={(e) => setVitalData({ ...vitalData, temperature: e.target.value })}
                      placeholder="98.6"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Blood Pressure */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                      <TrendingUp className="h-4 w-4 text-purple-500" />
                      <span>Blood Pressure (mmHg)</span>
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        value={vitalData.bloodPressureSystolic}
                        onChange={(e) => setVitalData({ ...vitalData, bloodPressureSystolic: e.target.value })}
                        placeholder="120"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <span className="py-3 text-gray-500">/</span>
                      <input
                        type="number"
                        value={vitalData.bloodPressureDiastolic}
                        onChange={(e) => setVitalData({ ...vitalData, bloodPressureDiastolic: e.target.value })}
                        placeholder="80"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Weight */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                      <Scale className="h-4 w-4 text-green-500" />
                      <span>Weight (lbs)</span>
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={vitalData.weight}
                      onChange={(e) => setVitalData({ ...vitalData, weight: e.target.value })}
                      placeholder="150"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <button
                  onClick={saveVitalData}
                  className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 rounded-xl hover:from-blue-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-105 shadow-lg font-semibold flex items-center justify-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Vital Signs</span>
                </button>
              </div>
            )}

            {/* Symptoms Tab */}
            {activeTab === 'symptom' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-2 mb-6">
                  <Heart className="h-5 w-5 text-red-600" />
                  <h2 className="text-xl font-bold text-gray-900">Record Symptoms</h2>
                  <Calendar className="h-4 w-4 text-gray-400 ml-auto" />
                  <span className="text-sm text-gray-500">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Symptom */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Symptom Description
                    </label>
                    <input
                      type="text"
                      value={symptomData.symptom}
                      onChange={(e) => setSymptomData({ ...symptomData, symptom: e.target.value })}
                      placeholder="e.g., Headache, Nausea, Fatigue"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  {/* Severity */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Severity Level (1-10)
                    </label>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">Mild</span>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={symptomData.severity}
                        onChange={(e) => setSymptomData({ ...symptomData, severity: parseInt(e.target.value) })}
                        className="flex-1"
                      />
                      <span className="text-sm text-gray-500">Severe</span>
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold w-10 text-center">
                        {symptomData.severity}
                      </span>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Additional Notes
                    </label>
                    <textarea
                      value={symptomData.notes}
                      onChange={(e) => setSymptomData({ ...symptomData, notes: e.target.value })}
                      placeholder="Any additional details about the symptom..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <button
                  onClick={saveSymptomData}
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 shadow-lg font-semibold flex items-center justify-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Symptom</span>
                </button>
              </div>
            )}

            {/* Mood Tab */}
            {activeTab === 'mood' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-2 mb-6">
                  <Smile className="h-5 w-5 text-green-600" />
                  <h2 className="text-xl font-bold text-gray-900">Track Your Mood</h2>
                  <Calendar className="h-4 w-4 text-gray-400 ml-auto" />
                  <span className="text-sm text-gray-500">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>

                <div className="space-y-6">
                  {/* Mood Selector */}
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center">
                      {getMoodIcon(moodData.mood)}
                    </div>
                    <div className={`inline-block px-4 py-2 rounded-full font-semibold ${getMoodColor(moodData.mood)}`}>
                      {moodData.mood <= 3 ? 'Not Great' : moodData.mood <= 7 ? 'Okay' : 'Great!'}
                    </div>
                  </div>

                  {/* Mood Scale */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      How are you feeling? (1-10)
                    </label>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">😢</span>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={moodData.mood}
                        onChange={(e) => setMoodData({ ...moodData, mood: parseInt(e.target.value) })}
                        className="flex-1"
                      />
                      <span className="text-sm text-gray-500">😄</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold w-10 text-center ${getMoodColor(moodData.mood)}`}>
                        {moodData.mood}
                      </span>
                    </div>
                  </div>

                  {/* Mood Notes */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      What's affecting your mood today?
                    </label>
                    <textarea
                      value={moodData.notes}
                      onChange={(e) => setMoodData({ ...moodData, notes: e.target.value })}
                      placeholder="Share what's on your mind, what made you feel this way, or any thoughts about your day..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <button
                  onClick={saveMoodData}
                  className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-xl hover:from-green-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-105 shadow-lg font-semibold flex items-center justify-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Mood</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-6 text-white">
          <h3 className="text-lg font-bold mb-3">💡 Health Tracking Tips</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white/10 p-4 rounded-lg">
              <div className="font-semibold mb-1">⏰ Consistency is Key</div>
              <div className="text-blue-100">Track your health metrics at the same time each day for better insights.</div>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <div className="font-semibold mb-1">📊 Look for Patterns</div>
              <div className="text-blue-100">Regular tracking helps identify trends and triggers in your health.</div>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <div className="font-semibold mb-1">🩺 Share with Doctor</div>
              <div className="text-blue-100">Your tracked data can provide valuable insights during medical visits.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthTracker;