import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
 IProducts
} from '../../interfaces/idev';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DevService {
  constructor(private readonly _HttpClient: HttpClient) {}

  getProducts(): Observable<IProducts[]> {
    return this._HttpClient
      .get<IProducts[]>(`${environment.baseUrl}/DEV/Products`)
      .pipe(
        map((res: IProducts[]) => {
          return res;
        })
      );
  }

}
