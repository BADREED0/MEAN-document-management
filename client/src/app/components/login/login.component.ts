import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email! : string;
  password! : string;
  error! : string;

  constructor(private service : LoginService, private router : Router, private userService : UserService){}

  submitForm(){
    this.service.loginUser(this.email, this.password).subscribe({
      next: user => {
        this.userService.changeUsername(user.username);
        if (user.role === "admin"){
          this.router.navigate(['/admin']);
        }
        else if (user.role === "user"){
          this.router.navigate(['/document/list']);
        }
      },
      error: err => {
        if(err.status === 400){
          this.error = 'Invalid email or password.';
        } else if(err.status === 401){
          this.error = 'Your account is suspended.';
        } else if(err.status === 500){
          this.error = 'Internal server error. Please try again later.';
        } else{
          this.error = 'An unexpected error occured. Please try again.';
        }
      }
    })
  }

}
