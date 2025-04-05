import { Component, OnInit, inject, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Firestore, collection, addDoc, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService} from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent implements OnInit {
  feedbackId!: string;
  feedbackForm: FormGroup;
  projectId: string = '';
  userId: string = '';
  userName: string = '';
  ratings = [1, 2, 3, 4, 5];

  private firestore = inject(Firestore);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private ngZone = inject(NgZone);

  constructor() {
    this.feedbackForm = this.fb.group({
      rating: ['', Validators.required],
      comment: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('projectId')!;

    console.log('Project ID:', this.projectId);  // Log projectId to debug
    
    this.userId = this.authService.getUserId();
    this.fetchUserName();

    this.route.paramMap.subscribe(params => {
      this.feedbackId = params.get('id')!;  // Ensure feedbackId is set from the route
      if (this.feedbackId) {
        this.fetchFeedback();
      }
    });
  }

  async fetchUserName() {
    try {
      const userDocRef = doc(this.firestore, 'users', this.userId);

      // Use NgZone to run Firebase calls inside Angular's change detection
      this.ngZone.run(async () => {
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          this.userName = userDoc.data()?.['username'] || 'Anonymous';
          console.log('User Name:', this.userName);
        }
      });
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  }

  async fetchFeedback() {
    try {
      const feedbackDocRef = doc(this.firestore, `Create-Research/${this.projectId}/feedback`, this.feedbackId);
      const feedbackDoc = await getDoc(feedbackDocRef);
      if (feedbackDoc.exists()) {
        this.feedbackForm.patchValue({
          rating: feedbackDoc.data()?.['rating'],
          comment: feedbackDoc.data()?.['comment']
        });
      }
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  }

  async submitFeedback() {
    if (this.feedbackForm.valid) {
      const feedbackRef = collection(this.firestore, `Create-Research/${this.projectId}/feedback`);

      if (this.feedbackId) {
        const feedbackDocRef = doc(feedbackRef, this.feedbackId);
        await updateDoc(feedbackDocRef, {
          rating: this.feedbackForm.value.rating,
          comment: this.feedbackForm.value.comment,
          timestamp: new Date()
        });

        alert('Feedback updated!');
      } else {
        await addDoc(feedbackRef, {
          userId: this.userId,
          username: this.userName,
          rating: this.feedbackForm.value.rating,
          comment: this.feedbackForm.value.comment,
          timestamp: new Date()
        });

        alert('Feedback submitted!');
      }

      this.router.navigate(['/your-projects']);
    } else {
      alert('Please fill in all fields.');
    }
  }

  onSubmit() {
    this.submitFeedback();  // Call submitFeedback when form is submitted
  }
}
