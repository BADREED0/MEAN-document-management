import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  users : User[] = [];

  constructor(private service : AdminService){}

  ngOnInit() {
    this.service.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Error fetching users: ', err)
      }
    })
  }

  deleteUser(user : User) {
    let conf = confirm("Are you sure ?");
    if(conf){
      this.service.handleDelete(user.username).subscribe({
        next : (data) => {
          let ind = this.users.indexOf(user);
          this.users.splice(ind, 1); //pour supprimer user dans le frontend aussi
          //Ce code supprime user du array users afin de mettre à jour l'interface utilisateur du frontend sans avoir à actualiser la page. Cela reflète immédiatement la suppression après la confirmation du backend
          console.log('User deleted successfully');
        },
        error: (err) => {
          console.error('Error deleting user: ', err);
        }
      })
    }
  }

  changeStatus(user : User) {
    this.service.handleStatus(user.username).subscribe({
      next: (data) => {
        user.accountStatus = user.accountStatus === 'active' ? 'suspended' : 'active';
        console.log('User status updated successfully');
      },
      error: (err) => {
        console.error('Error updating user status:', err);
      }
    })
  }
}
