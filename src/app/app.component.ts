import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  url = 'https://weight-tracker-api-yj53.onrender.com'
  title = 'weight-tracker';
  weight: number | null = null;

  constructor(private http: HttpClient) {
  }

  onSubmit() {
    this.http.post(this.url + '/weight', {poids: this.weight}).subscribe()
  }
}
