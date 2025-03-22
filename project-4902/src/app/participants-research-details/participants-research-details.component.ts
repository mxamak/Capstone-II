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
*/
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

