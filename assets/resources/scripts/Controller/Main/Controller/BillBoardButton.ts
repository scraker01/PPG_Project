import { _decorator, Component, director, EventKeyboard, input, Input, KeyCode,Node} from 'cc';
import { saveAndLoad } from '../../Etc/saveAndLoad';
const { ccclass, property } = _decorator;

@ccclass('BillBoardButton')
export class BillBoardButton extends Component {

    @property({type:Node})
    private bb:Node;
   
    @property({type:Node})
    private saveAndLoadNode:Node|null;

    protected start(): void {
        this.bb.active = false;
        input.on(Input.EventType.KEY_DOWN,this.open,this);
        
    }
    
    open(event:EventKeyboard){
        switch(event.keyCode){
            case KeyCode.ESCAPE:
                this.bb.active = true;
                input.off(Input.EventType.KEY_DOWN,this.open,this);
                
                input.on(Input.EventType.KEY_DOWN,this.menuService,this);
                
                // this.saveAndLoadNode.getComponent(saveAndLoad).switch();
                // alert("you can now save and load");
                
                director.pause();
                break;
            }
        }
        
        menuService(event:EventKeyboard){
            switch(event.keyCode){
                case KeyCode.ESCAPE:
                    this.bb.active =false;
                    input.off(Input.EventType.KEY_DOWN,this.menuService,this);
                    input.on(Input.EventType.KEY_DOWN,this.open,this);
                    // this.saveAndLoadNode.getComponent(saveAndLoad).switch();
                    // alert("save and load is now disable");

                    director.resume();
                break;
            }
        
    }
}


