import { Component, OnInit } from '@angular/core';
import { Chemin } from 'src/app/models/chemin.model';
import { DocumentFormService } from 'src/app/services/document-form.service';
import { Document } from 'src/app/models/document.model';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-document-form',
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.css']
})

export class DocumentFormComponent implements OnInit{
  emplacement! : string;
  name! : string;
  extension! : string;
  size! : number;
  username! : string;
  message! : string;
  error! : string;

  constructor(private service : DocumentFormService, private userService : UserService) { }

  submitForm(){
    let chemin = new Chemin(this.emplacement, this.name, this.extension);
    let document = new Document(chemin, this.size, this.username);
    this.service.addDocument(document).subscribe({
      next: (data) => {
        this.message = data.message;
        this.error = '';
      },
      error: (err) => {
        if(err.status === 400){
          this.error = "Folder does not exist.";
        }else if(err.status === 500){
          this.error = "Internal server error. Please try again later.";
        }else{
          this.error = "An unexpected error occured. Please try again.";
        }
        this.message = '';
      }
    })
  }
  ngOnInit(): void {
    this.userService.currentUsername.subscribe((username) => {this.username = username});
  }
}
