/*
import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, updateDoc, doc, arrayUnion, getDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-participants-research-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './participants-research-details.component.html',
  styleUrls: ['./participants-research-details.component.css']
})
export class ParticipantsResearchDetailsComponent implements OnInit {
  researchProjects$: Observable<any[]>;
  showSuccessMessage = false;

  // Make auth public so it's accessible in the template
  public auth: Auth;

  constructor(private firestore: Firestore, private authService: Auth) {
    this.auth = authService;
    const researchCollection = collection(this.firestore, 'Create-Research');
    this.researchProjects$ = collectionData(researchCollection, { idField: 'id' });
  }

  // Join research project method
  async joinResearch(researchId: string) {
    const user = this.auth.currentUser;
    if (user) {
      try {
        const researchDoc = doc(this.firestore, `Create-Research/${researchId}`);
        // Add user to participants with displayName and UID
        await updateDoc(researchDoc, {
          participants: arrayUnion({
            uid: user.uid,  // User's UID
            displayName: user.displayName || 'Anonymous User',  // Display name (or fallback to 'Anonymous User')
            email: user.email  // User's email
          })
        });

        this.showSuccessMessage = true;

        // Hide success message after 3 seconds
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000);

        console.log(`User ${user.email} joined research project ${researchId}`);
      } catch (error) {
        console.error('Error joining research project:', error);
      }
    } else {
      console.warn('User must be logged in to join a research project');
    }
  }

  // Remove a participant method
  async removeParticipant(researchId: string, participantUid: string) {
    const researchDoc = doc(this.firestore, `Create-Research/${researchId}`);
    
    try {
      const researchSnap = await getDoc(researchDoc);
      if (researchSnap.exists()) {
        const researchData = researchSnap.data();
        const participants = researchData['participants'] || [];
  
        // Ensure the participants array is an array of objects
        if (!Array.isArray(participants)) {
          console.error('Participants data is not an array:', participants);
          return;
        }
  
        // Remove participant based on UID
        const updatedParticipants = participants.filter((p: any) => p.uid !== participantUid);
  
        // Update Firestore document
        await updateDoc(researchDoc, { participants: updatedParticipants });
  
        console.log(`Participant ${participantUid} removed from research project ${researchId}`);
      } else {
        console.warn('Research project document does not exist.');
      }
    } catch (error) {
      console.error('Error removing participant:', error);
    }
  }
  

  ngOnInit(): void {}
}
*/

import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, updateDoc, doc, arrayUnion, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-participants-research-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './participants-research-details.component.html',
  styleUrls: ['./participants-research-details.component.css']
})
export class ParticipantsResearchDetailsComponent implements OnInit {
  researchProjects$: Observable<any[]>;
  showSuccessMessage = false;
  expandedProjects: { [key: string]: boolean } = {}; // Track which project's dropdown is expanded

  // Make auth public so it's accessible in the template
  public auth: Auth;

  constructor(private firestore: Firestore, private authService: Auth) {
    this.auth = authService;
    const researchCollection = collection(this.firestore, 'Create-Research');
    this.researchProjects$ = collectionData(researchCollection, { idField: 'id' });
  }

  // Toggle participants dropdown for a project
  toggleParticipants(projectId: string) {
    this.expandedProjects[projectId] = !this.expandedProjects[projectId];
  }

  // Join research project method
  async joinResearch(researchId: string) {
    const user = this.auth.currentUser;
    if (user) {
      try {
        const researchDoc = doc(this.firestore, `Create-Research/${researchId}`);
        await updateDoc(researchDoc, {
          participants: arrayUnion({
            uid: user.uid,
            displayName: user.displayName || 'Anonymous User',
            email: user.email
          })
        });

        this.showSuccessMessage = true;

        // Hide success message after 3 seconds
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000);

        console.log(`User ${user.email} joined research project ${researchId}`);
      } catch (error) {
        console.error('Error joining research project:', error);
      }
    } else {
      console.warn('User must be logged in to join a research project');
    }
  }

  // Remove a participant method
  async removeParticipant(researchId: string, participantUid: string) {
    const researchDoc = doc(this.firestore, `Create-Research/${researchId}`);
    
    try {
      const researchSnap = await getDoc(researchDoc);
      if (researchSnap.exists()) {
        const researchData = researchSnap.data();
        const participants = researchData['participants'] || [];
  
        // Ensure the participants array is valid
        if (!Array.isArray(participants)) {
          console.error('Participants data is not an array:', participants);
          return;
        }
  
        // Remove participant by UID
        const updatedParticipants = participants.filter((p: any) => p.uid !== participantUid);
  
        // Update Firestore document
        await updateDoc(researchDoc, { participants: updatedParticipants });
  
        console.log(`Participant ${participantUid} removed from research project ${researchId}`);
      } else {
        console.warn('Research project document does not exist.');
      }
    } catch (error) {
      console.error('Error removing participant:', error);
    }
  }

  ngOnInit(): void {}
}
