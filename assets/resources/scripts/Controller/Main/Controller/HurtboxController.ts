import { _decorator, BoxCollider, CapsuleCollider, Collider, Component, ICollisionEvent, ITriggerEvent, Node, RigidBody } from 'cc';
import { EnemyController } from './EnemyController';
import { teleporter } from '../../Etc/teleporter';
import { statusController } from './statusController';
import { healthBarController } from '../../Etc/healthBarController';
import { levelStats } from '../../Etc/levelStats';
import { AnimationController } from './AnimationController';
import { spriteController } from '../../Etc/spriteController';
import { staticData } from '../../Etc/staticData';
const { ccclass, property } = _decorator;

@ccclass('HurtboxController')
export class HurtboxController extends Component {
    // @property({type:EnemyController}) private entityCon:EnemyController|null;
    
    private spriteHolder:Node|null;

    private collider: CapsuleCollider | BoxCollider;

    private rb: RigidBody;

    

    start() {
        // this.hitboxActive = this.node.active;
        this.collider = this.getComponent(CapsuleCollider);
        if(!this.collider){
            this.collider = this.getComponent(BoxCollider);
        }
        this.rb = this.getComponent(RigidBody);
        this.rb.useCCD = true;

        this.collider.on('onCollisionEnter',this.onCollisionEnter,this);
        this.collider.on('onTriggerEnter', this.onTriggerEnter, this);
        this.collider.addMask(1);


        //Sprite Holder kalau dia player
        if(this.node.name === "Player"){
            this.spriteHolder = this.node.getParent().getChildByName("spriteHolder");
            
        }else{ //Sprite Holder kalau enemy
            this.spriteHolder = this.node.getParent().getParent().getChildByName("spriteHolder");
            // console.log(this.spriteHolder.children)
        }
    }

   onCollisionEnter(event: ICollisionEvent) {
        // Handle collision response

        const otherNode = event.otherCollider.node;
        const selfNode = event.selfCollider.node;

        // console.log('Trigger Enter:', event.type, otherNode.name);
        // console.log('Collision Enter SelfNode:', event.type, selfNode.name);
        // console.log('Collision Enter OtherNode:', event.type, otherNode.name);

        //Musuh dipukul sama Player
        if(selfNode.name==="enemy-dummy" && otherNode.name === "Player"){
            selfNode.getComponent(EnemyController).changeMesh();
        }

    }

    private onTriggerEnter(event: ITriggerEvent) {
        const otherNode = event.otherCollider.node;
        const selfNode = event.selfCollider.node;

        // console.log('Trigger Enter:', event.type, otherNode.name);
        // console.log('Trigger Enter SelfNode:', event.type, selfNode.name);
        // console.log('Trigger Enter OtherNode:', event.type, otherNode.name);
        

        // //Musuh dipukul sama Player
        // if(selfNode.name==="enemy-dummy" && otherNode.name === "Player"){
        //     selfNode.getComponent(EnemyController).changeMesh();
        // }

        // //Player dipukul sama Musuh
        // if(selfNode.name==="Player" && otherNode.name === "enemy-dummy"){
        //     selfNode.getComponent(EnemyController).changeMesh();
        // }

        //Hurtbox detect di trigger oleh rb siapa
        let selfEntity:string = selfNode.name.substring(0,5);
        let otherEntity:string = otherNode.name.substring(0,5);

        // console.log(selfEntity+" "+otherEntity)

        if( (selfEntity==="Playe" && otherEntity==="hitbo") || (selfEntity==="enemy" && otherEntity==="hitbo") || (selfEntity==="boss-")  ){

            let stats:statusController|null= selfNode.getComponent(statusController);
            
            let healthBar : healthBarController | null;

            // Untuk boss
            if(selfEntity === "boss-"){
                healthBar = this.spriteHolder.getChildByName("boss-node").getChildByName("healthBarNode").getComponent(healthBarController);
            } 

            // Untuk Player & Enemy
            if(selfEntity === "Playe"){
                healthBar = this.spriteHolder.getChildByName("playerSprite").getChildByName("healthBarNode").getComponent(healthBarController);
            } 
            else{
                let i=1;

                //Pakai total EnemyAmount soalnya nanti dikurangin kalo enemyAmount biasa malah salah hitungan
                for (i;i<= levelStats.getTotalEnemyAmount() ;i++){
                    let enemyCounter = "enemy-dummy" +i;
                    let spriteCounter = "enemySprite"+i;

                    // console.log(selfNode.name +" "+ enemyCounter)
                    if(selfNode.name === enemyCounter){
                        let enemy = this.spriteHolder.getChildByName(`${spriteCounter}`);
                        
                        if(enemy){
                            healthBar = enemy.getChildByName("healthBarNode").getComponent(healthBarController);

                        }

                        //Bagian untuk atur animasi kena hit depan / belakang
                        let animationConnection:AnimationController = enemy.getComponent(AnimationController);
                        let spriteConnection:spriteController = enemy.getComponent(spriteController);

                        if(spriteConnection.getFacingFront()){
                            animationConnection.playAnimation("hurtFront");
                        }else{
                            animationConnection.playAnimation("hurtBack");
                            
                        }
                        // console.log(this.spriteHolder.getChildByName(`${spriteCounter}`));
                        
                        break;
                    }
                }
            }

            
            if(stats != null){
                let dmg = stats.getDamageStat();


                let isBeingHurt = stats.getHurtCondition();
                
                if(!isBeingHurt){

                    //Kurangin darah
                    stats.receiveDamage(dmg);
                    
                    //Set scale dari greenbar
                    healthBar.reduceGreenbar(stats.getHealthPercentage());


                    this.scheduleOnce(()=>{

                        stats.deactivateHurtCondition();

                    },stats.getHurtTimer());                    

                }
            }
        }


        //Gate (buat ke stage/scene selanjutnya) 
        if(selfNode.name==="Player" && otherNode.name === "tp1"){
            staticData.level+=1;
            otherNode.getParent().getParent().getChildByName("tp").getChildByName("tp1").getComponent(teleporter).toNextStage();
            // otherNode.getComponent(Gate).makeItDisappear();
        }

        
        // Logic for when something enters the trigger zone
    }

    public getSpriteHolder():Node{
        return this.spriteHolder;
    }

}


