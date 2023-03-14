import { MachineDTO } from './../../models/MachineDTO';
import { CookieService } from './../../services/cookie.service';
import { ProgramDTO } from './../../models/ProgramDTO';
import { AppointmentDTO } from '../../models/AppointmentDTO';
import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../../services/appointments.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
  providers: [DatePipe]
})
export class AppointmentComponent implements OnInit{
  public errorMsg: string = '';
  public successMsg: string = '';
  //public appointments: AppointmentDTO[] = [];
  //DKK_per_kWh: number | null = null;
  //EUR_per_kWh: number | null = null;
  //EXR: number = 0; 
  //time_end: String = '';
  //time_start: String = '';

  username: String = '';
  startTime: String = '';
  programId: number = 0;
  machineManufacturer: String = '';
  modelName: String = '';
  formattedDate: String = '';
  fullFormattedDate: String = '';

  activeWashType: string = '';
  activeTime: string = '';
  

  timeList = ['06:00', '09:00', '12:00', '15:00', '18:00', '21:00'];
  programs: ProgramDTO[] = [
   {programNumber: 1, programName: 'koge'},
   //{programNumber: 2, programName: 'fine'},
   //{programNumber: 3, programName: 'farve'},
  ];

  machines: MachineDTO[] = [
    {path: '../../../assets/vaskemachine.jpg', modelName: 'Vaskemaskine', machineManufacturer: 'samsung'},
  ];

  activeMachine: MachineDTO = this.machines[0];

  activateVaskType(item: string) {
    this.programId = 0; 
    console.log(item);
    
    this.setWashId(item);

    this.activeWashType = item;
  }

  activateTime(item: string) {
    console.log(item);
    //this.convertCESTtoUTC('');
    this.getDate();
    this.activeTime = item;
  }

  activateMachine(machine: MachineDTO) {
    console.log(machine);
    //this.convertCESTtoUTC('');
    //this.getDate();
    this.activeMachine = machine;
  }

  setWashId(programName: String){
    this.programs.forEach(program =>{
      if(program.programName == programName){
        this.programId = program.programNumber;
        console.log(this.programId);
        this.errorMsg = '';
      }
    });
    if(this.programId == 0){
      this.errorMsg = 'This program is not available yet';
    }
  }

  makeFullDate(){
    // 2023-03-14T19:41:47.865Z

    this.fullFormattedDate = this.formattedDate + "T" + this.activeTime;
  }

  constructor(private appointmentService: AppointmentsService, private datePipe: DatePipe, private cookieService: CookieService){}

  getDate() {
    if(this.startTime != ''){
      this.errorMsg = "";
      const selectedDate = new Date(String(this.startTime));
      const formattedDate = this.datePipe.transform(selectedDate, 'yyyy-MM-dd');
      if(formattedDate != null){
        this.formattedDate = formattedDate;
      }
      console.log(this.formattedDate);
    } else {
      this.errorMsg = "Waring: choose a start date";
    }
    
  }

  getUsername(){
    this.username = this.cookieService.getCookie("username");
  }

  ngOnInit() {
  }

  createAppointment(){
    this.makeFullDate();
    this.getUsername();
    console.log("user name: " + this.username);
    console.log("date: " + this.fullFormattedDate);
    console.log("machine num: " + String(this.programId));
    console.log("machineManufacturer: " + this.activeMachine.machineManufacturer);
    console.log("modelName: " + this.activeMachine.modelName);
    
    
    
    


    this.successMsg = '';
    this.errorMsg = '';
    this.appointmentService.createAppointment(this.username, this.fullFormattedDate, this.programId, this.activeMachine.machineManufacturer, this.activeMachine.modelName)
      .subscribe((createdAppointments: AppointmentDTO) => {
        this.username = '';
        this.startTime = '';
        this.programId = 0;
        this.machineManufacturer = '';
        this.modelName = '';
        this.successMsg = 'Appointments booked successfully'
      },
      (error : ErrorEvent) => {
        this.errorMsg = error.error.message;
      })
    //this.appointmentService.createAppointment('marius', '2023-03-14T19:41:47.865Z', 1, 'Samsung', 'Vaskemaskine')
    //  .subscribe((createdAppointments: AppointmentDTO) => {
    //    this.username = '';
    //    this.startTime = '';
    //    this.programId = 0;
    //    this.machineManufacturer = '';
    //    this.modelName = '';
    //    this.successMsg = 'Appointments booked successfully'
    //  },
    //  (error : ErrorEvent) => {
    //    this.errorMsg = error.error.message;
    //  })

    //this.successMsg = '';
    //this.errorMsg = '';
    //this.appointmentService.createAppointment(this.username, this.startTime, this.programId, this.machineManufacturer, this.modelName)
    //  .subscribe((createdAppointments: AppointmentDTO) => {
    //    this.username = '';
    //    this.startTime = '';
    //    this.programId = 0;
    //    this.machineManufacturer = '';
    //    this.modelName = '';
    //    this.successMsg = 'Appointments booked successfully'
    //  },
    //  (error : ErrorEvent) => {
    //    this.errorMsg = error.error.message;
    //  })
  }

}

