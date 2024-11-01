import { _decorator, Component, director,Node, EventKeyboard, Input, input} from 'cc';
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


