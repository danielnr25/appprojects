import { Component, Input } from '@angular/core';
import { DxDropDownButtonModule } from 'devextreme-angular/ui/drop-down-button';

@Component({
  selector: 'card-menu',
  templateUrl: './card-menu.component.html',
  styleUrls: ['./card-menu.component.css'],
  standalone:true,
  imports:[DxDropDownButtonModule]
})


export class CardMenuComponent {
  @Input() items: any;//Array<{ text: string }>;
  @Input() visible = true;

  constructor() { }
}
