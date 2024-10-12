import { _decorator, Component, director, Node, Scene } from 'cc';
import { Gate } from '../Main/Puzzle-Key/Gate';
const { ccclass, property } = _decorator;

@ccclass('levelStats')
export class levelStats extends Component {
    
    //Variabel untuk memastikan kalau baru mulai, gate tidak langsung terbuka
    private startProtection:boolean;


    //Enemy Related stuff
    private enemyParentNode:Node;
    private enemyArray:Node[] = [];
    private static enemyAmount:number;
    
    //Level Var
    private static level:number;


    start() {
        this.enemyParentNode = this.node.getParent().getParent().getParent().getChildByName("World").getChildByName("enemies");
    
        this.enemyArray = this.enemyParentNode.children;
        
        this.startProtection = true;

        levelStats.enemyAmount = 0;


        for(let enemy of this.enemyArray){
            levelStats.enemyAmount++;
        }


    }

    static minusEnemyAmount(){
        levelStats.enemyAmount--;
    }

    static resetEnemyAmount(){
        levelStats.enemyAmount = 0;
    }

    static getEnemyAmount(){
        return levelStats.enemyAmount;
    }

    static deacGate(){
        Gate.makeItDisappear();
    }
    

}


