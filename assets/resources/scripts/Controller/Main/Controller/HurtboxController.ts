import { _decorator, CapsuleCollider, Component, ICollisionEvent, ITriggerEvent, Node, RigidBody } from 'cc';
import { EnemyController } from './EnemyController';
import { Gate } from '../Puzzle-Key/Gate';
import { teleporter } from '../../Etc/teleporter';
import { statusController } from './statusController';
const { ccclass, property } = _decorator;

@ccclass('HurtboxController')
export class HurtboxController extends Component {
    @property({type:EnemyController}) private entityCon:EnemyController|null;
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
        // Handle collision response

        const otherNode = event.otherCollider.node;
        const selfNode = event.selfCollider.node;

        // console.log('Trigger Enter:', event.type, otherNode.name);
        // console.log('Collision Enter SelfNode:', event.type, selfNode.name);
        // console.log('Collision Enter OtherNode:', event.type, otherNode.name);

        //Musuh dipukul sama Player
        if(selfNode.name==="enemy-dummy" && otherNode.name === "Player"){
            selfNode.getComponent(EnemyController).changeMesh();
        }

    }

    private onTriggerEnter(event: ITriggerEvent) {
        const otherNode = event.otherCollider.node;
        const selfNode = event.selfCollider.node;

        // console.log('Trigger Enter:', event.type, otherNode.name);
        // console.log('Trigger Enter SelfNode:', event.type, selfNode.name);
        // console.log('Trigger Enter OtherNode:', event.type, otherNode.name);
        

        // //Musuh dipukul sama Player
        // if(selfNode.name==="enemy-dummy" && otherNode.name === "Player"){
        //     selfNode.getComponent(EnemyController).changeMesh();
        // }

        // //Player dipukul sama Musuh
        // if(selfNode.name==="Player" && otherNode.name === "enemy-dummy"){
        //     selfNode.getComponent(EnemyController).changeMesh();
        // }

        //Hurtbox detect di trigger oleh rb siapa
        let selfEntity:string = selfNode.name.substring(0,5);
        let otherEntity:string = otherNode.name.substring(0,5);

        console.log(selfEntity+" "+otherEntity)

        if( (selfEntity==="Playe" && otherEntity==="hitbo") || (selfEntity==="enemy" && otherEntity==="hitbo")  ){

            let stats:statusController|null= selfNode.getComponent(statusController);
            
            // console.log("in trigger stats")
            if(stats != null){
                let dmg = stats.getDamageStat();
                stats.receiveDamage(dmg);
            }
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


