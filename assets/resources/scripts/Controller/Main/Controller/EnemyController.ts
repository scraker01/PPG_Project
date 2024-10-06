import { _decorator, CCFloat, Component, lerp, Material, MeshRenderer, Node, RigidBody, Vec3 } from 'cc';
import { EnemyMovement } from '../Enemy/EnemyMovement';
const { ccclass, property } = _decorator;

@ccclass('EnemyController')
export class EnemyController extends Component {
    @property({type:CCFloat}) private speed:number;

    private enemyMovementController:EnemyMovement;
      
    private meshRenderer:MeshRenderer;
    private mat:Material;
    private idxMat:number;

    start() {
        this.meshRenderer = this.getComponent(MeshRenderer);
        // this.meshRenderer.setMaterialInstance(this.meshRenderer.get,2);
        // console.log(this.meshRenderer.getSharedMaterial(1));

        this.mat = this.meshRenderer.getRenderMaterial(0);
    

        //Tambahkan komponen EnemyMovement
        this.addComponent(EnemyMovement);
    }

    update(deltaTime: number) {
        
        // console.log(this.rb.getLinearVelocity);
    }   

    changeMesh(){
        this.node.active = false;
        this.scheduleOnce(()=>{
            this.node.active = true;
        },1);
    }


}


