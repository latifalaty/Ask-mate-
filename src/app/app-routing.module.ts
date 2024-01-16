import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserProfilComponent } from './components/user-profil/user-profil.component';
import { QuestionComponent } from './components/question/question.component';
import { GptComponent } from './components/gpt/gpt.component';
import { SearchComponent } from './components/search/search.component';
import { GetquestionComponent } from './components/getquestion/getquestion.component';
import { HomeComponent } from './components/home/home.component';
import { ReponseComponent } from './components/reponse/reponse.component';
const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'signup', component: SignupComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {path:'question',
    component:QuestionComponent,
    },
    { path: 'search', component: SearchComponent },
    { path: 'reponse', component: ReponseComponent },

      { path: 'chatbot', component: GptComponent },
      { path: 'profil', component: UserProfilComponent },
      {path:'getquest', component: GetquestionComponent},
      { path: '', redirectTo: 'getquest', pathMatch: 'full' },

    ],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
