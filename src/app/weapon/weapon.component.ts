import { Component, Input, SimpleChanges } from '@angular/core'; 

@Component({
  selector: 'app-weapon',
  templateUrl: './weapon.component.html',
  styleUrls: ['./weapon.component.css']
})


export class WeaponComponent {
  @Input() data: any;
}
