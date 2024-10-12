import { _decorator, Component, lerp, Node, RigidBody, Vec3,PhysicsSystem, randomRangeInt, misc} from 'cc';
const { ccclass, property } = _decorator;
import { HitboxController } from '../Controller/HitboxController';
import { EnemyController } from '../Controller/EnemyController';

@ccclass('EnemyMovement')
export class EnemyMovement extends Component {
    private walkPointRange:number;
    private player:Node;  
    
    private playerPos:Vec3;
    private enemyPos:Vec3;
    private rb:RigidBody;

    

    start() {
        this.player = this.node.getParent().getParent().getChildByName("Player");
        this.rb = this.getComponent(RigidBody);
        
        this.walkPointRange = 5;
       
        // this.walkPointSet = true;
    }
    
    update(deltaTime: number) {

        // posisi dalam Vec3
        let playerPos = this.player.getPosition();  // Assume you have a player node
        let enemyPos = this.node.getPosition();    // Assume you have an enemy node

        // Arah enemy ke player
        let direction = new Vec3(
            playerPos.x - enemyPos.x,
            playerPos.y - enemyPos.y,
            playerPos.z - enemyPos.z
        );

        let dist = new Vec3(direction.x,direction.y,direction.z);

        if(direction.length() > 1 && direction.length() < this.walkPointRange){

            //Normalisasi arah vektor
            dist.normalize();
    
            // Bergerak ke arah player
            let moveSpeed = 1; // Set movement speed
            let moveStep = dist.multiplyScalar(moveSpeed * deltaTime);
            let newEnemyPos = enemyPos.add(moveStep);
    

            // set posisi baru dari enemy
            this.node.setPosition(newEnemyPos);
            // this.rb.setLinearVelocity(moveStep);
            
    
            // rotate enemy menghadap ke player
            // XZ digunakan untuk arah rotasinya
            let angleToPlayer = Math.atan2(dist.x, dist.z); // angle dalam radians
            this.node.setRotationFromEuler(0, misc.radiansToDegrees(angleToPlayer), 0);
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


