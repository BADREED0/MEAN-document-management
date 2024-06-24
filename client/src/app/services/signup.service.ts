import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private url = "http://localhost:3000/signup"

  constructor(private http : HttpClient) { }

  register(full_name : string, username : string, email : string, password : string){
    const data = {full_name, username, email, password};
    return this.http.post(this.url, data);
  }
}
