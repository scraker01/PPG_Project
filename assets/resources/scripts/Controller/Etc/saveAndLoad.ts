import { _decorator, Component, director, EventKeyboard, Input, input, KeyCode, Node, System } from 'cc';
import { levelController } from './levelController';
import { staticData } from './staticData';
import { statusController } from '../Main/Controller/statusController';
import { sceneController } from './sceneController';
import { AudioManager } from './AudioManager';
const { ccclass, property } = _decorator;

@ccclass('saveAndLoad')
export class saveAndLoad extends Component {
    @property({type:Node}) private player:Node|null;
    

    private level;
    
    private isActive:boolean;
    
    protected start(): void {
        this.isActive=false;
        // this.source = this.source.node.
        // getParent().
        // getParent().
        // getParent(). //Menu canvas
        // getParent(). //stage title
        // getChildByName("Components").
        // getChildByName("AudioManager").
        // getComponent(AudioManager);

 

    }

    
    switch(){
        if(this.isActive){
            // dari on ke off
            // input.off(Input.EventType.KEY_DOWN,this.saveAndLoad,this);
        }else{
            //dari off ke on
            // input.on(Input.EventType.KEY_DOWN,this.saveAndLoad,this);

        }
        this.isActive = !this.isActive;
    }

    // saveAndLoad(event:EventKeyboard){
    //     switch(event.keyCode){
    //         case KeyCode.KEY_J:
    //             this.save();
    //             break;
    //         // case KeyCode.PAGE_UP:
    //         //     this.load();
    //         //     break;
    //         case KeyCode.KEY_Q:
                
    //             break;
    //     }
    // }

    private quit(){

        staticData.reset();
        director.resume();
        sceneController.loadScene("intro");
    }

    private save(){

        this.level = staticData.level;
        let health = this.player.getComponent(statusController).getHealth();

        let userData = {
            level: this.level,
            health : health
        };

        console.log(JSON.stringify(userData));

        localStorage.setItem("userData", JSON.stringify(userData));
    }

    private load(){


        let data = localStorage.getItem("userData");
        
        if(data){
            let destructuredData = JSON.parse(data);
            staticData.level = destructuredData.level;
            
          if(staticData.level === 1) sceneController.loadScene("main");
          if(staticData.level === 2) sceneController.loadScene("stage2");
          if(staticData.level === 3) sceneController.loadScene("stage3");
        

        }else{
            alert("no data is available");
        }
        // console.log(data.level);

        
    }

    

}


