import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  public async uploadProductType(data: File): Promise<Response> {
    const formData = new FormData();
    formData.append('productTypeFiles', data, data.name);
    const url = this.apiUrl + 'product-type/upload/file';
    return await this.http.post<Response>(url, formData).toPromise();
  }

  public async getProductType(data: any): Promise<Response> {
    const url = this.apiUrl + 'product-type' +
      '?page=' + data.page +
      '&size=' + data.size +
      '&keyword=' + data.keyword +
      '&sortDirection=' + data.sortDirection +
      '&sortColumn=' + data.sortColumn +
      '&activeStatus=' + data.activeStatus;
    return await this.http.get<Response>(url).toPromise();
  }

  public async getAllActiveProductType(): Promise<Response> {
    const url = this.apiUrl + 'product-type/active';
    return await this.http.get<Response>(url).toPromise();
  }


  public async createProductType(data): Promise<Response> {
    const url = this.apiUrl + 'product-type/create';
    return await this.http.post<Response>(url, data).toPromise();
  }

  public async deleteProductType(data): Promise<Response> {
    const url = this.apiUrl + 'product-type/delete?id=' + data._id;
    return await this.http.delete<Response>(url).toPromise();
  }

  public async updateProductType(data): Promise<Response> {
    const url = this.apiUrl + 'product-type/update';
    return await this.http.put<Response>(url, data).toPromise();
  }

  public async getProductMenu(data: any): Promise<Response> {
    const url = this.apiUrl + 'product-menu' +
      '?page=' + data.page +
      '&size=' + data.size +
      '&keyword=' + data.keyword +
      '&sortDirection=' + data.sortDirection +
      '&sortColumn=' + data.sortColumn +
      '&activeStatus=' + data.activeStatus;
    return await this.http.get<Response>(url).toPromise();
  }

  public async createProductMenu(data): Promise<Response> {
    const url = this.apiUrl + 'product-menu/create';
    return await this.http.post<Response>(url, data).toPromise();
  }

  public async deleteProductMenu(data): Promise<Response> {
    const url = this.apiUrl + 'product-menu/delete?id=' + data._id;
    return await this.http.delete<Response>(url).toPromise();
  }

  public async updateProductMenu(data): Promise<Response> {
    const url = this.apiUrl + 'product-menu/update';
    return await this.http.put<Response>(url, data).toPromise();
  }

}
