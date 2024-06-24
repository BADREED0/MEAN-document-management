import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = "http://localhost:3000/login";

  constructor(private http : HttpClient) { }

  loginUser(email : string, password: string) : Observable<any>{
    const data = {email, password};
    return this.http.post(this.url, data);
  }

}
