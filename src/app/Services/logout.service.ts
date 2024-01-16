import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  constructor(private router: Router,private http:HttpClient) {}
  private endpoint = 'http://localhost:3000'; // Replace with your API server URL


  // Call this method to perform the logout on the server
  logout(): Observable<any> {
    return this.http.post(`${this.endpoint}/logout`,  this.router.navigate(['/login']));
  }
}
