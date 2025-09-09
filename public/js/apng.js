!function(){function t(t,e,n){void 0===e&&(e=0),void 0===n&&(n=typebytes.length-e)
for(var a=-1,r=e,i=e+n;i>r;r++)a=a>>>8^c[255&(a^t[r])]
return-1^a}function e(t,e){const a=new DataView(t.buffer)
var r,i,o,s=8
do i=a.getUint32(s),r=n(t,s+4,4),o=e(r,t,s,i),s+=12+i
while(o!==!1&&"IEND"!=r&&s<t.length)}function n(t,e,n){const a=Array.prototype.slice.call(t.subarray(e,e+n))
return String.fromCharCode.apply(String,a)}function a(t){const e=new Uint8Array(t.length)
for(var n=0;n<t.length;n++)e[n]=t.charCodeAt(n)
return e}function r(t,e,n){const a=new Uint8Array(n)
return a.set(t.subarray(e,e+n)),a}function i(e,n){const r=e.length+n.length,i=new Uint8Array(r+8),o=new DataView(i.buffer)
o.setUint32(0,n.length),i.set(a(e),4),i.set(n,8)
var s=t(i,4,r)
return o.setUint32(r+4,s),i}function o(t){return new Uint8Array([t>>>24&255,t>>>16&255,t>>>8&255,255&t])}function s(t,n,a){function s(){function t(){var c=g[o],l=document.createElement("canvas"),h=l.getContext("2d")
l.width=n.width,l.height=n.height,o>0&&(h.drawImage(i,0,0),1==e.disposeOp?h.clearRect(e.left,e.top,e.width,e.height):2==e.disposeOp&&r&&h.putImageData(r,e.left,e.top),2==c.disposeOp&&(r=h.getImageData(c.left,c.top,c.width,c.height)),0==c.blendOp&&h.clearRect(c.left,c.top,c.width,c.height)),h.drawImage(c.img,c.left,c.top),l.complete=!0,c.img=null,s=u,u+=c.delay,n.frames.push({canvas:l,start:s,end:u}),e=c,i=l,o++,o<g.length?window.requestAnimationFrame(t):(n.complete=!0,"function"==typeof a&&a())}var e,r,i,o=0,s=0,u=0
window.requestAnimationFrame(t)}const c=new Uint8Array(t)
if(!Array.prototype.some.call(u,function(t,e){return t!==c[e]})){var l=!1
if(e(c,function(t,e,n,a){return!(l="acTL"===t)}),l){const h=[],p=[]
var d=null,f=null,g=[],w=0
if(e(c,function(t,e,a,i){const o=new DataView(e.buffer)
switch(t){case"IHDR":d=e.subarray(a+8,a+8+i),n.width=o.getUint32(a+8),n.height=o.getUint32(a+12)
break
case"acTL":n.numPlays=o.getUint32(a+8+4)
break
case"fcTL":f&&(g.push(f),w++),f={left:0,top:0,width:0,height:0,delay:0,disposeOp:0,blendOp:0,img:null},f.width=o.getUint32(a+8+4),f.height=o.getUint32(a+8+8),f.left=o.getUint32(a+8+12),f.top=o.getUint32(a+8+16)
var s=o.getUint16(a+8+20),u=o.getUint16(a+8+22)
0===u&&(u=100),f.delay=1e3*s/u,f.delay<10&&(f.delay=10),n.playTime+=f.delay,f.disposeOp=o.getUint8(a+8+24),f.blendOp=o.getUint8(a+8+25),f.dataParts=[],0===w&&2===f.disposeOp&&(f.disposeOp=1)
break
case"fdAT":f&&f.dataParts.push(e.subarray(a+8+4,a+8+i))
break
case"IDAT":f&&f.dataParts.push(e.subarray(a+8,a+8+i))
break
case"IEND":p.push(r(e,a,12+i))
break
default:h.push(r(e,a,12+i))}}),f&&g.push(f),0!=g.length){const y=new Blob(h),m=new Blob(p)
for(var U=0,b=0;b<g.length;b++){var f=g[b],v=[]
v.push(u),d.set(o(f.width),0),d.set(o(f.height),4),v.push(i("IHDR",d)),v.push(y),f.dataParts.forEach(function(t){v.push(i("IDAT",t))}),v.push(m)
var A=new Blob(v,{type:"image/png"})
delete f.dataParts,v=null,function(t,e){t.img=document.createElement("img"),t.img.onload=function(){URL.revokeObjectURL(e),U++,U===g.length&&s()},t.img.onerror=function(){URL.revokeObjectURL(e),t.img=null},t.img.src=e}(f,URL.createObjectURL(A))}}}}}const u=new Uint8Array([137,80,78,71,13,10,26,10]),c=new Uint32Array(256)
for(var l=0;256>l;l++){for(var h=l,p=0;8>p;p++)h=0!==(1&h)?3988292384^h>>>1:h>>>1
c[l]=h}window.loadAPNG=function(t,e){var n={width:0,height:0,numPlays:0,playTime:0,complete:!1,frames:[]}
try{var a=new XMLHttpRequest
a.open("GET",t),a.responseType="arraybuffer",a.onload=function(){200===a.status&&s(a.response,n,e)},a.send()}catch(r){}return n}}()
