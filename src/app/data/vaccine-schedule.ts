export interface Vaccine {
  id: string;
  ageLabel: string;
  ageInDays: number;
  vaccines: string[];
  isDone: boolean;
  dueDate?: Date;
  type: 'NIS' | 'IAP_RECOMMENDED'; // NIS = Gov/Essential, IAP = Private/Complete
  description?: string;
}

export const INDIAN_VACCINE_SCHEDULE: Vaccine[] = [
  {
    id: 'birth',
    ageLabel: 'At Birth',
    ageInDays: 0,
    vaccines: ['BCG', 'OPV 0', 'Hepatitis B-1'],
    isDone: false,
    type: 'NIS',
    description: 'Must be given within 24 hours of birth.'
  },
  {
    id: '6weeks',
    ageLabel: '6 Weeks',
    ageInDays: 42,
    vaccines: ['DTwP / DTaP-1', 'IPV-1', 'Hepatitis B-2', 'Hib-1', 'Rotavirus-1', 'PCV-1'],
    isDone: false,
    type: 'NIS',
    description: 'First dose of Pentavalent/Hexavalent combination.'
  },
  {
    id: '10weeks',
    ageLabel: '10 Weeks',
    ageInDays: 70,
    vaccines: ['DTwP / DTaP-2', 'IPV-2', 'Hib-2', 'Rotavirus-2', 'PCV-2'],
    isDone: false,
    type: 'NIS'
  },
  {
    id: '14weeks',
    ageLabel: '14 Weeks',
    ageInDays: 98,
    vaccines: ['DTwP / DTaP-3', 'IPV-3', 'Hib-3', 'Rotavirus-3', 'PCV-3', 'Hepatitis B-3'],
    isDone: false,
    type: 'NIS'
  },
  {
    id: '6months',
    ageLabel: '6 Months',
    ageInDays: 180,
    vaccines: ['Influenza-1', 'Typhoid Conjugate (TCV)'],
    isDone: false,
    type: 'IAP_RECOMMENDED',
    description: 'TCV is crucial in India. Flu shot is annual.'
  },
  {
    id: '7months',
    ageLabel: '7 Months',
    ageInDays: 210,
    vaccines: ['Influenza-2'],
    isDone: false,
    type: 'IAP_RECOMMENDED',
    description: 'Second dose of Flu vaccine (4 weeks after first).'
  },
  {
    id: '9months',
    ageLabel: '9 Months',
    ageInDays: 270,
    vaccines: ['MMR-1', 'Vitamin A'],
    isDone: false,
    type: 'NIS',
    description: 'Measles, Mumps, Rubella dose 1.'
  },
  {
    id: '12months',
    ageLabel: '12 Months',
    ageInDays: 365,
    vaccines: ['Hepatitis A-1'],
    isDone: false,
    type: 'IAP_RECOMMENDED',
    description: 'Single dose for live vaccine, or 1st of 2 for killed vaccine.'
  },
  {
    id: '15months',
    ageLabel: '15 Months',
    ageInDays: 450,
    vaccines: ['MMR-2', 'Varicella-1', 'PCV Booster'],
    isDone: false,
    type: 'IAP_RECOMMENDED',
    description: 'Chickenpox dose 1 and Pneumococcal booster.'
  },
  {
    id: '18months',
    ageLabel: '16-18 Months',
    ageInDays: 540,
    vaccines: ['DTwP / DTaP-B1', 'IPV-B1', 'Hib-B1', 'Hepatitis A-2'],
    isDone: false,
    type: 'NIS',
    description: 'First DTP Booster and 2nd Hep A (if killed vaccine used).'
  },
  {
    id: '2years',
    ageLabel: '2 Years',
    ageInDays: 730,
    vaccines: ['Typhoid Booster'],
    isDone: false,
    type: 'IAP_RECOMMENDED',
    description: 'If Polysaccharide vaccine is used (repeat every 3 years).'
  },
  {
    id: '4years',
    ageLabel: '4-6 Years',
    ageInDays: 1460,
    vaccines: ['DTwP / DTaP-B2', 'IPV-B2', 'MMR-3', 'Varicella-2'],
    isDone: false,
    type: 'NIS',
    description: 'School entry boosters.'
  },
  {
    id: '10years',
    ageLabel: '10-12 Years',
    ageInDays: 3650,
    vaccines: ['Tdap / Td', 'HPV (Girls)'],
    isDone: false,
    type: 'IAP_RECOMMENDED',
    description: 'HPV prevents cervical cancer (2 doses).'
  }
];

// src/app/data/vaccine-schedule.ts (Add this at the bottom)

export const VACCINE_DETAILS: Record<string, { full_name: string; protects_against: string; side_effects: string }> = {
  // --- BIRTH ---
  'BCG': {
    full_name: 'Bacille Calmette-Guerin',
    protects_against: 'Tuberculosis (TB)',
    side_effects: 'A small red sore usually develops at the injection site 2-4 weeks later. It eventually heals leaving a small scar. This is normal.'
  },
  'OPV 0': {
    full_name: 'Oral Polio Vaccine (Zero Dose)',
    protects_against: 'Polio (Poliomyelitis)',
    side_effects: 'Extremely safe. Rarely, very mild diarrhea.'
  },
  'Hepatitis B-1': {
    full_name: 'Hepatitis B Vaccine (Dose 1)',
    protects_against: 'Hepatitis B (Liver infection)',
    side_effects: 'Soreness at injection site, mild fever, or irritability.'
  },

  // --- 6, 10, 14 WEEKS (Primary Series) ---
  'DTwP / DTaP-1': {
    full_name: 'Diphtheria, Tetanus, Pertussis (Dose 1)',
    protects_against: 'Diphtheria (Throat infection), Tetanus (Lockjaw), Pertussis (Whooping Cough)',
    side_effects: 'Fever, pain, redness, and swelling at the site are common. Crankiness and loss of appetite may occur.'
  },
  'DTwP / DTaP-2': {
    full_name: 'Diphtheria, Tetanus, Pertussis (Dose 2)',
    protects_against: 'Diphtheria, Tetanus, Whooping Cough',
    side_effects: 'Fever, pain, and swelling. If previous dose caused high fever/seizures, consult doctor.'
  },
  'DTwP / DTaP-3': {
    full_name: 'Diphtheria, Tetanus, Pertussis (Dose 3)',
    protects_against: 'Diphtheria, Tetanus, Whooping Cough',
    side_effects: 'Common: Fever, redness, pain. Rarely: Persistent crying.'
  },
  'IPV-1': {
    full_name: 'Inactivated Polio Vaccine (Dose 1)',
    protects_against: 'Polio',
    side_effects: 'Soreness at the injection spot.'
  },
  'IPV-2': {
    full_name: 'Inactivated Polio Vaccine (Dose 2)',
    protects_against: 'Polio',
    side_effects: 'Soreness at the injection spot.'
  },
  'IPV-3': {
    full_name: 'Inactivated Polio Vaccine (Dose 3)',
    protects_against: 'Polio',
    side_effects: 'Soreness at the injection spot.'
  },
  'Hepatitis B-2': {
    full_name: 'Hepatitis B Vaccine (Dose 2)',
    protects_against: 'Hepatitis B',
    side_effects: 'Soreness at injection site, mild fever.'
  },
  'Hepatitis B-3': {
    full_name: 'Hepatitis B Vaccine (Dose 3)',
    protects_against: 'Hepatitis B',
    side_effects: 'Soreness at injection site, mild fever.'
  },
  'Hib-1': {
    full_name: 'Haemophilus Influenzae Type B (Dose 1)',
    protects_against: 'Meningitis, Pneumonia, Epiglottitis',
    side_effects: 'Mild redness, warmth, or swelling at site.'
  },
  'Hib-2': {
    full_name: 'Haemophilus Influenzae Type B (Dose 2)',
    protects_against: 'Meningitis, Pneumonia',
    side_effects: 'Mild redness or swelling.'
  },
  'Hib-3': {
    full_name: 'Haemophilus Influenzae Type B (Dose 3)',
    protects_against: 'Meningitis, Pneumonia',
    side_effects: 'Mild redness or swelling.'
  },
  'Rotavirus-1': {
    full_name: 'Rotavirus Vaccine (Dose 1)',
    protects_against: 'Severe Diarrhea & Dehydration caused by Rotavirus',
    side_effects: 'Mild irritability, temporary diarrhea or vomiting.'
  },
  'Rotavirus-2': {
    full_name: 'Rotavirus Vaccine (Dose 2)',
    protects_against: 'Severe Diarrhea',
    side_effects: 'Mild irritability, temporary diarrhea.'
  },
  'Rotavirus-3': {
    full_name: 'Rotavirus Vaccine (Dose 3)',
    protects_against: 'Severe Diarrhea',
    side_effects: 'Mild irritability.'
  },
  'PCV-1': {
    full_name: 'Pneumococcal Conjugate Vaccine (Dose 1)',
    protects_against: 'Pneumonia, Meningitis, Ear Infections',
    side_effects: 'Drowsiness, mild fever, redness at site.'
  },
  'PCV-2': {
    full_name: 'Pneumococcal Conjugate Vaccine (Dose 2)',
    protects_against: 'Pneumonia, Meningitis',
    side_effects: 'Drowsiness, mild fever.'
  },
  'PCV-3': {
    full_name: 'Pneumococcal Conjugate Vaccine (Dose 3)',
    protects_against: 'Pneumonia, Meningitis',
    side_effects: 'Drowsiness, mild fever.'
  },

  // --- 6 MONTHS to 1 YEAR ---
  'Influenza-1': {
    full_name: 'Influenza Vaccine (Flu Shot - Dose 1)',
    protects_against: 'Seasonal Flu (Influenza A & B)',
    side_effects: 'Soreness, mild fever, muscle aches.'
  },
  'Influenza-2': {
    full_name: 'Influenza Vaccine (Flu Shot - Dose 2)',
    protects_against: 'Seasonal Flu',
    side_effects: 'Soreness, mild fever. Given 4 weeks after first dose.'
  },
  'Typhoid Conjugate (TCV)': {
    full_name: 'Typhoid Conjugate Vaccine',
    protects_against: 'Typhoid Fever',
    side_effects: 'Pain at injection site, fever, headache.'
  },
  'MMR-1': {
    full_name: 'Measles, Mumps, Rubella (Dose 1)',
    protects_against: 'Measles (Rash/Fever), Mumps (Swollen glands), Rubella',
    side_effects: 'Fever 6-12 days after shot, mild rash.'
  },
  'Vitamin A': {
    full_name: 'Vitamin A Oral Solution',
    protects_against: 'Night blindness, Vitamin A deficiency',
    side_effects: 'Upset stomach or headache (Rare).'
  },

  // --- 1 YEAR to 2 YEARS ---
  'Hepatitis A-1': {
    full_name: 'Hepatitis A Vaccine (Dose 1)',
    protects_against: 'Hepatitis A (Jaundice/Liver infection)',
    side_effects: 'Soreness at site, loss of appetite, headache.'
  },
  'Hepatitis A-2': {
    full_name: 'Hepatitis A Vaccine (Dose 2)',
    protects_against: 'Hepatitis A',
    side_effects: 'Soreness at site. Given 6 months after first dose.'
  },
  'MMR-2': {
    full_name: 'Measles, Mumps, Rubella (Dose 2)',
    protects_against: 'Measles, Mumps, Rubella',
    side_effects: 'Mild fever or rash.'
  },
  'Varicella-1': {
    full_name: 'Varicella Vaccine (Chickenpox Dose 1)',
    protects_against: 'Chickenpox',
    side_effects: 'Soreness, mild rash (rarely a few spots).'
  },
  'Varicella-2': {
    full_name: 'Varicella Vaccine (Chickenpox Dose 2)',
    protects_against: 'Chickenpox',
    side_effects: 'Soreness, mild fever.'
  },
  'PCV Booster': {
    full_name: 'Pneumococcal Conjugate Booster',
    protects_against: 'Pneumonia, Meningitis',
    side_effects: 'Redness, swelling, fever.'
  },
  'DTwP / DTaP-B1': {
    full_name: 'DTP Booster 1',
    protects_against: 'Diphtheria, Tetanus, Pertussis',
    side_effects: 'Injection site swelling/pain is very common for boosters.'
  },
  'IPV-B1': {
    full_name: 'IPV Booster 1',
    protects_against: 'Polio',
    side_effects: 'Soreness.'
  },
  'Hib-B1': {
    full_name: 'Hib Booster 1',
    protects_against: 'Meningitis, Pneumonia',
    side_effects: 'Mild redness.'
  },

  // --- OLDER KIDS ---
  'Typhoid Booster': {
    full_name: 'Typhoid Polysaccharide Vaccine',
    protects_against: 'Typhoid Fever',
    side_effects: 'Soreness, fever. (Needed if TCV wasn\'t given earlier).'
  },
  'DTwP / DTaP-B2': {
    full_name: 'DTP Booster 2 (School Entry)',
    protects_against: 'Diphtheria, Tetanus, Pertussis',
    side_effects: 'Significant swelling at arm is common but temporary.'
  },
  'IPV-B2': {
    full_name: 'IPV Booster 2',
    protects_against: 'Polio',
    side_effects: 'Soreness.'
  },
  'MMR-3': {
    full_name: 'MMR Booster',
    protects_against: 'Measles, Mumps, Rubella',
    side_effects: 'Mild fever.'
  },
  'Tdap / Td': {
    full_name: 'Tetanus, Diphtheria, Pertussis (Adolescent)',
    protects_against: 'Tetanus, Diphtheria, Whooping Cough',
    side_effects: 'Pain in arm, fatigue, headache.'
  },
  'HPV (Girls)': {
    full_name: 'Human Papillomavirus Vaccine',
    protects_against: 'Cervical Cancer, Warts',
    side_effects: 'Pain/redness at site, dizziness (sit for 15 mins after shot).'
  }
};

export interface BabyProfile {
  id: string;       // Unique ID (e.g., timestamp)
  name: string;
  gender: 'boy' | 'girl';
  dob: string;      // Date of Birth
  completedVaccines: string[]; // List of IDs of vaccines taken (e.g., ['birth', '6weeks'])
}