/*
import { Component } from '@angular/core';

@Component({
  selector: 'app-research-creation',
  imports: [],
  templateUrl: './research-creation.component.html',
  styleUrl: './research-creation.component.css'
})
export class ResearchCreationComponent {

}
*/
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-research-creation',
  imports: [ReactiveFormsModule],
  templateUrl: './research-creation.component.html',
  styleUrls: ['./research-creation.component.css']
})
export class ResearchCreationComponent {
  researchForm: FormGroup;

  constructor(private fb: FormBuilder, private firestore: Firestore) {
    this.researchForm = this.fb.group({
      title: [''],
      description: [''],
      researchers: [''],
      targetAudience: ['']
    });
  }

  async onSubmit(event: Event) {
    event.preventDefault(); // Prevent page refresh

    if (this.researchForm.valid) {
      const formData = this.researchForm.value;
      try {
        const collectionRef = collection(this.firestore, 'Create-Research'); // Reference to Firestore collection
        await addDoc(collectionRef, formData); // Store form data
        console.log('Research project successfully added:', formData);
        this.researchForm.reset(); // Clear the form after submission
      } catch (error) {
        console.error('Error adding document:', error);
      }
    }
  }
}
