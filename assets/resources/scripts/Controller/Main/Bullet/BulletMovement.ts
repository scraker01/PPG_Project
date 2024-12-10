import { _decorator, Component, ICollisionEvent, Node, SphereCollider } from 'cc';
import { healthBarController } from '../../Etc/healthBarController';
import { statusController } from '../Controller/statusController';
import { HurtboxController } from '../Controller/HurtboxController';
const { ccclass, property } = _decorator;

@ccclass('BulletMovement')
export class BulletMovement extends Component {

    private collider : SphereCollider;

    protected start(): void {
        this.collider = this.getComponent(SphereCollider); 

        this.collider.on('onCollisionEnter',this.impact, this);
    }

    protected update(dt: number): void {
        // console.log(this.node.getPosition().y)
    }

    impact(event:ICollisionEvent){
        const otherNode = event.otherCollider.node;

        console.log("isDefaultTerrain "+ otherNode.name);

        
        if(otherNode.name === "Player" ){
            // init
            let hurtbox : HurtboxController | null = otherNode.getComponent(HurtboxController);

            // spriteHolder, untuk ubah healthbar dari player 
            let spriteHolder = hurtbox.getSpriteHolder();
            
            let healthBar = spriteHolder.getChildByName("playerSprite").getChildByName("healthBarNode").getComponent(healthBarController);
            
            //status controller dari player
            let stats : statusController | null = otherNode.getComponent(statusController);

            // Damage dari bullet
            let bulletDmg = this.node.getComponent(statusController).getDamageStat();
            
            if(!stats.getHurtCondition()){
            
            //update status darah dan healthbarnya player 
            stats.receiveDamage(bulletDmg);

            healthBar.reduceGreenbar(stats.getHealthPercentage());

        
            this.scheduleOnce(()=>{

                stats.deactivateHurtCondition();

            },stats.getHurtTimer());    

            }



        }
        
        this.deactivateNode();
    }

    deactivateNode(){
        // this.node.getParent().active = false;
       
        this.node.active = false;
    }

    
}


