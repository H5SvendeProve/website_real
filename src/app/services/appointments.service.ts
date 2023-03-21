import { UserBookingsDTO } from './../models/UserBookingsDTO';
import { ProgramDTO } from './../models/ProgramDTO';
import { MachineDTO } from './../models/MachineDTO';
import { AvailableTimesDTO } from './../models/AvailableTimesDTO';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppointmentDTO } from '../models/AppointmentDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  // http://192.168.1.2/api/angular/createNewBooking
  private baseUrl = 'http://192.168.1.2/api/frontend';
  private token = localStorage.getItem('token');
  private headers: HttpHeaders = new HttpHeaders().set('Authorization', String(this.token));
  constructor(private http: HttpClient) { }
  
  getAppointments(): Observable<AppointmentDTO[]> {
    const headers = this.headers;
    return this.http.get<AppointmentDTO[]>(`${this.baseUrl}/getElectricityPrices`, {headers});
  }

  createAppointment( username: String, startTime: String, programId: number, machineManufacturer: String, modelName: String): Observable<AppointmentDTO> {
    const headers = this.headers;
    return this.http.post<AppointmentDTO>(`${this.baseUrl}/createNewBooking`, 
    {username, startTime, programId, machineManufacturer, modelName}, {headers});
  }

  cancelAppointments(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/2023/03-03_DK1.json`);
  }

  getAvailableBookingTimes( username: String): Observable<AvailableTimesDTO[]> {
    //const token = localStorage.getItem('token');
    //const headers = new HttpHeaders().set('Authorization', String(token));
    const headers = this.headers;
    return this.http.get<AvailableTimesDTO[]>(`${this.baseUrl}/getAvailableBookingTimes?username=` + username, {headers});
  }

  getMachineProgramsFromMachine( machineManufacturer: String, machineModelName: String, machineType: String): Observable<ProgramDTO[]> {
    const headers = this.headers;
    return this.http.get<ProgramDTO[]>(`${this.baseUrl}/getMachineProgramsFromMachine?` +
    `machineManufacturer=` + machineManufacturer +
    `&machineModelName=` + machineModelName + 
    `&machineType=` + machineType, {headers});
  }

  getUserBookings(username: string): Observable<UserBookingsDTO[]> {
    const headers = this.headers;
    return this.http.get<UserBookingsDTO[]>(`${this.baseUrl}/getUserBookings?username=` + username, {headers});
  }




  //getAppointmentsel(): Observable<AppointmentDTO[]> {
  //  return this.http.get<AppointmentDTO[]>(`${this.baseUrl}/getElectricityPrices`);
  //}
  //
  //createAppointmentel( DKK_per_kWh: number, EUR_per_kWh: number, EXR: number, time_end: String, time_start: String,): Observable<AppointmentDTO> {
  //  return this.http.post<AppointmentDTO>(`${this.baseUrl}/2023/03-03_DK1.json`, 
  //  {DKK_per_kWh, EUR_per_kWh, EXR, time_end, time_start});
  //}
  //
  //cancelAppointmentsel(id: string): Observable<any> {
  //  return this.http.delete(`${this.baseUrl}/2023/03-03_DK1.json`);
  //}
}
