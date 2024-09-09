import { _decorator, CCFloat, Component, EventKeyboard, Input, input, KeyCode, Node, RigidBody, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('playerController')
export class playerController extends Component {
    @property({type: CCFloat}) private speed:number;
    xRotation: number;
    zRotation: number;
    rb: RigidBody;

    onLoad() {
        input.on(Input.EventType.KEY_DOWN,this.movement,this);
        input.on(Input.EventType.KEY_UP,this.releaseMovement,this);
    
        this.xRotation=0;
        this.zRotation=0;

        this.rb = this.node.getComponent(RigidBody);
    }

    update(deltaTime: number) {
        this.rb.setLinearVelocity(new Vec3(this.rb.linearFactor.x*this.speed*this.xRotation,this.rb.linearFactor.y,this.rb.linearFactor.z^this.speed*this.zRotation));

    }

    movement(event: EventKeyboard){
        switch(event.keyCode){
            case KeyCode.KEY_D:
                // if(this.isFacingRight){
                //     this.flip();
                // }
                
                this.xRotation=1;
                
                break;
            case KeyCode.KEY_A:
                        
                        // if(!this.isFacingRight){
                        //     this.flip();
                        // }
                        
                
                this.xRotation=-1;
                // this.rb.linearVelocity =new Vec2(Math.min(this.rb.linearVelocity.x-this.acc, -this.maxSpeed ), this.rb.linearVelocity.y);

                break;
            case KeyCode.KEY_W:
                this.zRotation =1;
                break;
            case KeyCode.KEY_S:
                this.zRotation =-1;
                break;
        }
    }

    releaseMovement(event:EventKeyboard){
        switch(event.keyCode){
            case KeyCode.KEY_D:
                // if(this.isFacingRight){
                //     this.flip();
                // }
                
                this.xRotation=0;
                
                break;
            case KeyCode.KEY_A:
                        
                        // if(!this.isFacingRight){
                        //     this.flip();
                        // }
                        
                
                this.xRotation=0;
                // this.rb.linearVelocity =new Vec2(Math.min(this.rb.linearVelocity.x-this.acc, -this.maxSpeed ), this.rb.linearVelocity.y);

                break;
            case KeyCode.KEY_W:
                this.zRotation =0;
                break;
            case KeyCode.KEY_S:
                this.zRotation =0;
                break;
        }
    }
}


