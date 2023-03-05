import { Observable } from 'rxjs';
import { LoginDTO } from './../models/LoginDTO';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'https://www.elprisenligenu.dk/api/v1/prices';
  constructor(private http: HttpClient) { }

  login(username:string, password:string): Observable<LoginDTO> {
    return this.http.post<LoginDTO>(`${this.baseUrl}/2023/03-03_DK1.json`, 
    {username, password});
  }
}
