import { _decorator, CCFloat, clamp, Component, lerp, Material, MeshRenderer, Node, randomRangeInt, RigidBody, Vec3 } from 'cc';
import { EnemyMovement } from '../Enemy/EnemyMovement';
import { HitboxController } from './HitboxController';
const { ccclass, property } = _decorator;

@ccclass('EnemyController')
export class EnemyController extends Component {
    @property({type:CCFloat}) private speed:number;

    private enemyMovementController:EnemyMovement;
    

    //ATTACK STATS
    private attackDelay:number;
    private canAttack:boolean;
    
    //ATTACK TIMINGS 
    private fixedT:number;
    private timing:number;

    start() {

        this.attackDelay = 2;
        this.canAttack = true;

        //Attack Timing per 60 (1 sekon)
        this.fixedT = 60;
        
        this.timing= this.fixedT;
        //Tambahkan komponen EnemyMovement
        // this.addComponent(EnemyMovement);
    }

    
    changeMesh(){
        this.node.active = false;
        this.scheduleOnce(()=>{
            this.node.active = true;
        },1);
    }
    
    attack(){
        //Todo : tambah if condition untuk kondisi canAttack
        
        let hitboxes:Node[] = this.node.getChildByName("hitboxNode").children;
        
        if(this.canAttack){
            // console.log("attack");
            
            this.canAttack=false;
            
            
            for(let hb of hitboxes){
                if(hb.name.includes("hitbox",0)){
                    console.log(true)
                    hb.getComponent(HitboxController).activateHitbox();
                    
                }
            }
            
        }
        
        this.scheduleOnce(()=>{
            this.canAttack = true;
        },this.attackDelay);
        
        
    }
    
    // random dari 1.0 - 1.5 detik
    // *tes :
    // 1 -> 0-0.5 terlalu cepet
    // 2 -> 0.5-1.5 masih terlalu cepet
    private generateVariableT():number{
        return randomRangeInt(60,90);
    }

    public getCanAttack():boolean{
        return this.canAttack;
    }

    public getTiming():number{
        return this.timing;
    }

    public resetTiming(){
        this.timing = this.fixedT + this.generateVariableT();
    }

    protected update(dt: number): void {
        this.timing-=1;
    }





}


