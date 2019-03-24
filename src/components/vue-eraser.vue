<template>
    <div :id="elementId" class="vue-eraser">
        <div class="img-wraper">
            <img ref="resultSrc" :src="resultSrc" alt="">
        </div>
        <img ref='eraserImg' class="cover-img" v-if="coverSrc" :src="coverSrc" alt="">
    </div>
</template>
<script>
export default {
    name: "vue-eraser",
    props: {
        elementId: {
            type: String,
            default: "vueEraser"
        },
        size: {
            type: Number,
            default: 50
        },
        completeRatio: {
            type: Number,
            default: 0.7
        },
        completeFunction: {
            type: Function,
            default: function(){
            }
        },
        progressFunction: {
            type: Function,
            default: function(){
            }
        },
        resultSrc: {//结果图片
            type: String,
            default: "http://cdn.dowebok.com/140/images/1.jpg"
        },
        coverSrc: {//覆盖图片
            required: true,
            type: String,
        },
    },
    data (){
        return {
            source: null,
            width: 0,
            height: 0,
            canvas: null,
            canvasPosX: 0,//相对于屏幕偏移
            canvasPosY: 0,
            canvasTouchX: 0,//鼠标位置（减去canvas的边界）
            canvasTouchY: 0,
            isTouchDown: false,
            mobileTouchID: null,//移动端的touch identifier
            ctx: null,
            parts: [],//用于计算面积
            colParts: 0,//一行多好个圆
            numParts: 0,//整个面积上有多少个圆

            ratio: 0,//当前画出比率
            complete: false,//是否达到完成比率
        }
    },
    created (){
    },
    mounted (){
        // setTimeout(() => {
        //     this.init();
        // }, 20);
        this.init();
        this.bindEvent();
    },
    methods: {
        init (){
            let _this = this;
            let imgEle = this.$refs.eraserImg, 
                vueEraser= document.querySelector("#" + this.elementId),
                canvasBoundingRect;
            this.source = imgEle;
            this.width = imgEle.offsetWidth;
            this.height = imgEle.offsetHeight;

            this.canvas = document.createElement("canvas");
            this.canvas.classList.add("eraser-canvas");
            this.canvas.style.position = "absolute"
            this.canvas.style.left = "0"
            this.canvas.style.top = "0"

            vueEraser.appendChild(this.canvas);
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.ctx = this.canvas.getContext("2d");
            canvasBoundingRect = this.canvas.getBoundingClientRect();
            this.canvasPosX = canvasBoundingRect.left;
            this.canvasPosY = canvasBoundingRect.top;


            this.ctx.drawImage(imgEle, 0, 0, this.width, this.height);
            imgEle.parentNode.removeChild(imgEle);

            this.colParts = Math.floor(this.width / this.size);
            this.numParts = Math.floor(this.height / this.size) * this.colParts;
            let n = this.numParts;
            while( n -- ) this.parts.push(1);

            // prepare context for drawing operations
            this.ctx.globalCompositeOperation = "destination-out";//实现橡皮插的效果，后面画的图将让图层透明
            this.ctx.strokeStyle = 'rgba(255,0,0,255)';
            this.ctx.lineWidth = this.size;
            this.ctx.lineCap = "round";

            window.onresize = function () {
                canvasBoundingRect = _this.canvas.getBoundingClientRect();
                _this.canvasPosX = canvasBoundingRect.left;
                _this.canvasPosY = canvasBoundingRect.top;
            }
        },
        bindEvent (){
            //pc端
            this.canvas.addEventListener("mousedown", this.mouseDown.bind(this), false);
            //移动端
            this.canvas.addEventListener("touchstart", this.touchStart.bind(this), false);
            this.canvas.addEventListener("touchmove", this.touchMove.bind(this), false);
            this.canvas.addEventListener("touchend", this.touchEnd.bind(this), false);
        },
        mouseDown (event){
            this.canvasTouchX = event.pageX - this.canvasPosX;
            this.canvasTouchY = event.pageY - this.canvasPosY;
            this.evaluatePoint(this.canvasTouchX, this.canvasTouchY);
            this.isTouchDown = true;

            this.ctx.beginPath();
            this.ctx.moveTo(this.canvasTouchX - 1, this.canvasTouchY);
            this.ctx.lineTo(this.canvasTouchX, this.canvasTouchY);
            this.ctx.stroke();

            this.mouseMove = this.mouseMove.bind(this);
            this.mouseUp = this.mouseUp.bind(this);
            this.canvas.addEventListener("mousemove", this.mouseMove, false);
            document.addEventListener("mouseup", this.mouseUp, false);
            event.preventDefault();
        },
        mouseMove (){
            let tx = event.pageX - this.canvasPosX,
                ty = event.pageY - this.canvasPosY;
            this.evaluatePoint(tx, ty);
            this.ctx.beginPath();
            this.ctx.moveTo(this.canvasTouchX, this.canvasTouchY);
            this.ctx.lineTo(tx, ty);
            this.ctx.stroke();

            this.canvasTouchX = tx;
            this.canvasTouchY = ty;
            event.preventDefault();
        },
        mouseUp (){
            this.isTouchDown = false;
            this.canvas.removeEventListener("mousemove", this.mouseMove, false);
            document.removeEventListener("mouseup", this.mouseUp, false);
        },
        touchStart (event){
            if (!this.isTouchDown){
                let touch = event.changedTouches[0];
                this.isTouchDown = true;
                this.mobileTouchID = touch.identifier;
                this.canvasTouchX = touch.pageX - this.canvasPosX;
                this.canvasTouchY = touch.pageY - this.canvasPosY;
                this.evaluatePoint(this.canvasTouchX, this.canvasTouchY);
            }
            event.preventDefault();
        },
        touchMove (event){
            if (this.isTouchDown){
                let touches = event.changedTouches;
                let n = touches.length;
                while( n-- ){
                    if (touches[n].identifier == this.mobileTouchID){
                        let tx = touches[n].pageX - this.canvasPosX;
                        let ty = touches[n].pageY - this.canvasPosY;
                        this.evaluatePoint(tx, ty);
                        this.ctx.beginPath();
                        this.ctx.moveTo(this.canvasTouchX, this.canvasTouchY);
                        this.canvasTouchX = tx;
                        this.canvasTouchY = ty;
                        this.ctx.lineTo(tx, ty);
                        this.ctx.stroke();
                        break;
                    }
                }
            }
            event.preventDefault();
        },
        touchEnd (event){
            if (this.isTouchDown) {
                let touches = event.changedTouches,
                    n = touches.length;
                while (n--)
                    if (touches[n].identifier == this.mobileTouchID) {//为同一根手指的情况下
                        this.isTouchDown = false;
                        event.preventDefault();
                        break;
                    }
            }
        },
         //计算面积
        evaluatePoint (tx, ty) {
            //原理： 首先算出整个面积上面有多少个圆(data.numParts)，生成一个数组(data.parts)， 然后找出当前鼠标位置是哪一个圆，
            //看一下这个圆是否被占，若没被占， data.ratio加1，标记这个圆已被占。

            //获取当前圆的位置(当前鼠标上面所有的圆加x方向圆的个数)  这里用图更好说明WWW
            /**
             *    圆 圆 圆 圆 圆 圆
             *    圆 圆 圆 圆 圆 圆
             *    圆 圆 圆（鼠标在这里，那么位置就是上面的圆，加这一行横向的圆）
             */
            var p = Math.floor(tx / this.size) + Math.floor(ty / this.size) * this.colParts;
            if (p >= 0 && p < this.numParts) {
                this.ratio += this.parts[p];
                this.parts[p] = 0;
                if (!this.complete) {
                    if (this.ratio / this.numParts >= this.completeRatio) {
                        this.complete = true;
                        if (this.completeFunction != null && typeof this.completeFunction === "function") this.completeFunction(this.ratio / this.numParts);
                    }
                    else {
                        if (this.progressFunction != null && typeof this.progressFunction === "function") this.progressFunction(this.ratio / this.numParts);
                    }
                }
            }
        },
        clear () {
            //清除所有
            this.ctx.clearRect(0, 0, this.width, this.height);
            let n = this.numParts;
            while (n--) this.parts[n] = 0;
            this.ratio = this.numParts;
            this.complete = true;
            if (this.completeFunction != null) this.completeFunction();
        },
        reset  () {
            this.ctx.globalCompositeOperation = "source-over";
            this.ctx.drawImage(this.source, 0, 0);
            this.ctx.globalCompositeOperation = "destination-out";
            var n = this.numParts;
            while (n--) this.parts[n] = 1;
            this.ratio = 0;
            this.complete = false;
        }
    }
}
</script>
<style lang="scss" scoped>
.vue-eraser{
    position: relative;
    width: 100%;
    .img-wraper{
        width: 100%;
        img{
            width: 100%;
        }
    }
    .cover-img{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
        background-color: #fff;
    }
    .eraser-canvas {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 3;
    }

}
</style>

