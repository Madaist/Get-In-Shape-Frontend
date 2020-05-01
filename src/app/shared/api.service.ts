import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  header = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  baseUrl = 'https://localhost:44320/api';
 
  getFitnessClass(id: number) {
    return this.http.get(this.baseUrl + '/fitnessClass/' + id.toString(), { headers: this.header });
  }

  getFitnessClasses() {
    return this.http.get(this.baseUrl + '/fitnessClass', { headers: this.header });
  }

  /*
  getStudio(id: number) {
    return this.http.get(this.baseUrl + '/studio/' + id.toString(), { headers: this.header });
  }
  */
}

