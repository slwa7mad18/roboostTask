import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(
    private _httpClient: HttpClient,
    private _authenticationService: AuthenticationService
  ) {}

  GetAll(): Observable<any> {
    let options = {
      headers: new HttpHeaders({
        authentication:
          'Bearer ' + this._authenticationService.GetAccessToken(),
      }),
    };
    return this._httpClient.get(environment.baseUrl + `Student/Get`, options);
  }

  GetById(id: any): Observable<any> {
    let options = {
      headers: new HttpHeaders({
        authentication:
          'Bearer ' + this._authenticationService.GetAccessToken(),
      }),
    };
    return this._httpClient.get(
      environment.baseUrl + `Student/GetByID/?id=${id}`,
      options
    );
  }

  Add(newStudent: any): Observable<any> {
    let options = {
      headers: new HttpHeaders({
        authentication:
          'Bearer ' + this._authenticationService.GetAccessToken(),
      }),
    };

    return this._httpClient.post(
      environment.baseUrl + `Student/POST`,
      newStudent,
      options
    );
  }

  Edit(student: any): Observable<any> {
    let options = {
      headers: new HttpHeaders({
        authentication:
          'Bearer ' + this._authenticationService.GetAccessToken(),
      }),
    };
    return this._httpClient.put(
      environment.baseUrl + `Student/PUT`,
      student,
      options
    );
  }

  Delete(id: number): Observable<any> {
    let options = {
      headers: new HttpHeaders({
        authentication:
          'Bearer ' + this._authenticationService.GetAccessToken(),
      }),
    };
    return this._httpClient.delete(
      environment.baseUrl + `Student/Delete/?id=${id}`,
      options
    );
  }
}
