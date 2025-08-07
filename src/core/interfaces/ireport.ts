import { ILocation } from "./ilookup";

export interface IReports {
  totalDoctors: number;
  doctorsWithoutVisits: number;
  doctorsCoverage: number;
  targetVisits: number;
  completedVisits: number;
  visitsCoverage: number;
  targetDailyVisits: number;
  completedDailyVisitsRate: number;
  missedVisits: number;
  targetWorkDays: number;
  completedWorkDays: number;
  workDaysWithoutReports: number;
  segmentAVisits: number;
  segmentBVisits: number;
  totalVisits: number;
}

export interface IGetReportRequest {
    fromDate : Date;
    toDate : Date;
}

export interface DoctorsWithoutVisits{
  doctorName : string;
  organizationName : string;
  location : ILocation
}

export interface ActualVisits{
  medRepName: string;
  date : Date;
  doctorName: string;
}

export interface MissedVisits{
  medRepName: string;
  date : Date;
  doctorName: string;
}

export interface ActualWorkDays{
  date : Date;
  medRepName: string;
  doctorName: string;
}

export interface DaysWithoutReports{
  dayName : string;
  date : Date;
}

export interface ISegmentFilter {
  fromDate: Date;
  toDate: Date;
  segment : string;
}

export interface IReportPagedSearchRequest<T> {
  filter : T;
  pageIndex: number;
  pageSize: number;
}

export interface IReportPagedSearchResponse<T> {
  items: T[];
  totalCount: number;
  pageCount: number;
  currentPageIndex : number;
  counts: object | null ;
}

export interface ISegmentVisits {
  segment: string;
  visitDate : Date;
  doctorId : number;
  doctorName: string;
  medRepId: number;
  medRepName: string;
}

// ----------------

export interface IDoctorWithoutVisitsReportDto {
  doctorName?: string;
  organizationName?: string;
  city?: string;
  area?: string;
  district?: string;
}

export interface ICompletedVisitReportDto {
  medRepName: string;
  clinicVisitDate: string;
  doctorName: string;
}

export interface IMissedVisitReportDto {
  medRepName: string;
  clinicVisitDate: string; 
  doctorName: string;
}

export interface ICompletedWorkDayReportDto {
  medRepName: string;
  clinicVisitDate: string;
  doctorName: string;
}

export interface IDayWithoutReportDto {
  day: string;
  date: string; 
}

export interface ISegmentVisitReportDto {
  medRepName: string;
  clinicVisitDate: string;
  doctorName: string;
}