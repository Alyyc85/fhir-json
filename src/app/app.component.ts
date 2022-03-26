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

  ngOnInit(): void {
    console.log(`I console.log sono impostati su info per i check, su warning per i punti critici,\n
    impostare i livelli desiderati per sfoltire le notifiche`);
  }
}
