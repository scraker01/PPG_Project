import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Gate')
export class Gate extends Component {
    makeItDisappear(){
        this.node.active = false;
    }

    makeItAppear(){
        this.node.active = true;
    }
}


