import React from 'react';
import { 
  Brain, 
  TrendingUp, 
  Heart, 
  Activity, 
  Award,
  Target,
  Calendar,
  BarChart3,
  AlertCircle,
  CheckCircle,
  Lightbulb,
  Zap
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { User, HealthData } from '../types';

interface InsightsProps {
  user: User;
  healthData: HealthData[];
}

const Insights: React.FC<InsightsProps> = ({ user, healthData }) => {
  // Mock data for charts
  const healthTrendData = [
    { date: '1/1', heartRate: 72, mood: 7, weight: 150 },
    { date: '1/2', heartRate: 74, mood: 8, weight: 149.8 },
    { date: '1/3', heartRate: 71, mood: 6, weight: 149.5 },
    { date: '1/4', heartRate: 73, mood: 9, weight: 149.2 },
    { date: '1/5', heartRate: 70, mood: 8, weight: 149.0 },
    { date: '1/6', heartRate: 72, mood: 7, weight: 148.8 },
    { date: '1/7', heartRate: 69, mood: 9, weight: 148.5 }
  ];

  const insights = [
    {
      type: 'positive',
      icon: CheckCircle,
      title: 'Excellent Heart Rate Trend',
      description: 'Your resting heart rate has improved by 8% over the past week, indicating better cardiovascular health.',
      confidence: 94
    },
    {
      type: 'neutral',
      icon: TrendingUp,
      title: 'Weight Loss Progress',
      description: 'You\'re on track with your weight loss goals. Keep maintaining this steady pace of 0.5 lbs per week.',
      confidence: 87
    },
    {
      type: 'warning',
      icon: AlertCircle,
      title: 'Mood Pattern Detected',
      description: 'Your mood tends to be lower on weekdays. Consider stress management techniques during work days.',
      confidence: 76
    },
    {
      type: 'positive',
      icon: Award,
      title: 'Consistency Achievement',
      description: 'You\'ve logged health data for 7 consecutive days! This consistency will improve our AI predictions.',
      confidence: 100
    }
  ];

  const personalizedTips = [
    {
      category: 'Nutrition',
      icon: '🥗',
      title: 'Optimize Your Breakfast',
      tip: 'Based on your energy levels, try adding protein-rich foods to your morning routine. This can help stabilize your mood throughout the day.',
      impact: 'High'
    },
    {
      category: 'Exercise',
      icon: '🏃‍♂️',
      title: 'Cardio Timing',
      tip: 'Your heart rate data suggests you respond well to afternoon workouts. Consider scheduling cardio sessions between 2-4 PM.',
      impact: 'Medium'
    },
    {
      category: 'Sleep',
      icon: '😴',
      title: 'Sleep Optimization',
      tip: 'Your mood scores are highest after nights when you sleep 7-8 hours. Aim for consistent bedtime at 10:30 PM.',
      impact: 'High'
    },
    {
      category: 'Stress',
      icon: '🧘',
      title: 'Mindfulness Practice',
      tip: 'Your symptoms are often preceded by high-stress periods. Try 10-minute meditation sessions during stressful days.',
      impact: 'Medium'
    }
  ];

  const healthScore = 85;
  const weeklyGoals = [
    { goal: 'Track vitals daily', progress: 100, completed: true },
    { goal: 'Maintain heart rate under 75 BPM', progress: 88, completed: false },
    { goal: 'Log mood 5 times this week', progress: 80, completed: false },
    { goal: 'Lose 0.5 lbs this week', progress: 75, completed: false }
  ];

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'positive': return 'border-green-500 bg-green-50 text-green-800';
      case 'warning': return 'border-yellow-500 bg-yellow-50 text-yellow-800';
      case 'negative': return 'border-red-500 bg-red-50 text-red-800';
      default: return 'border-blue-500 bg-blue-50 text-blue-800';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-3 rounded-xl">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AI Health Insights</h1>
                <p className="text-gray-600">Personalized health analytics powered by machine learning</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-1">Overall Health Score</div>
              <div className="text-4xl font-bold text-green-600">{healthScore}</div>
              <div className="text-sm text-green-600 font-semibold">Excellent</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Health Trends Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-2 mb-6">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Health Trends</h2>
              <div className="ml-auto flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Heart Rate</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Mood</span>
                </div>
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={healthTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb', 
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="heartRate" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="mood" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ fill: '#10b981', strokeWeight: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weekly Goals */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Target className="h-5 w-5 text-green-600" />
              <h2 className="text-xl font-bold text-gray-900">Weekly Goals</h2>
            </div>

            <div className="space-y-4">
              {weeklyGoals.map((goal, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{goal.goal}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{goal.progress}%</span>
                      {goal.completed && <CheckCircle className="h-4 w-4 text-green-500" />}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        goal.completed ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <Zap className="h-5 w-5 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-900">AI-Generated Insights</h2>
            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full font-semibold">
              Updated daily
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {insights.map((insight, index) => (
              <div key={index} className={`border-l-4 rounded-lg p-4 ${getInsightColor(insight.type)}`}>
                <div className="flex items-start space-x-3">
                  <insight.icon className="h-5 w-5 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-bold mb-2">{insight.title}</h3>
                    <p className="text-sm opacity-90 mb-3">{insight.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wide opacity-75">
                        AI Confidence
                      </span>
                      <span className="text-xs font-bold">
                        {insight.confidence}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Personalized Tips */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <Lightbulb className="h-5 w-5 text-yellow-600" />
            <h2 className="text-xl font-bold text-gray-900">Personalized Recommendations</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {personalizedTips.map((tip, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-4 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{tip.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-900">{tip.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getImpactColor(tip.impact)}`}>
                        {tip.impact} Impact
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{tip.tip}</p>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                      {tip.category}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Health Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <Heart className="h-8 w-8" />
              <span className="text-2xl font-bold">72</span>
            </div>
            <div className="text-blue-100 text-sm mb-1">Avg Heart Rate</div>
            <div className="text-xs text-blue-200">↓ 3 BPM from last week</div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <Activity className="h-8 w-8" />
              <span className="text-2xl font-bold">8.2</span>
            </div>
            <div className="text-green-100 text-sm mb-1">Avg Mood Score</div>
            <div className="text-xs text-green-200">↑ 12% from last week</div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="h-8 w-8" />
              <span className="text-2xl font-bold">14</span>
            </div>
            <div className="text-purple-100 text-sm mb-1">Day Streak</div>
            <div className="text-xs text-purple-200">Keep it up!</div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-8 w-8" />
              <span className="text-2xl font-bold">95%</span>
            </div>
            <div className="text-orange-100 text-sm mb-1">Goal Achievement</div>
            <div className="text-xs text-orange-200">This month</div>
          </div>
        </div>

        {/* AI Learning Notice */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white">
          <div className="flex items-start space-x-4">
            <Brain className="h-6 w-6 mt-1" />
            <div>
              <h3 className="text-lg font-bold mb-2">🤖 AI Learning in Progress</h3>
              <p className="text-purple-100 mb-4">
                Our AI is continuously learning from your health data to provide more accurate 
                predictions and personalized recommendations. The more data you provide, the 
                smarter our insights become!
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white/10 p-3 rounded-lg">
                  <div className="font-semibold mb-1">📊 Pattern Recognition</div>
                  <div className="text-purple-200 text-xs">Identifying health trends and correlations</div>
                </div>
                <div className="bg-white/10 p-3 rounded-lg">
                  <div className="font-semibold mb-1">🎯 Predictive Analytics</div>
                  <div className="text-purple-200 text-xs">Forecasting potential health risks</div>
                </div>
                <div className="bg-white/10 p-3 rounded-lg">
                  <div className="font-semibold mb-1">💡 Smart Recommendations</div>
                  <div className="text-purple-200 text-xs">Personalized lifestyle suggestions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;