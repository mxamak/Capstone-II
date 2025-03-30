import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, query, where, collectionData, doc, getDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-your-projects',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './your-projects.component.html',
  styleUrls: ['./your-projects.component.css'],
})
export class YourProjectsComponent implements OnInit {
  userProjects$: Observable<any[]> | undefined;
  userType: string = '';
  currentUserUid: string | null = null;

  private firestore = inject(Firestore);
  private auth = inject(Auth);

  constructor() {}

  ngOnInit(): void {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.currentUserUid = user.uid;
        this.fetchUserType(user.uid);
      } else {
        console.error("User is not authenticated.");
      }
    });
  }

  async fetchUserType(uid: string): Promise<void> {
    try {
      const userDocRef = doc(this.firestore, 'users', uid);
      const userSnapshot = await getDoc(userDocRef);

      if (userSnapshot.exists()) {
        this.userType = userSnapshot.data()['userType'];

        if (this.userType === 'researcher') {
          this.fetchCreatedProjects();
        } else if (this.userType === 'participant') {
          this.fetchJoinedProjects();
        }
      } else {
        console.warn("User document not found in Firestore.");
      }
    } catch (error) {
      console.error("Error fetching user type:", error);
    }
  }

  async fetchCreatedProjects(): Promise<void> {
    if (!this.currentUserUid) return;

    const projectsRef = collection(this.firestore, 'Create-Research');
    const createdByQuery = query(projectsRef, where('createdBy', '==', this.currentUserUid));

    this.userProjects$ = collectionData(createdByQuery, { idField: 'id' });

    this.userProjects$.subscribe((projects) => {
      console.log("Fetched Created Projects:", projects);
    });
  }

  async fetchJoinedProjects(): Promise<void> {
    try {
      if (!this.currentUserUid) return;
  
      console.log("Current User UID:", this.currentUserUid);
      console.log("🔎 Fetching all projects to filter joined projects...");
  
      const projectsRef = collection(this.firestore, 'Create-Research');
      const allProjectsQuery = collectionData(projectsRef, { idField: 'id' });
  
      // Fetch all projects and filter the ones where the user is a participant
      allProjectsQuery.subscribe((projects) => {
        const joinedProjects = projects.filter((project: any) =>
          project.participants?.some((p: any) => p.uid === this.currentUserUid)
        );
  
        console.log("Joined Projects:", joinedProjects);
        this.userProjects$ = new Observable((observer) => observer.next(joinedProjects));
      });
    } catch (error) {
      console.error("🚨 Error fetching joined projects:", error);
    }
  }
}
