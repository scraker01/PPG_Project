import { _decorator, Component, director,Node, EventKeyboard, Input, input} from 'cc';
import { staticData } from '../../Controller/Etc/staticData';
import { AudioManager } from '../../Controller/Etc/AudioManager';
const { ccclass, property } = _decorator;

@ccclass('IntroController')
export class IntroController extends Component {
    @property({type:Node}) private tutorial:Node;
    @property({type:Node}) private credits:Node;
    @property({type:AudioManager}) private source:AudioManager;
    
    start() {
        // input.on(Input.EventType.KEY_DOWN,this.keyDown,this);
        director.preloadScene("main");
        
        this.credits.active =false;
        this.tutorial.active =false;
    }

    toMain(){
        director.loadScene("main");
        staticData.level =1;
        this.playAudio();
    
    }

    toOpenTutorial(){
        this.tutorial.active = true;
        this.playAudio();
    }
    
    toCloseTutorial(){
        this.tutorial.active = false;
        this.playAudio();
    }
    
    toOpenCredits(){
        this.credits.active = true;
        // alert("Fitur Belum Tersedia");
        this.playAudio();
    }
    
    toCloseCredits(){
        
        this.credits.active = false;
        this.playAudio();
    }
    
    toQuit(){
        alert("Fitur Belum Tersedia");
        this.playAudio();
    }
    
    playAudio(){
        this.source.onAudioQueue(0);
        
    }
}


