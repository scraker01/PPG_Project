import { _decorator, CCFloat, Component, Node, Quat, RigidBody, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CameraController')
export class CameraController extends Component {
    @property({type: Node}) private camera: Node;
    @property({type: Node}) private player: Node;
    @property({type:CCFloat}) private camAngle:number;
    
    private playerPos:Vec3;
    private currentCamPos:Vec3;
    private camToPlayerDist:Vec3;
   

    start() {
        this.currentCamPos = this.camera.getPosition();
        this.playerPos = this.player.getPosition();
        this.camToPlayerDist = new Vec3(this.playerPos.x-this.currentCamPos.x,this.playerPos.y-this.currentCamPos.y,this.playerPos.z-this.currentCamPos.z);
        
        // this.camera.rotate(new Quat(this.camAngle,0,0));
    }
    
    update(deltaTime: number) {
        this.currentCamPos = this.camera.getPosition();
        this.playerPos = this.player.getPosition();


        this.camera.setPosition(new Vec3((this.playerPos.x-this.camToPlayerDist.x), this.currentCamPos.y, (this.playerPos.z-this.camToPlayerDist.z)));
    }
}


