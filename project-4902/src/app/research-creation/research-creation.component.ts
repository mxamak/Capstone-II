import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc, serverTimestamp, arrayUnion, arrayRemove, getDoc } from '@angular/fire/firestore';
import { Auth, User } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-research-creation',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatDialogModule, MatSnackBarModule, RouterModule],
  templateUrl: './research-creation.component.html',
  styleUrls: ['./research-creation.component.css']
})
export class ResearchCreationComponent {
  researchForm: FormGroup;
  researchProjects$: Observable<any[]>;
  selectedResearchId: string | null = null;
  currentUser: User | null = null;

  constructor(
    private fb: FormBuilder,
    private firestore: Firestore,
    private auth: Auth,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.researchForm = this.fb.group({
      title: [''],
      description: [''],
      researchers: [''],
      targetAudience: [''],
      toolLink: [''],
      participants: [[]] // Store participants as an array of UIDs
    });

    const collectionRef = collection(this.firestore, 'Create-Research');
    this.researchProjects$ = collectionData(collectionRef, { idField: 'id' }).pipe(
      map(projects => projects.map(proj => ({
        ...proj,
        participants: Array.isArray(proj['participants']) ? proj['participants'] : []
      })))
    );
    
    

    this.auth.onAuthStateChanged(user => {
      this.currentUser = user;
    });
  }

  async onSubmit(event: Event) {
    event.preventDefault();

    if (this.researchForm.valid && this.currentUser) {
      const formData = { ...this.researchForm.value };
      formData.participants = formData.participants || [];

      try {
        if (this.selectedResearchId) {
          const docRef = doc(this.firestore, 'Create-Research', this.selectedResearchId);
          await updateDoc(docRef, formData);
          this.snackBar.open('✅ Research project updated successfully!', 'Close', { duration: 3000 });
        } else {
          formData.createdBy = this.currentUser.uid;
          formData.timeCreated = serverTimestamp();
          const collectionRef = collection(this.firestore, 'Create-Research');
          await addDoc(collectionRef, formData);
          this.snackBar.open('✅ Research project added successfully!', 'Close', { duration: 3000 });
        }

        this.researchForm.reset();
        this.selectedResearchId = null;
      } catch (error) {
        console.error('Error adding/updating document:', error);
      }
    } else {
      this.snackBar.open('❌ You need to be logged in to create or update a research project!', 'Close', { duration: 3000 });
    }
  }

  async addParticipantToProject(projectId: string) {
    if (!this.currentUser) return;
    
    const projectRef = doc(this.firestore, 'Create-Research', projectId);

    try {
      await updateDoc(projectRef, {
        participants: arrayUnion({ uid: this.currentUser.uid, displayName: this.currentUser.displayName || 'Unknown' })
      });

      this.snackBar.open('✅ You have joined the research project!', 'Close', { duration: 3000 });
    } catch (error) {
      console.error('Error adding participant:', error);
    }
  }

  editResearch(research: any) {
    this.selectedResearchId = research.id;
    this.researchForm.patchValue({
      title: research.title,
      description: research.description,
      researchers: research.researchers,
      targetAudience: research.targetAudience,
      toolLink: research.toolLink,
      participants: research['participants'] || []
    });
  
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  async deleteResearch(id: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);
  
    dialogRef.afterClosed().subscribe(async (confirmed) => {
      if (confirmed) {
        try {
          const docRef = doc(this.firestore, 'Create-Research', id);
          await deleteDoc(docRef);
          this.snackBar.open('❌ Research project deleted successfully!', 'Close', { duration: 3000 });
        } catch (error) {
          console.error('Error deleting document:', error);
        }
      }
    });
  }
  async removeParticipant(projectId: string, participantUid: string) {
    const projectRef = doc(this.firestore, 'Create-Research', projectId);

    try {
      const projectSnap = await getDoc(projectRef);
      if (projectSnap.exists()) {
        const projectData = projectSnap.data();
        const updatedParticipants = projectData['participants'].filter((p: any) => p.uid !== participantUid);

        await updateDoc(projectRef, { participants: updatedParticipants });
      }

      this.snackBar.open('❌ Participant removed successfully!', 'Close', { duration: 3000 });
    } catch (error) {
      console.error('Error removing participant:', error);
    }
  }
  
}
