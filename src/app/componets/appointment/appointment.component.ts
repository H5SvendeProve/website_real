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

  username: string = '';
  startTime: string = '';
  programId: number = 0;
  formattedDate: string = '';
  fullFormattedDate: string = '';

  activeWashType: string = '';
  activeTime: string = '';
  

  timeList:string[] = [];

  programs: ProgramDTO[] = [];
  availableTimes: AvailableTimesDTO[] = [];

  machines: MachineDTO[] = [{
    path: '../../../assets/vaskemachine.jpg', 
    modelName: 'washer 2000', 
    machineManufacturer: 'Washmatic', 
    machineType: 'Vaskemaskine',
  },];

  activeMachine: MachineDTO = {path: '', modelName: '', machineManufacturer: '', machineType: ''};

  constructor(private appointmentService: AppointmentsService, private datePipe: DatePipe, 
    private cookieService: CookieService){}

  activateVaskType(item: string) {
    this.programId = 0; 
    console.log(item);
    this.setWashId(item);
    this.activeWashType = item;

    this.appointmentService.getAvailableBookingTimes(this.username).subscribe((availableTimes : AvailableTimesDTO[]) =>{
      console.log(availableTimes);
      this.availableTimes = availableTimes;
      //console.log("prop availableTimes: " );
      //console.log(this.availableTimes);
      this.parseFormattedTimes();
    },
    (error: HttpErrorResponse) => {
      this.errorMsg = error.error.error;
    });
  }

  activateTime(item: string) {
    console.log(item);

    //this.getDate();
    this.activeTime = item;
  }

  formatTime(time: AvailableTimesDTO): string{
    console.log("orgianl time: " + time.startTime);
    const selectedDate = new Date(String(time.startTime));
    const formattedDate = this.datePipe.transform(selectedDate, 'dd/MM/yyyy HH:mm');
    console.log("formatede time: " + formattedDate);
    return String(formattedDate);
    
    
  }

  activateMachine(machine: MachineDTO) {
    console.log(machine);
    this.activeMachine = machine;

    this.appointmentService.getMachineProgramsFromMachine(this.activeMachine.machineManufacturer, 
      this.activeMachine.modelName, this.activeMachine.machineType).subscribe((programs: ProgramDTO[]) =>{
      console.log("programs");
      console.log(programs);
      this.programs = programs;
    },
    (error: HttpErrorResponse) => {
      this.errorMsg = error.error.error;
    });

    //this.appointmentService.getAvailableBookingTimes(this.username).subscribe((availableTimes : AvailableTimesDTO[]) =>{
    //  console.log(availableTimes);
    //  this.availableTimes = availableTimes;
    //  //console.log("prop availableTimes: " );
    //  //console.log(this.availableTimes);
    //  this.parseFormattedTimes();
    //},
    //(error: HttpErrorResponse) => {
    //  this.errorMsg = error.error.error;
    //});
  }

  parseFormattedTimes(){
    this.timeList = [];
    this.availableTimes.forEach((availableTime: AvailableTimesDTO) => {
      console.log(availableTime);
      let formattedTime = this.formatTime(availableTime);
      this.timeList.push(String(formattedTime));
    });
  }

  //parsePrograms(){
  //  this.programs.forEach((program: ProgramDTO) => {
  //    console.log(program);
  //    //let formattedTime = this.formatTime(availableTime);
  //    //this.programs.push();
  //  });
  //}

  //TODO : rewrite
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
    const [day, month, year, hour, minute] = this.activeTime.split(/[\/: ]/);
    const selectedDate = new Date(+year, +month - 1, +day, +hour, +minute);
    
    const formattedDate = this.datePipe.transform(selectedDate, 'yyyy-MM-dd HH:mm');
    this.fullFormattedDate = String(formattedDate).replace(' ', 'T');

    console.log(this.fullFormattedDate);
  }



  getUsername(){
    this.username = this.cookieService.getCookie("username");
  }

  ngOnInit() {
    this.getUsername();
  }

  createAppointment(){
    this.makeFullDate();
    
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

        this.successMsg = 'Appointments booked successfully'
        window.location.reload();
      },
      (error : HttpErrorResponse) => {
        this.errorMsg = error.error.error;
      });
  }
}
