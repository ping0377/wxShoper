(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-getmsg-getmsg"],{"03d4":function(e,t,r){"use strict";r.r(t);var i=r("277a"),a=r.n(i);for(var s in i)"default"!==s&&function(e){r.d(t,e,(function(){return i[e]}))}(s);t["default"]=a.a},1361:function(e,t,r){r("c975"),r("a9e3"),r("4d63"),r("ac1f"),r("25f0"),r("1276"),e.exports={error:"",check:function(e,t){for(var r=0;r<t.length;r++){if(!t[r].checkType)return!0;if(!t[r].name)return!0;if(!t[r].errorMsg)return!0;if(!e[t[r].name])return this.error=t[r].errorMsg,!1;switch(t[r].checkType){case"string":var i=new RegExp("^.{"+t[r].checkRule+"}$");if(!i.test(e[t[r].name]))return this.error=t[r].errorMsg,!1;break;case"int":i=new RegExp("^(-[1-9]|[1-9])[0-9]{"+t[r].checkRule+"}$");if(!i.test(e[t[r].name]))return this.error=t[r].errorMsg,!1;break;case"between":if(!this.isNumber(e[t[r].name]))return this.error=t[r].errorMsg,!1;var a=t[r].checkRule.split(",");if(a[0]=Number(a[0]),a[1]=Number(a[1]),e[t[r].name]>a[1]||e[t[r].name]<a[0])return this.error=t[r].errorMsg,!1;break;case"betweenD":i=/^-?[1-9][0-9]?$/;if(!i.test(e[t[r].name]))return this.error=t[r].errorMsg,!1;a=t[r].checkRule.split(",");if(a[0]=Number(a[0]),a[1]=Number(a[1]),e[t[r].name]>a[1]||e[t[r].name]<a[0])return this.error=t[r].errorMsg,!1;break;case"betweenF":i=/^-?[0-9][0-9]?.+[0-9]+$/;if(!i.test(e[t[r].name]))return this.error=t[r].errorMsg,!1;a=t[r].checkRule.split(",");if(a[0]=Number(a[0]),a[1]=Number(a[1]),e[t[r].name]>a[1]||e[t[r].name]<a[0])return this.error=t[r].errorMsg,!1;break;case"same":if(e[t[r].name]!=t[r].checkRule)return this.error=t[r].errorMsg,!1;break;case"notsame":if(e[t[r].name]==t[r].checkRule)return this.error=t[r].errorMsg,!1;break;case"email":i=/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;if(!i.test(e[t[r].name]))return this.error=t[r].errorMsg,!1;break;case"phoneno":i=/^1[0-9]{10,10}$/;if(!i.test(e[t[r].name]))return this.error=t[r].errorMsg,!1;break;case"zipcode":i=/^[0-9]{6}$/;if(!i.test(e[t[r].name]))return this.error=t[r].errorMsg,!1;break;case"reg":i=new RegExp(t[r].checkRule);if(!i.test(e[t[r].name]))return this.error=t[r].errorMsg,!1;break;case"in":if(-1==t[r].checkRule.indexOf(e[t[r].name]))return this.error=t[r].errorMsg,!1;break;case"notnull":if(null==e[t[r].name]||e[t[r].name].length<1)return this.error=t[r].errorMsg,!1;break}}return!0},isNumber:function(e){return e=Number(e),NaN!=e}}},"1a95":function(e,t,r){var i=r("24fb");t=i(!1),t.push([e.i,".showimg img[data-v-70b934e6]{\n\t/* display: none; */width:%?200?%;height:%?200?%}.content[data-v-70b934e6]{padding-left:%?10?%;padding-top:%?30?%}.addclick[data-v-70b934e6]{width:%?150?%;height:%?150?%;border:1px solid #ccc;text-align:center;line-height:%?150?%}.addclick[data-v-70b934e6]:hover{cursor:pointer}.str[data-v-70b934e6]{font-size:%?32?%}.iview[data-v-70b934e6]{margin-bottom:%?6?%}",""]),e.exports=t},"277a":function(e,t,r){"use strict";var i=r("ee27"),a=r("4a46");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=a(r("a45c")),n=i(r("ae1b")),o=(r("1361"),{data:function(){return{showadd:!0,uname:"",workerTel:"",time:"",address:"",longitude:"",latitude:"",BLimg:"",code:"",shopTel:"",shopName:"",shopManager:"",province:"",city:"",district:"",http:"",IDNo:""}},mounted:function(){},methods:{getaddr:function(){var e=this;uni.chooseLocation({latitude:e.latitude,longitude:e.longitude,success:function(t){e.address=t.address;t.longitude;e.longitude=t.longitude,e.latitude=t.latitude;t.latitude}})},submit:function(){if(""!=this.uname&&""!=this.tel&&""!=this.code&&""!=this.BLimg){uni.showLoading({title:"提交中...",mask:!0});var e={workerName:this.uname,workerTel:this.workerTel,shopName:this.shopName,shopTel:this.shopTel,shopManager:this.shopManager,BLimg:this.BLimg,BLno:this.code,address:this.address,lat:this.latitude,lng:this.longitude,IDNo:this.IDNo},t=JSON.stringify(e),r="api/Manager.ashx?Function=HttpAddMinShopGather";s.multiplexFun("hahahaha",t,r).then((function(e){console.log(e),"成功"==e.data.State&&(uni.showToast({title:"提交成功"}),uni.hideLoading(),uni.navigateTo({url:"../pagehome/pagehome"}))}))}else uni.showToast({title:"请确认信息填写完整!",position:"top",duration:1e3,icon:"none"})},onShow:function(){uni.getStorage({key:"HTTP",success:function(e){this.http=e.data}}),uni.getLocation({type:"wgs84",geocode:"true",success:function(e){this.longitude=e.longitude,this.latitude=e.latitude}})},addclick:function(){var e=this;uni.getStorage({key:"HTTP",success:function(t){e.http=t.data}}),uni.chooseImage({count:6,sizeType:["original"],sourceType:["album"],success:function(t){var r=n.default.HTTP+"api/HttpImager.ashx?Function=HttpCreatePicture";uni.uploadFile({url:r,filePath:t.tempFilePaths[0],name:"file",formData:{user:"test"},success:function(t){console.log(t,"result"),e.BLimg=JSON.parse(t.data).Body,e.showadd=!1}})}})},onReady:function(){var e=new Date,t=e.getFullYear(),r=e.getMonth()+1;r=r<10?"0"+r:r;var i=e.getDate();i=i<10?"0"+i:i;var a=e.getHours();a=a<10?"0"+a:a;var s=e.getMinutes(),n=e.getSeconds();this.time=t+"-"+r+"-"+i+" "+a+"-"+s+"-"+n}}});t.default=o},"4c25":function(e,t,r){"use strict";var i=r("a7df"),a=r.n(i);a.a},5347:function(e,t,r){"use strict";r.r(t);var i=r("e3f6"),a=r("03d4");for(var s in a)"default"!==s&&function(e){r.d(t,e,(function(){return a[e]}))}(s);r("4c25");var n,o=r("f0c5"),c=Object(o["a"])(a["default"],i["b"],i["c"],!1,null,"70b934e6",null,!1,i["a"],n);t["default"]=c.exports},a7df:function(e,t,r){var i=r("1a95");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var a=r("4f06").default;a("001a09b4",i,!0,{sourceMap:!1,shadowMode:!1})},e3f6:function(e,t,r){"use strict";var i,a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-uni-view",{staticClass:"content"},[r("v-uni-view",{staticClass:"iview"},[r("v-uni-view",{staticClass:"str"},[e._v("业务员姓名:")]),r("v-uni-input",{attrs:{type:"text",placeholder:"请输入业务员姓名","placeholder-style":"color:#ccc;fontSize:14px;"},model:{value:e.uname,callback:function(t){e.uname=t},expression:"uname"}})],1),r("v-uni-view",{staticClass:"iview"},[r("v-uni-view",{staticClass:"str"},[e._v("业务员电话:")]),r("v-uni-input",{attrs:{type:"number",placeholder:"请输入业务员电话","placeholder-style":"color:#ccc;fontSize:14px;"},model:{value:e.workerTel,callback:function(t){e.workerTel=t},expression:"workerTel"}})],1),r("v-uni-view",{staticClass:"iview"},[r("v-uni-view",{staticClass:"str"},[e._v("业务员身份证号:")]),r("v-uni-input",{attrs:{type:"number",placeholder:"请输入身份证号","placeholder-style":"color:#ccc;fontSize:14px;"},model:{value:e.IDNo,callback:function(t){e.IDNo=t},expression:"IDNo"}})],1),r("v-uni-view",{staticClass:"iview"},[r("v-uni-view",{staticClass:"str"},[e._v("店名:")]),r("v-uni-input",{attrs:{type:"text",placeholder:"请输入店铺名字","placeholder-style":"color:#ccc;fontSize:14px;"},model:{value:e.shopName,callback:function(t){e.shopName=t},expression:"shopName"}})],1),r("v-uni-view",{staticClass:"iview"},[r("v-uni-view",{staticClass:"str"},[e._v("店铺电话:")]),r("v-uni-input",{attrs:{type:"number",placeholder:"请输入店铺电话","placeholder-style":"color:#ccc;fontSize:14px;"},model:{value:e.shopTel,callback:function(t){e.shopTel=t},expression:"shopTel"}})],1),r("v-uni-view",{staticClass:"iview"},[r("v-uni-view",{staticClass:"str"},[e._v("店铺负责人:")]),r("v-uni-input",{attrs:{type:"text",placeholder:"请输入负责人姓名","placeholder-style":"color:#ccc;fontSize:14px;"},model:{value:e.shopManager,callback:function(t){e.shopManager=t},expression:"shopManager"}})],1),r("v-uni-view",{staticClass:"iview"},[r("v-uni-view",{staticClass:"str"},[e._v("营业执照编码:")]),r("v-uni-input",{attrs:{type:"text",placeholder:"请输入营业执照编码","placeholder-style":"color:#ccc;fontSize:14px;"},model:{value:e.code,callback:function(t){e.code=t},expression:"code"}})],1),r("v-uni-view",{staticClass:"iview"},[r("v-uni-view",{staticClass:"str"},[e._v("地址:")]),r("v-uni-input",{attrs:{type:"text",placeholder:"请输入地址","placeholder-style":"color:#ccc;fontSize:14px;"},on:{focus:function(t){arguments[0]=t=e.$handleEvent(t),e.getaddr()}},model:{value:e.address,callback:function(t){e.address=t},expression:"address"}})],1),r("v-uni-view",{staticClass:"iview"},[r("v-uni-view",{staticClass:"str"},[e._v("营业执照照片")]),r("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:e.showadd,expression:"showadd"}],staticClass:"addclick",attrs:{"placeholder-style":"color:#ccc;fontSize:14px;"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.addclick()}}},[e._v("+")]),r("v-uni-view",{staticClass:"showimg"},[r("img",{attrs:{src:e.BLimg,alt:""}})])],1),r("v-uni-button",{attrs:{type:"primary"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.submit()}}},[e._v("立即提交")])],1)},s=[];r.d(t,"b",(function(){return a})),r.d(t,"c",(function(){return s})),r.d(t,"a",(function(){return i}))}}]);