import { _decorator, CCInteger, Component, EventKeyboard, Input, input, instantiate, Node, Prefab, randomRangeInt, Vec3 } from 'cc';
import { BossDirection } from '../Enemy/Boss/BossDirection';
import { AnimationController } from '../Controller/AnimationController';
const { ccclass, property } = _decorator;

@ccclass('BulletPool')
export class BulletPool extends Component {
    @property({type:Prefab}) private cylinderPref:Prefab;
    @property({type:Prefab}) private bulletItemPref:Prefab;
    @property({type:CCInteger}) private maxRange:number;
    @property({type:CCInteger}) private customTimer:number;
    @property({type:Node}) private player;
    @property({type:Node}) private boss;

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

    private bulletCondition:number;

    // Buat notify animasi boss, ya gini dulu aja
    private bossDirectionComp:BossDirection;
    private animComp:AnimationController;
    private durationAttack:number;

    start() {
        this.initialAmount = 5;
        // Jarak ke samping ,radius (boss ke dinding samping)
        this.xRange = randomRangeInt(-this.maxRange,this.maxRange) ;

        //Jarak ke depan ,radius (boss ke player)
        this.zRange = randomRangeInt(0,this.maxRange);

        this.bulletPool = [];

        this.initialAmount = 0;
        this.maxAmount = 0;


        this.condition(1);
        
        this.timer = this.customTimer*60;

        this.bossDirectionComp = this.boss.getComponent(BossDirection);
        // console.log(this.bossDirectionComp.getAnimationCon());
        // this.durationAttack = this.bossDirectionComp.getAnimationCon().getClipByName("attack").duration;
    }

    update(deltaTime: number) {
        // paksa update sampe dapet durasi
        if(!this.animComp){
            
            this.animComp = this.bossDirectionComp.getAnimationCon();
            this.durationAttack = this.bossDirectionComp.getAnimationCon().getClipByName("attack").duration;
        }
        this.deactivatePrefab();
        this.timerCalc();
    }

    private timerCalc(){
        // console.log(this.timer)
        this.timer --;
        if(this.timer<-1){
            // UNTUK BOSSSSSSSSSSSS
            this.bossDirectionComp.playAttackAnimation("attack");

            let isAllInactive = true;
            
            for(let node of this.bulletPool){

                if(node.active == true){
                    isAllInactive = false;
                    break;
                }
            }

            
            if(isAllInactive && this.timer < 0){
                this.randomizePos();
                this.activatePrefab();

            }


            this.timer = this.customTimer*60;
            this.scheduleOnce(()=>{
                this.bossDirectionComp.playAttackAnimation("idle");
            },this.durationAttack);
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
        let playerPos = this.player.getWorldPosition();
        // console.log(itemNodes);
        for(let node of this.bulletPool){

            for(let itemNode of itemNodes){
                
                if(node.name.split("-")[1] === itemNode.name.split("-")[1] && node.active === false && itemNode.active === false ){
                    
                    // let x = randomRangeInt(this.xMin, this.xMax);
                    // let z = randomRangeInt(this.zMin, this.zMax);
                    
                    // let newPos = new Vec3(x,this.node.position.y,z);
                    
                    // node.setPosition(newPos);
                    // newPos.y = 10;
                    // itemNode.setPosition(newPos);
                    
                    let x = playerPos.x + randomRangeInt(-10,10);
                    let z = playerPos.z + randomRangeInt(-10,10);
                    
                    let newPos = new Vec3(x,this.node.position.y,z);
                    
                    node.setWorldPosition(newPos);
                    newPos.y  =10;
                    itemNode.setWorldPosition(newPos);

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

        if(this.bulletCondition !== stage || this.bulletCondition == null){
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
                
            }

        }
        this.bulletCondition = stage;
    }

    notifyBossAnimation(){

    }
    

}


