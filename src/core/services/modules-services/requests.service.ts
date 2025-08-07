import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  IEditRequest,
  IRequestsPagedSearchRequest,
  IRequestsPagedSearchResponse,
  ISalesRequest,
  ISamplesRequest,
  IUpdateRequestStatus,
} from '../../interfaces/icollection';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  private readonly _HttpClient = inject(HttpClient);

  addSalesRequests(data: ISalesRequest): Observable<ISalesRequest> {
    return this._HttpClient.post<ISalesRequest>(
      `${environment.baseUrl}/Requests/Sale`,
      data
    );
  }

  addSamplesRequests(data: ISamplesRequest): Observable<ISamplesRequest> {
    return this._HttpClient.post<ISamplesRequest>(
      `${environment.baseUrl}/Requests/Samples`,
      data
    );
  }

  getRequests(request : IRequestsPagedSearchRequest): Observable<IRequestsPagedSearchResponse> {
    return this._HttpClient
      .post<IRequestsPagedSearchResponse>(`${environment.baseUrl}/Requests/SearchRequests`, request);
  }

  updateRequestStatus(request : IUpdateRequestStatus): Observable<void> {
    return this._HttpClient.post<void>(
      `${environment.baseUrl}/Requests/UpdateRequestStatus`,
      request
    );
  }

  editRequest(request: IEditRequest): Observable<void> {
    return this._HttpClient.post<void>(
      `${environment.baseUrl}/Requests/EditRequest`,
      request
    );
  }
}
