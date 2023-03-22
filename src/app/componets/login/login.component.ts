import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from './../../services/cookie.service';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  public errorMsg: string = '';
  public successMsg: string = '';
  userName: string = '';
  password: string = '';

  constructor(private loginService: LoginService, private router: Router, private cookieService: CookieService){}

  hideShowPass(){
    this.isText = !this.isText;
    if(this.isText){
      this.eyeIcon = "fa-eye";
      this.type = "text";
    }
    else {
      this.eyeIcon = "fa-eye-slash";
      this.type = "password";
    }
  }

  loginJWT(){
    //console.log(this.userName);
    //console.log(this.password);
    //console.log("loginJWT met");
    
    this.cookieService.setCookie("username", this.userName, 2);

   // this.loginService.loginJWT(this.userName, this.password).subscribe((res) => {
   //   console.log("res: " + res);
   // if (res) {
   //   this.errorMsg = '';
   //   this.successMsg = 'Login was successfully';
   //   this.router.navigate(['']);
   // }else{
   //   this.successMsg = '';
   //   this.errorMsg = 'Login error';
   // }
   // })

   this.loginService.loginJWT(this.userName, this.password).subscribe((response) => {
    console.log("response.token: " + response.token);
    localStorage.setItem('token', response.token);
    this.router.navigate(['']);
    this.errorMsg = '';
    this.successMsg = 'Login was successfully';

  },
  (error: HttpErrorResponse) => {
    this.successMsg = '';
    this.errorMsg = error.error.error;
  })


  //this.appointmentsService.getUserBookings(username).subscribe((bookings: UserBookingsDTO[]) =>{
  //  console.log(bookings);
  //  this.bookings = bookings;
  //  this.loading = false;
  //  console.log(this.bookings);
  //},
  //(error: ErrorEvent) => {
  //  this.errorMsg = error.error.error;
  //  this.loading = false;
  //});
  }


  setCookie(name: string, value: string, days: number) {
    //console.log("setCookie inside");
  
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
  
    const cookieValue = encodeURIComponent(value) + ((days) ? `; expires=${expirationDate.toUTCString()}` : '');
  
    document.cookie = `${name}=${cookieValue}`;
  }


}
