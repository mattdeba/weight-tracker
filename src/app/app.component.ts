import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  url = 'http://localhost:3000'
  title = 'weight-tracker';
  weight: number | null = null;

  constructor(private http: HttpClient) {
  }

  onSubmit() {
    this.http.post(this.url + '/weight', {poids: this.weight}).subscribe()
  }
}
