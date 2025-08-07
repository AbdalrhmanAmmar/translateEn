import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IDoctorWithoutVisitsReportDto,
  ICompletedVisitReportDto,
  IMissedVisitReportDto,
  ICompletedWorkDayReportDto,
  ISegmentVisitReportDto,
  IGetReportRequest,  
  IReportPagedSearchRequest,
  IReportPagedSearchResponse,
  IReports,
  ISegmentFilter,
  IDayWithoutReportDto,
} from '../../interfaces/ireport';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  constructor(private readonly _HttpClient: HttpClient) {}

  // Get all reports
  getReports(date: IGetReportRequest): Observable<IReports> {
    return this._HttpClient
      .post<IReports>(`${environment.baseUrl}/Reports/Reports`, date, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      });
  }

  // Get doctors without visits
  getDoctorsWithoutVisits(date: IGetReportRequest): Observable<IDoctorWithoutVisitsReportDto[]> {
    return this._HttpClient
      .post<IDoctorWithoutVisitsReportDto[]>(`${environment.baseUrl}/Reports/DoctorsWithoutVisits`, date, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      });
  }

  // Get completed visits
  getCompletedVisits(date: IGetReportRequest): Observable<ICompletedVisitReportDto[]> {
    return this._HttpClient
      .post<ICompletedVisitReportDto[]>(`${environment.baseUrl}/Reports/CompletedVisits`, date, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      });
  }

  // Get missed visits
  getMissedVisits(date: IGetReportRequest): Observable<IMissedVisitReportDto[]> {
    return this._HttpClient
      .post<IMissedVisitReportDto[]>(`${environment.baseUrl}/Reports/MissedVisits`, date, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      });
  }

  // Get completed workdays
  getCompletedWorkDays(date: IGetReportRequest): Observable<ICompletedWorkDayReportDto[]> {
    return this._HttpClient
      .post<ICompletedWorkDayReportDto[]>(`${environment.baseUrl}/Reports/CompletedWorkDays`, date, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      });
  }

  // Get days without reports
  getDaysWithoutReports(date: IGetReportRequest): Observable<IDayWithoutReportDto[]> {
    return this._HttpClient
      .post<IDayWithoutReportDto[]>(`${environment.baseUrl}/Reports/DaysWithoutReports`, date, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      });
  }

  // Get segment visits
  getSegmentVisits(date: IReportPagedSearchRequest<ISegmentFilter>): Observable<IReportPagedSearchResponse<ISegmentVisitReportDto>> {
    return this._HttpClient
      .post<IReportPagedSearchResponse<ISegmentVisitReportDto>>(`${environment.baseUrl}/Reports/SegmentsVisits`, date, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      });
  }
}
