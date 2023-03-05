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

  constructor(private loginService: LoginService, private router: Router){}

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

  login(){
    this.successMsg = '';
    this.errorMsg = '';
    this.router.navigate(['']);
    this.loginService.login(this.userName, this.password).subscribe((loginAttempt: LoginDTO) => { 
      this.userName = '';
      this.password = '';
      this.successMsg = 'Login was successfully'
      //this.router.navigate(['appointment-list']); // move to here then call works

    },
    (error : ErrorEvent) => {
      this.errorMsg = error.error.message;
    });
  }


}
