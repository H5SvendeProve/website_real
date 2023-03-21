import { catchError, map, Observable, of } from 'rxjs';
import { LoginDTO } from './../models/LoginDTO';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrlServer = 'http://192.168.1.2/api/login';
  private baseUrl = 'https://localhost:7051/api/login';

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

 // loginJWT(username:string, password:string): Boolean{
 //   console.log(username);
 //   console.log(password);
 // 
 //   this.http.post<LoginDTO>(`${this.baseUrl}/loginUser`, 
 //   {username, password}).subscribe((response:any) =>{
 //     console.log(response.token);
 //     localStorage.setItem('token', response.token);
 //     return true;
 //     
 //   });
 //   return false;
 // }

  //loginJWT(username:string, password:string): Observable<Boolean>{
  //  //console.log(username);
  //  //console.log(password);
  //  let isTrue: Boolean = false;
  //  
  //  this.http.post<LoginDTO>("http://localhost:5147/api/login/loginUser", 
  //  {username, password}).subscribe((response:any) =>{
  //    isTrue = true;
  //    console.log("from request: " + response.token);
  //    console.log("LoginJwt set true");
  //    localStorage.setItem('token', response.token);
  //    return true;
  //  },
  //  () => {
  //    console.log("last return");
  //    return of(isTrue);
  //  });
  //}

  loginJWT(username:string, password:string): Observable<Boolean>{
    
    //return this.http.post<LoginDTO>("http://localhost:5147/api/login/loginUser", 
    return this.http.post<LoginDTO>("http://192.168.1.2/api/login/loginUser",
    {username, password}).pipe(map((response:any) =>{
      console.log("from request: " + response.token);
      console.log("LoginJwt set true");
      localStorage.setItem('token', response.token);
      return true;
    }),
    catchError(() => {
      console.log("last return");
      return of(false);
    })
    );
  }

  validateToken(token: string): Observable<boolean> {
    //let bearerT: String = 'Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWF0aGlhcyIsImV4cCI6MTY3ODExNDc2OSwiaXNzIjoiQm9va2luZ1dlYkFwaS5sb2NhbCIsImF1ZCI6IkFuZ3VsYXIifQ.ICYnvjUyCLMIeXNoELdrXv-Q1gYqY6VkMlZ2zpfyYTR1jbKRHRiivsjs6GIU8MztPdgKhNN8BS4qosXI9Yocaw';
    //console.log(bearerT);
    console.log("from validate token: " + token);
    
    //const headers = new HttpHeaders().set('Authorization', 'Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWF0aGlhcyIsImV4cCI6MTY3ODExNDc2OSwiaXNzIjoiQm9va2luZ1dlYkFwaS5sb2NhbCIsImF1ZCI6IkFuZ3VsYXIifQ.ICYnvjUyCLMIeXNoELdrXv-Q1gYqY6VkMlZ2zpfyYTR1jbKRHRiivsjs6GIU8MztPdgKhNN8BS4qosXI9Yocaw');
    const headers = new HttpHeaders().set('Authorization', token); //!
 
    ////this.http.get<any>(`http://192.168.1.2/api/angular/validateToken`, {headers}).subscribe((response:any) =>{
    ////  //console.log(response);
    ////  //localStorage.setItem('fkk', response.token);
    ////  console.log("hhhhhhh");
    ////  console.log("res " + response);
    ////});;
    //let isValid: Observable<boolean> = this.http.get<boolean>(`http://localhost:5147/api/angular/validateToken`, {headers});
    //isValid.subscribe((value) => {
    //  console.log("isVaild value: " + value);
    //})
    
    //console.log("isvalid: " + isValid.subscribe((res) => {res.valueOf.toString()}));
    
    //return this.http.get<boolean>(`http://localhost:5147/api/angular/validateToken`, {headers}); 
    //return this.http.get<boolean>(`http://localhost:5147/api/angular/validateToken`, {headers}).pipe(
    
    return this.http.get<boolean>(`http://192.168.1.2/api/frontend/validateToken`, {headers}).pipe(
      catchError(()=> of(false)) //!
    );

    //return of(true);
  }

  getToken(): string | null{
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token')
  }
}
