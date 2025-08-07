import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IAddUser} from '../../interfaces/iuser';
import { EncryptionService } from '../helper-services/encryption.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private readonly _HttpClient: HttpClient) {}

   addUser(data: IAddUser): Observable<void> {

     const encryptedData = EncryptionService.encrypt(
          JSON.stringify(data),
          environment.RegisterSecretKey
        );
        
    return this._HttpClient
      .post<void>(`${environment.baseUrl}/Users/AddUser`, {data : encryptedData},{ headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }
}
