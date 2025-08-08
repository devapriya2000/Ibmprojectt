import React, { useState, useEffect } from 'react';
import { MapPin, Search, Filter, Phone, Clock, Star, Navigation, Guitar as Hospital, Pill, Heart, Shield } from 'lucide-react';
import { HealthcareFacility, Department } from '../types';

const HealthcareFinder: React.FC = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [facilities, setFacilities] = useState<HealthcareFacility[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // Mock data for healthcare facilities
  const mockFacilities: HealthcareFacility[] = [
    {
      id: '1',
      name: 'City General Hospital',
      type: 'hospital',
      address: 'Manipur, India',
      phone: '(+91) 123-4567',
      distance: 0.5,
      rating: 4.8,
      specialties: ['Emergency', 'Cardiology', 'Orthopedics', 'Neurology'],
      emergency: true
    },
    {
      id: '2',
      name: 'HealthFirst Clinic',
      type: 'clinic',
      address: '456 lane Kashmir, India',
      phone: '(+91) 234-5678',
      distance: 1.2,
      rating: 4.6,
      specialties: ['Family Medicine', 'Pediatrics', 'Dermatology'],
      emergency: false
    },
    {
      id: '3',
      name: 'Central Blood Bank',
      type: 'blood_bank',
      address: 'Hyderabad, India',
      phone: '(+91) 345-6789',
      distance: 0.8,
      rating: 4.9,
      specialties: ['Blood Donation', 'Plasma Collection'],
      emergency: false
    },
    {
      id: '4',
      name: 'MediCare Pharmacy',
      type: 'pharmacy',
      address: 'Kerala, India',
      phone: '(+91) 456-7890',
      distance: 0.3,
      rating: 4.4,
      specialties: ['Prescription', 'OTC Medications', 'Vaccinations'],
      emergency: false
    },
    {
      id: '5',
      name: 'St. Mary\'s Medical Center',
      type: 'hospital',
      address: 'Delhi, North District',
      phone: '(+91) 567-8901',
      distance: 2.1,
      rating: 4.7,
      specialties: ['Emergency', 'Maternity', 'Surgery', 'ICU'],
      emergency: true
    }
  ];

  const mockDepartments: Department[] = [
    { id: '1', name: 'Emergency Medicine', description: 'Urgent and critical care', icon: '🚨', specialists: 15 },
    { id: '2', name: 'Cardiology', description: 'Heart and cardiovascular care', icon: '❤️', specialists: 12 },
    { id: '3', name: 'Orthopedics', description: 'Bone and joint specialists', icon: '🦴', specialists: 8 },
    { id: '4', name: 'Neurology', description: 'Brain and nervous system', icon: '🧠', specialists: 6 },
    { id: '5', name: 'Pediatrics', description: 'Children\'s healthcare', icon: '👶', specialists: 10 },
    { id: '6', name: 'Dermatology', description: 'Skin and hair care', icon: '👩‍⚕️', specialists: 7 },
    { id: '7', name: 'Oncology', description: 'Cancer treatment and care', icon: '🎗️', specialists: 9 },
    { id: '8', name: 'Psychiatry', description: 'Mental health services', icon: '🧘', specialists: 11 }
  ];

  useEffect(() => {
    setFacilities(mockFacilities);
    setDepartments(mockDepartments);
  }, []);

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLoadingLocation(false);
        }
      );
    } else {
      console.error('Geolocation is not supported');
      setIsLoadingLocation(false);
    }
  };

  const filteredFacilities = facilities.filter(facility => {
    const matchesSearch = facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         facility.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         facility.specialties?.some(spec => 
                           spec.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesType = selectedType === 'all' || facility.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hospital': return <Hospital className="h-5 w-5" />;
      case 'clinic': return <Heart className="h-5 w-5" />;
      case 'blood_bank': return <Shield className="h-5 w-5" />;
      case 'pharmacy': return <Pill className="h-5 w-5" />;
      default: return <MapPin className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'hospital': return 'text-red-600 bg-red-100';
      case 'clinic': return 'text-blue-600 bg-blue-100';
      case 'blood_bank': return 'text-green-600 bg-green-100';
      case 'pharmacy': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-xl">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Healthcare Finder</h1>
              <p className="text-gray-600">Find nearby hospitals, clinics, and healthcare services</p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="grid md:grid-cols-12 gap-4">
            {/* Location Button */}
            <div className="md:col-span-3">
              <button
                onClick={getCurrentLocation}
                disabled={isLoadingLocation}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl hover:from-green-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium disabled:opacity-50"
              >
                {isLoadingLocation ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Navigation className="h-4 w-4" />
                )}
                <span>{isLoadingLocation ? 'Finding...' : 'Use My Location'}</span>
              </button>
            </div>

            {/* Search */}
            <div className="md:col-span-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search facilities, specialties, or locations..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filter */}
            <div className="md:col-span-3">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  <option value="all">All Types</option>
                  <option value="hospital">Hospitals</option>
                  <option value="clinic">Clinics</option>
                  <option value="blood_bank">Blood Banks</option>
                  <option value="pharmacy">Pharmacies</option>
                </select>
              </div>
            </div>
          </div>

          {location && (
            <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2 text-green-800">
                <Navigation className="h-4 w-4" />
                <span className="text-sm font-medium">
                  Location found! Showing nearby facilities based on your current location.
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Medical Departments */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Medical Departments</h2>
              
              <div className="space-y-3">
                {departments.map(department => (
                  <div key={department.id} className="p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 cursor-pointer">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{department.icon}</div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 text-sm">{department.name}</div>
                        <div className="text-xs text-gray-600 mt-1">{department.description}</div>
                        <div className="text-xs text-blue-600 mt-1">
                          {department.specialists} specialists
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Healthcare Facilities */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  Nearby Facilities ({filteredFacilities.length})
                </h2>
                <div className="text-sm text-gray-600">
                  Sorted by distance
                </div>
              </div>

              {filteredFacilities.map(facility => (
                <div key={facility.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl ${getTypeColor(facility.type)}`}>
                        {getTypeIcon(facility.type)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{facility.name}</h3>
                        <p className="text-gray-600 mb-2">{facility.address}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{facility.distance} miles away</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{facility.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {facility.emergency && (
                      <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold">
                        24/7 Emergency
                      </div>
                    )}
                  </div>

                  {/* Specialties */}
                  {facility.specialties && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {facility.specialties.map((specialty, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-4">
                      <a
                        href={`tel:${facility.phone}`}
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
                      >
                        <Phone className="h-4 w-4" />
                        <span className="text-sm font-medium">{facility.phone}</span>
                      </a>
                      <div className="flex items-center space-x-1 text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">Open 24/7</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button className="px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 text-sm font-medium">
                        Get Directions
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium">
                        Call Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredFacilities.length === 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                  <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No facilities found</h3>
                  <p className="text-gray-600">
                    Try adjusting your search terms or filters to find healthcare facilities in your area.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Emergency Banner */}
        <div className="bg-red-600 rounded-2xl p-6 mt-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-full">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Emergency Services</h3>
                <p className="text-red-100">In case of medical emergency, call 911 immediately</p>
              </div>
            </div>
            <button className="bg-white text-red-600 px-6 py-3 rounded-lg font-bold hover:bg-red-50 transition-colors duration-200">
              Call 911
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthcareFinder;