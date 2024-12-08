import { _decorator, CCInteger, Component, EventKeyboard, Input, input, instantiate, Node, Prefab, randomRangeInt, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BulletPool')
export class BulletPool extends Component {
    @property({type:Prefab}) private cylinderPref:Prefab;
    @property({type:Prefab}) private bulletItemPref:Prefab;
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

        this.createPool(this.cylinderPref, this.node, this.bulletPool);

        input.on(Input.EventType.KEY_DOWN,this.test, this);

        this.condition(1);
    }

    update(deltaTime: number) {
        for(let node of this.bulletPool){
            if(node.children.length == 0){
                node.active = false;
            }
        }
        
        // var jika true, maka reset position dan aktifin lagi pref
        let isAllInactive = true;
        
        for(let node of this.bulletPool){
            if(node.active == true){
                isAllInactive = false;
                break;
            }
        }

        if(isAllInactive){
            this.randomizePos();

            this.scheduleOnce(()=>{
                this.activatePrefab();
            },5);

        }
    }

    private createPool(prefab:Prefab, parent : Node,pool:Node[]){
        for (let i = 0 ; i< this.initialAmount; i++){
            let node = instantiate(prefab);

            pool.push(node);

            node.active = false;

            node.name = "bullet"+i;
       
            node.setParent(parent);

            let bulletItem = instantiate(this.bulletItemPref);
            bulletItem.name = "bulletItem";
            bulletItem.setParent(node);
        }

    }

    public randomizePos(){
        let nodes = this.node.children;
    
        for(let node of nodes){

            if(node.active === false){
                
                let x = randomRangeInt(this.xMin, this.xMax);
                let z = randomRangeInt(this.zMin, this.zMax);
    
                let newPos = new Vec3(x,this.node.position.y,z);
    
                node.setPosition(newPos);

                node.getChildByName("bulletItem").setPosition(new Vec3(0,3,0));
            }
        }
    }

    private activatePrefab(){
        for(let node of this.node.children){
            node.active = true;
            this.scheduleOnce(()=>{

                node.getChildByName("bulletItem").active = true;
            },1);
            
        }
    }
    private deactivatePrefab(){
        for(let node of this.node.children){
            node.active = false;
            node.getChildByName("bulletItem").active = false;
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
            this.randomizePos();
        }
    }
}


