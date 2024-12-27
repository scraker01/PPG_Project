import { _decorator, Component, Node ,Animation, AnimationClip} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AnimationController')
export class AnimationController extends Component {

      //AnimationController ** Untuk flip arah sprite dsb
    private objectAnimation:Animation;
    private currentClip:string;
    private isLock:boolean;


    protected start(): void {
        this.objectAnimation = this.node.getComponent(Animation);    
        // this.currentClip="";
        this.isLock = false
    }

    playAnimation(clipName:string){
        if(this.currentClip != clipName && !this.isLock){
            this.objectAnimation.play(clipName);
            this.currentClip = clipName;
        }
    }

    setObjectToAnimation(object:Node){
        this.objectAnimation = object.getComponent(Animation);
        this.currentClip = this.objectAnimation.defaultClip.toString();
    }

    flip(){
        let scale = this.node.getScale();
        // let rotation = this.node.getRotation();
        this.node.setScale(scale.x*-1, scale.y,scale.z);
        
    }

    setLock(status:boolean){
        this.isLock = status;
    }

    getObjectAnimation():Animation{
        return this.objectAnimation;
    }

    getClipByName(clipname:string):AnimationClip{
        for(let clip of this.objectAnimation.clips){
            console.log(clip);
            if(clip.name === clipname){

                return clip;
            }
        } 
    }
}


