/*
import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, query, where, collectionData, doc, getDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

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
  expandedProjects: { [key: string]: boolean } = {}; // Track which project's dropdown is expanded

  private firestore = inject(Firestore);
  private auth = inject(Auth);
  private router = inject(Router);

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

  addFeedback(projectId: string) {
    this.router.navigate(['/feedback-form', projectId]);
  }

  viewFeedback(projectId: string) {
    this.router.navigate(['/view-feedback', projectId]);
  }

  // Toggle participants dropdown for a project
  toggleParticipants(projectId: string) {
    this.expandedProjects[projectId] = !this.expandedProjects[projectId];
  }
}
*/
import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, query, where, collectionData, doc, getDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router'; 
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog.component';

@Component({
  selector: 'app-your-projects',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, MatDialogModule, MatSnackBarModule],
  templateUrl: './your-projects.component.html',
  styleUrls: ['./your-projects.component.css'],
})
export class YourProjectsComponent implements OnInit {
  userProjects$: Observable<any[]> | undefined;
  userType: string = '';
  currentUserUid: string | null = null;
  editForm: FormGroup;
  selectedProjectId: string | null = null; // Track selected project for editing

  expandedProjects: { [key: string]: boolean } = {};

  private firestore = inject(Firestore);
  private auth = inject(Auth);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);

  constructor(private router: Router) {
    this.editForm = this.fb.group({
      title: [''],
      description: [''],
      researchers: [''],
      targetAudience: [''],
      toolLink: [''],
    });
  }

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

  addFeedback(projectId: string) {
    // Ensure feedbackId is defined, perhaps fetched from Firestore or set elsewhere
    this.router.navigate(['/feedback-form', projectId]);  // Pass both projectId and feedbackId
  }

  viewFeedback(projectId: string) {
    this.router.navigate(['/view-feedback', projectId]);  // Navigate to the view feedback page
  }

  // Edit Research Project
  editResearch(project: any) {
    this.selectedProjectId = project.id;
    this.editForm.patchValue({
      title: project.title,
      description: project.description,
      researchers: project.researchers,
      targetAudience: project.targetAudience,
      toolLink: project.toolLink,
    });

  }
  

  async saveProjectChanges() {
    if (!this.selectedProjectId) return;

    const projectRef = doc(this.firestore, 'Create-Research', this.selectedProjectId);

    try {
      await updateDoc(projectRef, this.editForm.value);
      this.snackBar.open('✅ Project updated successfully!', 'Close', { duration: 3000 });

      this.selectedProjectId = null;
      this.editForm.reset();
    } catch (error) {
      console.error('Error updating project:', error);
    }
  }

  async deleteResearch(id: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(async (confirmed) => {
      if (confirmed) {
        try {
          const docRef = doc(this.firestore, 'Create-Research', id);
          await deleteDoc(docRef);
          this.snackBar.open('❌ Project deleted successfully!', 'Close', { duration: 3000 });
        } catch (error) {
          console.error('Error deleting project:', error);
        }
      }
    });
  }
  async removeParticipant(projectId: string, participantId: string): Promise<void> {
    try {
      const projectRef = doc(this.firestore, `Create-Research/${projectId}`);
      
      // Fetch the project document
      const projectSnap = await getDoc(projectRef);
      
      if (!projectSnap.exists()) {
        console.error("Project not found!");
        return;
      }
  
      const projectData = projectSnap.data();
      
      // Access participants using bracket notation
      const updatedParticipants = projectData?.['participants']?.filter((p: any) => p.uid !== participantId);
  
      if (updatedParticipants) {
        await updateDoc(projectRef, { participants: updatedParticipants });
        console.log(`Participant ${participantId} removed from project ${projectId}`);
      } else {
        console.error("Participants not found in project data.");
      }
    } catch (error) {
      console.error("Error removing participant:", error);
    }
  }
  // Toggle participants dropdown for a project
  toggleParticipants(projectId: string) {
    this.expandedProjects[projectId] = !this.expandedProjects[projectId];
  }

}
