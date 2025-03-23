/*
import { Component } from '@angular/core';

@Component({
  selector: 'app-research-details',
  imports: [],
  templateUrl: './research-details.component.html',
  styleUrl: './research-details.component.css'
})
export class ResearchDetailsComponent {

}

import { Component } from '@angular/core';
import { Firestore, collection, collectionData, updateDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-research-participant',
  imports: [CommonModule],
  templateUrl: './participants-research-details.component.html',
  styleUrls: ['./participants-research-details.component.css']
})
export class ParticipantsResearchDetailsComponent {
  researchProjects$: Observable<any[]>;

  constructor(private firestore: Firestore) {
    const collectionRef = collection(this.firestore, 'Create-Research');
    this.researchProjects$ = collectionData(collectionRef, { idField: 'id' });
  }

  async joinResearch(researchId: string) {
    try {
      const researchRef = doc(this.firestore, `Create-Research/${researchId}`);
      await updateDoc(researchRef, { participants: 'Joined' });
      console.log(`User joined research project: ${researchId}`);
    } catch (error) {
      console.error('Error joining research project:', error);
    }
  }
}
*/
import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, updateDoc, doc, arrayUnion } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-participants-research-details',
  imports: [CommonModule],
  templateUrl: './participants-research-details.component.html',
  styleUrls: ['./participants-research-details.component.css']
})
export class ParticipantsResearchDetailsComponent implements OnInit {
  researchProjects$: Observable<any[]>;
  showSuccessMessage = false;

  constructor(private firestore: Firestore, private auth: Auth) {
    const researchCollection = collection(this.firestore, 'Create-Research');
    this.researchProjects$ = collectionData(researchCollection, { idField: 'id' });
  }

  async joinResearch(researchId: string) {
    const user = this.auth.currentUser;
    if (user) {
      try {
        const researchDoc = doc(this.firestore, `Create-Research/${researchId}`);
        await updateDoc(researchDoc, {
          participants: arrayUnion(user.email)
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

  ngOnInit(): void {}
}
