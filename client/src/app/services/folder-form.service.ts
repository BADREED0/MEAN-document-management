import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dossier } from '../models/dossier.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FolderFormService {
  private url = 'http://localhost:3000/folder';

  constructor(private http : HttpClient) { }

  addFolder(dossier : Dossier) : Observable<any>{
    const data = dossier.toMongoose();
    return this.http.post(this.url, data);
  }

}
