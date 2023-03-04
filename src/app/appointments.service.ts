import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppointmentDTO } from './AppointmentDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  private baseUrl = 'https://www.elprisenligenu.dk/api/v1/prices';
  constructor(private http: HttpClient) { }

  getAppointments(): Observable<AppointmentDTO[]> {
    return this.http.get<AppointmentDTO[]>(`${this.baseUrl}/2023/03-03_DK1.json`)
  }

  createAppointment( DKK_per_kWh: number, EUR_per_kWh: number, EXR: number, time_end: String, time_start: String,): Observable<AppointmentDTO> {
    return this.http.post<AppointmentDTO>(`${this.baseUrl}/2023/03-03_DK1.json`, 
    {DKK_per_kWh, EUR_per_kWh, EXR, time_end, time_start});
  }

  cancelAppointments(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/2023/03-03_DK1.json`);
  }
}
