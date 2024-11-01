import { _decorator, CCFloat, CCInteger, Component, instantiate, Node, Prefab, random, randomRange, randomRangeInt, Vec3 } from 'cc';
import { EnemyMovement } from '../Enemy/EnemyMovement';
import { levelStats } from '../../Etc/levelStats';
const { ccclass, property } = _decorator;

@ccclass('spawnerController')
export class spawnerController extends Component {
    @property({type:CCFloat}) private range:number;
    @property({type:Prefab}) private prefab:Prefab;
    @property({type:Prefab}) private prefSpriteHolder:Prefab;
    @property({type:Node}) private spriteHolder:Node;

    //Var untuk enemy yang sebelumnya manual
    private initialAmount:number;

    //
    
    private spawnerPos:Vec3;
    
    //MAX & MIN RANGE SPAWNPOINT
    private maxRange:number;
    minRange:number;
    
    //POOL
    private static spawnPool:Node[] = [];
    private static spriteHolderPool:Node[] = [];
    @property({type:CCInteger})
    private numberOfSpawn:number;

    protected onLoad(): void {
        
    }

    start() {
        
        this.spawnerPos = this.node.getPosition();

        this.maxRange = this.range * randomRange(0,this.range);
        this.minRange = this.range * randomRange(0,-this.range);


        //Nilai digunakan untuk create node dan menyesuaikan angka setelah yang ditaro secara manual
        this.initialAmount = this.node.getParent().getChildByName("enemies").children.length + 1;

        //Perlu reset apabila mengulang game, sebab pool masih menyangkut jika tidak
        spawnerController.resetAll();

        this.createPool(this.prefab,this.node,spawnerController.spawnPool);

        this.randomizerSpawnPos();
        
        this.createPool(this.prefSpriteHolder,this.spriteHolder,spawnerController.spriteHolderPool);

        for(let counter of spawnerController.spawnPool){
            levelStats.addEnemyAmount();
        }

        levelStats.setTotalEnemyAmount(levelStats.getEnemyAmount());
    }

    createPool(prefab:Prefab, parent:Node,pool:Node[]){
        // console.log(this)
        for(let i =this.initialAmount; i<this.numberOfSpawn+this.initialAmount;i++){

            let enemyNode:Node = instantiate(prefab);
            // let enemySpriteHolder:Node = instantiate(this.prefSpriteHolder);
            
            pool.push(enemyNode);
            // spawnerController.spriteHolderPool.push(enemyNode);
            
            enemyNode.active = false;

            enemyNode.name = ""+prefab.name+i;
            // enemySpriteHolder.active = false;

            enemyNode.setParent(parent);
            // enemySpriteHolder.setParent();
        }
    }

    randomizerSpawnPos(){
        
        for(let enemy of spawnerController.spawnPool){
            let x = randomRangeInt(this.minRange,this.maxRange);
            let z = randomRangeInt(this.minRange,this.maxRange);

            enemy.setPosition(new Vec3(x,this.spawnerPos.y,z))
        }
    }

    static activateEnemy(){

        //Untuk acrtivate dari node enemynya itu sendiri
        for(let enemy of spawnerController.spawnPool){
            enemy.active = true;
        }

        //Untuk activate spriteHolder nya
        for(let enemy of spawnerController.spriteHolderPool){
            
            enemy.active = true;
        }
    }

    static resetAll(){
        spawnerController.spawnPool = [];
        spawnerController.spriteHolderPool = [];
    }


}


