export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
  }
  
  
  export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
  }
  
  export type NewPatient = Omit<Patient, 'id' | 'entries'>;
  
  export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;
  
  export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
  }
  
  export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
  }
  