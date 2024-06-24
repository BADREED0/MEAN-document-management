import { Component, OnInit } from '@angular/core';
import { Dossier } from 'src/app/models/dossier.model';
import { FolderFormService } from 'src/app/services/folder-form.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-folder-form',
  templateUrl: './folder-form.component.html',
  styleUrls: ['./folder-form.component.css']
})
export class FolderFormComponent implements OnInit{
  folder_name! : string;
  username! : string;
  message! : string;
  error! : string;

  constructor(private userService : UserService, private service : FolderFormService) { }

  ngOnInit(): void {
    this.userService.currentUsername.subscribe(
      (username) => {this.username = username}
    );
  }

  submitForm(){
    let dossier = new Dossier(this.folder_name, this.username);
    this.service.addFolder(dossier).subscribe({
      next: (data) => {
        this.message = data.message;
      },
      error: (err) => {
        this.error = "Internal server error.";
      }
    })
  }
}
