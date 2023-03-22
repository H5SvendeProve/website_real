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
  programId: number = 0;
  activeWashType: string = '';
  activeTime: string = '';
  
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
    },
    (error: HttpErrorResponse) => {
      this.errorMsg = error.error.error;
    });
  }

  activateTime(item: string) {
    this.activeTime = item;
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
  }

  setWashId(programName: string){
    this.programs.forEach((program: ProgramDTO) =>{
      if(program.programName == programName){
        this.programId = program.programId;
        console.log(this.programId);
        this.errorMsg = '';
      }
    });
  }

  getUsername(){
    this.username = this.cookieService.getCookie("username");
  }

  ngOnInit() {
    this.getUsername();
  }

  createAppointment(){
    //console.log("user name: " + this.username);
    //console.log("date: " + this.activeTime);
    //console.log("machine num: " + String(this.programId));
    //console.log("machineManufacturer: " + this.activeMachine.machineManufacturer);
    //console.log("modelName: " + this.activeMachine.modelName);

    this.successMsg = '';
    this.errorMsg = '';
    this.appointmentService.createAppointment(this.username, this.activeTime, this.programId, this.activeMachine.machineManufacturer, this.activeMachine.modelName)
      .subscribe((createdAppointments: AppointmentDTO) => {
        this.username = '';
        this.programId = 0;

        this.successMsg = 'Appointments booked successfully'
        window.location.reload();
      },
      (error : HttpErrorResponse) => {
        this.errorMsg = error.error.error;
      });
  }
}
