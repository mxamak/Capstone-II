import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-how-it-works',
  imports: [CommonModule],
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.css']
})
export class HowItWorksComponent {
  // You can use this if you want to dynamically control content
  sections = [
    {
      title: '🔐 Access Based on Role',
      content: [
        {
          header: 'Role Management',
          description: 'You’ll need to set your role in your Profile (either `researcher` or `participant`) to access certain features. If you don’t see what you’re expecting, double-check your profile settings.'
        }
      ]
    },
    {
      title: '👩‍🔬 For Researchers',
      content: [
        {
          header: '1. Create Research Projects',
          description: 'Navigate to the "Create Research Project" page. Fill out your project’s title, description, target audience, and any relevant tool links. Submit the form and your project will be listed for participants to view and join.'
        },
        {
          header: '2. View Feedback',
          description: 'On your "Projects Dashboard", click "View Feedback" to read input from your participants. Each feedback is linked to the participant’s profile for easy follow-up.'
        },
        {
          header: '3. Manage Participants',
          description: 'You can see who has joined your research. Optionally, remove participants if needed.'
        }
      ]
    },
    {
      title: '🧑‍🎓 For Participants',
      content: [
        {
          header: '1. Browse Projects',
          description: 'Check out the available research projects created by researchers. Projects you can join will be listed under "Available Projects".'
        },
        {
          header: '2. Join a Project',
          description: 'Click "Join Project" on any research you’re interested in. Your name will be added to the participant list for that project.'
        },
        {
          header: '3. Leave Feedback',
          description: 'After joining, you’ll see an "Add Feedback" button on your dashboard. Share your thoughts or experience directly with the researcher.'
        }
      ]
    },
  ];
}
