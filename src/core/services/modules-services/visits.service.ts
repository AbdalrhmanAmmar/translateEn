import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IAddVisit, IVisit, IVisitFormData } from '../../interfaces/ivisit';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VisitsService {
  constructor(private readonly _HttpClient: HttpClient) {}

   addVisit(visit: IAddVisit): Observable<void> {
    return this._HttpClient.post<void>(`${environment.baseUrl}/Visits`, visit);
  }

   getVisit(): Observable<IVisit[]> {
    return this._HttpClient.get<IVisit[]>(`${environment.baseUrl}/Visits`).pipe(
      map((res: IVisit[]) => {
        return res;
      })
    );
  }
}
