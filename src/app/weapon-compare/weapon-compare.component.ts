import { Component } from '@angular/core';

@Component({
  selector: 'app-weapon-compare',
  templateUrl: './weapon-compare.component.html',
  styleUrls: ['./weapon-compare.component.css']
})


export class WeaponCompareComponent {
weapons = [{"name":"Railgun", "attacks":1,"BS":4,"S":20,"AP":-5,"D":"D6+6"},{"name":"Pulse Blast Cannon <Dispersed>", "attacks":6,"BS":4,"S":10,"AP":-2,"D":4}];



calculate(){
  console.log("calculating...");
  console.log(this.weapons);

}

}
