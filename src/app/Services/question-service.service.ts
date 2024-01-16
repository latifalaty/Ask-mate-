import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionServiceService {
  endpoint: string = "http://localhost:3000/question";

  constructor(private httpClient:HttpClient) { }
  public getQuestions(): Observable<any> {
    return this.httpClient.get<any>(`${this.endpoint}/get-question`);
  }

  addQuestion(questionData): Observable<any> {
    return this.httpClient.post(`${this.endpoint}/add-question`, questionData);
  }
  getQuestionWithResponses(questionId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.endpoint}/questions/${questionId}`);
  }

 
  getQuestionById(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.endpoint}/get-question/${id}`);
  }

  getQuestionsByCategory(category: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.endpoint}/${category}`);
  }

  updateQuestion(id: string, question: any): Observable<any> {
    return this.httpClient.put<any>(`${this.endpoint}/update-question/${id}`, question);
  }

  deleteQuestion(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.endpoint}/delete-question/${id}`);
  }

  addResponseToQuestion(questionId: string, response: any): Observable<any> {
    return this.httpClient.post<any>(`${this.endpoint}/questions/${questionId}/reponses`, response);
  }


}

