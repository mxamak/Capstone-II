import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, query, where, doc, getDoc} from '@angular/fire/firestore';
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
  styleUrls: ['./your-projects.component.css']
})
export class YourProjectsComponent implements OnInit {
  userProjects$: Observable<any[]> | undefined; // Fix to make this optional
  userType: string = ''; // Fix userType to be of type string
  currentUserUid: string | null = null; // To store the UID of the current user

  constructor(private firestore: Firestore, private auth: Auth) {}

  ngOnInit(): void {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.currentUserUid = user.uid;
        this.fetchUserType(user.uid);
      }
    });
  }

  // Fetch user type and accordingly fetch the user's projects
  async fetchUserType(uid: string): Promise<void> {
    const userDoc = doc(this.firestore, 'users', uid);
    const userSnapshot = await getDoc(userDoc);
    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      this.userType = userData['userType']; // Use bracket notation for 'userType'

      if (this.userType === 'researcher') {
        this.fetchCreatedProjects();
      } else if (this.userType === 'participant') {
        this.fetchJoinedProjects();
      }
    }
  }

  // Fetch projects created by the current user (researcher)
  fetchCreatedProjects(): void {
    const projectsRef = collection(this.firestore, 'Create-Research');
    const createdByQuery = query(projectsRef, where('createdBy', '==', this.currentUserUid));
    this.userProjects$ = collectionData(createdByQuery, { idField: 'id' });
  }

  // Fetch projects that the current user has joined (participant)
  fetchJoinedProjects(): void {
    const projectsRef = collection(this.firestore, 'Create-Research');
    const joinedQuery = query(projectsRef, where('participants.uid', 'array-contains', this.currentUserUid));
    this.userProjects$ = collectionData(joinedQuery, { idField: 'id' });
  }
}
