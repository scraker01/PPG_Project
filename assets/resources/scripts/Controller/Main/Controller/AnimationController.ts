import { _decorator, Component, Node ,Animation} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AnimationController')
export class AnimationController extends Component {

      //AnimationController ** Untuk flip arah sprite dsb
    private objectAnimation:Animation;
    private currentClip:string;

    playAnimation(clipName:string){
        if(this.currentClip != clipName){
            this.objectAnimation.play(clipName);
            this.currentClip = clipName;
        }
    }

    setObjectToAnimation(object:Node){
        this.objectAnimation = object.getComponent(Animation);
        this.currentClip = this.objectAnimation.defaultClip.toString();
    }
}

