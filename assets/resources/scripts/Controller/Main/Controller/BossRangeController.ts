import { _decorator, Component, Node, Material, input, Input, EventTouch, CameraComponent, geometry, Touch, PhysicsSystem, ModelComponent, Toggle, LabelComponent, EditBox, Button, CCFloat } from "cc";
'cc';
const { ccclass, property } = _decorator;

enum ERaycastType {
    ALL,
    CLOSEST
}



@ccclass('BossRangeController')
export class BossRangeController extends Component {
    @property({type:CCFloat}) private maxRaycastRange: number;

    @property
    queryTrigger = true;

    private _raycastType: ERaycastType = ERaycastType.ALL;
    private _ray: geometry.Ray = new geometry.Ray();
    // private _maxDistance: number = 100;
    private _mask: number = 0xffffffff;
    
    private rayCast ;

    start() {
    }
    
    update(deltaTime: number) {
        this.rayCast = PhysicsSystem.instance.raycastClosest(this._ray,this._mask,this.maxRaycastRange,this.queryTrigger);

        if(this.rayCast){
            const r = PhysicsSystem.instance.raycastClosestResult;
            console.log("raycast reach the player");
        }


        
    }
}


