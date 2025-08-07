import { IItem } from '@coreui/angular-pro';


const doctorsWithoutVisits: IItem[] = [
  {id: 0, name: 'Dr. John Smith', organization: 'HealthCare Clinic', city: 'New York', area: 'Manhattan', district: 'Downtown'},
  {id: 1, name: 'Dr. Samppa Nori', organization: 'City Hospital', city: 'Los Angeles', area: 'Downtown', district: 'Downtown'},
  {id: 2, name: 'Dr. Estavan Lykos', organization: 'General Hospital', city: 'Chicago', area: 'North Side', district: 'North Side'}
];

const actualVisits: IItem[] = [
  {id: 0, medRep: 'Dr. John Smith', date: '2022/01/01', doctor: 'New York'},
  {id: 1, medRep: 'Dr. Samppa Nori', date: '2022/01/01', doctor: 'Los Angeles'},
  {id: 2, medRep: 'Dr. Estavan Lykos', date: '2022/01/01', doctor: 'Chicago'},
  {id: 3, medRep: 'Dr. Chetan Mohamed', date: '2022/01/01', doctor: 'Houston'},
];

const missedVisits: IItem[] = [
  {id: 0, medRep: 'Dr. John Smith', date: '2022/01/01', doctor: 'New York'},
  {id: 1, medRep: 'Dr. Samppa Nori', date: '2022/01/01', doctor: 'Los Angeles'},
  {id: 2, medRep: 'Dr. Estavan Lykos', date: '2022/01/01', doctor: 'Chicago'},
  {id: 3, medRep: 'Dr. Chetan Mohamed', date: '2022/01/01', doctor: 'Houston'},
];

const actualWorkDays: IItem[] = [
  {id: 0, date: '2022/01/01', medRep: 'HealthCare Clinic', doctor: 'New York'},
  {id: 1, date: '2022/01/01', medRep: 'City Hospital', doctor: 'Los Angeles'},
  {id: 2, date: '2022/01/01', medRep: 'General Hospital', doctor: 'Chicago'},
  {id: 3, date: '2022/01/01', medRep: 'Community Health Center', doctor: 'Houston'},
];

const daysWithoutReports: IItem[] = [
  {id: 0, day: 'Dr. John Smith', date: '2022/01/01'},
  {id: 1, day: 'Dr. Samppa Nori', date: '2022/01/01'},
  {id: 2, day: 'Dr. Estavan Lykos', date: '2022/01/01'},
  {id: 3, day: 'Dr. Chetan Mohamed', date: '2022/01/01'},
];

const classAVisits: IItem[] = [
  {id: 0, medRep: 'Dr. John Smith', date: '2022/01/01', doctor: 'New York'},
  {id: 1, medRep: 'Dr. Samppa Nori', date: '2022/01/01', doctor: 'Los Angeles'},
  {id: 2, medRep: 'Dr. Estavan Lykos', date: '2022/01/01', doctor: 'Chicago'},
  {id: 3, medRep: 'Dr. Chetan Mohamed', date: '2022/01/01', doctor: 'Houston'},
];

const classBVisits: IItem[] = [
  {id: 0, medRep: 'Dr. John Smith', date: '2022/01/01', doctor: 'New York'},
  {id: 1, medRep: 'Dr. Samppa Nori', date: '2022/01/01', doctor: 'Los Angeles'},
  {id: 2, medRep: 'Dr. Estavan Lykos', date: '2022/01/01', doctor: 'Chicago'},
  {id: 3, medRep: 'Dr. Chetan Mohamed', date: '2022/01/01', doctor: 'Houston'},
];

export {doctorsWithoutVisits, actualVisits, missedVisits, actualWorkDays, daysWithoutReports, classAVisits, classBVisits };
