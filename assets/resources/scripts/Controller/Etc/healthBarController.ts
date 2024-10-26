import { _decorator, clamp, Component, Node, Vec3, VERSION } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('healthBarController')
export class healthBarController extends Component {
    // private greenbar:Node;
    private barChildren:Node[] = [];

    start() {
        // this.greenbar = this.node.getChildByName("greenBar");
        this.barChildren = this.node.children;
        
    }

    reduceGreenbar(healthPercentage:number){
        
        if(healthPercentage<=0)this.deactivateHealthBar();
        
        for(let bar of this.barChildren){
            
            if(bar.name === "greenBar"){
                let scale = bar.scale;
                bar.setScale(clamp(healthPercentage,0,1), scale.y, scale.z);

            }

        }

    }

    deactivateHealthBar(){
        for(let bar of this.barChildren){
            bar.active = false;
        }
    }
    

}


