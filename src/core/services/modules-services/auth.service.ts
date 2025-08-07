import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ILoginUser, IUserInfo} from '../../interfaces/iauth';
import { UserStore } from '../../current-user/user-store';
import { EncryptionService } from '../helper-services/encryption.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly _HttpClient: HttpClient) {}

  loginUser(data: ILoginUser): Observable<IUserInfo> {
    const encryptedData = EncryptionService.encrypt(
      JSON.stringify(data),
      environment.LoginSecretKey
    );
    return this._HttpClient
      .post(`${environment.baseUrl}/Auth/Login`, {data : encryptedData},{ headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'text' })
      .pipe(
        map((res: string) => {
          localStorage.setItem(environment.UserInfoStorageKey, res);
          const decryptedRes = EncryptionService.decrypt(res, environment.UserInfoSecretKey);
          const user: IUserInfo = JSON.parse(decryptedRes);
          UserStore.setUser(user);
          return user;
        })
      );
  }

  logoutUser()
  {
    return this._HttpClient
          .post(`${environment.baseUrl}/Auth/Logout` , {})
  }

  refreshUser(data : IUserInfo): Observable<IUserInfo> 
  {
     const encryptedData = EncryptionService.encrypt(
      JSON.stringify(data),
      environment.UserInfoSecretKey
    );
    return this._HttpClient
      .post(`${environment.baseUrl}/Auth/Refresh`, {data : encryptedData},{ headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'text' })
      .pipe(
        map((res: string) => {
          localStorage.setItem(environment.UserInfoStorageKey, res);
          const decryptedRes = EncryptionService.decrypt(res, environment.UserInfoSecretKey);
          const user: IUserInfo = JSON.parse(decryptedRes);
          UserStore.setUser(user);
          return user;
        })
      );


  }
}
