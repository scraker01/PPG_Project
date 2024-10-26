import { _decorator, CCFloat, Component, Node } from 'cc';
import { levelStats } from '../../Etc/levelStats';
import { sceneController } from '../../Etc/sceneController';
const { ccclass, property } = _decorator;

@ccclass('statusController')
export class statusController extends Component {
    
    //STATS
    @property({type:CCFloat}) private health:number;
    @property({type:CCFloat}) private damage:number;

    
    private dead:boolean;

    //HURT CONDITIONS
    private isBeingHurt:boolean;
    private delayHurtTimer:number;

    //ORIGINAL HEALTH USED FOR PERCENTAGE
    private maxHealth:number;

    start() {

        this.maxHealth = this.health;
        this.dead = false;
        this.isBeingHurt = false;

        this.delayHurtTimer = 1;
    }

    isDead(){
        if(this.health<=0){
            console.log(this.health)
            
            this.dead = true;
            this.node.active = false;
            
            //Kurangin dari keseluruhan
            levelStats.minusEnemyAmount();
            
            //Kurangin dari fase sekarang
            levelStats.minusCurrentEnemyAmount();
            
            //LIAT JUMLAH MUSUH DI STAGE PERTAMA (CURRENT)
            if(levelStats.getCurrentEnemyAmount() == 0){
                levelStats.deacGate();
            }
            console.log(levelStats.getEnemyAmount());
            //AKTIVASI TELEPORT
            if(levelStats.getEnemyAmount()== 0){
                
                levelStats.activateTeleport();
            }

            //Kalau player yang mati
            if(this.node.name === "Player"){
                sceneController.loadScene("dead");
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


            // console.log(this.node.name + " health left : " + this.health);
            
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

    getHealthPercentage():number{
        return this.health/this.maxHealth;
    }

}


