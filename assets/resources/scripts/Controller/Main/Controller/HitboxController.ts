import { _decorator, Component, Node, BoxCollider, RigidBody, EventKeyboard, KeyCode, input, Input, MeshRenderer, CollisionEventType, CapsuleCollider, Collider, ICollisionEvent, ITriggerEvent } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('HitboxController')
export class HitboxController extends Component {
    private collider: BoxCollider;
    private rb: RigidBody;

    private effectRenderAnimation:Animation|null;
    start() {
        // this.hitboxActive = this.node.active;
        this.collider = this.getComponent(BoxCollider);
        this.rb = this.getComponent(RigidBody);
        // this.rb.useCCD = true;

        // if(this.node.getParent().getParent().name==="Player"){
        //     input.on(Input.EventType.KEY_DOWN,this.keydown,this);
        // }        

        this.node.active=false;
    }

    // Testing
    // keydown(event: EventKeyboard){
    //     switch(event.keyCode){
    //         case KeyCode.KEY_J:
    //             this.activateHitbox();
    //             break;
    //     }
    // }

    activateHitbox(){
        this.node.active = true;
        this.scheduleOnce(()=>{
            
            if(this.node.active){
                this.node.active= false;
            }
        },0.5);
    }
}


