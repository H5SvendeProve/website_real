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
  public columns = ["DKK_per_kWh", "EUR_per_kWh", "time_end", "time_start", "cancel"];

  constructor(private appointmentsService: AppointmentsService){}

  ngOnInit() {
    this.appointmentsService.getAppointments().subscribe((appointments: AppointmentDTO[]) =>{
      console.log(appointments);
      this.appointments = appointments;
      this.loading = false;
      console.log(this.appointments);
      
    },
    (error: ErrorEvent) => {
      this.errorMsg = error.error.message;
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
        this.errorMsg = error.error.message;
      }); 
    }

}
