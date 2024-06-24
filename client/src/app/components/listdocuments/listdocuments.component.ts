import { Component, OnInit } from '@angular/core';
import { Document } from 'src/app/models/document.model';
import { Chemin } from 'src/app/models/chemin.model';
import { ListDocumentsService } from 'src/app/services/list-documents.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-listdocuments',
  templateUrl: './listdocuments.component.html',
  styleUrls: ['./listdocuments.component.css']
})
export class ListdocumentsComponent implements OnInit {

  documents : Document[] = [];
  username : string = '';
  editIndex!: number;
  name! : string;

  constructor(private service : ListDocumentsService, private userService : UserService){}

  loadDocuments(){
    this.service.getDocument(this.username).subscribe({
      next: (data) => {
        for(let doc of data){
          this.documents.push(
            new Document(new Chemin(doc.emplacement, doc.name, doc.extension), doc.taille, doc.proprietaire)
          )
        }
      },
      error: (err) => {
        console.error("Error: ", err);
      }
    })
  }
  
  ngOnInit(): void {
    this.userService.currentUsername.subscribe((username) => {this.username = username});
    this.loadDocuments();
  }


  editDocument(index: number) {
    this.editIndex = this.editIndex === index ? -1 : index;
    if (this.editIndex !== -1) {
      this.name = this.documents[this.editIndex].chemin.identificateur;
    } 
  }

  cancelEdit() {
    this.editIndex = -1;
  }

  saveChanges() {
    this.service.updateDocument(this.name, this.documents[this.editIndex]).subscribe({
      next: (doc) => {
        if (this.editIndex !== -1) {
          this.documents[this.editIndex] = new Document(new Chemin(doc.emplacement, doc.name, doc.extension), doc.taille, doc.proprietaire);
        }
        this.cancelEdit();
      },
      error: (err) => {
        console.error("Error updating document: ", err);
      }
    })
  }

  deleteDocument(document : Document){
    let conf = confirm("Are you sure ?");
    if(conf){
      this.service.deleteDoc(document.chemin.identificateur).subscribe({
        next: (data) => {
          let ind = this.documents.indexOf(document);
          this.documents.splice(ind, 1);
          console.log('Document deleted successfully');
        },
        error: (err) => {
          console.error('Error deleting document: ', err);
        }
      })
    }
  }

  
}
