import { _decorator, CCInteger, Component, misc, Node, RigidBody, Vec3 } from 'cc';
import { levelStats } from '../../../Etc/levelStats';
import { spriteController } from '../../../Etc/spriteController';
import { AnimationController } from '../../Controller/AnimationController';
import { EnemyController } from '../../Controller/EnemyController';
const { ccclass, property } = _decorator;

@ccclass('BossDirection')
export class BossDirection extends Component {
    @property({type:CCInteger}) 
    private maxDistance:number;

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
    
    // 
    private isActivated:boolean;
    private activationRange:number;


    start() {
        this.player = this.node.getParent().getParent().getChildByName("Player");
        this.rb = this.getComponent(RigidBody);
        
        this.activationRange = 17;

        
        this.spriteHolder = this.node.getParent().getParent().getChildByName("spriteHolder");
       
        // this.walkPointSet =  true;

        this.isSpriteConnected = false;
        this.isActivated =false;

    }
    
    update(deltaTime: number) {

        //Untuk HealthBar
        let sprite;


        // if(!this.isSpriteConnected){
        let spriteCounter = "boss-node";

        
        sprite = this.spriteHolder.getChildByName(`${spriteCounter}`);

        let nodeWorldPos = this.node.getWorldPosition();
        sprite.setWorldPosition(nodeWorldPos);

        this.AnimationConnection = sprite.getComponent(AnimationController);
        this.spriteConnection = sprite.getComponent(spriteController);
            
            // this.isSpriteConnected = true;
            
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
        
        if(this.isActivated){
            
            //Normalisasi arah vektor
            dist.normalize();

            // console.log("normalize distance : "+dist.length())
    
            // rotate enemy menghadap ke player
            // XZ digunakan untuk arah rotasinya
            let angleToPlayer = Math.atan2(dist.x, dist.z); // angle dalam radians

            this.node.setRotationFromEuler(0, misc.radiansToDegrees(angleToPlayer), 0);

            //Implementasi animasi dan arah
            let x = direction.x;
            let z = direction.z;

            /*
            Z < 0 ke belakang
            Z > 0 ke depan

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
            

        } 
        //Kondisi Aktivasi boss 
        if(!this.isActivated && directionLength < this.activationRange ){
            
            this.isActivated = true;
            
        }
        // this.AnimationConnection.playAnimation("idle");

        // console.log(this.isActivated);
    }

    getSpriteConnection():spriteController{
        return this.spriteConnection;
    }
    

    playAttackAnimation(clipname:string){
        this.AnimationConnection.playAnimation(clipname);
    }

    getAnimationCon():AnimationController{
        return this.AnimationConnection;
    }
}


