import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  projects: any[] = [];

  // ✅ Inline Firebase config (Replace with your own)
  firebaseConfig = {
    apiKey: "AIzaSyAn3B1UoeUJG3r5BX7vicSDb-PA9AOEzHo",
    authDomain: "research-finder-33c2b.firebaseapp.com",
    projectId: "research-finder-33c2b",
    storageBucket: "research-finder-33c2b.appspot.com",
    messagingSenderId: "223873501213",
    appId: "1:223873501213:web:549f64292f3e6c95aa9ef4",
    measurementId: "G-7WTRB4LCNJ"
  };

  // Firebase app & Firestore reference
  app = initializeApp(this.firebaseConfig);
  db = getFirestore(this.app);

  constructor() {}

  async ngOnInit() {
    const querySnapshot = await getDocs(collection(this.db, 'Research-Projects'));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const id = doc.id;
      const title = data["Project Title"]; // ⚠️ Match your field name

      if (title) {
        this.projects.push({ id, title });
      }
    });
  }

  async submitFeedback(form: any) {
    const selected = JSON.parse(form.value.project);

    try {
      await addDoc(collection(this.db, 'feedbacks'), {
        name: form.value.name,
        email: form.value.email,
        message: form.value.message,
        projectId: selected.id,
        projectTitle: selected.title,
        timestamp: new Date().toISOString()
      });

      alert('✅ Feedback submitted successfully!');
      form.reset();
    } catch (error) {
      console.error("❌ Error submitting feedback:", error);
      alert('❌ Failed to submit feedback. Please try again.');
    }
  }
}
    

