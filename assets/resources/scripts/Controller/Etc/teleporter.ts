import { _decorator, Component, Node } from 'cc';
import { sceneController } from './sceneController';
const { ccclass, property } = _decorator;

@ccclass('teleporter')
export class teleporter extends Component {
     //Load to outro scene
     private static tpNode;

     protected start(): void {
          teleporter.tpNode = this.node;
          teleporter.tpNode.active = false;
         
     }

     static makeItAppear(){
          teleporter.tpNode.active = true;
     }
     static makeItDisappear(){
          teleporter.tpNode.active = false;
     }

     toOutro(){
     //    director.loadScene("outro");
          sceneController.loadScene("outro");
     }

     toNextStage(name:string){
          sceneController.loadScene(name);
          //Implementasi
     }
}


