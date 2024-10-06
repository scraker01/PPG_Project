import { _decorator, CCFloat, Component, EventKeyboard, Input, input, KeyCode, lerp, Node,Animation, RigidBody, Vec3, Quat } from 'cc';
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
    private scale;

    private rotationSpeed: number = 600; // Rotation speed in degrees per second
    private currentRotation: Vec3 = new Vec3(); // Player's current rotation
    private keysPressed: { [key: number]: boolean } = {}; // Track keys pressed

    onLoad() {
        input.on(Input.EventType.KEY_DOWN,this.movement,this);
        input.on(Input.EventType.KEY_UP,this.releaseMovement,this);
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    
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
        this.rb.useCCD = true;

        this.currentClip = this.objectAnimation.defaultClip.toString();
        this.scale = this.node.getScale();

    }

    update(deltaTime: number) {
        this.xSpeed = this.speed*this.xRotation;
        this.zSpeed = this.speed*this.zRotation;

        if(this.checkIsMoving){
            this.rb.setLinearVelocity(new Vec3 (lerp(0,this.xSpeed,this.speed*deltaTime),
                                                    this.rb.linearFactor.y,
                                                lerp(0,this.zSpeed,this.speed*deltaTime)));
            // console.log(lerp(0,this.xSpeed,this.speed*deltaTime));
            
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

        // Test
        // this.rb.setAngularVelocity(new Vec3(0,3,0));

        this.node.getRotation().getEulerAngles(this.currentRotation);

        // Determine the desired rotation based on the keys pressed
        let desiredRotation: Vec3 | null = null;
        
        if (this.keysPressed[KeyCode.KEY_W] && this.keysPressed[KeyCode.KEY_A]) {
            // Rotate up-left (45 degrees)
            desiredRotation = new Vec3(0, 315, 0);
        } else if (this.keysPressed[KeyCode.KEY_W] && this.keysPressed[KeyCode.KEY_D]) {
            // Rotate up-right (45 degrees)
            desiredRotation = new Vec3(0, 45, 0);
        } else if (this.keysPressed[KeyCode.KEY_S] && this.keysPressed[KeyCode.KEY_A]) {
            // Rotate down-left
            desiredRotation = new Vec3(0, 45, 0);
        } else if (this.keysPressed[KeyCode.KEY_S] && this.keysPressed[KeyCode.KEY_D]) {
            // Rotate down-right
            desiredRotation = new Vec3(0, 315, 0);

        /////////////////////////////////////////////////////////////////////////////////////////
        } else if (this.keysPressed[KeyCode.KEY_W]) {
            // Rotate up
            if(!this.checkKeysPressed){
                this.node.setScale(Math.abs(this.scale.x), this.scale.y,this.scale.z);
                
            }
            
            //Temp fix 
            if(this.node.scale.x>0){
                desiredRotation = new Vec3(0, 90, 0);
            }else{
                desiredRotation = new Vec3(0, 270, 0);

            }
        } else if (this.keysPressed[KeyCode.KEY_S]) {
            // Rotate down
            // desiredRotation = new Vec3(0, 270, 0);
            if(!this.checkKeysPressed){
                this.node.setScale(Math.abs(this.scale.x), this.scale.y,this.scale.z);
            }

            //Temp Fix
            if(this.node.scale.x>0){
                desiredRotation = new Vec3(0, 270, 0);
            }else{
                desiredRotation = new Vec3(0, 90, 0);

            }
        } else if (this.keysPressed[KeyCode.KEY_A]) {
            // Rotate left
            desiredRotation = new Vec3(0, 0, 0);
        } else if (this.keysPressed[KeyCode.KEY_D]) {
            // Rotate right
            desiredRotation = new Vec3(0, 0, 0);
        }

        // If a desired rotation is set, smoothly rotate towards it
       if (desiredRotation) {
            this.rotateInstantly(desiredRotation);
        }
        
        // console.log(this.keysPressed)
    }

    private checkKeysPressed():boolean{
        if(this.keysPressed[KeyCode.KEY_A]||this.keysPressed[KeyCode.KEY_D]){
            return true;
        }
        return false;
    }

    private rotateInstantly(targetRotation: Vec3) {
        // Set the player's rotation instantly
        this.node.setRotationFromEuler(targetRotation.x, targetRotation.y, targetRotation.z);
    }

    onKeyDown(event: EventKeyboard) {
        // Mark the key as pressed
        this.keysPressed[event.keyCode] = true;
    }

    onKeyUp(event: EventKeyboard) {
        // Mark the key as released
        this.keysPressed[event.keyCode] = false;
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

    //By Rotation / Angle 
    flip(){
        this.scale = this.node.getScale();
        // let rotation = this.node.getRotation();
        this.node.setScale(this.scale.x*-1, this.scale.y,this.scale.z);
        
        this.isFacingRight = !this.isFacingRight;
    }
}


