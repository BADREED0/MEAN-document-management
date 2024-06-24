import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Document } from '../models/document.model';

@Injectable({
  providedIn: 'root'
})

export class ListDocumentsService {
  private url = 'http://localhost:3000/documents';

  constructor(private http : HttpClient) { }

  getDocument(username: string) : Observable<any[]>{
    const data = { username }
    return this.http.post<any[]>(this.url, data);
  }

  updateDocument(documentName : string, updatedDocument : Document) : Observable<any>{
    const data = updatedDocument.toMongooseDocument();
    return this.http.put<Document>(`${this.url}/${documentName}`, data);
  }

  deleteDoc(name : string) : Observable<any>{
    return this.http.delete(`${this.url}/${name}`);
  }
}
