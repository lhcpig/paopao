function Bubble(cfg){
    merger(this, cfg);
}
Bubble.prototype = {
    constructor : Bubble,
    x : 0,
    y : 0,
    speedX : 0,
    speedY : 0,
    acceX : 0,
    acceY : 0,
    
    num : 0,
    state : false,
    
    img : null ,
    anims : null,
    currentAnim : null, 
    
    init : function(game){
        //this.setAnim(this.currentAnim);
        this.onInit(game);
    },
    
    onInit : noop,
    
    setAnim : function(anim){
        if (typeof anim == "string" ){
            anim=this.anims[anim];
        }
        if ( anim instanceof Animation ){
            this.currentAnim=anim;
        }
    },
    
    update : function(deltaTime, game){
        // this.lastSpeedX=this.speedX;
        // this.lastSpeedY=this.speedY;
//         
        // this.speedX = this.lastSpeedX + this.acceX*deltaTime;
        // this.speedY = this.lastSpeedY + this.acceY*deltaTime;
//         
        // var dX = Math.round((this.lastSpeedX + this.speedX) * deltaTime / 2000 );
        // var dY = Math.round((this.lastSpeedY + this.speedY) * deltaTime / 2000 ); 
//         
        // this.x += dX;
        // this.y -= dY;
        this.x +=this.speedX/100;
        this.y -=this.speedY/100;
        
        
        //this.currentAnim.update(deltaTime);
        this.onUpdate(deltaTime,game);
    },

    onUpdate : noop ,
    
    getCollRect : function(){
    },
    
    checkIntersect : function(sprite2){
    },  
    
    draw : function(ctx,game){
        if (this.state){
            drawBubble(ctx,R+5,"#00FFFF",this.x,this.y);
        }else{
            drawBubble(ctx,R,"#00FF00",this.x,this.y);
        }
        
        drawNumber(ctx, this.num, this.x, this.y);
    }
};
