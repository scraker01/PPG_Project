import { _decorator, BoxCollider, CapsuleCollider, Collider, Component, ICollisionEvent, ITriggerEvent, Node, randomRangeInt, RigidBody } from 'cc';
import { EnemyController } from './EnemyController';
import { teleporter } from '../../Etc/teleporter';
import { statusController } from './statusController';
import { healthBarController } from '../../Etc/healthBarController';
import { levelStats } from '../../Etc/levelStats';
import { AnimationController } from './AnimationController';
import { spriteController } from '../../Etc/spriteController';
import { staticData } from '../../Etc/staticData';
import { AudioManager } from '../../Etc/AudioManager';
const { ccclass, property } = _decorator;

@ccclass('HurtboxController')
export class HurtboxController extends Component {
    // @property({type:EnemyController}) private entityCon:EnemyController|null;
    
    private spriteHolder:Node|null;

    private collider: CapsuleCollider | BoxCollider;

    private rb: RigidBody;

    private audioManager:AudioManager;

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
            this.audioManager = this.node.getParent().  //dari player ke world
                                        getParent().
                                        getChildByName("Components").
                                        getChildByName("AudioManager").
                                        getComponent(AudioManager);
            
        }else{ //Sprite Holder kalau enemy
            this.spriteHolder = this.node.getParent().getParent().getChildByName("spriteHolder");
            
            this.audioManager = this.node.getParent().  // dari enemy-dummy ke enemies
                                        getParent().    // baru ke world
                                        getParent().
                                        getChildByName("Components").
                                        getChildByName("AudioManager").
                                        getComponent(AudioManager);
            // console.log(this.spriteHolder.children)
        }
        
        
    }


   onCollisionEnter(event: ICollisionEvent) {
        // Handle collision response

        const otherNode = event.otherCollider.node;
        const selfNode = event.selfCollider.node;

        //Musuh dipukul sama Player
        if(selfNode.name==="enemy-dummy" && otherNode.name === "Player"){
            selfNode.getComponent(EnemyController).changeMesh();
        }

    }

    /* Catatan untuk audio
        0-1 attack
        2-5 momon dan player
        6 boss
    */

    private onTriggerEnter(event: ITriggerEvent) {
        const otherNode = event.otherCollider.node;
        const selfNode = event.selfCollider.node;

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

                // 6
                this.audioManager.onAudioQueue(6);
            } 

            let randomNumberAudio = randomRangeInt(2,5);;


            // Untuk Player & Enemy
            if(selfEntity === "Playe"){
                healthBar = this.spriteHolder.getChildByName("playerSprite").getChildByName("healthBarNode").getComponent(healthBarController);

                // audio
                this.audioManager.onAudioQueue(randomNumberAudio);

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

                        // audio
                        this.audioManager.onAudioQueue(randomNumberAudio);
                        
                        
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
            
            // woosh
            this.audioManager.queueByName("woosh");
        }

        
        // Logic for when something enters the trigger zone
    }

    public getSpriteHolder():Node{
        return this.spriteHolder;
    }

}


