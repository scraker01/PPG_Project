import { _decorator, Component, lerp, Node, RigidBody, Vec3,PhysicsSystem, randomRangeInt, misc} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnemyMovement')
export class EnemyMovement extends Component {
    private walkPointRange:number;
    private player:Node;  
    
    private playerPos:Vec3;
    private enemyPos:Vec3;
    private rb:RigidBody;

    //Range and Sight

    // private sight:number;
    // private range:number;
    // private playerInAttackRange:boolean;
    // private playerInSightRange:boolean;

    // //
    // private walkPointSet:boolean;
    // private walkPoint:Vec3|null;

    start() {
        this.player = this.node.getParent().getParent().getChildByName("Player");
        this.rb = this.getComponent(RigidBody);

        // this.playerInSightRange = false;
        // this.playerInSightRange = false;
        
        this.walkPointRange = 5;
        // this.walkPointSet = true;
    }
    
    update(deltaTime: number) {
        // console.log(this.playerPos);
        // console.log(this.node.getPosition());
        // this.node.getPosition(this.enemyPos);
        


        // this.player.getPosition(this.playerPos);    
        
        // if(!this.playerInSightRange && !this.playerInAttackRange) this.patrol();
        // if(this.playerInSightRange && !this.playerInAttackRange) this.chase();
        // if(this.playerInSightRange && this.playerInAttackRange) this.attack();

        // Vec3.moveTowards()

        // Player and node positions in Vec3
        let playerPos = this.player.getPosition();  // Assume you have a player node
        let enemyPos = this.node.getPosition();    // Assume you have an enemy node

        // Calculate direction from node to player
        let direction = new Vec3(
            playerPos.x - enemyPos.x,
            playerPos.y - enemyPos.y,
            playerPos.z - enemyPos.z
        );

        if(direction.length() > 1 && direction.length() < this.walkPointRange){

            // Normalize the direction to get the unit vector
            direction.normalize();
    
    
            // Move the node in the direction of the player
            let moveSpeed = 1; // Set your desired movement speed
            let moveStep = direction.multiplyScalar(moveSpeed * deltaTime);
            let newEnemyPos = enemyPos.add(moveStep);
    

            // Set the new position of the enemy
            this.node.setPosition(newEnemyPos);
            // this.rb.setLinearVelocity(moveStep);
            
    
            // Rotate the node to face the player
            // Assuming Y-axis is up, we'll use the XZ plane for rotation
            let angleToPlayer = Math.atan2(direction.x, direction.z); // Calculate the angle in radians
            this.node.setRotationFromEuler(0, misc.radiansToDegrees(angleToPlayer), 0);
        }

    }

    private checkDistToPlayer(playerPos, enemyPos){
        return Math.sqrt(Math.pow((playerPos.x - enemyPos.x),2)+Math.pow((playerPos.z - enemyPos.z),2))
    }



    // private patrol(){
    //     if(!this.walkPointSet) this.searchWalkPoint();

    //     if(this.walkPointSet){
    //         this.node.getPosition(this.enemyPos);
    //         // Vec3.moveTowards(this.enemyPos,this.enemyPos,this.walkPoint,2);
    //         this.node.translate(Vec3.moveTowards(this.enemyPos,this.enemyPos,this.walkPoint,this.walkPointRange));
    //     }

    //     let distToWalkPoint= new Vec3(this.enemyPos.x-this.walkPoint.x,this.enemyPos.y-this.walkPoint.y,this.enemyPos.z-this.walkPoint.z);
        
    //     console.log(this.enemyPos);
        
    //     if(Math.sqrt(distToWalkPoint.x*distToWalkPoint.x+distToWalkPoint.y*distToWalkPoint.y+distToWalkPoint.z*distToWalkPoint.z)<1){
    //         this.walkPointSet = false;
    //     }
    // }

    // private searchWalkPoint(){
    //     // this.node.getPosition(this.enemyPos);
    //     this.enemyPos = this.node.getPosition();

    //     let randomX = randomRangeInt(-this.walkPointRange, this.walkPointRange);
    //     let randomZ = randomRangeInt(-this.walkPointRange, this.walkPointRange);
    
    //     this.walkPoint = new Vec3(this.enemyPos.x+randomX,this.enemyPos.y,this.enemyPos.z+randomZ)

    //     this.walkPointSet=true;
    
    // }

    // private chase(){
    //     this.node.getPosition(this.enemyPos);
    //     this.node.setPosition(Vec3.moveTowards(this.enemyPos,this.enemyPos,this.playerPos,this.walkPointRange));
    // }


    // private attack(){
    //     //TODO
    // }

    
}


