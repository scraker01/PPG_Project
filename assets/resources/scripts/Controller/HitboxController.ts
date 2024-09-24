import { _decorator, Component, Node, BoxCollider, RigidBody, EventKeyboard, KeyCode, input, Input, MeshRenderer, CollisionEventType, CapsuleCollider, Collider, ICollisionEvent, ITriggerEvent } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('HitboxController')
export class HitboxController extends Component {
    private collider: BoxCollider;
    private rb: RigidBody;

    start() {
        // this.hitboxActive = this.node.active;
        this.collider = this.getComponent(BoxCollider);
        this.rb = this.getComponent(RigidBody);
        this.rb.useCCD = true;

        
        input.on(Input.EventType.KEY_DOWN,this.keydown,this);
        // this.collider.on();
        this.node.active=false;

        this.collider.addMask(2);
        this.collider.on('onTriggerEnter', this.onTriggerEnter, this);
        // this.collider.on('onTriggerStay', this.onTriggerStay, this);
        // this.collider.on('onTriggerExit', this.onTriggerExit, this);    
    }

    update(deltaTime: number) {

    }

    private onTriggerEnter(event: ITriggerEvent) {
        console.log('Trigger Enter:', event.type, event);
        // Logic for when something enters the trigger zone
    }

    // private onTriggerStay(event: ITriggerEvent) {
    //     console.log('Trigger Stay:', event.type, event);
    //     // Logic for when something stays in the trigger zone
    // }

    // private onTriggerExit(event: ITriggerEvent) {
    //     console.log('Trigger Exit:', event.type, event);
    //     // Logic for when something exits the trigger zone
    // }
    

    // Testing
    keydown(event: EventKeyboard){
        switch(event.keyCode){
            case KeyCode.KEY_J:
                this.node.active = true;
                this.scheduleOnce(()=>{
                    if(this.node.active){
                        this.node.active= false;
                    }
                },0.5);
                break;
        }
    }
}


