import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('staticData')
export class staticData extends Component {
    
    public static level:number =0 ;
    
    start() {

    }

    static reset(){
        staticData.level =0;
    }


}


