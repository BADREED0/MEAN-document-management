import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private url = "http://localhost:3000/users"

  constructor(private http : HttpClient) { }

  getUsers() : Observable<any[]>{
    return this.http.get<any[]>(this.url);
  }

  handleStatus(username : string) : Observable<any>{
    const data = { username };
    return this.http.post(this.url, data);
  }

  handleDelete(username : string) : Observable<any>{
    return this.http.delete(`${this.url}/${username}`);
  }
}
