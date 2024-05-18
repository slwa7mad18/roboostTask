import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private _httpClient: HttpClient) {}

  Register(newUser: any): Observable<any> {
    return this._httpClient.post(environment.baseUrl + `User/POST`, newUser);
  }

  Login(user: any): Observable<any> {
    return this._httpClient.post(environment.baseUrl + `User/Login`, user);
  }

  SetAccessToken(token: string): void {
    localStorage.setItem('AccessToken',token);
  }

  GetAccessToken(){
    return localStorage.getItem('AccessToken');
  }

  IsAuthenticated(){
    if(this.GetAccessToken() != null){
      return true;
    }
    else{
      return false;
    }
  }

  LogOut(){
   localStorage.removeItem('AccessToken');
  }
}
