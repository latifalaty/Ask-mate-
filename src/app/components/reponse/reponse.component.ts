import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionServiceService } from 'src/app/Services/question-service.service';
import { ResponseServiceService } from 'src/app/Services/response-service.service';

@Component({
  selector: 'app-reponse',
  templateUrl: './reponse.component.html',
  styleUrls: ['./reponse.component.css']
})
export class ReponseComponent {
  questionId: string;
  question: any; // Assuming this is the type of your question object
  newResponseContent: string;
  questioncom:any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private questionService: QuestionServiceService, // Replace with your actual question service
    private responseService: ResponseServiceService // Replace with your actual response service
  ) {
  }


  ngOnInit(): void {
    this.questioncom = JSON.parse(localStorage.getItem("questioncom") || "{}");
    this.questionId = this.activatedRoute.snapshot.paramMap.get('id');

    this.fetchQuestionDetails(); // Fetch question details when the component initializes
  }

  fetchQuestionDetails(): void {
    this.questionService.getQuestionById(this.questionId).subscribe({
      next: (question) => {
        this.question = question;
      },
      error: (error) => {
        console.error('Error fetching question details:', error);
      }
    });
  }

  submitResponse(): void {
    if (!this.question) {
      console.log('Question details not available. Fetching...');
      this.fetchQuestionDetails(); // Fetch question details before submitting response
    } else {
      this.submitResponseInternal();
    }
  }

  private submitResponseInternal(): void {
    // Assuming you have a service method to save the response
    this.responseService.saveResponse(this.questionId, this.newResponseContent).subscribe({
      next: (response) => {
        console.log('Response saved successfully:', response);
        // Optionally, navigate back to question details or another page
        this.router.navigate(['dashboard', 'question', this.questionId]);
      },
      error: (error) => {
        console.error('Error saving response:', error);
      }
    });
  }
}
