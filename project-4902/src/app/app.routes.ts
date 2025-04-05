import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ResearchCreationComponent } from './research-creation/research-creation.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ParticipantsResearchDetailsComponent } from './participants-research-details/participants-research-details.component';
import { AuthGuard } from './auth.guard'; 
import { AdditionalResourcesComponent } from './additional-resources/additional-resources.component';
import { NewsComponent } from './news/news.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { ViewOthersProfileComponent } from './view-others-profile/view-others-profile.component';
import { YourProjectsComponent } from './your-projects/your-projects.component';
import { ViewFeedbackComponent } from './view-feedback/view-feedback.component';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';

export const routes: Routes = [
  { path: '', title: 'Research Finder', component: HomeComponent, data: { renderMode: 'no-prerender' } },
  { path: 'login', title: 'Login', component: LoginComponent, data: { renderMode: 'no-prerender' }},
  { path: 'register', title: 'Register', component: RegistrationComponent, data: { renderMode: 'no-prerender' } },
  { path: 'how-it-works', component: HowItWorksComponent, data: { renderMode: 'no-prerender' } },
  { path: 'about-us', component: AboutUsComponent, data: { renderMode: 'no-prerender' } },
  { path: 'contact-us', component: ContactUsComponent, data: { renderMode: 'no-prerender' } },
  { path: 'additional-resources', component: AdditionalResourcesComponent, data: { renderMode: 'no-prerender' }},
  { path: 'news', component: NewsComponent, data: { renderMode: 'no-prerender' }},
  { path: 'view-profile', component: ViewProfileComponent, data: { renderMode: 'no-prerender' }},
  { path: 'view-others-profile/:userId',  component: ViewOthersProfileComponent, data: { renderMode: 'no-prerender' }},
  { path: 'your-projects', component: YourProjectsComponent, data: { renderMode: 'no-prerender' }},
  { path: 'feedback-form/:projectId', component: FeedbackFormComponent, data: { renderMode: 'no-prerender' } },
  { path: 'view-feedback/:projectId', component: ViewFeedbackComponent, data: { renderMode: 'no-prerender' } },
  { path: 'create-research/:id', component: ResearchCreationComponent, data: { renderMode: 'no-prerender' } },

  // 🔐 Protected Routes
  { path: 'research-creation', component: ResearchCreationComponent, canActivate: [AuthGuard], data: { renderMode: 'no-prerender' } },
  { path: 'participants-research-details', component: ParticipantsResearchDetailsComponent, canActivate: [AuthGuard], data: { renderMode: 'no-prerender' } }
];
