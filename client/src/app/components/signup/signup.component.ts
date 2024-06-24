import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from 'src/app/services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  full_name! : string;
  email! : string;
  password! : string;
  username! : string;
  
  constructor(private service : SignupService, private router : Router){}

  signUp(){
    this.service.register(this.full_name, this.username, this.email, this.password).subscribe({
      next : data => {
        this.router.navigate(['/login']);
      }
    })
  }
}
