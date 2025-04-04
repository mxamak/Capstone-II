import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-feedback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-feedback.component.html',
  styleUrls: ['./view-feedback.component.css']
})
export class ViewFeedbackComponent implements OnInit {
  private firestore = inject(Firestore);
  private route = inject(ActivatedRoute);

  projectId: string = '';
  feedbackList: any[] = [];

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('projectId')!;
    this.loadFeedback();
  }

  async loadFeedback() {
    const feedbackRef = collection(this.firestore, `Create-Research/${this.projectId}/feedback`);
    const feedbackSnap = await getDocs(feedbackRef);

    this.feedbackList = feedbackSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }
}
