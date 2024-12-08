import { _decorator, CCInteger, Component, geometry, Node, PhysicsSystem } from 'cc';
const { ccclass, property } = _decorator;

enum ERaycastType {
    ALL,
    CLOSEST
}
@ccclass('Raycast')
export class Raycast extends Component {
    
    @property({type:CCInteger})
    private maxDistance: number;

    @property
    queryTrigger = true;

    private _raycastType: ERaycastType = ERaycastType.ALL;
    
    private _ray: geometry.Ray ;
    private _mask: number;

    private raycast;

    start() {
        this._ray = new geometry.Ray(0,0,0 ,0,0,1);
        this._mask = 0xffffffff;
    }

    update(deltaTime: number) {
        this.raycast = PhysicsSystem.instance.raycastClosest(this._ray, this._mask, this.maxDistance, this.queryTrigger);
        
        console.log(this._ray.o);
        console.log(this._ray.d);
        if(this.raycast){
            let r = PhysicsSystem.instance.raycastClosestResult;
            console.log(r.distance)
        }
    }
}


