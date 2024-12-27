import { _decorator, Component, lerp, Node, RigidBody, Vec3, misc, Animation} from 'cc';
const { ccclass, property } = _decorator;
import { EnemyController } from '../Controller/EnemyController';
import { levelStats } from '../../Etc/levelStats';
import { AnimationController } from '../Controller/AnimationController';
import { spriteController } from '../../Etc/spriteController';


@ccclass('EnemyMovement')
export class EnemyMovement extends Component {
    private furthestWalkRange:number;
    private closestWalkRange:number;
    private player:Node;  
    
    private playerPos:Vec3;
    private enemyPos:Vec3;
    private rb:RigidBody;

    //Untuk Sprite
    private spriteHolder:Node;
    private isSpriteConnected:boolean;
    
    //Untuk Animasi
    private AnimationConnection:AnimationController|null;
    private spriteConnection:spriteController|null;
    private effectRenderAnimation:Animation;
    private attackDuration:number;



    start() {
        this.player = this.node.getParent().getParent().getChildByName("Player");
        this.rb = this.getComponent(RigidBody);
        
        this.furthestWalkRange = 5;
        this.closestWalkRange = 1;
        
        this.spriteHolder = this.node.getParent().getParent().getChildByName("spriteHolder");
       
        // this.walkPointSet = true;

        this.isSpriteConnected = false;

        this.effectRenderAnimation = this.node.getChildByName("hitboxNode").getChildByName("effectRender").getComponent(Animation);
        
        if(this.attackDuration==0){
    
            this.effectRenderAnimation.clips.forEach((clip)=>{
                if(clip.name === "enemyAttack"){
                    this.attackDuration = clip.duration;
                }
            });
        
        }

    }
    
    update(deltaTime: number) {

        //Untuk HealthBar
        let sprite;
        let i =1;
        // console.log(levelStats.getEnemyAmount());

        //Ga bisa gini soalnya nanti dikurangin enemyAmountnya
        //Pakai total EnemyAmount soalnya nanti dikurangin kalo enemyAmount biasa
      
        for(i;i<=levelStats.getTotalEnemyAmount();i++){
            let enemyCounter = "enemy-dummy"+i;
            let spriteCounter = "enemySprite"+i;

            if(this.node.name === enemyCounter){
                sprite = this.spriteHolder.getChildByName(`${spriteCounter}`);

                let nodeWorldPos = this.node.getWorldPosition();
                sprite.setWorldPosition(nodeWorldPos);

                //Konek sprite untuk pertama kalinya
                if(!this.isSpriteConnected){
                    this.isSpriteConnected= true;

                    this.AnimationConnection = sprite.getComponent(AnimationController);
                    this.spriteConnection = sprite.getComponent(spriteController);
                }
            }

        }

            // let enemyCounter = "enemy-dummy"+i;
            // let spriteCounter = "enemySprite"+i;
            // if(this.node.name === enemyCounter){
            //     sprite = this.spriteHolder.getChildByName(`${spriteCounter}`);

            //     let nodeWorldPos = this.node.getWorldPosition();
            //     sprite.setWorldPosition(nodeWorldPos);

            //     //Konek sprite untuk pertama kalinya
            //     if(!this.isSpriteConnected){
            //         this.isSpriteConnected= true;

            //         this.AnimationConnection = sprite.getComponent(AnimationController);
            //         this.spriteConnection = sprite.getComponent(spriteController);
            //     }
            // }


        


        // posisi dalam Vec3
        let playerPos = this.player.getWorldPosition();  
        let enemyPos = this.node.getWorldPosition();   


        // console.log(this.node.getParent().name)
        

        // Arah enemy ke player
        let direction = new Vec3(
            playerPos.x - enemyPos.x,
            playerPos.y - enemyPos.y,
            playerPos.z - enemyPos.z
        );

        //Dipisah untuk arah dan jaraknya
        let dist = new Vec3(direction.x,direction.y,direction.z);
        
        let directionLength = direction.length();
        
        // console.log("direction length : "+direction.length())
        
        if(directionLength > this.closestWalkRange && directionLength < this.furthestWalkRange){
            
            //Normalisasi arah vektor
            dist.normalize();

            // console.log("normalize distance : "+dist.length())
    
            // Bergerak ke arah player
            let moveSpeed = 1; // Set movement speed
            let moveStep = dist.multiplyScalar(moveSpeed * deltaTime);
            let newEnemyPos = enemyPos.add(moveStep);

            // set posisi baru dari enemy
            this.node.setWorldPosition(newEnemyPos);
            // this.rb.setLinearVelocity(moveStep);
            
    
            // rotate enemy menghadap ke player
            // XZ digunakan untuk arah rotasinya
            let angleToPlayer = Math.atan2(dist.x, dist.z); // angle dalam radians

            this.node.setRotationFromEuler(0, misc.radiansToDegrees(angleToPlayer), 0);

            //Implementasi animasi dan arah
            let x = direction.x;
            let z = direction.z;

            /*

            Z < 0 ke belakang
            Z > 0 ke depan          Hadap ke kamera

            X < 0 ke kiri
            X > 0 ke kanan
            */

            if(x>0){
                
                if(!this.spriteConnection.getFacingRight()){
                    this.spriteConnection.flip();
                }
                
            } else if(x<0){
                if(this.spriteConnection.getFacingRight()){
                    this.spriteConnection.flip();
                }
                
            }
            
            if(z>0){
                if(!this.spriteConnection.getFacingFront()){
                    this.spriteConnection.setFacingFront();
                }
            }else if(z<0){
                if(this.spriteConnection.getFacingFront()){
                    this.spriteConnection.setFacingFront();
                }
            }



            //Di dalam jarak serangan
            if(directionLength < this.closestWalkRange+0.5){

                let enemyCon : EnemyController = this.getComponent(EnemyController);
                let canAttack = enemyCon.getCanAttack();
                let timing = enemyCon.getTiming();


                //Pakai timing (delay) supaya tidak langsung serang (ada cooldown / chargenya)
                if(canAttack && timing === 0){

                    //Set animasi serangan ke depan
                    if(this.spriteConnection.getFacingFront()){
                        this.scheduleOnce(()=>{
                            this.AnimationConnection.playAnimation("attackFront");

                        },this.attackDuration);
                    }
                    //Set animasi serangan ke belakang
                    else{

                        this.scheduleOnce(()=>{

                            this.AnimationConnection.playAnimation("attackBack");
                        },this.attackDuration);

                    }

                    //Serang
                    enemyCon.attack();
                    
                    //Mainkan animasi
                    this.effectRenderAnimation.play("enemyAttack");

                }

            }
            //Di luar jarak
            else{

                if(this.spriteConnection.getFacingFront()){
                    this.AnimationConnection.playAnimation("walkFront");
                }else{
                    this.AnimationConnection.playAnimation("walkBack");

                }
            }
        
                        
        } 

    }

    getSpriteConnection():spriteController{
        return this.spriteConnection;
    }
    
    setUpBossNode(){

    }

}


