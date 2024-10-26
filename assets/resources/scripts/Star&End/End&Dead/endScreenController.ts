import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('endScreenController')
export class endScreenController extends Component {
    toStartScreen(){

        //Implementasi apa ya
        
        director.loadScene("intro");
    }
}


