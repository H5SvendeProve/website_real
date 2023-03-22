import { catchError, map, Observable, of } from 'rxjs';
import { LoginDTO } from './../models/LoginDTO';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://192.168.1.2/api';

  constructor(private http: HttpClient) { }

  loginJWT(username:string, password:string): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/login/loginUser`,
    {username, password});
  }

  validateToken(token: string): Observable<boolean> {
    console.log("from validate token: " + token);
    
    const headers = new HttpHeaders().set('Authorization', token); 
    return this.http.get<boolean>(`${this.baseUrl}/frontend/validateToken`, {headers}).pipe(
      catchError(()=> of(false)) 
    );
  }

  getToken(): string | null{
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token')
  }
}
