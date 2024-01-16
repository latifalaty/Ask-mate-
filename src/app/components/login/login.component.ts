import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/Services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public notExist: boolean = false;
  public isLoading: boolean = false;

  constructor(
    private router: Router,
    private userService: UserServiceService
  ) {}

  login(loginForm: NgForm): void {
    if (loginForm.valid) {
      console.log(loginForm.value)
      this.isLoading = true;
      this.userService.login(loginForm.value).subscribe({
        next:(response) => {
          this.isLoading = false;
          if (response.message === "2") {
            console.log('Login successful! User:', response.result);
            localStorage.setItem("connectedUser",JSON.stringify(response));

            this.router.navigate(['/dashboard']);
          } else if (response.message === "1") {
            console.error('Password incorrect.');
          } else if (response.message === "0") {
            console.error('User not found.');
            this.notExist = true;
          }
        },
        error:(error) => {
          this.isLoading = false;
          console.error('An error occurred during the login process.', error);
        }
    });
    }
  }
}