import { UserBookingsDTO } from './../../models/UserBookingsDTO';
import { CookieService } from './../../services/cookie.service';
import { AppointmentsService } from '../../services/appointments.service';
import { AppointmentDTO } from '../../models/AppointmentDTO';
import { Component } from '@angular/core';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent {

  public loading = true;
  public errorMsg: string = '';
  public successMsg: string = '';
  public appointments: AppointmentDTO[] = [];
  public columns = ["price_dkk", "time_start", "time_end", "cancel"];

  public bookings: UserBookingsDTO[] = [];

  constructor(private appointmentsService: AppointmentsService, private cookieService: CookieService){}

  ngOnInit() {
    //this.appointmentsService.getAppointments().subscribe((appointments: AppointmentDTO[]) =>{
    //  console.log(appointments);
    //  this.appointments = appointments;
    //  this.loading = false;
    //  console.log(this.appointments);
    //  
    //},
    //(error: ErrorEvent) => {
    //  this.errorMsg = error.error.message;
    //  this.loading = false;
    //});
    let username = this.cookieService.getCookie("username");

    this.appointmentsService.getUserBookings(username).subscribe((bookings: UserBookingsDTO[]) =>{
      console.log(bookings);
      this.bookings = bookings;
      this.loading = false;
      console.log(this.bookings);
    },
    (error: ErrorEvent) => {
      this.errorMsg = error.error.error;
      this.loading = false;
    });
  }

  cancelAppointment(id: string) {
    this.appointmentsService.cancelAppointments(id)
    .pipe(
      mergeMap(() => this.appointmentsService.getAppointments())
      )
      .subscribe((appointments: AppointmentDTO[]) => {
        this.appointments = appointments;
        this.loading = false;
      },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.error;
      }); 
    }

}
