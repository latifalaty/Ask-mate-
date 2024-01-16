import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponseServiceService {
  endpoint: string = "http://localhost:3000/question";

  constructor(private httpClient:HttpClient) { }
  saveResponse(questionId: string, responseData: any): Observable<any> {
    const url = `${this.endpoint}/questions/${questionId}/reponses`;
    return this.httpClient.post(url, responseData);
  }
}
