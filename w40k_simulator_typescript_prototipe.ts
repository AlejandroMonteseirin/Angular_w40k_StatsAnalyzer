function railgunHit(marcado: boolean): [number, number, number] {
  let hitroll: number = Math.round(Math.random() * 6) + 1;
  
  if (marcado) {
    hitroll += 1;
  }
  
  if (hitroll < 3) {
    hitroll = Math.round(Math.random() * 6) + 1;
    
    if (marcado) {
      hitroll += 1;
    }
  }
  
  if (hitroll < 3) {
    return [0, 0, 0];
  }
  
  let woundRoll: number = Math.round(Math.random() * 6) + 1;
  
  if (woundRoll < 3) {
    woundRoll = Math.round(Math.random() * 6) + 1;
  }
  
  if (woundRoll < 3) {
    return [1, 0, 0];
  }
  
  const save: number = Math.round(Math.random() * 6) + 1;
  
  if (save >= 7) {
    return [1, 1, 0];
  }
  
  return [1, 1, 1];
}

const porcentaje: number[] = [0, 0, 0];
let hitrollExito: number = 0;
let woundRollExito: number = 0;
let damageExito: number = 0;

for (let i = 0; i < 100000; i++) {
  const simulation: [number, number, number] = railgunHit(false);
  porcentaje[0] += simulation[0];
  porcentaje[1] += simulation[1];
  porcentaje[2] += simulation[2];
}

porcentaje[0] /= 100000;
porcentaje[1] /= 100000;
porcentaje[2] /= 100000;

console.log("HITROLL = " + porcentaje[0]);
console.log("WoundROLL = " + porcentaje[1]);
console.log("Da = " + porcentaje[2]);