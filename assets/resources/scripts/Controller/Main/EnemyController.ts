import { _decorator, CCFloat, Component, lerp, Material, MeshRenderer, Node, RigidBody, Vec3 } from 'cc';
import { EnemyMovement } from './Enemy/EnemyMovement';
const { ccclass, property } = _decorator;

@ccclass('EnemyController')
export class EnemyController extends Component {
    @property({type:CCFloat}) private speed:number;

    private enemyMovementController:EnemyMovement;
      
    private meshRenderer:MeshRenderer;
    private mat:Material;
    private idxMat:number;

    private rb: RigidBody;

    private zSpeed:number;
    private xSpeed:number;

    


    start() {
        this.meshRenderer = this.getComponent(MeshRenderer);
        // this.meshRenderer.setMaterialInstance(this.meshRenderer.get,2);
        // console.log(this.meshRenderer.getSharedMaterial(1));

        this.mat = this.meshRenderer.getRenderMaterial(0);
        
        this.rb = this.getComponent(RigidBody);

        this.xSpeed=0;
        this.zSpeed=0;

        //Tambahkan komponen EnemyMovement
        this.addComponent(EnemyMovement);
    }

    update(deltaTime: number) {
        this.rb.setLinearVelocity(new Vec3 (lerp(0,this.xSpeed,this.speed*deltaTime),
                                                    this.rb.linearFactor.y,
                                                lerp(0,this.zSpeed,this.speed*deltaTime)));

        // console.log(this.rb.getLinearVelocity);
    }   

    changeMesh(){
        this.node.active = false;
        this.scheduleOnce(()=>{
            this.node.active = true;
        },1);
    }


}


