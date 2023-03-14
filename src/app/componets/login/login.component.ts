import { CookieService } from './../../services/cookie.service';
import { Router, RouterModule } from '@angular/router';
import { LoginDTO } from './../../models/LoginDTO';
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


  //login(){
  //  console.log(this.userName);
  //  console.log(this.password);
  //
  //  this.successMsg = '';
  //  this.errorMsg = '';
  //  this.loginService.login(this.userName, this.password).subscribe((loginAttempt: LoginDTO) => { 
  //    this.userName = '';
  //    this.password = '';
  //    this.successMsg = 'Login was successfully'
  //    console.log(loginAttempt);
  //    
  //    this.router.navigate(['']); // move to here then call works
  //  },
  //  (error : ErrorEvent) => {
  //    this.errorMsg = error.error.message;
  //    console.log("error");
  //  });
  //}


  loginJWT(){
    console.log(this.userName);
    console.log(this.password);
    console.log("loginJWT met");
    
    this.log();
    //this.setCookie("username", "my", 2);
    this.cookieService.setCookie("username", this.userName, 2)
    //var isLoginOk = this.loginService.loginJWT(this.userName, this.password)
    //console.log("isLoginOk: " + isLoginOk);
    //if (isLoginOk) {
    //  this.successMsg = 'Login was successfully'
    //  this.router.navigate(['']);
    //}else{
    //  this.successMsg = 'Login error'
    //}

    this.loginService.loginJWT(this.userName, this.password).subscribe((res) => {
      console.log("res: " + res);
    if (res) {
      this.successMsg = 'Login was successfully'
      this.router.navigate(['']);
    }else{
      this.successMsg = 'Login error'
    }
    })
    
    //this.router.navigate(['']);
  }
  log(){
    console.log("inside log");
    
  }

  setCookie(name: string, value: string, days: number) {
    console.log("setCookie inside");
    
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
  
    const cookieValue = encodeURIComponent(value) + ((days) ? `; expires=${expirationDate.toUTCString()}` : '');
  
    document.cookie = `${name}=${cookieValue}`;
  }


}
