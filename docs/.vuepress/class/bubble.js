export default class Bubble {

    constructor ( _c = 'rgb(255,255,255)', _y = 0 ) {
    
        this.r          = rand( 10, 150 );
        this.life       = true;
        this.x          = rand( -this.r, window.innerWidth);
        this.y          = rand( ( window.innerHeight + this.r ), (window.innerHeight + this.r + 20) );
        this.vy         = rand( .1, .5) + _y;
        this.vr         = 0;
        this.vx         = rand( -2, 2);
        this.c          = _c;
    
    }
    
    update () {
    
        this.vy += .07;
        this.vr += .01;
        this.y -= this.vy;
        this.x += this.vx;

        if( this.r > 1 )
            this.r -= this.vr;
        
        if( this.r <= 1 )
            this.life = false;
    
    }
    
    draw ( ctx ) {
    
        ctx.beginPath();    
        ctx.arc( this.x, this.y, this.r, 0, 2*Math.PI );
        ctx.fillStyle = this.c;
        ctx.fill();
    
    }
    
}

var rand = function rand(min, max) {
    return Math.random() * (max - min) + min;
};