import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IAddHoliday, IAddWorkDaySettings, IGethHolidays, IHoliday, IWorkDaySettings } from '../../interfaces/igeneral-management';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GeneralManagementService {
  private readonly _HttpClient = inject(HttpClient);

  addHoliday(data: IAddHoliday): Observable<number> {
    return this._HttpClient
      .post<number>(`${environment.baseUrl}/Holidays/AddHoliday`, data);
  }

    addWeekHoliday(data: number[]): Observable<number> {
      return this._HttpClient
        .post<number>(`${environment.baseUrl}/Holidays/AddWeekHoliday`, data);
  }

    addWorkDaySettings(data: IAddWorkDaySettings): Observable<void> {
    return this._HttpClient
      .post<void>(`${environment.baseUrl}/Holidays/AddWeekHoliday`, data);
  }

    getHolidays(month: number, year: number): Observable<IGethHolidays> {
        return this._HttpClient.get<IGethHolidays>(`${environment.baseUrl}/Holidays/GetHolidays?month=${month}&year=${year}`).pipe(
        map((res: IGethHolidays) => {
            return res;
        })
        );
    }

    getWorkDaysSettings(): Observable<IWorkDaySettings[]> {
        return this._HttpClient.get<IWorkDaySettings[]>(`${environment.baseUrl}/WorkDaySettings`).pipe(
        map((res: IWorkDaySettings[]) => {
            return res;
        })
        );
    }

    deleteHoliday(holidayId: number): Observable<void> {
        return this._HttpClient.delete<void>(`${environment.baseUrl}/Holidays/DeleteHoliday?id=${holidayId}`);
    }
}
