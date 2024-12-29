import { _decorator, AudioClip, AudioSource, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioManager')
export class AudioManager extends Component {
    @property({type:[AudioClip]}) public clips:AudioClip[] = [];
    @property({type: AudioSource}) public source:AudioSource;
    // untuk effect pakai source 2, source 1 hanya untuk bgm

    
    onAudioQueue(index:number){
        let clip = this.clips[index];
        this.source.playOneShot(clip);
        
    }

    queueByName(audioName:string){
        let index = 0;
        for(let clip of this.clips){
            
            if(clip.name === audioName){
                let selectedClip = this.clips[index];
                this.source.playOneShot(selectedClip);
            }
            index+=1;
        }
    }
}


