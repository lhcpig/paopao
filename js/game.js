function Game(cfg){
    merger(this, cfg);
}
Game.prototype = {
    constructor : Game,
    width : 600,
    height : 400,
    
    container : "gamebox",
    canvas : "c",
    ctx : null,
    
    FPS : 40,
    _sleep : 0,
    
    map : null,
    bubbles : null,
    _playing : false,
    
    init : function(){
        myGame.bubbles=[];
        myGame._playing=false;

        //初始化英雄榜
        initHeroes();
        //初始化加bubble
        for(var i=0;i<5;i++){
           var bubble=createBubble();
            myGame.addBubble(bubble);
        }
        this.container = $(this.container) || this.container;
        // this.container.style.width = this.width + "px";
        // this.container.style.height = this.height + "px";
        this.container.style.width = width + "px";
        this.container.style.height = height + "px";
        this.container.style.padding = "0px";

        this.canvas = $(this.canvas) || this.canvas || document.createElement("canvas");
        this.container.appendChild(this.canvas);
        // this.canvas.width = this.width;
        // this.canvas.height = this.height;
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext("2d");

        if(this.FPS) {
            this._sleep = Math.floor(1000 / this.FPS);
        }

        var Me = this;
        this.callRun = function() {
             // var bubble=createBubble();
             // myGame.addBubble(bubble);

            Me.run();
        }
        if(this.map) {
            this.map = ImgCache[this.map] || this.map;
        }

        var _bubbles = this.bubbles || [];
        this.bubbles = [];
        for(var i = 0, len = _bubbles.length; i < len; i++) {
            this.addBubble(_bubbles[i]);
        }
        if(!beforeInit()){
            return;
        }
        this.onInit();
        this.start();
    },
    onInit : noop,
    
    addBubble : function(bubble){
        if(bubble ==null)
            bubble = createBubble();
        if(!(bubble instanceof Bubble)){
            bubble = new Bubble(bubble);
        }
        this.bubbles.push(bubble);
        bubble.init(this);
    },
    changeBubble : function(i,bubble){
        if(bubble ==null)
            bubble = createBubble();
        if(!(bubble instanceof Bubble)){
            bubble = new Bubble(bubble);
        }
        this.bubbles[i] = bubble;
    },
    
    start : function() {
        

           
        this.timer = {
            last : Date.now(),
            now : 0,
            remain : 60000
        }
        this._playing = true;
        //this.timeoutId = setInterval("myGame.run()",this._sleep);
        this.run();
    },
    run : function() {
        if(this._playing){
            this.timeoutId = setTimeout(this.callRun,this._sleep);
            this.timer.now = Date.now();
            var deltaTime = this.timer.now - this.timer.last;
            if(deltaTime>1){
                if(this.beforeUpdate(deltaTime) !==false) {
                    this.update(deltaTime);
                    this.clearCanvas(deltaTime);
                    this.draw(deltaTime);
                }
                this.timer.remain -= deltaTime;
            }
            this.timer.last = this.timer.now;
        }
    },
    addToHeroes : function(name){
        player.name=name;
        player.score=score;
        player.rank=0;
        for(var i=0;i<localStorage.length&&i<5;i++){
            var temp=JSON.parse(localStorage.getItem(i+1));
            if(player.score>=temp.score){
                player.rank=temp.rank;
                break;
            }
        }
        var i=localStorage.length;
        if(i<5&&player.rank==0){
            player.rank=i+1;
            localStorage.setItem(i+1,JSON.stringify(player));
            return;
        }
        if(player.rank>0){
            if(i<5){
                var temp=JSON.parse(localStorage.getItem(i));
                temp.rank=i+1;
                localStorage.setItem(i+1,JSON.stringify(temp));
            }
            for(; i>player.rank;i--){
               // localStorage.setItem()
                var temp=JSON.parse(localStorage.getItem(i-1));
                temp.rank=i;
                localStorage.setItem(i,JSON.stringify(temp));
            }
            localStorage.setItem(player.rank,JSON.stringify(player));
        }
    },
    
    beforeUpdate : noop,
    
    update : function(deltaTime){
        for(var i =0,len =this.bubbles.length;i<len;i++){
            var bubble = this.bubbles[i];
            if(bubble.y + R <0)
            //if(bubble.y <400)
                this.changeBubble(i);
            bubble = this.bubbles[i];
            bubble.update(deltaTime,this);
        }
        this.onUpdate(deltaTime);
    },
    onUpdate : noop,
    // clear : function(deltaTime){
        // if(deltaTime<1){
            // this.ctx.drawImage(this.map,0,0);
        // } else {
            // this.clearCanvas(deltaTime);
            // this.ctx.drawImage(this.map,0,0);
        // }
    // },
    draw : function(deltaTime){
        this.ctx.drawImage(this.map,0,0,width,height);
        for(var i = 0,len = this.bubbles.length;i<len;i++){
            var bubble = this.bubbles[i];
            bubble.draw(this.ctx,this);
        }
    },
    clearCanvas : function(deltaTime){
        this.canvas.width = 0;
        this.canvas.width = width;
    },
    stop : function(){
        this._playing = false;
    },
    //restart : noop,
   // over : noop

};
