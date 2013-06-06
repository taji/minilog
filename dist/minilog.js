(function(){function require(e,t,n){t||(t=0);var r=require.resolve(e,t),i=require.m[t][r];if(!i)throw new Error('failed to require "'+e+'" from '+n);if(i.c){t=i.c,r=i.m,i=require.m[t][i.m];if(!i)throw new Error('failed to require "'+r+'" from '+t)}return i.exports||(i.exports={},i.call(i.exports,i,i.exports,require.relative(r,t))),i.exports}require.resolve=function(e,t){var n=e,r=e+".js",i=e+"/index.js";return require.m[t][r]&&r||require.m[t][i]&&i||n},require.relative=function(e,t){return function(n){if("."!=n.charAt(0))return require(n,t,e);var r=e.split("/"),i=n.split("/");r.pop();for(var s=0;s<i.length;s++){var o=i[s];".."==o?r.pop():"."!=o&&r.push(o)}return require(r.join("/"),t,e)}};
require.m = [];
/* -- root -- */
require.m[0] = { 
"lib/web/array.js": function(module, exports, require){
var e=[];module.exports={write:function(t){e.push(t)},end:function(){},get:function(){return e},empty:function(){e=[]}};},
"lib/web/index.js": function(module, exports, require){
function s(e,t){var n,s;for(n=0;n<r.length;n++){s=r[n];if(s.topic&&s.topic.test(e)&&(s.level==i.debug||i[t]>=s.level))return!0}return!1}var e=require("../common/minilog.js");e.defaultBackend=require("./console.js"),e.format(function(e,t,n){var r=[];return e&&r.push(e),t&&r.push(t),r.concat(n).join(" ")+"\n"});if(typeof window!="undefined"){try{e.enable(JSON.parse(window.localStorage.minilogSettings))}catch(t){}if(window.location&&window.location.search){var n=RegExp("[?&]minilog=([^&]*)").exec(window.location.search);n&&e.enable(decodeURIComponent(n[1]))}}var r=[],i={debug:1,info:2,warn:3,error:4};e.filter=function(e,t){r=[],str||(str="*.debug");var n=str.split(/[\s,]+/),s,o;for(s=0;s<n.length;s++)o=n[s].split("."),o.length>2&&(o=[o.slice(0,-1).join("."),o.slice(-1).join()]),r.push({topic:new RegExp("^"+o[0].replace("*",".*")),level:i[o[1]]||1})};var o=e.enable;e.enable=function(t){o.call(e,t);try{window.localStorage.minilogSettings=JSON.stringify(str)}catch(n){}},e.disable=function(){try{delete window.localStorage.minilogSettings}catch(e){}},exports=module.exports=e,exports.backends={array:require("./array.js"),browser:e.defaultBackend,localStorage:require("./localstorage.js"),jQuery:require("./jquery_simple.js")};},
"lib/web/console.js": function(module, exports, require){
var e=/\n+$/;module.exports={format:function(t,n,r){var i=r.length-1;if(typeof console=="undefined"||!console.log)return;if(console.log.apply)return console.log.apply(console,r);if(JSON&&JSON.stringify){r[i]&&typeof r[i]=="string"&&(r[i]=r[i].replace(e,""));try{for(i=0;i<r.length;i++)r[i]=JSON.stringify(r[i])}catch(s){}console.log(r.join(" "))}},write:function(){},end:function(){}};},
"lib/common/minilog.js": function(module, exports, require){
var e=require("microee").prototype,t=[],n={readable:!0},r={format:function(){return""}};for(var i in e)e.hasOwnProperty(i)&&(n[i]=e[i]);exports=module.exports=function(t){var r=function(){return n.emit("item",t,undefined,Array.prototype.slice.call(arguments)),r};return r.debug=function(){return n.emit("item",t,"debug",Array.prototype.slice.call(arguments)),r},r.info=function(){return n.emit("item",t,"info",Array.prototype.slice.call(arguments)),r},r.warn=function(){return n.emit("item",t,"warn",Array.prototype.slice.call(arguments)),r},r.error=function(){return n.emit("item",t,"error",Array.prototype.slice.call(arguments)),r},r},exports.format=function(e){r.format=e},exports.pipe=function(e){function i(n,i,s){var o=r;if(t.filter&&!t.filter(n,i,s))return;e.format&&(o=e),t.format&&(o=t),e.write(o.format(n,i,s))}function s(){!e._isStdio&&e.end()}var t={};n.emit("unpipe",e),n.on("item",i),n.on("end",s),n.when("unpipe",function(t){var r=t==e;return r&&(n.removeListener("item",i),n.removeListener("end",s)),r});var o={filter:function(e){return t.filter=e,o},format:function(e){return t.format=e,o},pipe:exports.pipe};return o},exports.unpipe=function(e){return n.emit("unpipe",e),exports},exports.defaultBackend=null,exports.enable=function(){return exports.pipe(exports.defaultBackend)},exports.disable=function(){return exports.unpipe(exports.defaultBackend)},exports.end=function(){n.emit("end"),n.removeAllListeners()};},
"lib/web/localstorage.js": function(module, exports, require){
var e=!1;module.exports={write:function(t){if(typeof window=="undefined"||typeof JSON=="undefined"||!JSON.stringify||!JSON.parse)return;try{e||(e=window.localStorage.minilog?JSON.parse(window.localStorage.minilog):[]),e.push((new Date).toString()+" "+t),window.localStorage.minilog=JSON.stringify(e)}catch(n){}},end:function(){}};},
"lib/web/jquery_simple.js": function(module, exports, require){
function e(e){this.url=e.url||"http://localhost:8080/",this.cache=[],this.timer=null,this.interval=e.interval||3e4,this.enabled=!0,this.jQuery=window.jQuery,this.extras={}}e.prototype.write=function(e){this.timer||this.init(),this.cache.push(e)},e.prototype.init=function(){if(!this.enabled||!this.jQuery)return;var e=this;this.timer=setTimeout(function(){if(e.cache.length==0)return e.init();e.extras.logs=e.cache,e.jQuery.ajax(e.url,{type:"POST",cache:!1,processData:!1,data:JSON.stringify(e.extras),contentType:"application/json",timeout:1e4}).success(function(t,n,r){t.interval&&(e.interval=Math.max(1e3,t.interval))}).error(function(){e.interval=3e4}).always(function(){e.init()}),e.cache=[]},this.interval)},e.prototype.end=function(){},e.jQueryWait=function(t){if(typeof window!="undefined"&&(window.jQuery||window.$))return t(window.jQuery||window.$);typeof window!="undefined"&&setTimeout(function(){e.jQueryWait(t)},200)},module.exports=e;},
"microee": {"c":1,"m":"index.js"}};
/* -- microee -- */
require.m[1] = { 
"index.js": function(module, exports, require){
function e(){this._events={}}e.prototype={on:function(e,t){this._events||(this._events={});var n=this._events;return(n[e]||(n[e]=[])).push(t),this},removeListener:function(e,t){var n=this._events[e]||[],r;for(r=n.length-1;r>=0&&n[r];r--)(n[r]===t||n[r].cb===t)&&n.splice(r,1)},removeAllListeners:function(e){e?this._events[e]&&(this._events[e]=[]):this._events={}},emit:function(e){this._events||(this._events={});var t=Array.prototype.slice.call(arguments,1),n,r=this._events[e]||[];for(n=r.length-1;n>=0&&r[n];n--)r[n].apply(this,t);return this},when:function(e,t){return this.once(e,t,!0)},once:function(e,t,n){function r(){n||this.removeListener(e,r),t.apply(this,arguments)&&n&&this.removeListener(e,r)}return t?(r.cb=t,this.on(e,r),this):this}},e.mixin=function(t){var n=e.prototype,r;for(r in n)n.hasOwnProperty(r)&&(t.prototype[r]=n[r])},module.exports=e;}};
Minilog = require('lib/web/index.js');
}());