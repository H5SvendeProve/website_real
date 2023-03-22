import { DatePipe } from '@angular/common';
import { AvailableTimesDTO } from './../../models/AvailableTimesDTO';
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
  public columns = ["booking_id", "time_start", "time_end", "price_dkk", "cancel"];

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

  //parseFormattedTimesIntoUserBookingDTO(userBooking: UserBookingsDTO): UserBookingsDTO{
  //  //this.timeList = [];
  //  //bookedTimes.forEach((bookedtime: UserBookingsDTO) => {
  //  //  console.log(bookedtime);
  //  //  let formattedTime = this.formatTime(bookedtime);
  //  //  //this.timeList.push(String(formattedTime));
  //  //  this.bookings.push(String(formattedTime));
//
  //  let startTime: string = this.formatTime(userBooking.startTime);
  //  let endTime: string = this.formatTime(userBooking.endTime);
  //
  //    return {bookingId: userBooking.bookingId, 
  //      username: userBooking.username, 
  //      price: userBooking.price, 
  //      startTime: startTime,
  //      endTime: endTime,
  //      programId: userBooking.programId,
  //      machineManufacturer: userBooking.machineManufacturer,
  //      modelName: userBooking.modelName} 
  //  }
//
  //formatTime(time: string): string{
  //  console.log("orgianl time: " + time);
  //  const selectedDate = new Date(String(time));
  //  const formattedDate = this.datePipe.transform(selectedDate, 'dd/MM/yyyy HH:mm');
  //  console.log("formatede time: " + formattedDate);
  //  return String(formattedDate);
  //}

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
