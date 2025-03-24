import { Component, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './news.component.html'
})
export class NewsComponent {
  private http = inject(HttpClient);
  newsItems: any[] = [];
  loading = true;
  error = false;

  ngOnInit() {
    const apiKey = 'd8016752cb5ade1626e7d709209b3b3c';
    const apiUrl = 'https://gnews.io/api/v4/search?q=university+research+OR+technology+OR+innovation+OR+computer+science&country=us&lang=en&from=2024-01-01&max=10&token=d8016752cb5ade1626e7d709209b3b3c'
    // const apiUrl = `https://gnews.io/api/v4/search?q=university+research+technology&lang=en&token=${apiKey}`;

    this.http.get<any>(apiUrl).subscribe({
      next: (res) => {
        this.newsItems = res.articles || [];
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }
}
