import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('teleporter')
export class teleporter extends Component {
    //Load to outro scene
   toOutro(){
        director.loadScene("outro");
   }
}


