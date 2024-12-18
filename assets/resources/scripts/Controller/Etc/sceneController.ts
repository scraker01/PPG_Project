import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('sceneController')
export class sceneController extends Component {
    
    onLoad(){
        director.preloadScene("intro");
    }

    public static loadScene(sceneName:string){
        director.loadScene(sceneName);
    }
}


