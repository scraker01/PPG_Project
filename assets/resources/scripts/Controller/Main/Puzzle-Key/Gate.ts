import { _decorator, Component, Node } from 'cc';
import { spawnerController } from '../Controller/spawnerController';
const { ccclass, property } = _decorator;

@ccclass('Gate')
export class Gate extends Component {

    private static gateNode:Node;

    protected start(): void {
        Gate.gateNode = this.node;     
    }

    static makeItDisappear(){
        Gate.gateNode.active = false;
    }

    static makeItAppear(){
        Gate.gateNode.active = true;
        // Gate.spawnerController.activateEnemy();
        
    }
}


