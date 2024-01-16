import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private endpoint: string = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }

  // Method to run a Python script without input, corresponding to GET request
  public runPythonScript(): Observable<any> {
    return this.httpClient.get<any>(`${this.endpoint}/run_python_script`);
  }

  // Method to run a Python script with user question as input, corresponding to POST request
  public searchSimilarQuestions(question: string): Observable<any> {
    // Prepare the POST body and headers if necessary
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { question: question };
    return this.httpClient.post<any>(`${this.endpoint}/search_similar_questions`, body, { headers: headers });
  }
}
