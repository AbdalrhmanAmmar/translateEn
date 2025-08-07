import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  IDoctorDetails,
  IDoctorExtraDetailsRequest,
  IDoctorExtraDetailsResponse,
  IDoctorSale,
  IDoctorSample,
  IDoctorVisit,
  IFilterLookups,
  IMoreDetails,
  IProductsLookUps,
  ISearchRequest,
  ISearchResponse,
} from '../../interfaces/idashboard';
import { environment } from '../../../environments/environment';
import { UserStore } from '../../current-user/user-store';
import { Roles } from '../../interfaces/iauth';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private readonly _HttpClient: HttpClient) {}

  cleanFilter<T extends Record<string, unknown>>(filter: T): Partial<T> {
    const cleaned: Partial<T> = {};

    Object.entries(filter).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        const nonNullArray = value.filter((v) => v !== null);
        if (nonNullArray.length > 0) {
          cleaned[key as keyof T] = nonNullArray as T[keyof T];
        }
      } else if (value !== null && value !== '') {
        cleaned[key as keyof T] = value as T[keyof T];
      }
    });

    return cleaned;
  }

  SearchVisits(data: ISearchRequest): Observable<ISearchResponse> {
    return this._HttpClient
      .post<ISearchResponse>(`${environment.baseUrl}/Dashboards/Search`, data)
      .pipe(
        map((res: ISearchResponse) => {
          return res;
        })
      );
  }

  getVisitDetails(id: number): Observable<IMoreDetails> {
    return this._HttpClient
      .get<IMoreDetails>(`${environment.baseUrl}/Dashboards/VisitDetails/${id}`)
      .pipe(
        map((res: IMoreDetails) => {
          return res;
        })
      );
  }


  getDoctorDetails(id : number): Observable<IDoctorDetails> {
    return this._HttpClient
      .get<IDoctorDetails>(`${environment.baseUrl}/Dashboards/DoctorDetails/${id}`)
      .pipe(
        map((res: IDoctorDetails) => {
          return res;
        })
      );
  }

  getDoctorVisit(request: IDoctorExtraDetailsRequest): Observable<IDoctorExtraDetailsResponse<IDoctorVisit>> {
    return this._HttpClient
      .post<IDoctorExtraDetailsResponse<IDoctorVisit>>(`${environment.baseUrl}/Dashboards/DoctorVisits`, request)
      .pipe(
        map((res: IDoctorExtraDetailsResponse<IDoctorVisit>) => {
          return res;
        })
      );
  }

  getDoctorSamples(request: IDoctorExtraDetailsRequest): Observable<IDoctorExtraDetailsResponse<IDoctorSample>> {
    return this._HttpClient
      .post<IDoctorExtraDetailsResponse<IDoctorSample>>(`${environment.baseUrl}/Dashboards/DoctorSamples`, request)
      .pipe(
        map((res: IDoctorExtraDetailsResponse<IDoctorSample>) => {
          return res;
        })
      );
  }

  getDoctorSales(request: IDoctorExtraDetailsRequest): Observable<IDoctorExtraDetailsResponse<IDoctorSale>> {
    return this._HttpClient
      .post<IDoctorExtraDetailsResponse<IDoctorSale>>(`${environment.baseUrl}/Dashboards/DoctorSales`, request)
      .pipe(
        map((res: IDoctorExtraDetailsResponse<IDoctorSale>) => {
          return res;
        })
      );
  } 

}
