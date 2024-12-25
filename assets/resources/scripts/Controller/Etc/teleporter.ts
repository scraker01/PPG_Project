import { _decorator, Component, Node } from 'cc';
import { sceneController } from './sceneController';
import { staticData } from './staticData';
const { ccclass, property } = _decorator;

@ccclass('teleporter')
export class teleporter extends Component {
     //Load to outro scene
     private static tpNode;

     protected start(): void {
          teleporter.tpNode = this.node;

          if(staticData.level != 2){

               teleporter.tpNode.active = false;
          }
         
     }

     static makeItAppear(){
          teleporter.tpNode.active = true;
     }
     static makeItDisappear(){
          teleporter.tpNode.active = false;
     }

     toOutro(){
          sceneController.loadScene("outro");
     }

     toNextStage(){
          let level = staticData.level;
          
          if(level === 2) sceneController.loadScene("stage2");
          if(level === 3) sceneController.loadScene("stage3");
          if(level === 4) sceneController.loadScene("outro");
          
          // sceneController.loadScene("stageLoader");
     }
}


