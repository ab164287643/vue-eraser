import vueEraser from './vue-eraser'

vueEraser.install = Vue => Vue.component(vueEraser.name , vueEraser);

if(typeof window !== 'undefined' && window.Vue){
    window.Vue.use(vueEraser);
}

export default vueEraser;