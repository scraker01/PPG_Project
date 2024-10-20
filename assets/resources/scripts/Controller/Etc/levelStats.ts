import { _decorator, Component, director, Node, Scene } from 'cc';
import { Gate } from '../Main/Puzzle-Key/Gate';
import { spawnerController } from '../Main/Controller/spawnerController';
const { ccclass, property } = _decorator;

@ccclass('levelStats')
export class levelStats extends Component {
    
    //Variabel untuk memastikan kalau baru mulai, gate tidak langsung terbuka
    private startProtection:boolean;


    //Enemy Related stuff
    private enemyParentNode:Node;
    private spawnerParentNode:Node;

    private enemyArray:Node[] = [];
    private static enemyAmount:number;

    //Untuk nyalain gatenya
    private static currentEnemyAmount:number;
    
    //Buat urusan healthbar di enemyMovement
    private static totalEnemyAmount:number; 

    //Level Var
    private static level:number;

    //Spawn Controller
    private spawner:Node;
    

    start() {
        this.enemyParentNode = this.node.getParent().getParent().getParent().getChildByName("World").getChildByName("enemies");
        this.spawnerParentNode = this.node.getParent().getParent().getParent().getChildByName("World").getChildByName("spawner");

        this.enemyArray = this.enemyParentNode.children;
        
        this.startProtection = true;

        levelStats.enemyAmount =0;
        levelStats.currentEnemyAmount =0;
        // levelStats.enemyAmount = this.enemyParentNode.children.length + this.spawnerParentNode.children.length;
        
        for(let enemy of this.enemyArray){
            levelStats.enemyAmount++;
            
        }
        
        levelStats.setCurrentEnemyAmount(levelStats.enemyAmount);
        levelStats.setTotalEnemyAmount(levelStats.enemyAmount);

        this.spawner = this.node.getParent().getParent().getParent().getChildByName("World").getChildByName("spawner");
        
        
    }

    static minusEnemyAmount(){
        levelStats.enemyAmount--;
    }
    static addEnemyAmount(){
        levelStats.enemyAmount++;
    }

    static resetEnemyAmount(){
        levelStats.enemyAmount = 0;
    }

    static getEnemyAmount(){
        return levelStats.enemyAmount;
    }
    static minusCurrentEnemyAmount(){
        levelStats.currentEnemyAmount--;
    }
    static addCurrentEnemyAmount(){
        levelStats.currentEnemyAmount++;
    }

    static resetCurrentEnemyAmount(){
        levelStats.currentEnemyAmount = 0;
    }

    static getCurrentEnemyAmount(){
        return levelStats.currentEnemyAmount;
    }
    static setCurrentEnemyAmount(number:number){
        levelStats.currentEnemyAmount = number;
    }
    static setTotalEnemyAmount(number:number){
        levelStats.totalEnemyAmount = number;
    }

    static getTotalEnemyAmount(){
        return levelStats.totalEnemyAmount;
    }    


    static deacGate(){
        Gate.makeItDisappear();

        spawnerController.activateEnemy();
     
    }
    

}


