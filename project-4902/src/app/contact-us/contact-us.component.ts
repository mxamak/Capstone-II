import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './contact-us.component.html',
})
export class ContactUsComponent {
  fb = inject(FormBuilder);
  firestore = inject(Firestore);

  success = false;
  loading = false;
  error = '';

  form = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required]],
  });

  async submit() {
    this.success = false;
    this.error = '';
    if (this.form.invalid) return;

    this.loading = true;
    try {
      const contactRef = collection(this.firestore, 'contact-us');
      await addDoc(contactRef, this.form.value);
      this.success = true;
      this.form.reset();
    } catch (err) {
      this.error = 'Something went wrong. Please try again later.';
      console.error(err);
    }
    this.loading = false;
  }
}
