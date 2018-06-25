import Bubble from '../class/bubble'
export default class Bubbles {

    
    constructor ( _settings ) {

        this.FREQUENCY = 2; //生成頻度(5回に1回生成)
    
        this.bRuning            = false;
        this.aRuning            = false; // バブルの追加制御
        this.canvas             = document.getElementById('canvas');
        this.ctx                = this.canvas.getContext('2d');
        this.canvas.height      = window.innerHeight;
        this.canvas.width       = window.innerWidth;
        this.aBubbles           = [];
    
    }
    
    addBubble () {
        this.aBubbles.push( new Bubble('#fcc800',0) );
    }
    
    update () {
        
        for (let i = this.aBubbles.length - 1; i >= 0; i--) {
        
            this.aBubbles[i].update();
            
            if( !this.aBubbles[i].life )
                this.aBubbles.splice( i, 1 );
        }
        
        if( this.aRuning ) {
            if ((0 | Math.random() * this.FREQUENCY) === 0) {
                if( this.aBubbles.length < ( window.innerWidth / 10 ) )
                    this.addBubble();
            }
        }else {
            if( this.aBubbles.length == 0 ) {
                this.stop();
            }
        }
    
    }
    
    draw () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = this.aBubbles.length - 1; i >= 0; i--) {   
            this.aBubbles[i].draw( this.ctx );
        }
    }
    
    run () {
        
        this.update();

        this.draw();
        
        if( this.bRuning )
            requestAnimationFrame( this.run.bind( this ) );
    }
    
    start () {
        // 稼働中は新たにスタートさせない
        if( this.aRuning || this.bRuning ){
            return;
        }
        this.aRuning = true;
        this.bRuning = true;
        this.run();
    }
    stop (){
        this.bRuning = false;
    }
    addStop() {
        this.aRuning = false;
    }
}
