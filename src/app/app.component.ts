import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [
    `
      header {
        height: 34px;
        padding: 8px;
        font-weight: bold;
        font-size: 20px;
        display: grid;
        align-items: center;
        background: black;
        color: white;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
