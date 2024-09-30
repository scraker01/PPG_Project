import { _decorator, Component, lerp, Node, RigidBody, Vec3,PhysicsSystem, randomRangeInt} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnemyMovement')
export class EnemyMovement extends Component {
    private player:Node;  
    
    private playerPos:Vec3;
    private enemyPos:Vec3;
    private rb:RigidBody;

    //Range and Sight

    private sight:number;
    private range:number;
    private playerInAttackRange:boolean;
    private playerInSightRange:boolean;

    //
    private walkPointRange:number;
    private walkPointSet:boolean;
    private walkPoint:Vec3|null;

    start() {
        this.player = this.node.getParent().getParent().getChildByName("Player");
        this.rb = this.getComponent(RigidBody);

        this.playerInSightRange = false;
        this.playerInSightRange = false;

        this.walkPointRange = 2;
        this.walkPointSet = true;
    }
    
    update(deltaTime: number) {
        // console.log(this.playerPos);
        // console.log(this.node.getPosition());
        // this.node.getPosition(this.enemyPos);
        


        this.player.getPosition(this.playerPos);    
        
        if(!this.playerInSightRange && !this.playerInAttackRange) this.patrol();
        if(this.playerInSightRange && !this.playerInAttackRange) this.chase();
        if(this.playerInSightRange && this.playerInAttackRange) this.attack();

        // Vec3.moveTowards()
        
    }

    private patrol(){
        if(!this.walkPointSet) this.searchWalkPoint();

        if(this.walkPointSet){
            this.node.getPosition(this.enemyPos);
            // Vec3.moveTowards(this.enemyPos,this.enemyPos,this.walkPoint,2);
            this.node.translate(Vec3.moveTowards(this.enemyPos,this.enemyPos,this.walkPoint,this.walkPointRange));
        }

        let distToWalkPoint= new Vec3(this.enemyPos.x-this.walkPoint.x,this.enemyPos.y-this.walkPoint.y,this.enemyPos.z-this.walkPoint.z);
        
        console.log(this.enemyPos);
        
        if(Math.sqrt(distToWalkPoint.x*distToWalkPoint.x+distToWalkPoint.y*distToWalkPoint.y+distToWalkPoint.z*distToWalkPoint.z)<1){
            this.walkPointSet = false;
        }
    }

    private searchWalkPoint(){
        // this.node.getPosition(this.enemyPos);
        this.enemyPos = this.node.getPosition();

        let randomX = randomRangeInt(-this.walkPointRange, this.walkPointRange);
        let randomZ = randomRangeInt(-this.walkPointRange, this.walkPointRange);
    
        this.walkPoint = new Vec3(this.enemyPos.x+randomX,this.enemyPos.y,this.enemyPos.z+randomZ)

        this.walkPointSet=true;
    
    }

    private chase(){
        this.node.getPosition(this.enemyPos);
        this.node.setPosition(Vec3.moveTowards(this.enemyPos,this.enemyPos,this.playerPos,this.walkPointRange));
    }


    private attack(){
        //TODO
    }

    private checkDistToPlayer(){
        
    }

}


