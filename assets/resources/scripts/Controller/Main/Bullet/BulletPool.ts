import { _decorator, CCInteger, Component, EventKeyboard, Input, input, instantiate, Node, Prefab, randomRangeInt, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BulletPool')
export class BulletPool extends Component {
    @property({type:Prefab}) private bulletPrefab:Prefab;
    @property({type:CCInteger}) private maxRange:number;

    private initialAmount:number;

    private bulletPool: Node[];
    private xRange:number;
    private zRange:number;

    /*
        Kita scale up aja deh
        Progressive dari darah
    */

    // Hardcode batas randomizer
    private xMin = -16;
    private xMax = 16;
    
    private zMin = -3;
    private zMax = 12;
    

    start() {
        this.initialAmount = 5;
        // Jarak ke samping ,radius (boss ke dinding samping)
        this.xRange = randomRangeInt(-this.maxRange,this.maxRange) ;

        //Jarak ke depan ,radius (boss ke player)
        this.zRange = randomRangeInt(0,this.maxRange);

        this.bulletPool = [];

        this.createPool(this.bulletPrefab, this.node, this.bulletPool);

        input.on(Input.EventType.KEY_DOWN,this.test, this);

        this.condition(1);
    }

    update(deltaTime: number) {
        
    }

    private createPool(prefab:Prefab, parent : Node,pool:Node[]){
        for (let i = 0 ; i< this.initialAmount; i++){
            let bulletNode = instantiate(prefab);

            pool.push(bulletNode);

            bulletNode.active = false;

            bulletNode.name = "bullet"+i;
       
            bulletNode.setParent(parent);
        }

    }

    public randomizePost(){
        let nodes = this.node.children;
    
        for(let node of nodes){

            if(node.active === false){
                
                let x = randomRangeInt(this.xMin, this.xMax);
                let z = randomRangeInt(this.zMin, this.zMax);
    
                let newPos = new Vec3(x,this.node.position.y,z);
    
                node.setPosition(newPos);
            }
        }
    }

    private activatePrefab(){
        for(let node of this.node.children){
            node.active = true;
        }
    }
    private deactivatePrefab(){
        for(let node of this.node.children){
            node.active = false;
        }
    }

    public condition(stage:number){

        switch(stage) {
            case 1 :
            break;
            case 2 :
            break;
            case 3 :
            break;
            case 4 :
            break;
            case 5 :
            break;
        }
    }

    test(event: EventKeyboard){
        if(event.keyCode){
            this.randomizePost();
        }
    }
}


