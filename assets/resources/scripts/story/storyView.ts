import { _decorator, Component, Node, PageView } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('storyView')
export class storyView extends Component {
    private pageView:PageView;
    private originalTimer:number;
    private timerExecution:number;
    private numberOfPage:number;

    start() {
        this.pageView= this.node.getComponent(PageView);
        
        this.numberOfPage = this.pageView.getPages().length;
        // this.pageView.scrollToLeft(2);

        // 2 detik
        this.originalTimer = 300

        this.timerExecution = this.originalTimer;
    }

    protected update(dt: number): void {
        this.updateTimer();
    }

    updateTimer(){
        this.timerExecution--;
        if(this.timerExecution<0){
            this.timerExecution = this.originalTimer;
            
            let nextPage =this.pageView.curPageIdx+1;
            
            if(nextPage < this.pageView.getPages().length){
                this.pageView.setCurrentPageIndex(nextPage);

            }else{
                this.closeStoryView();
            }
        }
    }

    closeStoryView(){
        this.node.active = false;
    }


}


