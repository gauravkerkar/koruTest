import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceCallsService {
  private api = environment.api;

  constructor(private http: HttpClient) { }

  getDetails(){
    return this.http.get(`${environment.api}/details`);
  }

}
