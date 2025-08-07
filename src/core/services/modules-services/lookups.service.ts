import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ISalesResponse, ISamplesResponse} from '../../interfaces/icollection';
import { IVisitFormData} from '../../interfaces/ivisit';
import { IClinicVisitFormLookup, ILookUp} from '../../interfaces/ilookup';
import { IPharmacyProduct } from '../../interfaces/isale';
import { IFilterLookups, IProductsLookUps } from '../../interfaces/idashboard';
import { IPharmacyVisitFormLookup } from '../../interfaces/ilookup';

@Injectable({
  providedIn: 'root',
})
export class LookupsService {
  constructor(private readonly _HttpClient: HttpClient) {}

  getSalesData(): Observable<ISalesResponse> {
    return this._HttpClient
      .get<ISalesResponse>(`${environment.baseUrl}/Lookups/SaleRequestForm`)
      .pipe(
        map((res: ISalesResponse) => {
          return res;
        })
      );
  }

    getSamplesData(): Observable<ISamplesResponse> {
    return this._HttpClient
      .get<ISamplesResponse>(
        `${environment.baseUrl}/Lookups/SamplesRequestForm`
      )
      .pipe(
        map((res: ISamplesResponse) => {
          return res;
        })
      );
  }
  
   getClinicVisitFormLookups(): Observable<IClinicVisitFormLookup> {
    return this._HttpClient
      .get<IClinicVisitFormLookup>(`${environment.baseUrl}/Lookups/ClinicVisitForm`)
      .pipe(
        map((res: IClinicVisitFormLookup) => {
          return res;
        })
      );
  }

  getPharmacyVisitFormLookups(): Observable<IPharmacyVisitFormLookup> {
    return this._HttpClient
      .get<IPharmacyVisitFormLookup>(`${environment.baseUrl}/Lookups/PharmacyVisitForm`)
      .pipe(
        map((res: IPharmacyVisitFormLookup) => {
          return res;
        })
      );
  }

  getLookupsOrganizations(): Observable<ILookUp<string>[]> {
    return this._HttpClient
      .get<ILookUp<string>[]>(`${environment.baseUrl}/Lookups/Organizations`)
      .pipe(
        map((res: ILookUp<string>[]) => {
          return res;
        })
      );
  }

  getLookupsPharmacyProducts(): Observable<IPharmacyProduct[]> {
    return this._HttpClient
      .get<IPharmacyProduct[]>(
        `${environment.baseUrl}/Lookups/PharmacyProducts`
      )
      .pipe(
        map((res: IPharmacyProduct[]) => {
          return res;
        })
      );
  }

   getFilterLookups(): Observable<IFilterLookups> {
    return this._HttpClient
      .get<IFilterLookups>(`${environment.baseUrl}/Lookups/SearchDashboardForm`)
      .pipe(
        map((res: IFilterLookups) => {
          return res;
        })
      );
  }

  
}
