import { _decorator, CapsuleCollider, Component, ICollisionEvent, ITriggerEvent, Node, RigidBody } from 'cc';
import { EnemyController } from './EnemyController';
import { Gate } from '../Puzzle-Key/Gate';
import { teleporter } from '../../Etc/teleporter';
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
        const otherNode = event.otherCollider.node;
        const selfNode = event.selfCollider.node;

        // console.log('Trigger Enter:', event.type, otherNode.name);
        console.log('Trigger Enter SelfNode:', event.type, selfNode.name);
        console.log('Trigger Enter OtherNode:', event.type, otherNode.name);

        //Musuh dipukul sama Player
        if(selfNode.name==="enemy-dummy" && otherNode.name === "Player"){
            selfNode.getComponent(EnemyController).changeMesh();
        }

        //Key Puzzle 
        if(selfNode.name==="Player" && otherNode.name === "key1"){
            otherNode.getParent().getParent().getChildByName("gate").getChildByName("gate1").getComponent(Gate).makeItDisappear();
            // otherNode.getComponent(Gate).makeItDisappear();
        }

        //Gate (buat ke stage/scene selanjutnya) 
        if(selfNode.name==="Player" && otherNode.name === "tp1"){
            otherNode.getParent().getParent().getChildByName("tp").getChildByName("tp1").getComponent(teleporter).toOutro();
            // otherNode.getComponent(Gate).makeItDisappear();
        }

        
        // Logic for when something enters the trigger zone
    }
}


