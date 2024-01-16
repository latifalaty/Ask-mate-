import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionServiceService } from 'src/app/Services/question-service.service';
import { UserServiceService } from 'src/app/Services/user-service.service';
@Component({
  selector: 'app-getquestion',
  templateUrl: './getquestion.component.html',
  styleUrls: ['./getquestion.component.css']
})
export class GetquestionComponent implements OnInit {
  users: any;
  id: any;
  user: any = {};
  question:any;
  searchQuery: string = '';
  questions: any[] = []; // Use array type for questions
  connectedUser: any;

  constructor(
    private questionService: QuestionServiceService,
    private userService: UserServiceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadQuestions();
  }

  loadQuestions() {
    this.questionService.getQuestions().subscribe(
      {
        next: (data) => {
          this.questions = data;
          this.populateUserDetails();
        },
        error: (error) => {
          console.error('Error fetching questions', error);
        }
      });
  }
  populateUserDetails() {
    for (const question of this.questions) {
      if (question.userId) {
        console.log('Fetching user details for userId:', question.userId);

        this.userService.getUser(question.userId).subscribe(
          {
            next: (user: any) => {
              console.log('User details fetched successfully:', user);
              question.userDetails = user;
              localStorage.setItem("questioncom",JSON.stringify(this.question.userDetails));

            },
            error: (error) => {
              console.error('Error fetching user details:', error);
            }
          }
        );
      }
    }
  }
  navigateToReponse(): void {
    // Implement navigation to the chatbot page
    this.router.navigate(['dashboard', 'reponse']);

  }


}