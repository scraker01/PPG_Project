import { _decorator, Component, director,Node, EventKeyboard, Input, input} from 'cc';
import { staticData } from '../../Controller/Etc/staticData';
const { ccclass, property } = _decorator;

@ccclass('IntroController')
export class IntroController extends Component {
    @property({type:Node}) private tutorial:Node;
    
    start() {
        // input.on(Input.EventType.KEY_DOWN,this.keyDown,this);
        director.preloadScene("main");
        
        this.tutorial.active =false;
    }

    toMain(){
        director.loadScene("main");
        staticData.level =1;
    
    }

    toOpenTutorial(){
        this.tutorial.active = true;
    }

    toCloseTutorial(){
        this.tutorial.active = false;
    }

    toOpenOptions(){
        alert("Fitur Belum Tersedia");
    }
    
    toCloseOptions(){
        
    }
    
    toQuit(){
        alert("Fitur Belum Tersedia");
        
    }


}


