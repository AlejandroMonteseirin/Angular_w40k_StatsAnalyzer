import { Component } from '@angular/core';

@Component({
  selector: 'app-weapon-compare',
  templateUrl: './weapon-compare.component.html',
  styleUrls: ['./weapon-compare.component.css']
})


export class WeaponCompareComponent {
weapons = [{"name":"Cyclic Ion Overcharge", "attacks":3,"BS":4,"S":8,"AP":2,"D":"2","result":""},
{"name":"Plasma Rifle", "attacks":1,"BS":4,"S":8,"AP":3,"D":"3","result":""},
{"name":"Fusion", "attacks":1,"BS":4,"S":8,"AP":4,"D":"D6+2","result":""}];
//{"name":"Railgun", "attacks":1,"BS":4,"S":20,"AP":-5,"D":"D6+6","result":""},{"name":"Pulse Blast Cannon <Dispersed>", "attacks":6,"BS":4,"S":10,"AP":-2,"D":4,"result":""}


enemy= {"T":6,"W":4,"Save":2,"Invuln":4, "name":"Praetors"};


estadisticasDatos :{ [key: number]: number } = {
  2: 0.8333,
  3: 0.6666,
  4: 0.5,
  5: 0.3333,
  6: 0.1666
}

calculate(){
  console.log("calculating...");
  console.log(this.weapons);
  this.weapons.map(element => {

    let hits= element.attacks * this.estadisticasDatos[element.BS];
    let woundroll=0
    if (element.S >= 2*this.enemy.T){
      woundroll=this.estadisticasDatos[2];
    } else if (element.S > this.enemy.T){
      woundroll=this.estadisticasDatos[3];
    } else if (element.S == this.enemy.T){
      woundroll=this.estadisticasDatos[4];
    } else if (element.S < this.enemy.T){
      woundroll=this.estadisticasDatos[5];
    } else if (element.S*2 <= this.enemy.T){
      woundroll=this.estadisticasDatos[6];
    }

    let wounds= hits * woundroll;

    let saves=0
    if(this.enemy.Save+element.AP > 0){
      saves= wounds * this.estadisticasDatos[this.enemy.Save+element.AP];
    }

    let invul= (wounds-saves) * this.estadisticasDatos[this.enemy.Invuln];


    let damagePerWound:number
    if(element.D == "D6+6"){
      damagePerWound=9.5;
    }else if(element.D == "D6+2"){
        damagePerWound=5.5;
    }else{
      damagePerWound=Number(element.D);

    }
    

    let damage=(wounds - saves - invul) * damagePerWound


    element.result=
`     Hits: ${hits.toFixed(2)}
      wounds ${(wounds).toFixed(2)}
      enemy normal saves ${(saves).toFixed(2)}  SV ${this.enemy.Save+element.AP}
      enemy invul saves ${(invul).toFixed(2)}
      total hits: ${(wounds - saves - invul).toFixed(2)}
      total damage: ${damage.toFixed(2)}
      
      Will kill aprox ${Math.floor(damage/this.enemy.W)} ${this.enemy.name}
      
      
      
      `;
    
  });

}

}
