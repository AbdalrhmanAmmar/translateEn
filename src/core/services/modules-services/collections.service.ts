import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  IDownloadResponse,
  IFilter,
  IFilterRequest,
  IOrganizationResponse,
  IOrderCollectionSearchRequest,
  IOrderCollectionSearchResponse,
  IPaymentCollectionSearchRequest,
  IPaymentCollectionSearchResponse,
  IUpdateCollectionStatus,
  IPharmacyOrderSearchResponse,
  IPharmacyOrderSearchRequest,
} from '../../interfaces/icollection';

@Injectable({
  providedIn: 'root',
})
export class CollectionsService {
  private readonly baseUrl = '/Collections/PaymentCollectionSearch';
  private readonly baseUrlOrder = '/Collections/OrderCollectionSearch';

  private readonly _HttpClient = inject(HttpClient);

  addCollectorSearch(body: IFilterRequest): Observable<IDownloadResponse> {
    return this._HttpClient.post<IDownloadResponse>(
      `${environment.baseUrl}${this.baseUrl}`,
      body
    );
  }

  updateCollectorSearch(
    id: number,
    status: number
  ): Observable<IDownloadResponse> {
    const body: IFilterRequest = {
      filter: {
        id: id,
        status: status,
      },
      pageIndex: 1,
      pageSize: 10,
    };
    return this._HttpClient.post<IDownloadResponse>(
      `${environment.baseUrl}${this.baseUrl}`,
      body
    );
  }

  addOrderCollection(body: IFilterRequest): Observable<IOrganizationResponse> {
    return this._HttpClient.post<IOrganizationResponse>(
      `${environment.baseUrl}${this.baseUrlOrder}`,
      body
    );
  }

  updateOrder(id: number, status: number): Observable<IFilter> {
    const body = {
      id: id,
      status: status,
    };
    return this._HttpClient.post(
      `${environment.baseUrl}/Collections/OrderCollectionUpdate`,
      body
    );
  }

  // ----------------------------------

  getPaymentCollections(body: IPaymentCollectionSearchRequest): Observable<IPaymentCollectionSearchResponse> {
      return this._HttpClient.post<IPaymentCollectionSearchResponse>(
      `${environment.baseUrl}/Collections/PaymentCollectionsSearch`,
       body
    );
  }

  getPharmacyOrders(body: IPharmacyOrderSearchRequest): Observable<IPharmacyOrderSearchResponse> {
      return this._HttpClient.post<IPharmacyOrderSearchResponse>(
      `${environment.baseUrl}/Collections/PharmacyOrdersSearch`,
       body
    );
  }

    getOrderCollections(body: IOrderCollectionSearchRequest): Observable<IOrderCollectionSearchResponse> {
      return this._HttpClient.post<IOrderCollectionSearchResponse>(
      `${environment.baseUrl}/Collections/OrderCollectionsSearch`,
       body
    );
  }

  updateCollectionStatus(body: IUpdateCollectionStatus): Observable<void> {
      return this._HttpClient.put<void>(
      `${environment.baseUrl}/Collections/CollectionStatus`,
       body
    );
  }
}
