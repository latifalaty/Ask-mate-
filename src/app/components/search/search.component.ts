import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchResultsService } from 'src/app/Services/search-results.service';
import { SearchService } from 'src/app/Services/search.service';
import { UserServiceService } from 'src/app/Services/user-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  users: any;
  searchResults: any = {};
  id: any;
  user: any = {};
  searchQuery: string = '';
  questions: any = {};
  connectedUser: any;

  constructor(private userService: UserServiceService,
    private searchService: SearchService,
    private router: Router,
    private searchResultsService: SearchResultsService
  ) { }


  ngOnInit() {
    this.connectedUser = JSON.parse(localStorage.getItem("connectedUser") || "[]");
    // this.id = this.activatedRoute.snapshot.paramMap.get("id");
    // console.log(this.id);
    // When fetching user data
    this.userService.getUser(this.connectedUser.result.id).subscribe({
      next: (result) => {
        this.user = result.result; // Make sure `data.result` contains the user data
      },
      error: (error) => console.error('There was an error!', error)
    });

    this.searchResultsService.searchResults$.subscribe(results => {
      this.searchResults = results;
    });

  }
  onSearch(event: Event) {
    event.preventDefault();
    if (this.searchQuery) {
      this.searchService.searchSimilarQuestions(this.searchQuery).subscribe({
        next: (data) => {
          this.questions = data; // Assuming 'results' is the array of questions
          console.log('the search is working')
          this.router.navigate(['dashboard','search']);
        },
        error: (error) => {
          console.error('There was an error!', error);
          console.log('the search is not working')

        }
      })

    }
  }


  navigateToChatbot(): void {
    // Implement navigation to the chatbot page
    this.router.navigate(['dashboard','chatbot']);
  }

  navigateToPublishQuestion(): void {
    // Implement navigation to the publish question page
    this.router.navigate(['dashboard','question']);
  }
}
