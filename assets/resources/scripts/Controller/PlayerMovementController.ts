import { _decorator, CCFloat, Component, EventKeyboard, Input, input, KeyCode, lerp, Node,Animation, RigidBody, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

//Import component local
// import {AnimationController} from './AnimationController';

@ccclass('PlayerMovementController')
export class PlayerMovementController extends Component {
    @property({type: CCFloat}) private speed:number;
    // @property({type:AnimationController}) private playerAnimation:AnimationController;

    //Movement Variables
    private xRotation: number;
    private zRotation: number;
    private isMovingLeft:boolean;
    private isMovingRight:boolean;
    private isMovingForward:boolean;
    private isMovingBackward:boolean;

    private zSpeed:number;
    private xSpeed:number;

    private rb: RigidBody;


    //Aninmation Variables
    private objectAnimation:Animation;
    private currentClip:string;
    private isFacingRight:boolean;

    onLoad() {
        input.on(Input.EventType.KEY_DOWN,this.movement,this);
        input.on(Input.EventType.KEY_UP,this.releaseMovement,this);
    
        this.xRotation=0;
        this.zRotation=0;
        this.xSpeed=0;
        this.zSpeed=0;
        this.isMovingLeft = false;
        this.isMovingRight = false;
        this.isMovingForward = false;
        this.isMovingBackward = false;
        this.isFacingRight = false;
        
    }

    protected start(): void {
        this.rb = this.node.getComponent(RigidBody);
        this.objectAnimation = this.getComponent(Animation);

        this.currentClip = this.objectAnimation.defaultClip.toString();
    }

    update(deltaTime: number) {
        this.xSpeed = this.speed*this.xRotation;
        this.zSpeed = this.speed*this.zRotation;

        if(this.checkIsMoving){
            this.rb.setLinearVelocity(new Vec3 (lerp(0,this.xSpeed,this.speed*deltaTime),
                                                    this.rb.linearFactor.y,
                                                lerp(0,this.zSpeed,this.speed*deltaTime)));
            console.log(lerp(0,this.xSpeed,this.speed*deltaTime));
            
            if(this.zSpeed<0){
                this.playAnimation("forward");
            }
            else if(Math.abs(this.xSpeed)>0 || this.zSpeed > 0){
                this.playAnimation("sideways-walk"); 
            }
        }  
        else{
            this.rb.setLinearVelocity(new Vec3 ( lerp(this.xSpeed,0,this.speed*deltaTime),
                                                    this.rb.linearFactor.y,
                                                lerp(this.zSpeed,0,this.speed*deltaTime)));

            this.playAnimation("idle");
        }

        //Check Lagi bergerak di-x atau ga
        this.checkIsMovingXDimension();

        //Check lagi bergerak di-z atau ga
        this.checkIsMovingZDimension();
    }

    movement(event: EventKeyboard){
        switch(event.keyCode){
            case KeyCode.KEY_D:
                this.isMovingRight = true;
                if(this.isFacingRight){
                    this.flip();
                }
                break;
            case KeyCode.KEY_A:
                this.isMovingLeft = true;
                if(!this.isFacingRight){
                    this.flip();
                }
                break;
            case KeyCode.KEY_W:
                this.isMovingForward = true;
                break;
            case KeyCode.KEY_S:
                this.isMovingBackward = true;
                break;
        }
    }

    releaseMovement(event:EventKeyboard){
        switch(event.keyCode){
            case KeyCode.KEY_D:
                this.isMovingRight = false;
                break;
            case KeyCode.KEY_A:

                this.isMovingLeft = false;
                break;
            case KeyCode.KEY_W:
                this.isMovingForward = false;
                break;
            case KeyCode.KEY_S:
                this.isMovingBackward = false;
                break;
        }
    }

    checkIsMoving():boolean{
        if(this.isMovingBackward||this.isMovingForward||this.isMovingLeft||this.isMovingRight){
            return true;
        }
        return false;
    }

    checkIsMovingXDimension():boolean {
        if(this.isMovingLeft||this.isMovingRight){
            if(this.isMovingLeft&&!this.isMovingRight){
                this.xRotation=-1;
            }
            else if (!this.isMovingLeft&&this.isMovingRight){
                this.xRotation=1;

            }
            return true;
        }
        this.xRotation =0;
        return false;
    }

    checkIsMovingZDimension():boolean{
        if(this.isMovingBackward||this.isMovingForward){

            // NOTE : arahan zRotation masih aneh, backward & forward terbalik

            if(this.isMovingBackward&&!this.isMovingForward){
                this.zRotation=1;
            }else if (!this.isMovingBackward&&this.isMovingForward){
                this.zRotation=-1;
            }
            return true;
        }
        this.zRotation =0;
        return false;
    }
    
    playAnimation(clipName:string){
        if(this.currentClip != clipName){
            this.objectAnimation.play(clipName);
            this.currentClip = clipName;
        }
    }

    flip(){
        let scale = this.node.getScale();
        this.node.setScale(scale.x*-1, scale.y,scale.z);
        
        this.isFacingRight = !this.isFacingRight;
    }
}


