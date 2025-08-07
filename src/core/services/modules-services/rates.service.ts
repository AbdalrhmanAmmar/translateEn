import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IRating } from '../../interfaces/irating';
import { ILookUp } from '../../interfaces/ilookup';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RatesService {
  private readonly _HttpClient = inject(HttpClient);

  addRating(data: IRating): Observable<IRating> {
    return this._HttpClient
      .post<IRating>(`${environment.baseUrl}/Rates`, data)
      .pipe(
        map((res: IRating) => {
          return res;
        })
      );
  }

  getSupervisorMedReps(): Observable<ILookUp<string>[]> {
    return this._HttpClient
      .get<ILookUp<string>[]>(`${environment.baseUrl}/Rates/PendingRateMedReps`)
      .pipe(
        map((res: ILookUp<string>[]) => {
          return res;
        })
      );
  }

  getMedRepsVisitsCodes(medRepId: number): Observable<number[]> {
    return this._HttpClient
      .get<number[]>(`${environment.baseUrl}/Rates/PendingRateClinicVisits/${medRepId}`)
      .pipe(
        map((res: number[]) => {
          return res;
        })
      );
  }
}
