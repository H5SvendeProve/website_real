import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppointmentDTO } from '../models/AppointmentDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  // http://192.168.1.2/api/angular/createNewBooking
  private baseUrl = 'http://192.168.1.2/api/angular';
  constructor(private http: HttpClient) { }
  
  getAppointments(): Observable<AppointmentDTO[]> {
    return this.http.get<AppointmentDTO[]>(`${this.baseUrl}/getElectricityPrices`);
  }

  createAppointment( username: String, startTime: String, programId: number, machineManufacturer: String, modelName: String): Observable<AppointmentDTO> {
    return this.http.post<AppointmentDTO>(`${this.baseUrl}/createNewBooking`, 
    {username, startTime, programId, machineManufacturer, modelName});
  }

  cancelAppointments(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/2023/03-03_DK1.json`);
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
