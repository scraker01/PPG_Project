import { _decorator, Component, Material, MeshRenderer, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnemyController')
export class EnemyController extends Component {
    
    private meshRenderer:MeshRenderer;
    private mat:Material;
    private idxMat:number;

    start() {
        this.meshRenderer = this.getComponent(MeshRenderer);
        // this.meshRenderer.setMaterialInstance(this.meshRenderer.get,2);
        // console.log(this.meshRenderer.getSharedMaterial(1));
        this.mat = this.meshRenderer.getRenderMaterial(0);
        
        
    }

    update(deltaTime: number) {
        this.changeMaterial(1);
    }   

    changeMaterial(idx:number){
        this.meshRenderer.setMaterialInstance(this.meshRenderer.getRenderMaterial(idx),idx);
        // console.log(this.meshRenderer.getMaterialInstance(idx));
    }
}


