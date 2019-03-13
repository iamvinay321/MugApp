import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: string = environment.apiUrl;
  apiUrl: string = this.baseUrl + 'api/v1/';
  constructor(public http: HttpClient) { }

  public async authenticationLogin(data: any): Promise<Response> {
    const url = this.apiUrl + 'oauth/token';
    return await this.http.post<Response>(url, data).toPromise();
  }
}
