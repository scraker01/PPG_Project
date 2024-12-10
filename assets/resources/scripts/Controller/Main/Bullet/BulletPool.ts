import { _decorator, CCInteger, Component, EventKeyboard, Input, input, instantiate, Node, Prefab, randomRangeInt, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BulletPool')
export class BulletPool extends Component {
    @property({type:Prefab}) private cylinderPref:Prefab;
    @property({type:Prefab}) private bulletItemPref:Prefab;
    @property({type:CCInteger}) private maxRange:number;
    @property({type:CCInteger}) private customTimer:number;

    private initialAmount:number;
    private maxAmount:number;

    private bulletPool: Node[];
    private itemNodePool: Node[];
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
    
    private timer;

    start() {
        this.initialAmount = 5;
        // Jarak ke samping ,radius (boss ke dinding samping)
        this.xRange = randomRangeInt(-this.maxRange,this.maxRange) ;

        //Jarak ke depan ,radius (boss ke player)
        this.zRange = randomRangeInt(0,this.maxRange);

        this.bulletPool = [];

        this.initialAmount = 0;
        this.maxAmount = 0;

        this.condition(2);

        

        input.on(Input.EventType.KEY_DOWN,this.test, this);

        this.timer = this.customTimer*60;
    }

    update(deltaTime: number) {
        this.deactivatePrefab();
        this.timerCalc();
    }

    private timerCalc(){
        console.log(this.timer)
        this.timer --;
        if(this.timer<-1){

            let isAllInactive = true;
            
            for(let node of this.bulletPool){

                if(node.active == true){
                    isAllInactive = false;
                    break;
                }
            }

            
            if(isAllInactive && this.timer < 0){
                
                // this.scheduleOnce(()=>{
                this.randomizePos();

           
                this.activatePrefab();

                
                // this.timer = 60;
                // },5);

            }

            this.timer = this.customTimer*60;
        }
    }

    private createPool(prefab:Prefab, parent : Node,pool:Node[]){
        for (let i = this.initialAmount ; i< this.maxAmount; i++){
            let node = instantiate(prefab);

            pool.push(node);

            node.active = false;

            node.name = "bullet-"+i;
       
            node.setParent(parent);

            // Modifikasi agar langsung untuk item

            let bulletItem = instantiate(this.bulletItemPref);
            bulletItem.name = "bulletItem-"+i;
            // this.itemNodePool.push(bulletItem);

            bulletItem.setParent(parent);
        }

    }

    public randomizePos(){
        let itemNodes : Node[] = this.node.children.filter((node)=> node.name.split("-")[0] === 'bulletItem');
        
        // console.log(itemNodes);
        for(let node of this.bulletPool){

            for(let itemNode of itemNodes){
                
                if(node.name.split("-")[1] === itemNode.name.split("-")[1] && node.active === false && itemNode.active === false ){
                    
                    let x = randomRangeInt(this.xMin, this.xMax);
                    let z = randomRangeInt(this.zMin, this.zMax);
        
                    let newPos = new Vec3(x,this.node.position.y,z);
        
                    node.setPosition(newPos);
                    newPos.y = 10;
                    itemNode.setPosition(newPos);

                }
            }

        }
    }

    private activatePrefab(){
        for(let node of this.bulletPool){
            node.active = true;
            
            let itemNodes : Node[] = this.node.children.filter((node)=> node.name.split("-")[0] === 'bulletItem');

            for(let itemNode of itemNodes){
                
                if(node.name.split("-")[1] === itemNode.name.split("-")[1] ){
                    
             

                    itemNode.active = true;
   

                }
            }
        }
    }

    private deactivatePrefab(){
        for(let node of this.bulletPool){
            // node.active = true;
            
            let itemNodes : Node[] = this.node.children.filter((node)=> node.name.split("-")[0] === 'bulletItem');

            for(let itemNode of itemNodes){
                
                if(node.name.split("-")[1] === itemNode.name.split("-")[1] ){
                    
                    if(itemNode.active == false){

                        node.active = false;
                    }

   

                }
            }
        }
    }


    public condition(stage:number){

        switch(stage) {
            case 1 :
                this.maxAmount =5;
                this.initialAmount = 0;
                this.createPool(this.cylinderPref, this.node, this.bulletPool);
            break;
            case 2 :
                this.maxAmount =10;
                this.initialAmount = 5;
                this.createPool(this.cylinderPref, this.node, this.bulletPool);
                
            break;
            case 3 :
                this.maxAmount =15;
                this.initialAmount = 10;
                this.createPool(this.cylinderPref, this.node, this.bulletPool);
                
            break;
            case 4 :
                this.maxAmount =20;
                this.initialAmount = 15;
                this.createPool(this.cylinderPref, this.node, this.bulletPool);
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


