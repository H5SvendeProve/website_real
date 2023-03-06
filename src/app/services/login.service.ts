import { Observable, of } from 'rxjs';
import { LoginDTO } from './../models/LoginDTO';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://192.168.1.2/api/login';

  constructor(private http: HttpClient) { }

  login(username:string, password:string): Observable<LoginDTO> {
    return this.http.post<LoginDTO>(`${this.baseUrl}/loginUser`, 
    {username, password});
  }

  //loginJWT(username:string, password:string) {
  //  return this.http.post<LoginDTO>(`${this.baseUrl}/loginUser`, 
  //  {username, password}).subscribe((response:any) =>{
  //    console.log(response.token);
  //    localStorage.setItem('token', response.token);
  //    
  //  });
  //}

  loginJWT(username:string, password:string): Boolean{
    this.http.post<LoginDTO>(`${this.baseUrl}/loginUser`, 
    {username, password}).subscribe((response:any) =>{
      console.log(response.token);
      localStorage.setItem('token', response.token);
      return true;
      
    });
    return false;
  }

  validateToken(token: string): Observable<boolean> {
    let bearerT: String = 'Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWF0aGlhcyIsImV4cCI6MTY3ODExNDc2OSwiaXNzIjoiQm9va2luZ1dlYkFwaS5sb2NhbCIsImF1ZCI6IkFuZ3VsYXIifQ.ICYnvjUyCLMIeXNoELdrXv-Q1gYqY6VkMlZ2zpfyYTR1jbKRHRiivsjs6GIU8MztPdgKhNN8BS4qosXI9Yocaw';
    console.log(bearerT);

    const headers = new HttpHeaders().set('Authorization', 'Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWF0aGlhcyIsImV4cCI6MTY3ODExNDc2OSwiaXNzIjoiQm9va2luZ1dlYkFwaS5sb2NhbCIsImF1ZCI6IkFuZ3VsYXIifQ.ICYnvjUyCLMIeXNoELdrXv-Q1gYqY6VkMlZ2zpfyYTR1jbKRHRiivsjs6GIU8MztPdgKhNN8BS4qosXI9Yocaw');
    //const headers = new HttpHeaders().set('Authorization', token); //! need line
 
    ////this.http.get<any>(`http://192.168.1.2/api/angular/validateToken`, {headers}).subscribe((response:any) =>{
    ////  //console.log(response);
    ////  //localStorage.setItem('fkk', response.token);
    ////  console.log("hhhhhhh");
    ////  console.log("res " + response);
    ////});;
    //return this.http.get<boolean>(`${this.baseUrl}/validateToken`, {headers}); //! need line
    return of(false);
  }

  getToken(): string | null{
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token')
  }
}
