import { Component, ElementRef } from '@angular/core';
import DiceBox from '@3d-dice/dice-box';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-weapon-compare',
  templateUrl: './weapon-compare.component.html',
  styleUrls: ['./weapon-compare.component.css']
})


export class WeaponCompareComponent {

  constructor(private elementRef: ElementRef) {}

  numberOfWeapons = 9;
  weapons = [{ "name": "Cyclic Ion Overcharge", "attacks": 3, "BS": 4, "S": 8, "AP": 2, "D": "2", "result": "", "special": ["hazardous"] },
  { "name": "Cyclic Ion normal", "attacks": 3, "BS": 4, "S": 7, "AP": 1, "D": "1", "result": "", "special": [] }]
  //{ "name": "Misille pod", "attacks": 2, "BS": 4, "S": 7, "AP": 1, "D": "2", "result": "", "special": ["reroll 1"] },
  //{ "name": "Plasma Rifle", "attacks": 1, "BS": 4, "S": 8, "AP": 3, "D": "3", "result": "", "special": ["reroll 1"] },
  //{ "name": "Fusion Blaster", "attacks": 1, "BS": 4, "S": 8, "AP": 4, "D": "D6+2", "result": "", "special": ["reroll 1"] }];
  //{"name":"Railgun", "attacks":1,"BS":4,"S":20,"AP":-5,"D":"D6+6","result":""},{"name":"Pulse Blast Cannon <Dispersed>", "attacks":6,"BS":4,"S":10,"AP":-2,"D":4,"result":""}


  enemy = { "T": 10, "W": 12, "Save": 2, "Invuln": 0, "feelnopain": 0, "name": "BALLISTUS DREADNOUGHT" };


  estadisticasDatos: { [key: number]: number } = {
    2: 0.8333,
    3: 0.6666,
    4: 0.5,
    5: 0.3333,
    6: 0.1666
  }






  calculate() {
    for (let index = 0; index < this.weapons.length; index++) {
      const arma = this.weapons[index];
      const rollObservable = this.createRollObservable('#hitroll-' + index, arma.attacks*this.numberOfWeapons);

      // Subscribirse al observable
      const subscription = rollObservable.subscribe({
        next: (result) => {
          console.log('Operación asincrónica completada con resultado:', result,arma,index);
          this.woundroll(result,index,arma)
          subscription.unsubscribe();
        },
        error: (error) => {
          console.error('Error en la operación asincrónica:', error);
          subscription.unsubscribe();
        },
        complete: () => {
          console.log('Subscripción completada');
          subscription.unsubscribe();
        },
      });
      
    }

  }


  calculateDices(result,required, inverse=false){
    let dices=0;
    for (let dado of result[0].rolls) {
      if (!inverse && dado.value >= required ) {
        dices++;
      } else if(inverse && dado.value < required) {
        dices++;
      }
    }
    return dices;

  }


  calculateWoundRollNeeded(S,T){
    let woundroll=0;
    if (S >= 2*T){
      woundroll=2;
    } else if (S > T){
      woundroll=3;
    } else if (S == T){
      woundroll=4;
    } else if (S*2 <= T){
      woundroll=6;
    } else if (S< T){
      woundroll=5;
    }
    return woundroll;
  }

  woundroll(result,index,arma){
    const dices= this.calculateDices(result,arma.BS);
    if (dices==0){
      return;
    }
    const rollObservable = this.createRollObservable('#woundroll-' + index, dices);
    // Subscribirse al observable
    const subscription = rollObservable.subscribe({
      next: (result) => {
        console.log('Operación asincrónica completada con resultado:', result,arma,index);
        this.saveroll(result,index,arma)
        subscription.unsubscribe();
      },
      error: (error) => {
        console.error('Error en la operación asincrónica:', error);
        subscription.unsubscribe();
      },
      complete: () => {
        console.log('Subscripción completada');
        subscription.unsubscribe();
      },
    });
  }
  

  saveroll(result,index,arma){
    let diceNeeded=this.calculateWoundRollNeeded(arma.S,this.enemy.T);
    const dices= this.calculateDices(result,diceNeeded);
    if (dices==0){
      return;
    }
    const rollObservable = this.createRollObservable('#saveroll-' + index, dices);
    // Subscribirse al observable
    const subscription = rollObservable.subscribe({
      next: (result) => {
        console.log('Operación asincrónica completada con resultado:', result,arma,index);
        if(this.enemy.feelnopain!=0){

        }else{
          this.showResults(result,index,arma);
        }
        subscription.unsubscribe();
      },
      error: (error) => {
        console.error('Error en la operación asincrónica:', error);
        subscription.unsubscribe();
      },
      complete: () => {
        console.log('Subscripción completada');
        subscription.unsubscribe();
      },
    });
  }

  showResults(result,index,arma){

    const dices= this.calculateDices(result,this.enemy.Save+arma.AP);

    let text=this.elementRef.nativeElement.querySelector('#result-' + index);

    text.textContent = "A total of " + dices + " hits have passed the saves of " + this.enemy.name + " and caused " + dices*arma.D + " damage."
    console.log("showing results");
  }

  createRollObservable(id, dices) {
    
    let modTam = -3 * (dices - 7) / (70 - 7)
   

    let diceBox = new DiceBox(id, {
      assetPath: '/assets/dice-box/',
      scale: 6+modTam,
      theme: 'blueGreenMetal'
    });

    diceBox.init().then(() => {
      diceBox.roll(dices + 'd6')
    });
    return new Observable((observer) => {
      const onRollComplete = (rollResult) => {
        console.log('roll results', rollResult);
        observer.next(rollResult);
        observer.complete();
      };

      diceBox.onRollComplete = onRollComplete;

      return () => {
        // Esta función se llama cuando se cancela la subscripción
        diceBox.onRollComplete = null;
      };
    });
  }


  
  /*calculate(){
   
    console.log("calculating...");
    console.log(this.weapons);
    this.weapons.map(element => {
      let rerolls1=0;
      let hazardous=0;
      let hits= element.attacks * this.estadisticasDatos[element.BS] *this.numberOfWeapons;
      if(element.special.includes("reroll 1")){
        rerolls1=(element.attacks*1/6 * this.estadisticasDatos[element.BS] *this.numberOfWeapons)
        hits= hits + rerolls1;
        
      }
  
      if(element.special.includes("hazardous")){
        hazardous=this.numberOfWeapons*1/6
      }
  
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
      if(this.enemy.Invuln==0 || (this.enemy.Save+element.AP) < this.enemy.Invuln){
        if(this.enemy.Save+element.AP > 0){
          saves= wounds * this.estadisticasDatos[this.enemy.Save+element.AP];
        }
      }else{
        saves= wounds * this.estadisticasDatos[this.enemy.Invuln];
      }
  
  
      let feelnopain=0;
      if(this.enemy.feelnopain!=0){
        feelnopain= (wounds-saves) * this.estadisticasDatos[this.enemy.feelnopain];
      }
  
      let damagePerWound:number
      if(element.D == "D6+6"){
        damagePerWound=9.5;
      }else if(element.D == "D6+2"){
          damagePerWound=5.5;
      }else{
        damagePerWound=Number(element.D);
  
      }
      
  
      let damage=(wounds - saves - feelnopain) * damagePerWound
  
  
      element.result=
  `     Hits: ${hits.toFixed(2)} rerolls 1 sucess: ${rerolls1.toFixed(2)}
        wounds ${(wounds).toFixed(2)}
        enemy normal/invul saves ${(saves).toFixed(2)}  SV ${this.enemy.Save+element.AP+"/"+this.enemy.Invuln}       
        enemy feel no pain saves ${(feelnopain).toFixed(2)}
        total hits: ${(wounds - saves - feelnopain).toFixed(2)}
        total damage: ${damage.toFixed(2)}
        
        Will kill aprox ${(damage/this.enemy.W).toFixed(2)} ${this.enemy.name}
        
        
        
        `;
  
      if (rerolls1>0){
        element.result=element.result+`
        sucess rerolls 1: ${rerolls1.toFixed(2)} 
        `
      }
      if(hazardous>0){
        element.result=element.result+`
        hazardous: ${hazardous.toFixed(2)} 
        fails => ${hazardous.toFixed(2)} models die or ${(hazardous*3).toFixed(2)} mortal wounds
        `
      }
    });
  
  }*/

}
