import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ResearchCreationComponent } from './research-creation/research-creation.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { OurMissionComponent } from './our-mission/our-mission.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ParticipantsResearchDetailsComponent } from './participants-research-details/participants-research-details.component';


export const routes: Routes = [
    {'path': '', 'title':'Research Finder', component: HomeComponent},
    {'path': 'login', 'title':'login', component: LoginComponent},
    {'path': 'register', 'title':'register', component: RegistrationComponent},
    {'path': 'research-creation', component: ResearchCreationComponent },
    {'path': 'how-it-works', component: HowItWorksComponent },
    {'path': 'our-mission', component: OurMissionComponent },
    {'path': 'about-us', component: AboutUsComponent },
    {'path': 'contact-us', component: ContactUsComponent },
    {'path': 'participants-research-details', component: ParticipantsResearchDetailsComponent},
];
