import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LogoutService } from 'src/app/Services/logout.service';
import { QuestionServiceService } from 'src/app/Services/question-service.service';
import { SearchResultsService } from 'src/app/Services/search-results.service';
import { SearchService } from 'src/app/Services/search.service';
import { UserServiceService } from 'src/app/Services/user-service.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  users: any;
  id: any;
  user: any = {};
  searchQuery: string = '';
  questions: any = {};
  connectedUser: any;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserServiceService,
    private questionService: QuestionServiceService, private searchService: SearchService,
    private router: Router,
    private searchResultsService: SearchResultsService,
    private logoutService: LogoutService) { }

  ngOnInit() {
    this.connectedUser = JSON.parse(localStorage.getItem("connectedUser") || "{}");
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    console.log(this.id);
    this.questionService.getQuestions().subscribe({
      next: (data) => {
        console.log(data); // Check the structure of the received data
        this.questions = data;  // Assign the array directly
      },
      error: (error) => {
        console.error('Error fetching questions', error);
      }
    });

   

    // // When fetching user data
    // this.userService.getUser(this.id).subscribe({
    //   next: (result) => {
    //     this.user = result.result;
    //   },
    //   error: (error) => {
    //     console.error('Error fetching user details:', error);
    //   }
    // });
    



  }
  onSearch(event: Event) {
    event.preventDefault();
    if (this.searchQuery) {
      this.searchService.searchSimilarQuestions(this.searchQuery).subscribe({
        next: (data) => {
          this.questions = data;
          console.log('the search is working');

          // Pass the search results to the shared service
          this.searchResultsService.setSearchResults(this.questions);

          this.router.navigate(['dashboard', 'search']);
        },
        error: (error) => {
          console.error('There was an error!', error);
          console.log('the search is not working');
        }
      });
    }
  }
  logout() {
    this.logoutService.logout().subscribe(() => {
      this.router.navigate(['login']);
    });
  }
  // Method to get the questions on initialization or when needed
  // getQuestionSearch() {
  //   this.searchService.runPythonScript().subscribe({
  //     next: (data) => {
  //       this.questions = data;
  //     },
  //     error: (error) => {
  //       console.error('There was an error!', error);
  //     }
  //   });
  // }
}
