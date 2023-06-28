
import random




def railgunHit(marcado):
    
    hitroll=random.randint(1,6)
    if(marcado):
        hitroll=hitroll+1
    #reroll1
    if hitroll<3:
        hitroll=random.randint(1,6)
        if(marcado):
            hitroll=hitroll+1
    if(hitroll<3):
        return [0,0,0]
    woundRoll=random.randint(1,6)
    #reroll
    if(woundRoll<3):
        woundRoll=random.randint(1,6)
    if(woundRoll<3):
        return [1,0,0]
    save=random.randint(1,6)
    if(save>=7):
        return [1,1,0]
    return [1,1,1]



porcentaje=[0,0,0]
hitrollExito=0
woundRollExito=0
damageExito=0
for i in range(100000):
    simulation=railgunHit(False)
    porcentaje[0]=porcentaje[0]+simulation[0]
    porcentaje[1]=porcentaje[1]+simulation[1]
    porcentaje[2]=porcentaje[2]+simulation[2]


porcentaje[0]=porcentaje[0]/100000
porcentaje[1]=porcentaje[1]/100000
porcentaje[2]=porcentaje[2]/100000


print("HITROLL = "+ str(porcentaje[0]))
print("WoundROLL = "+ str(porcentaje[1]))
print("Da = "+ str(porcentaje[2]))
