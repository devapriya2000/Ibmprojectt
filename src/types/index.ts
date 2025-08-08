export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  bloodType?: string;
  emergencyContact?: string;
  medicalConditions?: string[];
  allergies?: string[];
  medications?: string[];
  avatar?: string;
}

export interface HealthData {
  id: string;
  userId: string;
  date: string;
  type: 'vital' | 'symptom' | 'mood' | 'medication';
  data: {
    heartRate?: number;
    bloodPressure?: { systolic: number; diastolic: number };
    temperature?: number;
    weight?: number;
    symptom?: string;
    severity?: number;
    mood?: number;
    notes?: string;
  };
}

export interface Symptom {
  id: string;
  name: string;
  category: string;
  severity: number;
}

export interface Disease {
  id: string;
  name: string;
  description: string;
  probability: number;
  symptoms: string[];
  recommendations: string[];
  urgency: 'low' | 'medium' | 'high';
}

export interface HealthcareFacility {
  id: string;
  name: string;
  type: 'hospital' | 'clinic' | 'blood_bank' | 'pharmacy';
  address: string;
  phone: string;
  distance: number;
  rating: number;
  specialties?: string[];
  emergency: boolean;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  icon: string;
  specialists: number;
}