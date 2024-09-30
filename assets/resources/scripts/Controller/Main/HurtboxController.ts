import { _decorator, CapsuleCollider, Component, ICollisionEvent, ITriggerEvent, Node, RigidBody } from 'cc';
import { EnemyController } from './EnemyController';
import { PlayerMovementController } from './PlayerMovementController';
const { ccclass, property } = _decorator;

@ccclass('HurtboxController')
export class HurtboxController extends Component {
    @property({type:EnemyController}) private entityCon:EnemyController;
    private collider: CapsuleCollider;

    private rb: RigidBody;

    start() {
        // this.hitboxActive = this.node.active;
        this.collider = this.getComponent(CapsuleCollider);
        this.rb = this.getComponent(RigidBody);
        this.rb.useCCD = true;

        this.collider.on('onCollisionEnter',this.onCollisionEnter,this);
        this.collider.on('onTriggerEnter', this.onTriggerEnter, this);
        this.collider.addMask(1);

        
        
    }

   onCollisionEnter(event: ICollisionEvent) {
        const otherNode = event.otherCollider.node;
        console.log("Collided with: ", otherNode.name);
        // Handle collision response
    }

    private onTriggerEnter(event: ITriggerEvent) {
        // const otherNode = event.otherCollider.node;
        const selfNode = event.selfCollider.node;

        // console.log('Trigger Enter:', event.type, otherNode.name);
        console.log('Trigger Enter:', event.type, selfNode.name);

        if(selfNode.name==="enemy-dummy"){
            selfNode.getComponent(EnemyController).changeMesh();
        }
        
        // Logic for when something enters the trigger zone
    }
}


