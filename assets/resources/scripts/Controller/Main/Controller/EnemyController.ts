import { _decorator, CCFloat, Component, lerp, Material, MeshRenderer, Node, RigidBody, Vec3 } from 'cc';
import { EnemyMovement } from '../Enemy/EnemyMovement';
import { HitboxController } from './HitboxController';
const { ccclass, property } = _decorator;

@ccclass('EnemyController')
export class EnemyController extends Component {
    @property({type:CCFloat}) private speed:number;

    private enemyMovementController:EnemyMovement;
      
    private meshRenderer:MeshRenderer;
    private mat:Material;
    private idxMat:number;

    //ATTACK STATS
    private attackDelay:number;
    private canAttack:boolean;

    start() {
        this.meshRenderer = this.getComponent(MeshRenderer);

        this.mat = this.meshRenderer.getRenderMaterial(0);
        this.attackDelay = 2;
        this.canAttack = false;

        //Tambahkan komponen EnemyMovement
        // this.addComponent(EnemyMovement);
    }

    changeMesh(){
        this.node.active = false;
        this.scheduleOnce(()=>{
            this.node.active = true;
        },1);
    }

    attack(){
        //Todo : tambah if condition untuk kondisi canAttack

        let hitboxes:Node[] = this.node.getChildByName("hitboxNode").children;

        if(this.canAttack){
            console.log("attack");

            this.canAttack=false;

            
            for(let curHbx=0;curHbx < hitboxes.length;curHbx++ ){
                let hitbox = hitboxes[curHbx];
                hitbox.getComponent(HitboxController).activateHitbox();
            }
            

        }

        this.scheduleOnce(()=>{
            this.canAttack = true;
        },this.attackDelay);
        
            
    }


}


