import vueEraser from 'components';

export const install = function(Vue , opts = {}){
    Vue.component(vueEraser.name , vueEraser);
}

//支持使用标签的方式引入
if(typeof window !== 'undefined' && window.Vue){
    install(window.Vue);
}

export default vueEraser;
