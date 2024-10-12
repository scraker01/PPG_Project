import { _decorator, CCFloat, Component, Node } from 'cc';
import { levelStats } from '../../Etc/levelStats';
const { ccclass, property } = _decorator;

@ccclass('statusController')
export class statusController extends Component {
    
    //STATS
    @property({type:CCFloat}) private health:number;
    @property({type:CCFloat}) private damage:number;

    
    private dead:boolean;

    //HURT CONDITIONS
    isBeingHurt:boolean;
    delayHurtTimer:number;

    //levelStats -> jika mati maka nanti kurangi di enemyArray (rencana awal mau di taro di update tapi akan berat jika ambil array setiap update)


    start() {


        this.dead = false;
        this.isBeingHurt = false;

        this.delayHurtTimer = 1;
    }

    isDead(){
        if(this.health<=0){
            console.log(this.health)
            
            this.dead = true;
            this.node.active = false;
            
            levelStats.minusEnemyAmount();
            
            if(levelStats.getEnemyAmount() == 0){
                levelStats.deacGate();
            }

            return true;
        }
        return false;
    }

    receiveDamage(dmg:number){
        if(!this.dead && !this.isBeingHurt){
            this.health-= dmg;
            this.isDead();

            this.isBeingHurt = true;


            console.log(this.node.name + " health left : " + this.health);
            
        }
    }

    getHurtCondition():boolean{
        return this.isBeingHurt;
    }

    deactivateHurtCondition(){
        this.isBeingHurt = false;
    }

    getDamageStat():number{
        return this.damage;
    }

    getHurtTimer():number{
        return this.delayHurtTimer;
    }

}


