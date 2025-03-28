/* import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog.component';

@Component({
  selector: 'app-research-creation',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatDialogModule, MatSnackBarModule], // ✅ Added MatSnackBarModule
  templateUrl: './research-creation.component.html',
  styleUrls: ['./research-creation.component.css']
})
export class ResearchCreationComponent {
  researchForm: FormGroup;
  researchProjects$: Observable<any[]>; // Store the research projects list
  selectedResearchId: string | null = null; // ID of research project being edited

  constructor(
    private fb: FormBuilder,
    private firestore: Firestore,
    private dialog: MatDialog,
    private snackBar: MatSnackBar 
  ) {
    this.researchForm = this.fb.group({
      title: [''],
      description: [''],
      researchers: [''],
      targetAudience: [''],
      toolLink: [''] // Included tool link field
    });

    // Fetch research projects from Firestore
    const collectionRef = collection(this.firestore, 'Create-Research');
    this.researchProjects$ = collectionData(collectionRef, { idField: 'id' });
  }

  async onSubmit(event: Event) {
    event.preventDefault(); // Prevent page refresh
  
    if (this.researchForm.valid) {
      const formData = this.researchForm.value;
  
      try {
        if (this.selectedResearchId) {
          // Update existing research
          const docRef = doc(this.firestore, 'Create-Research', this.selectedResearchId);
          await updateDoc(docRef, formData);
          console.log('Research project successfully updated:', formData);
  
          this.snackBar.open('✅ Research project updated successfully!', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });
  
          // Scroll back to the original research project position
          setTimeout(() => {
            window.scrollTo({
              top: this.previousScrollPosition,
              behavior: 'smooth'
            });
          }, 500); // ✅ Scrolls back but keeps the project centered on screen
          
        } else {
          // Add new research
          const collectionRef = collection(this.firestore, 'Create-Research');
          await addDoc(collectionRef, formData);
          console.log('Research project successfully added:', formData);
  
          this.snackBar.open('✅ Research project added successfully!', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });
        }
  
        this.researchForm.reset();
        this.selectedResearchId = null; // Reset edit mode
      } catch (error) {
        console.error('Error adding/updating document:', error);
      }
    }
  }
  

  // Populate form with selected research data for editing
  private previousScrollPosition: number = 0; // ✅ Store previous scroll positio
  //n

  editResearch(research: any, event: Event) {
    const targetElement = event.target as HTMLElement;
    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
  
    this.previousScrollPosition = elementPosition - (window.innerHeight / 2); // ✅ Adjust position to center it later
  
    this.selectedResearchId = research.id;
    this.researchForm.patchValue({
      title: research.title,
      description: research.description,
      researchers: research.researchers,
      targetAudience: research.targetAudience,
      toolLink: research.toolLink
    });
  
    // ✅ Scroll to the top when "Edit" is clicked
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  

  

  // Delete a research project with Material Dialog Confirmation
  async deleteResearch(id: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(async (confirmed) => {
      if (confirmed) {
        try {
          const docRef = doc(this.firestore, 'Create-Research', id);
          await deleteDoc(docRef);
          console.log('Research project successfully deleted');
          this.snackBar.open('❌ Research project deleted successfully!', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-danger']
          });
        } catch (error) {
          console.error('Error deleting document:', error);
        }
      }
    });
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog.component';

@Component({
  selector: 'app-research-creation',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatDialogModule, MatSnackBarModule],
  templateUrl: './research-creation.component.html',
  styleUrls: ['./research-creation.component.css']
})
export class ResearchCreationComponent {
  researchForm: FormGroup;
  researchProjects$: Observable<any[]>;
  selectedResearchId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private firestore: Firestore,
    private dialog: MatDialog,
    private snackBar: MatSnackBar 
  ) {
    this.researchForm = this.fb.group({
      title: [''],
      description: [''],
      researchers: [''],
      targetAudience: [''],
      toolLink: ['']
    });

    const collectionRef = collection(this.firestore, 'Create-Research');
    this.researchProjects$ = collectionData(collectionRef, { idField: 'id' });
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    if (this.researchForm.valid) {
      const formData = { ...this.researchForm.value, participants: [] };
      try {
        if (this.selectedResearchId) {
          const docRef = doc(this.firestore, 'Create-Research', this.selectedResearchId);
          await updateDoc(docRef, formData);
          this.snackBar.open('✅ Research project updated successfully!', 'Close', { duration: 3000, panelClass: ['snackbar-success'] });
        } else {
          const collectionRef = collection(this.firestore, 'Create-Research');
          await addDoc(collectionRef, formData);
          this.snackBar.open('✅ Research project added successfully!', 'Close', { duration: 3000, panelClass: ['snackbar-success'] });
        }
        this.researchForm.reset();
        this.selectedResearchId = null;
      } catch (error) {
        console.error('Error adding/updating document:', error);
      }
    }
  }

  private previousScrollPosition: number = 0;

  editResearch(research: any, event: Event) {
    const targetElement = event.target as HTMLElement;
    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    this.previousScrollPosition = elementPosition - (window.innerHeight / 2);
    this.selectedResearchId = research.id;
    this.researchForm.patchValue({
      title: research.title,
      description: research.description,
      researchers: research.researchers,
      targetAudience: research.targetAudience,
      toolLink: research.toolLink
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
          this.snackBar.open('❌ Research project deleted successfully!', 'Close', { duration: 3000, panelClass: ['snackbar-danger'] });
        } catch (error) {
          console.error('Error deleting document:', error);
        }
      }
    });
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog.component';

@Component({
  selector: 'app-research-creation',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatDialogModule, MatSnackBarModule],
  templateUrl: './research-creation.component.html',
  styleUrls: ['./research-creation.component.css']
})
export class ResearchCreationComponent {
  researchForm: FormGroup;
  researchProjects$: Observable<any[]>;
  selectedResearchId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private firestore: Firestore,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.researchForm = this.fb.group({
      title: [''],
      description: [''],
      researchers: [''],
      targetAudience: [''],
      toolLink: [''],
      participants: [[]] // Add participants field to Firestore
    });

    // Fetch research projects from Firestore
    const collectionRef = collection(this.firestore, 'Create-Research');
    this.researchProjects$ = collectionData(collectionRef, { idField: 'id' });
  }

  async onSubmit(event: Event) {
    event.preventDefault();

    if (this.researchForm.valid) {
      const formData = this.researchForm.value;

      try {
        if (this.selectedResearchId) {
          // Update existing research
          const docRef = doc(this.firestore, 'Create-Research', this.selectedResearchId);
          await updateDoc(docRef, formData);
          this.snackBar.open('✅ Research project updated successfully!', 'Close', { duration: 3000 });
        } else {
          // Add new research
          const collectionRef = collection(this.firestore, 'Create-Research');
          await addDoc(collectionRef, formData);
          this.snackBar.open('✅ Research project added successfully!', 'Close', { duration: 3000 });
        }

        this.researchForm.reset();
        this.selectedResearchId = null;
      } catch (error) {
        console.error('Error adding/updating document:', error);
      }
    }
  }

  editResearch(research: any, event: Event) {
    this.selectedResearchId = research.id;
    this.researchForm.patchValue({
      title: research.title,
      description: research.description,
      researchers: research.researchers,
      targetAudience: research.targetAudience,
      toolLink: research.toolLink,
      participants: research.participants || [] // Ensure participants are loaded
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Remove a participant from the research project
  async removeParticipant(email: string) {
    if (this.selectedResearchId) {
      const docRef = doc(this.firestore, 'Create-Research', this.selectedResearchId);
      const updatedParticipants = this.researchForm.value.participants.filter((p: string) => p !== email);

      try {
        await updateDoc(docRef, { participants: updatedParticipants });
        this.researchForm.patchValue({ participants: updatedParticipants });

        this.snackBar.open('❌ Participant removed successfully!', 'Close', { duration: 3000 });
      } catch (error) {
        console.error('Error removing participant:', error);
      }
    }
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
}
*/
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc, serverTimestamp } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog.component';

@Component({
  selector: 'app-research-creation',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatDialogModule, MatSnackBarModule],
  templateUrl: './research-creation.component.html',
  styleUrls: ['./research-creation.component.css']
})
export class ResearchCreationComponent {
  researchForm: FormGroup;
  researchProjects$: Observable<any[]>;
  selectedResearchId: string | null = null;

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
      participants: [[]]
    });

    // Fetch research projects from Firestore
    const collectionRef = collection(this.firestore, 'Create-Research');
    this.researchProjects$ = collectionData(collectionRef, { idField: 'id' });
  }

  // Add 'createdBy' and 'timeCreated' before adding a research project
  async onSubmit(event: Event) {
    event.preventDefault();

    if (this.researchForm.valid) {
      const formData = this.researchForm.value;

      // Get the current user
      const user = this.auth.currentUser;
      if (user) {
        formData.createdBy = user.uid; // Store the creator's UID

        try {
          if (this.selectedResearchId) {
            // Update existing research (DO NOT update timeCreated)
            const docRef = doc(this.firestore, 'Create-Research', this.selectedResearchId);
            await updateDoc(docRef, formData);
            this.snackBar.open('✅ Research project updated successfully!', 'Close', { duration: 3000 });
          } else {
            // Add new research with timeCreated field
            formData.timeCreated = serverTimestamp(); // Firestore timestamp
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
  }

  editResearch(research: any, event: Event) {
    this.selectedResearchId = research.id;
    this.researchForm.patchValue({
      title: research.title,
      description: research.description,
      researchers: research.researchers,
      targetAudience: research.targetAudience,
      toolLink: research.toolLink,
      participants: research.participants || []
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async removeParticipant(email: string) {
    if (this.selectedResearchId) {
      const docRef = doc(this.firestore, 'Create-Research', this.selectedResearchId);
      const updatedParticipants = this.researchForm.value.participants.filter((p: string) => p !== email);

      try {
        await updateDoc(docRef, { participants: updatedParticipants });
        this.researchForm.patchValue({ participants: updatedParticipants });

        this.snackBar.open('❌ Participant removed successfully!', 'Close', { duration: 3000 });
      } catch (error) {
        console.error('Error removing participant:', error);
      }
    }
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
}
