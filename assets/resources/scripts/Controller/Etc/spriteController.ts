import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('spriteController')
export class spriteController extends Component {

    /*

    TODO

    SPRITERENDERER + ANIMATION ITU DIPISAH DARI BODY UTAMA Baik itu player ato enemy
    body utama untuk rotation => angle serangan dan arah

    berarti flipnya harus dipindahin ,ga bisa sama ato disatuin, (flip mah biarin aja yg di movement soalnya buat arahin kanan kiri)
    */
   
    private scale;
    private isFacingRight:boolean;
    private isFacingFront:boolean;
    
    protected start(): void {
        this.scale = this.node.getScale();

        //Ke kiri awalnya
        this.isFacingRight = false;
        this.isFacingFront = true;
    }

    flip(){
        this.scale = this.node.getScale();
        // let rotation = this.node.getRotation();
        this.node.setScale(this.scale.x*-1, this.scale.y,this.scale.z);
        
        this.isFacingRight = !this.isFacingRight;
    }

    getFacingRight():boolean{
        return this.isFacingRight;
    }

    getFacingFront():boolean{
        return this.isFacingFront;
    }

    setFacingFront(){
        this.isFacingFront = !this.isFacingFront;
    }

    setNodeDeactivate(){
        this.node.active = false;
    }
   
}


