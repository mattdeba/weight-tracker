import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  url = 'https://weight-tracker-api-yj53.onrender.com'
  //url = 'http://localhost:3000'
  title = 'weight-tracker';
  weight: number | null = null;

  constructor(private http: HttpClient) {
  }

  onSubmit() {
    this.http.post(this.url + '/weight', {poids: this.weight}).subscribe(
      () => alert("le poids a été saisi !")
    )
  }

  exportAllWeights() {
    this.http.get(this.url + '/weight').subscribe((data: any) => {
      const csvData = this.convertToCSV(data);
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, 'weights.csv');
    });
  }

  convertToCSV(objArray: any[]): string {
    const array =
      typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    const header = Object.keys(array[0]).join(',');
    str += header + '\r\n';

    for (const item of array) {
      let line = '';
      for (const index in item) {
        if (line !== '') line += ',';
        line += item[index];
      }
      str += line + '\r\n';
    }
    return str;
  }
}
