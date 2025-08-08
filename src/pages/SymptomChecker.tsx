import React, { useState } from 'react';
import { 
  Stethoscope, 
  Plus, 
  X, 
  AlertCircle, 
  CheckCircle, 
  Brain,
  Search,
  ThermometerSun,
  Heart,
  Activity
} from 'lucide-react';
import { User, Symptom, Disease } from '../types';

interface SymptomCheckerProps {
  user: User;
}

const SymptomChecker: React.FC<SymptomCheckerProps> = ({ user }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<Disease[] | null>(null);

  const commonSymptoms = [
    { id: '1', name: 'Headache', category: 'neurological', severity: 2 },
    { id: '2', name: 'Fever', category: 'general', severity: 3 },
    { id: '3', name: 'Cough', category: 'respiratory', severity: 2 },
    { id: '4', name: 'Fatigue', category: 'general', severity: 2 },
    { id: '5', name: 'Nausea', category: 'digestive', severity: 2 },
    { id: '6', name: 'Chest Pain', category: 'cardiac', severity: 4 },
    { id: '7', name: 'Shortness of Breath', category: 'respiratory', severity: 4 },
    { id: '8', name: 'Dizziness', category: 'neurological', severity: 3 },
    { id: '9', name: 'Stomach Pain', category: 'digestive', severity: 3 },
    { id: '10', name: 'Joint Pain', category: 'musculoskeletal', severity: 2 },
    { id: '11', name: 'Sore Throat', category: 'respiratory', severity: 1 },
    { id: '12', name: 'Runny Nose', category: 'respiratory', severity: 1 }
  ];

  const filteredSymptoms = commonSymptoms.filter(symptom =>
    symptom.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedSymptoms.find(selected => selected.id === symptom.id)
  );

  const addSymptom = (symptom: Symptom) => {
    setSelectedSymptoms([...selectedSymptoms, symptom]);
    setSearchTerm('');
  };

  const removeSymptom = (symptomId: string) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s.id !== symptomId));
  };

  const analyzeSymptoms = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResults: Disease[] = [
        {
          id: '1',
          name: 'Common Cold',
          description: 'A viral infection of the upper respiratory tract',
          probability: 75,
          symptoms: selectedSymptoms.map(s => s.name),
          recommendations: [
            'Get plenty of rest',
            'Stay hydrated',
            'Use over-the-counter pain relievers if needed',
            'Consider seeing a doctor if symptoms worsen'
          ],
          urgency: 'low'
        },
        {
          id: '2',
          name: 'Seasonal Flu',
          description: 'A contagious respiratory illness caused by influenza viruses',
          probability: 60,
          symptoms: selectedSymptoms.map(s => s.name),
          recommendations: [
            'Rest and avoid physical activity',
            'Drink plenty of fluids',
            'Consider antiviral medication if seen within 48 hours',
            'Monitor symptoms closely'
          ],
          urgency: 'medium'
        },
        {
          id: '3',
          name: 'Tension Headache',
          description: 'A common type of headache characterized by mild to moderate pain',
          probability: 45,
          symptoms: selectedSymptoms.map(s => s.name),
          recommendations: [
            'Try relaxation techniques',
            'Apply cold or heat therapy',
            'Over-the-counter pain medication',
            'Ensure adequate sleep'
          ],
          urgency: 'low'
        }
      ];

      setAnalysisResults(mockResults);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'respiratory': return <Activity className="h-4 w-4" />;
      case 'cardiac': return <Heart className="h-4 w-4" />;
      case 'neurological': return <Brain className="h-4 w-4" />;
      case 'general': return <ThermometerSun className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity: number) => {
    if (severity <= 2) return 'text-green-600 bg-green-100';
    if (severity === 3) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'low': return 'border-green-500 bg-green-50 text-green-800';
      case 'medium': return 'border-yellow-500 bg-yellow-50 text-yellow-800';
      case 'high': return 'border-red-500 bg-red-50 text-red-800';
      default: return 'border-gray-500 bg-gray-50 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 pt-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-red-500 to-pink-500 p-3 rounded-xl">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI Symptom Checker</h1>
              <p className="text-gray-600">Get AI-powered health insights based on your symptoms</p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <strong>Medical Disclaimer:</strong> This tool provides general health information and 
                should not replace professional medical advice. Always consult with a healthcare provider 
                for proper diagnosis and treatment.
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Symptom Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search and Add Symptoms */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Select Your Symptoms</h2>

              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for symptoms..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Available Symptoms */}
              {searchTerm && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Search Results</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {filteredSymptoms.map(symptom => (
                      <button
                        key={symptom.id}
                        onClick={() => addSymptom(symptom)}
                        className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-left"
                      >
                        {getCategoryIcon(symptom.category)}
                        <span className="text-sm">{symptom.name}</span>
                        <Plus className="h-4 w-4 ml-auto text-gray-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Common Symptoms */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Common Symptoms</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {commonSymptoms.filter(s => !selectedSymptoms.find(selected => selected.id === s.id)).slice(0, 8).map(symptom => (
                    <button
                      key={symptom.id}
                      onClick={() => addSymptom(symptom)}
                      className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-left"
                    >
                      {getCategoryIcon(symptom.category)}
                      <span className="text-sm">{symptom.name}</span>
                      <Plus className="h-4 w-4 ml-auto text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Analysis Results */}
            {analysisResults && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-purple-600" />
                  AI Analysis Results
                </h2>

                <div className="space-y-4">
                  {analysisResults.map(disease => (
                    <div key={disease.id} className={`border-l-4 rounded-lg p-4 ${getUrgencyColor(disease.urgency)}`}>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-lg">{disease.name}</h3>
                          <p className="text-sm opacity-80">{disease.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{disease.probability}%</div>
                          <div className="text-xs uppercase tracking-wide opacity-75">Match</div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold mb-2">Recommendations:</h4>
                        <ul className="space-y-1">
                          {disease.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start space-x-2 text-sm">
                              <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex justify-between items-center text-xs uppercase tracking-wide">
                        <span>Urgency: {disease.urgency}</span>
                        <span>Based on {disease.symptoms.length} symptoms</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">
                    <strong>Next Steps:</strong> Consider scheduling an appointment with your healthcare provider 
                    to discuss these symptoms, especially if they persist or worsen. This analysis is for 
                    informational purposes only.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Selected Symptoms & Analysis */}
          <div className="space-y-6">
            {/* Selected Symptoms */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Selected Symptoms</h2>

              {selectedSymptoms.length > 0 ? (
                <div className="space-y-3">
                  {selectedSymptoms.map(symptom => (
                    <div key={symptom.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        {getCategoryIcon(symptom.category)}
                        <span className="font-medium">{symptom.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${getSeverityColor(symptom.severity)}`}>
                          Level {symptom.severity}
                        </span>
                        <button
                          onClick={() => removeSymptom(symptom.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Stethoscope className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No symptoms selected</p>
                  <p className="text-sm">Add symptoms to start analysis</p>
                </div>
              )}

              {/* Analyze Button */}
              {selectedSymptoms.length > 0 && (
                <button
                  onClick={analyzeSymptoms}
                  disabled={isAnalyzing}
                  className="w-full mt-6 bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 rounded-xl hover:from-purple-600 hover:to-indigo-600 transition-all duration-200 transform hover:scale-105 shadow-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isAnalyzing ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Analyzing symptoms...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Brain className="h-4 w-4" />
                      <span>Analyze with AI</span>
                    </div>
                  )}
                </button>
              )}
            </div>

            {/* Emergency Notice */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-6 w-6 text-red-600 mt-1" />
                <div>
                  <h3 className="font-bold text-red-900 mb-2">Emergency Warning</h3>
                  <p className="text-red-800 text-sm mb-3">
                    If you're experiencing severe symptoms such as:
                  </p>
                  <ul className="text-red-800 text-sm space-y-1 mb-4">
                    <li>• Chest pain or pressure</li>
                    <li>• Difficulty breathing</li>
                    <li>• Severe bleeding</li>
                    <li>• Loss of consciousness</li>
                    <li>• Severe allergic reactions</li>
                  </ul>
                  <div className="bg-red-600 text-white px-4 py-2 rounded-lg text-center font-semibold">
                    Call Emergency Services Immediately
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;