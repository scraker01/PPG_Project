import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DeadScreenController')
export class DeadScreenController extends Component {
    toStartScreen(){

        //Implementasi apa ya
        
        director.loadScene("intro");
    }
}


