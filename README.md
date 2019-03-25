# vue-eraser

> 一款用于刮刮乐的组件

## install
```
npm install --save vue-eraser
```
##Usage
1、通过import使用
```
import vueEaser from "vue-eraser";
<vue-eraser
    ref="vueEraser"
    :size="25"
    coverSrc="http://cdn.dowebok.com/140/images/2.jpg"
    :completeFunction="completeFunction"
    :progressFunction="progressFunction"
></vue-eraser>
```
2、通过script标签引入
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, minimal-ui">
    <title>vue-eraser</title>
    <style>
        *{
            margin: 0;padding: 0;
        }
        #app{
            width: 600px;
            margin: 50px auto;
        }
        .btn:nth-of-type(1){
            margin-top: 10px;
            display: inline-block;
            width: 100px;
            height: 40px;
            background-color: #2d8cf0;
            color: #fff;
            font-size: 16px;
            text-align: center;
            line-height: 40px;
            border: none;
            touch-action: manipulation;
            font-weight: 400;
            cursor: pointer;
            white-space: nowrap;
            user-select: none;
            border-radius: 4px;
            transition: color .2s linear,background-color .2s linear,border .2s linear,box-shadow .2s linear;
        }
        .btn:nth-of-type(2){
            margin-top: 10px;
            margin-top: 10px;
            display: inline-block;
            width: 100px;
            height: 40px;
            background-color: #19be6b;
            color: #fff;
            font-size: 16px;
            text-align: center;
            line-height: 40px;
            border: none;
            touch-action: manipulation;
            font-weight: 400;
            cursor: pointer;
            white-space: nowrap;
            user-select: none;
            border-radius: 4px;
            transition: color .2s linear,background-color .2s linear,border .2s linear,box-shadow .2s linear;
        }
    </style>
  </head>
  <body>
    <div id="app">
        <h3>测试时当时用的图片链接可能失效请更换图片链接</h3>
        <vue-eraser
        ref="vueEraser"
        :size="50"
        :complete-ratio="0.5"
        :cover-src="coverSrc"
        :result-src="resultSrc"
        :complete-function="completeFunction"
        :progress-function="progressFunction"
        >
        </vue-eraser>
        <button class="btn" @click="reset">reset</button>
        <button class="btn" @click="clear">clear</button>
    </div>
<script src="https://cdn.bootcss.com/vue/2.6.9/vue.min.js"></script>
<script src="vue-eraser/dist/vue-eraser.js"></script>
<script>
new Vue({
    el: "#app",
    data (){
        return {
            coverSrc: 'https://img.zcool.cn/community/01f5795541d50b00000115410b205a.jpg@1280w_1l_2o_100sh.jpg',
            resultSrc:"http://exueshi.oss-cn-hangzhou.aliyuncs.com/productLogo/2019-2-26-1551143063378.jpg"
        }
    },
    mounted() {
        
    },
    methods: {
        completeFunction (ratio){
            console.log("complete");
        },
        progressFunction (ratio){
            console.log(ratio);
        },
        reset (){
            this.$refs.vueEraser.reset();
        },
        clear(){
            this.$refs.vueEraser.clear();
        }
    },
});
</script>
  </body>
</html>

```
##property
Name|Type|Default|Description
--|:--:|--:|--:
element-id|String|vueEraser|该组件外层元素的id
size|Number|50|清除的半径
completeRatio|Number|0.7|完成需要刮掉的面积占比
completeFunction|Function|-|达到completeRatio后的回掉函数
progressFunction|Function|-|刮的过程中的回掉函数，返回实时的面积占比
resultSrc|String|http://cdn.dowebok.com/140/images/1.jpg|刮刮卡结果区域的图片
coverSrc|String|-(required)|刮刮卡遮罩层的图片
