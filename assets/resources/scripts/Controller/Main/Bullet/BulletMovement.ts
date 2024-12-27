import { _decorator, Component, ICollisionEvent, Node, randomRangeInt, SphereCollider, Vec3 } from 'cc';
import { healthBarController } from '../../Etc/healthBarController';
import { statusController } from '../Controller/statusController';
import { HurtboxController } from '../Controller/HurtboxController';
const { ccclass, property } = _decorator;

@ccclass('BulletMovement')
export class BulletMovement extends Component {

    private collider : SphereCollider;
    private vec : Vec3;

    protected start(): void {
        this.collider = this.getComponent(SphereCollider); 

        this.collider.on('onCollisionEnter',this.impact, this);
        this.vec = new Vec3(0,0,0);
    }

    protected update(dt: number): void {
        this.vec = new Vec3(
            this.vec.x+randomRangeInt(0,10),
            this.vec.y+randomRangeInt(0,10),
            this.vec.z+randomRangeInt(0,10)

        );

        this.node.setRotationFromEuler(
            this.vec
        );
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


