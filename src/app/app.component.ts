import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  home: string = 'nav-link active';
  myAppointments: string = 'nav-link';
  isHome: boolean = true;
  
  constructor(){
    this.changeColorInNavBar();
  }

  changeColorInNavBar(){
    if(this.isHome) {
      this.home = 'nav-link active';
      this.myAppointments = 'nav-link';
      console.log(this.home);
    }
    else {
      this.myAppointments = 'nav-link active';
      this.home = 'nav-link';
      console.log("my " + this.myAppointments);
    }

    this.isHome = !this.isHome;
  }

}
