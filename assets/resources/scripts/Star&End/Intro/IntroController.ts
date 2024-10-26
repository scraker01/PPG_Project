import { _decorator, Component, director, EventKeyboard, Input, input} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('IntroController')
export class IntroController extends Component {
    
    start() {
        // input.on(Input.EventType.KEY_DOWN,this.keyDown,this);
        director.preloadScene("main");
    }

    toMain(){
        director.loadScene("main");
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


