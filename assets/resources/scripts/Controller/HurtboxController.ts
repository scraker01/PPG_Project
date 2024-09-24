import { _decorator, BoxCollider, CapsuleCollider, Collider, CollisionEventType, Component, EColliderType, ICollisionEvent, Node, RigidBody } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('HurtboxController')
export class HurtboxController extends Component {
    private collider: CapsuleCollider;
    private rb: RigidBody;

    start() {
        // this.hitboxActive = this.node.active;
        this.collider = this.getComponent(CapsuleCollider);
        this.rb = this.getComponent(RigidBody);
        this.rb.useCCD = true;

        this.collider.on('onCollisionEnter',this.onCollisionEnter,this);
        this.collider.addMask(1);
    
    }

   onCollisionEnter(event: ICollisionEvent) {
        const otherNode = event.otherCollider.node;
        console.log("Collided with: ", otherNode.name);
        // Handle collision response
    }

    
    

    update(deltaTime: number) {
        
    }
}


