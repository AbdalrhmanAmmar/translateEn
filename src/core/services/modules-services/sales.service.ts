import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IPharmacyProduct, IPharmacyVisit } from '../../../core/interfaces/isale';
import { environment } from '../../../environments/environment';
import { ILookUp } from '../../interfaces/ilookup';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  private readonly _HttpClient = inject(HttpClient);

  addPharmacyVisit(data: IPharmacyVisit): Observable<IPharmacyVisit> {
    return this._HttpClient.post<IPharmacyVisit>(
      `${environment.baseUrl}/Sales/PharmacyVisit`,
      data
    );
  }

  addPharmacyVisitInvoice(formData: FormData): Observable<File> {
    return this._HttpClient.post<File>(
      `${environment.baseUrl}/Sales/PharmacyVisitInvoice`,
      formData,
      {
        responseType: 'text' as 'json',
      }
    );
  }
}
