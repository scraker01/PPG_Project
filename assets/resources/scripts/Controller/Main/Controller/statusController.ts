import { _decorator, CCFloat, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('statusController')
export class statusController extends Component {
    @property({type:CCFloat}) private health:number;
    @property({type:CCFloat}) private damage:number;

    private dead:boolean;
    
    start() {
        this.dead = false;
    }

    isDead(){
        if(this.health<=0){
            console.log(this.health)
            
            this.dead = true;
            this.node.active = false;
            return true;
        }
        return false;
    }

    receiveDamage(dmg:number){
        if(!this.dead){
            this.health-= dmg;
            this.isDead();
            console.log(this.node.name + " health left : " + this.health);
            
        }else{
            console.log(this.node.name + " is dead");
        }
    }

    getDamageStat():number{
        return this.damage;
    }

}


