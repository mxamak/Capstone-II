import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html', // ✅ Corrected template URL
  styleUrls: ['./contact-us.component.css']  // ✅ Fixed 'styleUrls' syntax
})
export class ContactUsComponent {
  email: string = 'contact@gmail.com'; // ✅ Added email property
}
