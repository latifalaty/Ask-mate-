import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  endpoint: string = "http://localhost:3000/users";
  constructor(private httpClient: HttpClient) { }


  // user: {firstName, lastName, tel, email, pwd}
  signup(user) {
    return this.httpClient.post<{}>(`${this.endpoint}/signup`, user);
  }

  login(credentials: { email: string; pwd: string }): Observable<any> {
    return this.httpClient.post<any>(`${this.endpoint}/login`, credentials);
  }
  getUser(id: string): Observable<any> {
    return this.httpClient.get(`${this.endpoint}/${id}`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching user details:', error);
          throw error; // rethrow the error to propagate it further
        })
      );
  }
  
 
}