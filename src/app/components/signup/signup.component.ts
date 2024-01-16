import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/Services/user-service.service';
import { MustMatch } from '../confirmPWD';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  // Propriété pour stocker les confirmations de l'état de la création de compte
  accountCreationSuccess = false;

  // Cette objet user va recueillir les données liées par ngModel
  user: any = {};

  constructor(
    private userService: UserServiceService, 
    private router: Router
  ) {}

  // La méthode signup est appelée quand le formulaire est soumis
  signup() {
    console.log('Attempting to sign up user:', this.user);

    // Appel au UserService pour l'inscription
    this.userService.signup(this.user).subscribe(
      (data) => {
        console.log('Signup with success');
        this.accountCreationSuccess = true;
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Signup failed', error);
      }
    );
  }
}