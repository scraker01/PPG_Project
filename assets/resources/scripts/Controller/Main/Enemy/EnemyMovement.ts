import { _decorator, Component, lerp, Node, RigidBody, Vec3,PhysicsSystem, randomRangeInt, misc} from 'cc';
const { ccclass, property } = _decorator;
import { EnemyController } from '../Controller/EnemyController';
import { levelStats } from '../../Etc/levelStats';

@ccclass('EnemyMovement')
export class EnemyMovement extends Component {
    private walkPointRange:number;
    private player:Node;  
    
    private playerPos:Vec3;
    private enemyPos:Vec3;
    private rb:RigidBody;

    private spriteHolder;
    

    start() {
        this.player = this.node.getParent().getParent().getChildByName("Player");
        this.rb = this.getComponent(RigidBody);
        
        this.walkPointRange = 5;
        
        this.spriteHolder = this.node.getParent().getParent().getChildByName("spriteHolder");
       
        // this.walkPointSet = true;
    }
    
    update(deltaTime: number) {

        //Untuk HealthBar
        let healthBar;
        let i =1;
        // console.log(levelStats.getEnemyAmount());

        //Ga bisa gini soalnya nanti dikurangin enemyAmountnya
        //Pakai total EnemyAmount soalnya nanti dikurangin kalo enemyAmount biasa
        console.log(levelStats.getTotalEnemyAmount());
        for(i;i<=levelStats.getTotalEnemyAmount();i++){
            let enemyCounter = "enemy-dummy"+i;
            let spriteCounter = "enemySprite"+i;

            if(this.node.name === enemyCounter){
                healthBar = this.spriteHolder.getChildByName(`${spriteCounter}`);
                let nodeWorldPos = this.node.getWorldPosition();
                healthBar.setWorldPosition(nodeWorldPos);

                
            }

        }


        // posisi dalam Vec3
        let playerPos = this.player.getPosition();  
        let enemyPos = this.node.getPosition();   


        // console.log(this.node.getParent().name)
        

        // Arah enemy ke player
        let direction = new Vec3(
            playerPos.x - enemyPos.x,
            playerPos.y - enemyPos.y,
            playerPos.z - enemyPos.z
        );

        
        let dist = new Vec3(direction.x,direction.y,direction.z);
        
        // console.log(direction.length())
        
        if(direction.length() > 1 && direction.length() < this.walkPointRange){
            

            //Normalisasi arah vektor
            dist.normalize();
    
            // Bergerak ke arah player
            let moveSpeed = 1; // Set movement speed
            let moveStep = dist.multiplyScalar(moveSpeed * deltaTime);
            let newEnemyPos = enemyPos.add(moveStep);
    
            // if(this.node.getParent().name === "spawner"){
            //     console.log("move step   :"+moveStep); 
            //     console.log("enemy pos :"+newEnemyPos); 

            // }

            // set posisi baru dari enemy
            this.node.setPosition(newEnemyPos);
            // this.rb.setLinearVelocity(moveStep);
            
    
            // rotate enemy menghadap ke player
            // XZ digunakan untuk arah rotasinya
            let angleToPlayer = Math.atan2(dist.x, dist.z); // angle dalam radians

            this.node.setRotationFromEuler(0, misc.radiansToDegrees(angleToPlayer), 0);

            //untuk healthbar, supaya tidak dirotate
            // this.node.getChildByName("healthBarNode").setRotationFromEuler(new Vec3(0,0,0));
        } 

        if(direction.length() <= 1){
            

            this.getComponent(EnemyController).attack();
            
            //Todo : implementasi 
            
        }
    }

    private checkDistToPlayer(playerPos, enemyPos){
        return Math.sqrt(Math.pow((playerPos.x - enemyPos.x),2)+Math.pow((playerPos.z - enemyPos.z),2))
    }

    
}


