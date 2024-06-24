import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dossier } from '../models/dossier.model';

@Injectable({
  providedIn: 'root'
})
export class ListFoldersService {
  private url = 'http://localhost:3000/folders';

  constructor(private http : HttpClient) { }

  getFolders(username : string) : Observable<any[]>{
    const data = { username };
    return this.http.post<any[]>(this.url, data);
  }

  deleteFolder(name : string) : Observable<any>{
    return this.http.delete(`${this.url}/${name}`);
  }

  updateFolder(folderName : string, newName : string) : Observable<any>{
    const data = { newName };
    return this.http.put<Dossier>(`${this.url}/${folderName}`, data)
  }


}
