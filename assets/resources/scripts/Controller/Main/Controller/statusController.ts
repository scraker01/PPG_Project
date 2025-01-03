import { _decorator, CCFloat, Component, Node } from 'cc';
import { levelStats } from '../../Etc/levelStats';
import { sceneController } from '../../Etc/sceneController';
import { EnemyMovement } from '../Enemy/EnemyMovement';
import { PlayerMovementController } from './PlayerMovementController';
import { spriteController } from '../../Etc/spriteController';
import { BossDirection } from '../Enemy/Boss/BossDirection';
import { BulletPool } from '../Bullet/BulletPool';
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
            // console.log(this.health)
            
            this.dead = true;

            //Node Enemy
            this.node.active = false;

            //Node Sprite

            console.log(this.node);
            // Untuk Kendali sprite Enemy
            if(this.node.name.split("-")[0] == "enemy"){
                this.node.getComponent(EnemyMovement).getSpriteConnection().setNodeDeactivate();
            }else if(this.node.name === "Player") { 
                // Untuk player
                this.node.getComponent(PlayerMovementController).getSprite().active = false;
                
            }else{
                // boss
                this.node.getComponent(BossDirection).getSpriteConnection().setNodeDeactivate();

                // Khusus untuk boss, mati langsung teleport
                levelStats.activateTeleport();
            }
            
            //Kurangin dari keseluruhan
            levelStats.minusEnemyAmount();
            
            //Kurangin dari fase sekarang
            levelStats.minusCurrentEnemyAmount();
            
            //LIAT JUMLAH MUSUH DI STAGE PERTAMA (CURRENT)
            if(levelStats.getCurrentEnemyAmount() == 0){
                levelStats.deacGate();
            }

            // console.log(levelStats.getEnemyAmount());
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


            if(this.node.name === "boss-node"){
                this.node.getComponent(BossDirection).getAnimationCon().playAnimation("hurt");
                let prcntg = this.health/this.maxHealth;

                let spawner = this.node.getParent().getParent().getChildByName("bullet-pool").getComponent(BulletPool);

                if(prcntg > 0.66){
                    spawner.condition(2);
                    
                }else if(prcntg > 0.33){
                    spawner.condition(3);
                    
                }else{
                    spawner.condition(4);
                }

            }

            this.isDead();

            this.isBeingHurt = true;

            
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

    getHealth():number{
        return this.health;
    }
    getHealthPercentage():number{
        return this.health/this.maxHealth;
    }

}


