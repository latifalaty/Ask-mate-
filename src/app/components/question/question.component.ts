import { Component, OnInit } from '@angular/core';
import { QuestionServiceService } from 'src/app/Services/question-service.service';
import { UserServiceService } from 'src/app/Services/user-service.service';
import { Router,ActivatedRoute } from '@angular/router';
// ... (other imports)
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent  {
  addQuestionForm: FormGroup; // Use this form to bind your input fields
  creationSuccess = false;
  connectedUser: any;
  constructor(
    private formBuilder: FormBuilder, 
    private questionService: QuestionServiceService,
    private userService: UserServiceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.connectedUser = JSON.parse(localStorage.getItem("connectedUser") || "[]");

    this.initializeForm();
  }

  private initializeForm(): void {
    this.addQuestionForm = this.formBuilder.group({
      titre: ['', Validators.required],
      contenu: ['', Validators.required],
      categorie: ['', Validators.required]
      // You do not need to include userId here as it's included from the localStorage
    });
  }

  // ...

addQuestion() {
  // Get the connected user data from localStorage
  const questionWithUser = {
    ...this.addQuestionForm.value,
    userId: this.connectedUser.result.id // Attach the connected user's ID
  };

  this.questionService.addQuestion(questionWithUser).subscribe({
    next: (response) => {
      console.log("Question added successfully", response);
      this.creationSuccess = true;
      this.router.navigate(['dashboard','getquest']);
    },
    error: (error) => {
      console.error("Error adding question", error);
    }
  });
}
}