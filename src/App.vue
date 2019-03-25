<template>
  <div id="app">
    <div class="wraper">
      <h3>测试时当时用的图片链接可能失效请更换图片链接</h3>
      <vue-eraser
      ref="vueEraser"
      :size="25"
      coverSrc="http://cdn.dowebok.com/140/images/2.jpg"
      :completeFunction="completeFunction"
      :progressFunction="progressFunction"
      ></vue-eraser>
      <button class="btn" @click="reset">reset</button>
      <button class="btn" @click="clear">clear</button>
    </div>
  </div>
</template>

<script>
// import vueEaser from "./components/vue-eraser";
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    completeFunction (ratio){
      // console.log(ratio);
    },
    progressFunction (ratio){
      // console.log(ratio);
    },
    reset (){
      this.$refs.vueEraser.reset();
    },
    clear(){
      this.$refs.vueEraser.clear();
    }
  }
}
</script>

<style lang="scss">
@mixin btn($width, $height, $bgc, $color){
  display: inline-block;
  width: $width;
  height: $height;
  background-color: $bgc;
  color: $color;
  font-size: 16px;
  text-align: center;
  line-height: $height;
  border: none;
  touch-action: manipulation;
  font-weight: 400;
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  border-radius: 4px;
  transition: color .2s linear,background-color .2s linear,border .2s linear,box-shadow .2s linear;
  &:hover{
    opacity: .8;
  }
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
*{
  margin: 0;
  padding: 0;
}
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.wraper{
  width: 700px;
  margin: 50px auto 0;
}
.btn:nth-of-type(1){
  margin-top: 10px;
  @include btn(100px, 40px, #2d8cf0, #fff);
}
.btn:nth-of-type(2){
  margin-top: 10px;
  @include btn(100px, 40px, #19be6b, #fff);
}
</style>
