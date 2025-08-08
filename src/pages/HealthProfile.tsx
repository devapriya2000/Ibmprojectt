import React, { useState } from 'react';
import { 
  User as UserIcon, 
  Heart, 
  Shield, 
  AlertTriangle, 
  Pill,
  Save,
  Edit3,
  Phone,
  Calendar,
  Droplets
} from 'lucide-react';
import { User } from '../types';

interface HealthProfileProps {
  user: User;
}

const HealthProfile: React.FC<HealthProfileProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    ...user,
    bloodType: user.bloodType || 'O+',
    emergencyContact: user.emergencyContact || '',
    medicalConditions: user.medicalConditions || [],
    allergies: user.allergies || [],
    medications: user.medications || []
  });

  const [newCondition, setNewCondition] = useState('');
  const [newAllergy, setNewAllergy] = useState('');
  const [newMedication, setNewMedication] = useState('');

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('healthcarePlatformUser', JSON.stringify(profileData));
    setIsEditing(false);
  };

  const addCondition = () => {
    if (newCondition.trim()) {
      setProfileData({
        ...profileData,
        medicalConditions: [...profileData.medicalConditions, newCondition.trim()]
      });
      setNewCondition('');
    }
  };

  const addAllergy = () => {
    if (newAllergy.trim()) {
      setProfileData({
        ...profileData,
        allergies: [...profileData.allergies, newAllergy.trim()]
      });
      setNewAllergy('');
    }
  };

  const addMedication = () => {
    if (newMedication.trim()) {
      setProfileData({
        ...profileData,
        medications: [...profileData.medications, newMedication.trim()]
      });
      setNewMedication('');
    }
  };

  const removeItem = (array: string[], index: number, field: string) => {
    const newArray = array.filter((_, i) => i !== index);
    setProfileData({
      ...profileData,
      [field]: newArray
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 pt-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {profileData.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{profileData.name}</h1>
                <p className="text-gray-600">{profileData.email}</p>
              </div>
            </div>
            
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 font-semibold ${
                isEditing
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isEditing ? <Save className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
              <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Basic Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <UserIcon className="h-5 w-5 mr-2 text-blue-600" />
              Basic Information
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={profileData.age}
                      onChange={(e) => setProfileData({
                        ...profileData,
                        age: parseInt(e.target.value)
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 p-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{profileData.age} years old</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  {isEditing ? (
                    <select
                      value={profileData.gender}
                      onChange={(e) => setProfileData({
                        ...profileData,
                        gender: e.target.value as 'male' | 'female' | 'other'
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  ) : (
                    <div className="p-2 capitalize">{profileData.gender}</div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blood Type
                </label>
                {isEditing ? (
                  <select
                    value={profileData.bloodType}
                    onChange={(e) => setProfileData({
                      ...profileData,
                      bloodType: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select blood type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                ) : (
                  <div className="flex items-center space-x-2 p-2">
                    <Droplets className="h-4 w-4 text-red-500" />
                    <span>{profileData.bloodType || 'Not specified'}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emergency Contact
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.emergencyContact}
                    onChange={(e) => setProfileData({
                      ...profileData,
                      emergencyContact: e.target.value
                    })}
                    placeholder="Enter emergency contact number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-2 p-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{profileData.emergencyContact || 'Not specified'}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Medical Conditions */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Heart className="h-5 w-5 mr-2 text-red-600" />
              Medical Conditions
            </h2>

            {isEditing && (
              <div className="mb-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newCondition}
                    onChange={(e) => setNewCondition(e.target.value)}
                    placeholder="Add a medical condition"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={addCondition}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {profileData.medicalConditions.length > 0 ? (
                profileData.medicalConditions.map((condition, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <span className="text-gray-900">{condition}</span>
                    {isEditing && (
                      <button
                        onClick={() => removeItem(profileData.medicalConditions, index, 'medicalConditions')}
                        className="text-red-600 hover:text-red-800"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No medical conditions recorded
                </div>
              )}
            </div>
          </div>

          {/* Allergies */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />
              Allergies
            </h2>

            {isEditing && (
              <div className="mb-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newAllergy}
                    onChange={(e) => setNewAllergy(e.target.value)}
                    placeholder="Add an allergy"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={addAllergy}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {profileData.allergies.length > 0 ? (
                profileData.allergies.map((allergy, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <span className="text-gray-900">{allergy}</span>
                    {isEditing && (
                      <button
                        onClick={() => removeItem(profileData.allergies, index, 'allergies')}
                        className="text-yellow-600 hover:text-yellow-800"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No allergies recorded
                </div>
              )}
            </div>
          </div>

          {/* Medications */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Pill className="h-5 w-5 mr-2 text-green-600" />
              Current Medications
            </h2>

            {isEditing && (
              <div className="mb-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMedication}
                    onChange={(e) => setNewMedication(e.target.value)}
                    placeholder="Add a medication"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={addMedication}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {profileData.medications.length > 0 ? (
                profileData.medications.map((medication, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-gray-900">{medication}</span>
                    {isEditing && (
                      <button
                        onClick={() => removeItem(profileData.medications, index, 'medications')}
                        className="text-green-600 hover:text-green-800"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No medications recorded
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="bg-blue-50 rounded-2xl p-6 mt-8 border border-blue-200">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-blue-600 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Privacy & Security</h3>
              <p className="text-blue-800 text-sm">
                Your health information is encrypted and stored securely. We never share your personal 
                medical data with third parties without your explicit consent. All data is processed 
                in compliance with HIPAA regulations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthProfile;