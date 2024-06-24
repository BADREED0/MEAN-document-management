import { Component, OnInit } from '@angular/core';
import { Dossier } from 'src/app/models/dossier.model';
import { ListFoldersService } from 'src/app/services/list-folders.service';
import { UserService } from 'src/app/services/user.service';
import { Chemin } from 'src/app/models/chemin.model';
import { Document } from 'src/app/models/document.model';
import { ListDocumentsService } from 'src/app/services/list-documents.service';

@Component({
  selector: 'app-list-folders',
  templateUrl: './list-folders.component.html',
  styleUrls: ['./list-folders.component.css']
})
export class ListFoldersComponent implements OnInit{
  dossiers : Dossier[] = [];
  username! : string;
  size : number = 0;
  showModal: boolean = false;
  selectedDossier: Dossier | null = null;
  editIndex : number = -1;
  newName!: string;
  docIndex : number = -1;
  docName! : string;

  constructor(private userService : UserService, private service : ListFoldersService, private docService : ListDocumentsService) {}

  ngOnInit(): void {
    this.userService.currentUsername.subscribe((username) => {this.username = username});
    this.loadFolders();
  }

  loadFolders() {
    this.service.getFolders(this.username).subscribe({
      next: (data) => {
        for (let folder of data) {
          const documents: Document[] = folder.documents.map((documentData: any) => {
            const chemin = new Chemin(documentData.emplacement, documentData.name, documentData.extension);
            return new Document(chemin, documentData.taille, documentData.proprietaire);
          });
  
          const newDossier = new Dossier(
            folder.name,
            folder.proprietaire,
            documents
          );
  
          this.dossiers.push(newDossier);

        }
      },
      error: (err) => {
        console.error("Error: ", err);
      }
    });
  }

  calculateFolderSize(folder: Dossier): number {
    let folderSize = 0;
    if (folder && folder.documents) {
      folder.documents.forEach(document => {
        folderSize += document.taille || 0;
      });
    }
    return folderSize;
  }

  editFolder(index : number){
    this.editIndex = this.editIndex === index ? -1 : index;
    if(this.editIndex != -1){
      this.newName = this.dossiers[this.editIndex].nom
    }
  }

  saveChanges() {
    this.service.updateFolder(this.dossiers[this.editIndex].nom, this.newName).subscribe({
      next: (data) => {
        if(this.editIndex != -1){
          this.dossiers[this.editIndex].nom = this.newName;
          console.log(data.message);
        }
        this.cancelEdit();
      },
      error: (err) => {
        console.error("Error: ", err);
      }
    })
  }

  cancelEdit() {
    this.editIndex = -1;
  }

  deleteFolder(dossier : Dossier){
    let conf = confirm("Are you sure ?");
    if(conf){
      this.service.deleteFolder(dossier.nom).subscribe({
        next: (data) => {
          let ind = this.dossiers.indexOf(dossier);
          this.dossiers.splice(ind, 1);
          console.log('Folder deleted successfully');
        },
        error: (err) => {
          console.error('Error deleting folder: ', err);
        }
      })
    }
  }


  viewDocuments(dossier: Dossier) {
    if (this.selectedDossier === dossier && this.showModal) {
      this.closeModal();
    } else {
      this.selectedDossier = dossier;
      this.showModal = true;
    }
  }

  closeModal() {
    this.showModal = false;
    this.selectedDossier = null;
  }

  deleteDocument(doc : Document, dossier : Dossier) {
    this.docService.deleteDoc(doc.chemin.identificateur).subscribe({
      next: (data) => {
        let ind = dossier.documents.indexOf(doc);
        dossier.documents.splice(ind, 1);
        console.log('Document deleted successfully');
      },
      error: (err) => {
        console.error('Error deleting document: ', err);
      }
    })
  }

  editDocument(dossier : Dossier, index : number) {
    this.docIndex = this.docIndex === index ? -1 : index;
    if(this.docIndex != -1){
      this.docName = dossier.documents[this.docIndex].chemin.identificateur;
    }
  }

  saveDocument(dossier : Dossier){
    this.docService.updateDocument(this.docName, dossier.documents[this.docIndex]).subscribe({
      next: (doc) => {
        if(this.docIndex != -1){
          dossier.documents[this.docIndex] = new Document(new Chemin(doc.emplacement, doc.name, doc.extension), doc.taille, doc.proprietaire);
        }
        this.cancelDocument();
      },
      error: (err) => {
        console.error("Error updating document: ", err);
      }
      
    })
  }

  cancelDocument(){
    this.docIndex = -1;
  }
  
}
