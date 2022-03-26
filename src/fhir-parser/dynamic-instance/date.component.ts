import { Component, Inject, OnInit } from '@angular/core';
import { FormatPipe } from 'ngx-date-fns';
import { CmpGenericInj } from '../cmp-token';
import { Signature } from '../signatures';

@Component({
  selector: 'app-date',
  template: `
    <div>
      <label>{{ obj.options.displayProp }}:</label>{{ display }}
    </div>
  `,
  styleUrls: ['instance.scss'],
})
export class DateComponent implements OnInit {
  display: string;

  constructor(
    @Inject(CmpGenericInj) public obj: Signature,
    private date: FormatPipe
  ) {}

  ngOnInit() {
    if (this.obj) {
      // Il formato delle date dipende dalla definition
      // Fhir ritorna anche solo stringa con formato di data non valido
      // che deve essere ritornato con una sola mappatura per localizzare la data
      // senza
      switch (this.obj.definition) {
        case 'instant':
          this.display = this.date.transform(
            new Date(this.obj.content),
            `dd/MM/yyyy 'at' HH:mm`
          );
          break;
        case 'date':
          this.display = this.date.transform(
            new Date(this.obj.content),
            `dd/MM/yyyy`
          );
          break;
        default:
          this.display = '';
      }
    }
  }
}
