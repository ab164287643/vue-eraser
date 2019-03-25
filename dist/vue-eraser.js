!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("vue-eraser",[],e):"object"==typeof exports?exports["vue-eraser"]=e():t["vue-eraser"]=e()}("undefined"!=typeof self?self:this,function(){return function(t){function e(s){if(n[s])return n[s].exports;var i=n[s]={i:s,l:!1,exports:{}};return t[s].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,s){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:s})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/dist/",e(e.s=1)}([function(t,e,n){"use strict";e.a={name:"vue-eraser",props:{elementId:{type:String,default:"vueEraser"},size:{type:Number,default:50},completeRatio:{type:Number,default:.7},completeFunction:{type:Function,default:function(){}},progressFunction:{type:Function,default:function(){}},resultSrc:{type:String,default:"http://cdn.dowebok.com/140/images/1.jpg"},coverSrc:{type:String,required:!0}},data:function(){return{source:null,width:0,height:0,canvas:null,canvasPosX:0,canvasPosY:0,canvasTouchX:0,canvasTouchY:0,isTouchDown:!1,mobileTouchID:null,ctx:null,parts:[],colParts:0,numParts:0,ratio:0,complete:!1}},created:function(){},mounted:function(){this.init()},methods:{init:function(){var t=this,e=this.$refs.eraserImg,n=document.querySelector("#"+t.elementId),s=void 0;t.source=e,setTimeout(function(){var i=new Image;i.src=t.coverSrc,i.onload=function(){t.width=e.offsetWidth,t.height=e.offsetHeight,t.canvas=document.createElement("canvas"),t.canvas.classList.add("eraser-canvas"),t.canvas.style.position="absolute",t.canvas.style.left="0",t.canvas.style.top="0",n.appendChild(t.canvas),t.canvas.width=t.width,t.canvas.height=t.height,t.ctx=t.canvas.getContext("2d"),s=t.canvas.getBoundingClientRect(),t.canvasPosX=s.left,t.canvasPosY=s.top,t.ctx.drawImage(e,0,0,t.width,t.height),setTimeout(function(){e.parentNode.removeChild(e),t.ctx.globalCompositeOperation="destination-out",t.ctx.strokeStyle="rgba(255,0,0,255)",t.ctx.lineWidth=t.size,t.ctx.lineCap="round",t.bindEvent()})}},100),this.colParts=Math.floor(this.width/this.size),this.numParts=Math.floor(this.height/this.size)*this.colParts;for(var i=this.numParts;i--;)this.parts.push(1);window.onresize=function(){s=t.canvas.getBoundingClientRect(),t.canvasPosX=s.left,t.canvasPosY=s.top}},bindEvent:function(){this.canvas.addEventListener("mousedown",this.mouseDown.bind(this),!1),this.canvas.addEventListener("touchstart",this.touchStart.bind(this),!1),this.canvas.addEventListener("touchmove",this.touchMove.bind(this),!1),this.canvas.addEventListener("touchend",this.touchEnd.bind(this),!1)},mouseDown:function(t){this.canvasTouchX=t.pageX-this.canvasPosX,this.canvasTouchY=t.pageY-this.canvasPosY,this.evaluatePoint(this.canvasTouchX,this.canvasTouchY),this.isTouchDown=!0,this.ctx.beginPath(),this.ctx.moveTo(this.canvasTouchX-1,this.canvasTouchY),this.ctx.lineTo(this.canvasTouchX,this.canvasTouchY),this.ctx.stroke(),this.mouseMove=this.mouseMove.bind(this),this.mouseUp=this.mouseUp.bind(this),this.canvas.addEventListener("mousemove",this.mouseMove,!1),document.addEventListener("mouseup",this.mouseUp,!1),t.preventDefault()},mouseMove:function(){var t=event.pageX-this.canvasPosX,e=event.pageY-this.canvasPosY;this.evaluatePoint(t,e),this.ctx.beginPath(),this.ctx.moveTo(this.canvasTouchX,this.canvasTouchY),this.ctx.lineTo(t,e),this.ctx.stroke(),this.canvasTouchX=t,this.canvasTouchY=e,event.preventDefault()},mouseUp:function(){this.isTouchDown=!1,this.canvas.removeEventListener("mousemove",this.mouseMove,!1),document.removeEventListener("mouseup",this.mouseUp,!1)},touchStart:function(t){if(!this.isTouchDown){var e=t.changedTouches[0];this.isTouchDown=!0,this.mobileTouchID=e.identifier,this.canvasTouchX=e.pageX-this.canvasPosX,this.canvasTouchY=e.pageY-this.canvasPosY,this.evaluatePoint(this.canvasTouchX,this.canvasTouchY)}t.preventDefault()},touchMove:function(t){if(this.isTouchDown)for(var e=t.changedTouches,n=e.length;n--;)if(e[n].identifier==this.mobileTouchID){var s=e[n].pageX-this.canvasPosX,i=e[n].pageY-this.canvasPosY;this.evaluatePoint(s,i),this.ctx.beginPath(),this.ctx.moveTo(this.canvasTouchX,this.canvasTouchY),this.canvasTouchX=s,this.canvasTouchY=i,this.ctx.lineTo(s,i),this.ctx.stroke();break}t.preventDefault()},touchEnd:function(t){if(this.isTouchDown)for(var e=t.changedTouches,n=e.length;n--;)if(e[n].identifier==this.mobileTouchID){this.isTouchDown=!1,t.preventDefault();break}},evaluatePoint:function(t,e){var n=Math.floor(t/this.size)+Math.floor(e/this.size)*this.colParts;n>=0&&n<this.numParts&&(this.ratio+=this.parts[n],this.parts[n]=0,this.complete||(this.ratio/this.numParts>=this.completeRatio?(this.complete=!0,null!=this.completeFunction&&"function"==typeof this.completeFunction&&this.completeFunction(this.ratio/this.numParts)):null!=this.progressFunction&&"function"==typeof this.progressFunction&&this.progressFunction(this.ratio/this.numParts)))},clear:function(){this.ctx.clearRect(0,0,this.width,this.height);for(var t=this.numParts;t--;)this.parts[t]=0;this.ratio=this.numParts,this.complete=!0,null!=this.completeFunction&&this.completeFunction()},reset:function(){this.ctx.globalCompositeOperation="source-over",this.ctx.drawImage(this.source,0,0),this.ctx.globalCompositeOperation="destination-out";for(var t=this.numParts;t--;)this.parts[t]=1;this.ratio=0,this.complete=!1}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),n.d(e,"install",function(){return i});var s=n(2),i=function(t){arguments.length>1&&void 0!==arguments[1]&&arguments[1];t.component(s.a.name,s.a)};"undefined"!=typeof window&&window.Vue&&i(window.Vue),e.default=s.a},function(t,e,n){"use strict";var s=n(3);s.a.install=function(t){return t.component(s.a.name,s.a)},"undefined"!=typeof window&&window.Vue&&window.Vue.use(s.a),e.a=s.a},function(t,e,n){"use strict";function s(t){n(4)}var i=n(0),o=n(10),a=n(9),r=s,c=a(i.a,o.a,!1,r,null,null);e.a=c.exports},function(t,e,n){var s=n(5);"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);n(7)("4faae868",s,!0,{})},function(t,e,n){e=t.exports=n(6)(!1),e.push([t.i,".vue-eraser{position:relative;width:100%;user-select:none}.vue-eraser .img-wraper,.vue-eraser .img-wraper img{width:100%}.vue-eraser .cover-img{z-index:2;background-color:#fff}.vue-eraser .cover-img,.vue-eraser .eraser-canvas{position:absolute;left:0;top:0;width:100%;height:100%}.vue-eraser .eraser-canvas{z-index:3}",""])},function(t,e){function n(t,e){var n=t[1]||"",i=t[3];if(!i)return n;if(e&&"function"==typeof btoa){var o=s(i);return[n].concat(i.sources.map(function(t){return"/*# sourceURL="+i.sourceRoot+t+" */"})).concat([o]).join("\n")}return[n].join("\n")}function s(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"}t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var s=n(e,t);return e[2]?"@media "+e[2]+"{"+s+"}":s}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var s={},i=0;i<this.length;i++){var o=this[i][0];"number"==typeof o&&(s[o]=!0)}for(i=0;i<t.length;i++){var a=t[i];"number"==typeof a[0]&&s[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),e.push(a))}},e}},function(t,e,n){function s(t){for(var e=0;e<t.length;e++){var n=t[e],s=h[n.id];if(s){s.refs++;for(var i=0;i<s.parts.length;i++)s.parts[i](n.parts[i]);for(;i<n.parts.length;i++)s.parts.push(o(n.parts[i]));s.parts.length>n.parts.length&&(s.parts.length=n.parts.length)}else{for(var a=[],i=0;i<n.parts.length;i++)a.push(o(n.parts[i]));h[n.id]={id:n.id,refs:1,parts:a}}}}function i(){var t=document.createElement("style");return t.type="text/css",d.appendChild(t),t}function o(t){var e,n,s=document.querySelector("style["+g+'~="'+t.id+'"]');if(s){if(v)return p;s.parentNode.removeChild(s)}if(b){var o=f++;s=l||(l=i()),e=a.bind(null,s,o,!1),n=a.bind(null,s,o,!0)}else s=i(),e=r.bind(null,s),n=function(){s.parentNode.removeChild(s)};return e(t),function(s){if(s){if(s.css===t.css&&s.media===t.media&&s.sourceMap===t.sourceMap)return;e(t=s)}else n()}}function a(t,e,n,s){var i=n?"":s.css;if(t.styleSheet)t.styleSheet.cssText=T(e,i);else{var o=document.createTextNode(i),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(o,a[e]):t.appendChild(o)}}function r(t,e){var n=e.css,s=e.media,i=e.sourceMap;if(s&&t.setAttribute("media",s),m.ssrId&&t.setAttribute(g,e.id),i&&(n+="\n/*# sourceURL="+i.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}var c="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!c)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var u=n(8),h={},d=c&&(document.head||document.getElementsByTagName("head")[0]),l=null,f=0,v=!1,p=function(){},m=null,g="data-vue-ssr-id",b="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());t.exports=function(t,e,n,i){v=n,m=i||{};var o=u(t,e);return s(o),function(e){for(var n=[],i=0;i<o.length;i++){var a=o[i],r=h[a.id];r.refs--,n.push(r)}e?(o=u(t,e),s(o)):o=[];for(var i=0;i<n.length;i++){var r=n[i];if(0===r.refs){for(var c=0;c<r.parts.length;c++)r.parts[c]();delete h[r.id]}}}};var T=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(t,e){t.exports=function(t,e){for(var n=[],s={},i=0;i<e.length;i++){var o=e[i],a=o[0],r=o[1],c=o[2],u=o[3],h={id:t+":"+i,css:r,media:c,sourceMap:u};s[a]?s[a].parts.push(h):n.push(s[a]={id:a,parts:[h]})}return n}},function(t,e){t.exports=function(t,e,n,s,i,o){var a,r=t=t||{},c=typeof t.default;"object"!==c&&"function"!==c||(a=t,r=t.default);var u="function"==typeof r?r.options:r;e&&(u.render=e.render,u.staticRenderFns=e.staticRenderFns,u._compiled=!0),n&&(u.functional=!0),i&&(u._scopeId=i);var h;if(o?(h=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),s&&s.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(o)},u._ssrRegister=h):s&&(h=s),h){var d=u.functional,l=d?u.render:u.beforeCreate;d?(u._injectStyles=h,u.render=function(t,e){return h.call(e),l(t,e)}):u.beforeCreate=l?[].concat(l,h):[h]}return{esModule:a,exports:r,options:u}}},function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vue-eraser",attrs:{id:t.elementId}},[n("div",{staticClass:"img-wraper"},[n("img",{ref:"resultSrc",attrs:{src:t.resultSrc,alt:""}})]),t._v(" "),t.coverSrc?n("img",{ref:"eraserImg",staticClass:"cover-img",attrs:{src:t.coverSrc,alt:""}}):t._e()])},i=[],o={render:s,staticRenderFns:i};e.a=o}])});
//# sourceMappingURL=vue-eraser.js.map