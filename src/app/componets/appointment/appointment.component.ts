import { catchError, throwError } from 'rxjs';
import { LoginComponent } from './../login/login.component';
import { AvailableTimesDTO } from './../../models/AvailableTimesDTO';
import { MachineDTO } from './../../models/MachineDTO';
import { CookieService } from './../../services/cookie.service';
import { ProgramDTO } from './../../models/ProgramDTO';
import { AppointmentDTO } from '../../models/AppointmentDTO';
import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../../services/appointments.service';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

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

  username: string = '';
  startTime: string = '';
  programId: number = 0;
  //machineManufacturer: String = '';
  //modelName: String = '';
  //machineType: String = '';
  formattedDate: string = '';
  fullFormattedDate: string = '';

  activeWashType: string = '';
  activeTime: string = '';
  

  //timeList = ['06:00', '09:00', '12:00', '15:00', '18:00', '21:00'];
  timeList:string[] = [];
  //programs: ProgramDTO[] = [
   //{programNumber: 1, programName: 'koge'},
   //{programNumber: 2, programName: 'fine'},
   //{programNumber: 3, programName: 'farve'},
  //];

  programs: ProgramDTO[] = [];
  availableTimes: AvailableTimesDTO[] = [];

  machines: MachineDTO[] = [{
    path: '../../../assets/vaskemachine.jpg', 
    modelName: 'washer 2000', 
    machineManufacturer: 'Washmatic', 
    machineType: 'Vaskemaskine',
  },];

  //activeMachine: MachineDTO = this.machines[0];
  activeMachine: MachineDTO = {path: '', modelName: '', machineManufacturer: '', machineType: ''};

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
    //this.formatTime();
  }

  formatTime(time: AvailableTimesDTO): string{
    //let testTime = this.availableTimes[0];
    console.log("orgianl time: " + time.startTime);
    const selectedDate = new Date(String(time.startTime));
    const formattedDate = this.datePipe.transform(selectedDate, 'dd/MM/yyyy HH:mm');
    console.log("formatede time: " + formattedDate);
    return String(formattedDate);
    
    
  }

  activateMachine(machine: MachineDTO) {
    console.log(machine);
    //this.convertCESTtoUTC('');
    //this.getDate();
    this.activeMachine = machine;
    //this.formatTime();
    

    this.appointmentService.getMachineProgramsFromMachine(this.activeMachine.machineManufacturer, 
      this.activeMachine.modelName, this.activeMachine.machineType).subscribe((programs: ProgramDTO[]) =>{
      console.log("programs");
      console.log(programs);
      this.programs = programs;
    },
    (error: HttpErrorResponse) => {
      this.errorMsg = error.error;
      //this.loading = false;
      console.log("==== error =======");
      console.log(error.error);
      console.log("==================");
    });

    //this.appointmentService.getMachineProgramsFromMachine(this.activeMachine.machineManufacturer, 
    //  this.activeMachine.modelName, this.activeMachine.machineType).pipe(
    //    catchError((error) => {
    //      console.error('An error occurred:', error);
    //      //return throwError('Something went wrong!');
    //    })
    //  ).subscribe((programs: ProgramDTO[]) =>{
    //    console.log("programs");
    //    console.log(programs);
    //    this.programs = programs;
    //  });
      
      
      
    //  .subscribe((programs: ProgramDTO[]) =>{
    //  console.log("programs");
    //  console.log(programs);
    //  this.programs = programs;
    //},
    //(error: ErrorEvent) => {
    //  this.errorMsg = error.message;
    //  //this.loading = false;
    //  console.log("==== error =======");
    //  console.log(error.error);
    //  console.log("==================");
    //});

    this.appointmentService.getAvailableBookingTimes(this.username).subscribe((availableTimes : AvailableTimesDTO[]) =>{
      console.log(availableTimes);
      this.availableTimes = availableTimes;
      console.log("prop availableTimes: " );
      console.log(this.availableTimes);
      this.parseFormattedTimes();
    },
    (error: HttpErrorResponse) => {
      this.errorMsg = error.error;
      //this.errorMsg = ""
      console.log("==== error =======");
      console.log(error.message);
      console.log(error.error);
      console.log("==================");
    });

    
  }

  parseFormattedTimes(){
    console.log("parse formatted times fun");
    
    this.availableTimes.forEach((availableTime: AvailableTimesDTO) => {
      console.log(availableTime);
      let formattedTime = this.formatTime(availableTime);
      this.timeList.push(String(formattedTime));
      
    });
  }

  parsePrograms(){

    this.programs.forEach((program: ProgramDTO) => {
      console.log(program);
      //let formattedTime = this.formatTime(availableTime);
      //this.programs.push();
      
    });
  }

  setWashId(programName: string){
    this.programs.forEach((program: ProgramDTO) =>{
      if(program.programName == programName){
        this.programId = program.programId;
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
    console.log(this.activeTime);
    
    //let time:string = "21/03/2023T15:00";
    //const selectedDate = new Date(time);
    //const dateString = "21/03/2023 15:00";
    const [day, month, year, hour, minute] = this.activeTime.split(/[\/: ]/);
    const selectedDate = new Date(+year, +month - 1, +day, +hour, +minute);

    console.log("selected date: ");
    console.log(selectedDate);
    //this.fullFormattedDate = String(selectedDate).replace(' ', 'T');
    //console.log(this.fullFormattedDate);
    
    const formattedDate = this.datePipe.transform(selectedDate, 'yyyy-MM-dd HH:mm');
    this.fullFormattedDate = String(formattedDate).replace(' ', 'T');
    //console.log(formattedDate);
    console.log(this.fullFormattedDate);
    
    
  }

  constructor(private appointmentService: AppointmentsService, private datePipe: DatePipe, private cookieService: CookieService){}

  //TODO: cheack hvor den er brugt
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
    //console.log("=== this is oninit ====================");
    this.getUsername();
    //this.appointmentService.getAvailableBookingTimes(this.username).subscribe((availableTimes : AvailableTimesDTO[]) =>{
    //  console.log(availableTimes);
    //  this.availableTimes = availableTimes;
    //  console.log("prop availableTimes: " );
    //  console.log(this.availableTimes);
    //},
    //(error: ErrorEvent) => {
    //  this.errorMsg = error.message;
    //  //this.errorMsg = "no times"
    //  console.log("==== error =======");
    //  console.log(error.message);
    //  console.log("==================");
    //});
  }

  createAppointment(){
    this.makeFullDate();
    
    //this.getUsername();
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
        //this.machineManufacturer = '';
        //this.modelName = '';
        this.successMsg = 'Appointments booked successfully'
      },
      (error : ErrorEvent) => {
        this.errorMsg = error.error.message;
        console.log("==== error =======");
        console.log(error.message);
        console.log("==================");
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

