import { _decorator, Component, Node, Vec3 } from 'cc';
import { spawnerController } from '../spawnerController';
const { ccclass, property } = _decorator;

@ccclass('SpawnerDetection')
export class SpawnerDetection extends Component {
    @property({type:Node})private playerNode:Node;

    private playerWorldPos:Vec3;
    private spawnerWorldPos:Vec3;

    private spawnerController:spawnerController;

    private isActivated:boolean;

    start() {
        this.isActivated = false;
        this.spawnerController = this.node.getComponent(spawnerController);
    }

    update(deltaTime: number) {
        this.playerWorldPos = this.playerNode.getWorldPosition();
        this.spawnerWorldPos = this.node.getWorldPosition();

        let z = this.playerWorldPos.z-this.spawnerWorldPos.z;
        
        // console.log(!this.isActivated && z<0)
        if(!this.isActivated && z<0){
            // this.spawnerController.remoteSpawn();
            this.spawnerController.activateSpawn();
            this.isActivated = true;
        }
    }


}


