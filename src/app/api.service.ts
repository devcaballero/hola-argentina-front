import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private buildUrl(endpoint: string): string {
    return endpoint.startsWith('http')
      ? endpoint
      : `${environment.apiBaseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  }

  getData(endpoint: string): Observable<string> {
    return this.http.get(this.buildUrl(endpoint), { responseType: 'text' });
  }

  getJson<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(this.buildUrl(endpoint));
  }
}
