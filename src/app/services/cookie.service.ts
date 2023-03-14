import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() { }

  setCookie(name: string, value: string, days: number) {
    console.log("setCookie inside");
    
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
  
    const cookieValue = encodeURIComponent(value) + ((days) ? `; expires=${expirationDate.toUTCString()}` : '');
  
    document.cookie = `${name}=${cookieValue}`;
  }
  
  getCookie(name: string) {
    const cookies = document.cookie.split(';');
    
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
  
      if (cookie.startsWith(name + '=')) {
        return decodeURIComponent(cookie.substring(name.length + 1));
      }
    }
  
    return '';
  }
  
  deleteCookie(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 2000 00:00:01 GMT;`;
  }
}
