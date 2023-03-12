import { AppointmentDTO } from '../../models/AppointmentDTO';
import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../../services/appointments.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit{
  public errorMsg: string = '';
  public successMsg: string = '';
  //public appointments: AppointmentDTO[] = [];
  DKK_per_kWh: number | null = null;
  EUR_per_kWh: number | null = null;
  EXR: number = 0; 
  time_end: String = '';
  time_start: String = '';

 timeList = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM'];

  activeWashType: string = '';
  activeTime: string = '';

  activateVaskType(item: string) {
    console.log(item);
    
    this.activeWashType = item;
  }

  activateTime(item: string) {
    console.log(item);
    
    this.activeTime = item;
  }

  constructor(private appointmentService: AppointmentsService){}

  ngOnInit() {
  }

  createAppointment(){
    console.log(this.time_start);
    
    this.successMsg = '';
    this.errorMsg = '';
    this.appointmentService.createAppointment(this.DKK_per_kWh as number, this.EUR_per_kWh as number, this.EXR, this.time_end, this.time_start)
      .subscribe((createdAppointments: AppointmentDTO) => {
        this.DKK_per_kWh = 0;
        this.EUR_per_kWh = 0;
        this.EXR = 0;
        this.time_end = '';
        this.time_start = '';
        this.successMsg = 'Appointments booked successfully'
      },
      (error : ErrorEvent) => {
        this.errorMsg = error.error.message;
      })
  }

}
