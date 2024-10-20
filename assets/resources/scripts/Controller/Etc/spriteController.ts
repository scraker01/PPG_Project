import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('spriteController')
export class spriteController extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }

    /*

    TODO

    SPRITERENDERER + ANIMATION ITU DIPISAH DARI BODY UTAMA Baik itu player ato enemy
    body utama untuk rotation => angle serangan dan arah

    berarti flipnya harus dipindahin ,ga bisa sama ato disatuin, (flip mah biarin aja yg di movement soalnya buat arahin kanan kiri)
    */
}


