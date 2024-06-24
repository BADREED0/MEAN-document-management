import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Document } from 'src/app/models/document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentFormService {
  private url = 'http://localhost:3000/document';

  constructor(private http : HttpClient) { }

  addDocument(document : Document) : Observable<any> {
    const data = document.toMongooseDocument();
    return this.http.post(this.url, data);
  }
}
