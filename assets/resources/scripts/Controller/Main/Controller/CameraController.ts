import { _decorator, CCFloat, Component, Node, Quat, RigidBody, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CameraController')
export class CameraController extends Component {
    @property({type: Node}) private camera: Node;
    @property({type: Node}) private player: Node;
    @property({type:CCFloat}) private camAngle:number;
    // @property({type:Node}) private billBoard :Node | null;
    
    private playerPos:Vec3;
    private currentCamPos:Vec3;
    private billBoardPos:Vec3;
    private camToPlayerDist:Vec3;
   

    start() {
        this.currentCamPos = this.camera.getPosition();
        this.playerPos = this.player.getPosition();

        this.camToPlayerDist = new Vec3(this.playerPos.x-this.currentCamPos.x,this.playerPos.y-this.currentCamPos.y,this.playerPos.z-this.currentCamPos.z);

        // this.camera.setPosition(new Vec3((this.playerPos.x), this.currentCamPos.y, (this.playerPos.z-this.camToPlayerDist.z)));
        
        // this.camera.rotate(new Quat(this.camAngle,0,0));
    }
    
    update(deltaTime: number) {
        this.currentCamPos = this.camera.getPosition();
        this.playerPos = this.player.getPosition();


        this.camera.setPosition(new Vec3((this.playerPos.x), this.playerPos.y+5, (this.playerPos.z+8)));

        // if(this.billBoard){
        //     this.billBoardPos = this.billBoard.getPosition();
        //     this.billBoard.setPosition(new Vec3(
        //         this.currentCamPos.x,
        //         this.currentCamPos.y-1,
        //         this.currentCamPos.z-2))
        // }

    }
}


