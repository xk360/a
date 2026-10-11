(function(){
if(window.__DSW_LOADED__)return;window.__DSW_LOADED__=true;

function boot(){
var DOC=(window.top&&window.top.document)?window.top.document:document;
var BODY=DOC.body||DOC.documentElement;

var css=[
'#dsw-root{position:fixed;z-index:2147483647;font-family:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;user-select:none;}',
'#dsw-root *{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}',
'#dsw-orb{position:fixed;right:14px;bottom:96px;width:54px;height:54px;border-radius:50%;background:linear-gradient(135deg,#2dd4bf,#4f7cff);display:flex;align-items:center;justify-content:center;font-size:24px;box-shadow:0 6px 18px rgba(0,0,0,.5);cursor:grab;touch-action:none}',
'#dsw-orb:active{cursor:grabbing}',
'#dsw-panel{position:fixed;right:12px;bottom:164px;width:min(360px,calc(100vw - 20px));max-height:min(76vh,660px);background:rgba(24,24,29,.98);border:1px solid #34343c;border-radius:18px;display:none;flex-direction:column;overflow:hidden;box-shadow:0 16px 48px rgba(0,0,0,.65)}',
'#dsw-panel.show{display:flex}',
'#dsw-head{display:flex;align-items:center;gap:8px;padding:14px 16px;border-bottom:1px solid #2b2b33;cursor:move;touch-action:none}',
'#dsw-head .d{width:11px;height:11px;border-radius:50%}',
'#dsw-title{flex:1;color:#f0f0f2;font-size:15px;font-weight:700}',
'#dsw-close{color:#888;font-size:17px;padding:2px 6px;cursor:pointer}',
'#dsw-status{display:flex;align-items:center;gap:8px;padding:9px 16px;background:#131318;font-size:12px;color:#999}',
'#dsw-led{width:8px;height:8px;border-radius:50%;background:#4caf50;box-shadow:0 0 6px #4caf50}',
'#dsw-now{color:#2dd4bf;font-weight:600}',
'#dsw-scroll{overflow-y:auto;flex:1;padding-bottom:6px}',
'#dsw-scroll::-webkit-scrollbar{width:4px}#dsw-scroll::-webkit-scrollbar-thumb{background:#3a3a44;border-radius:2px}',
'.dsw-g{border-bottom:1px solid #26262e}',
'.dsw-gh{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;cursor:pointer;color:#e6e6ea;font-size:14px}',
'.dsw-gh:active{background:#21212a}',
'.dsw-gh .arr{color:#777;font-size:10px;transition:transform .2s}',
'.dsw-g.open .dsw-gh .arr{transform:rotate(180deg)}',
'.dsw-gb{display:none;padding:2px 10px 10px}',
'.dsw-g.open .dsw-gb{display:block}',
'.dsw-o{display:flex;align-items:center;gap:10px;padding:11px 13px;margin-top:6px;border-radius:11px;background:#1f1f28;border:1px solid transparent;cursor:pointer;transition:.12s}',
'.dsw-o:active{transform:scale(.98)}',
'.dsw-o.on{border-color:#2dd4bf;background:#10323a}',
'.dsw-o .mk{width:9px;height:9px;border-radius:50%;background:#4a4a55;flex-shrink:0}',
'.dsw-o.on .mk{background:#2dd4bf;box-shadow:0 0 7px #2dd4bf}',
'.dsw-o .tx{flex:1;min-width:0}',
'.dsw-o .lb{color:#e8e8ec;font-size:13px}',
'.dsw-o .tg{color:#6f6f7a;font-size:11px;margin-top:2px}',
'.dsw-o.warn .lb{color:#f87171}',
'#dsw-confirm{position:absolute;inset:0;background:rgba(8,8,12,.9);display:none;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:22px;text-align:center}',
'#dsw-confirm.show{display:flex}',
'#dsw-ctxt{color:#eee;font-size:14px;line-height:1.7}',
'#dsw-cbtns{display:flex;gap:12px}',
'#dsw-cbtns button{padding:9px 24px;border:none;border-radius:9px;font-size:13px;cursor:pointer}',
'#dsw-cancel{background:#2b2b34;color:#ccc}',
'#dsw-ok{background:#b91c1c;color:#fff}',
'#dsw-log{max-height:180px;overflow-y:auto;padding:2px 12px}',
'#dsw-log::-webkit-scrollbar{width:4px}#dsw-log::-webkit-scrollbar-thumb{background:#3a3a44;border-radius:2px}',
'.dsw-le{font-size:11px;color:#9aa;padding:5px 6px;border-bottom:1px dashed #26262e;line-height:1.5;word-break:break-all}',
'.dsw-le b{color:#f59e0b}',
'.dsw-le time{color:#556;margin-right:6px}',
'#dsw-clearlog{margin:8px 12px;padding:7px;border:none;border-radius:8px;background:#2b2b34;color:#bbb;font-size:12px;cursor:pointer}',
'#dsw-toast{position:fixed;top:12px;left:50%;transform:translateX(-50%);background:#111;color:#2dd4bf;padding:8px 16px;border-radius:20px;font-size:12px;z-index:2147483645;box-shadow:0 4px 14px rgba(0,0,0,.5)}'
].join('');

function mountStyle(){var s=DOC.getElementById("dsw-style");if(!s){s=DOC.createElement("style");s.id="dsw-style";s.textContent=css;(DOC.head||BODY).appendChild(s);}}
mountStyle();

var GROUPS=[
 {id:"quick",title:"🛡️ 防护总控 (单选)",open:true,key:"defense_mode",opts:[
   {v:"full",l:"全量拦截",t:"发现即摘除并记录"},
   {v:"quiet",l:"静默观察",t:"只记录不动手"},
   {v:"testsuite",l:"测试套件",t:"dry-run 心跳日志"},
   {v:"off",l:"关闭防护",t:"哨兵停摆",w:"关闭后不再扫描与拦截，确认切换？"}]},
 {id:"feat",title:"🧩 防护模块 (开关)",open:true,key:"f",feat:true,opts:[
   {v:"script_whitelist",l:"脚本白名单",t:"外链 script 域名过滤"},
   {v:"element_sentinel",l:"野悬浮层哨兵",t:"摘除顶层注入横幅"},
   {v:"iframe_guard",l:"iframe 清理",t:"外链/伪造框摘除，blob 放行"},
   {v:"nav_hook",l:"跳转记录",t:"window.open 与外链点击"},
   {v:"exec_guard",l:"执行层防护",t:"eval/Function 签名查杀 + blob 记录"},
   {v:"req_monitor",l:"请求层监控",t:"fetch/XHR 外发域名查杀"}]},
 {id:"log",title:"📜 拦截日志",open:true,key:"log",log:true,opts:[]}
];

var DEF={defense_mode:"full",f_script_whitelist:true,f_element_sentinel:true,f_iframe_guard:true,f_nav_hook:true,f_exec_guard:true,f_req_monitor:true};
function load(k,d){try{var v=localStorage.getItem(k);return v===null?d:JSON.parse(v);}catch(e){return d;}}
function save(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
var sel=load("dsw_sel",DEF);for(var kk in DEF)if(!(kk in sel))sel[kk]=DEF[kk];
var pos=load("dsw_pos",null);
var ALLOW=/githubusercontent|jsdelivr|github\.io|piupiu|unpkg|cloudflare|localhost|127\.0\.0\.1/i;

var logs=[],seen={},count=0;
function log(tag,msg){
  logs.unshift({t:new Date().toLocaleTimeString(),tag:tag,msg:msg});
  if(logs.length>60)logs.pop();
  renderLog();
}
function hit(tag,msg,el){
  var key=tag+"|"+msg;
  if(seen[key])return;
  seen[key]=1;count++;
  var dry=sel.defense_mode!=="full";
  log(tag,(dry?"[仅记录] ":"[已拦截] ")+msg);
  if(!dry&&el&&el.parentNode)el.parentNode.removeChild(el);
  var cn=DOC.getElementById("dsw-count");
  if(cn)cn.textContent="拦截 "+count;
}

function sweep(){
  if(sel.defense_mode==="off")return;
  if(sel.f_script_whitelist){
    var ss=DOC.getElementsByTagName("script");
    for(var i=ss.length-1;i>=0;i--){
      var s=ss[i];
      if(s.src&&s.id!=="dsw-style"&&!ALLOW.test(s.src))hit("脚本白名单",s.src,s);
    }
  }
  if(sel.f_iframe_guard){
    var fr=DOC.getElementsByTagName("iframe");
    for(var j=fr.length-1;j>=0;j--){
      var f=fr[j];
      if(f.hasAttribute("srcdoc")){hit("iframe 清理","srcdoc 伪造框",f);continue;}
      if(!f.src)continue;
      if(f.src.indexOf("blob:")===0)continue;
      if(!ALLOW.test(f.src))hit("iframe 清理",f.src,f);
    }
  }
  if(sel.f_element_sentinel){
    var all=DOC.querySelectorAll("div,section,aside");
    for(var k=0;k<all.length;k++){
      var el=all[k];
      if(el.closest&&el.closest("#dsw-root"))continue;
      var st;try{st=window.getComputedStyle(el);}catch(e){continue;}
      if(st.position==="fixed"&&parseInt(st.zIndex||0)>=2147483646){
        hit("悬浮层哨兵","#"+(el.id||el.className||el.tagName),el);
      }
    }
  }
  if(sel.defense_mode==="testsuite")log("测试套件","[心跳] 扫描完成 · 目标 "+DOC.getElementsByTagName("*").length);
}

function execCheck(code){
  if(sel.defense_mode==="off"||!sel.f_exec_guard)return true;
  if(typeof code!=="string"||!code)return true;
  var bad="";
  var m=code.match(/https?:\/\/[^\s'"`)]+/g)||[];
  for(var i=0;i<m.length;i++){if(!ALLOW.test(m[i])){bad=m[i];break;}}
  if(!bad&&/document\.write\s*\(/.test(code)&&/<script/i.test(code))bad="document.write(<script)";
  if(!bad)return true;
  hit("执行防护",bad);
  return sel.defense_mode!=="full";
}
function reqCheck(url){
  if(sel.defense_mode==="off"||!sel.f_req_monitor)return true;
  if(!url)return true;
  var abs=url;
  try{abs=new URL(url,location.href).href;}catch(e){}
  if(abs.indexOf("blob:")===0||abs.indexOf("data:")===0)return true;
  var same=false;
  try{same=new URL(abs,location.href).origin===location.origin;}catch(e){}
  if(same||ALLOW.test(abs))return true;
  hit("请求监控","外发 → "+abs);
  return sel.defense_mode!=="full";
}
var HOOKED=false;
function installHooks(){
  if(HOOKED)return;HOOKED=true;
  try{
    var _ev=window.eval;
    window.eval=function(c){
      if(!execCheck(c))throw new Error("dsw: eval 已拦截");
      return _ev(c);
    };
  }catch(e){}
  try{
    var _F=window.Function;
    var WF=function(){
      var last=arguments[arguments.length-1];
      if(!execCheck(last))throw new Error("dsw: Function 已拦截");
      return _F.apply(null,arguments);
    };
    WF.prototype=_F.prototype;
    window.Function=WF;
  }catch(e){}
  try{
    var _cu=URL.createObjectURL,blobSeen={};
    URL.createObjectURL=function(b){
      var k=(b&&b.type||"?")+":"+(b&&b.size||0);
      if(sel.f_exec_guard&&sel.defense_mode!=="off"&&!blobSeen[k]){blobSeen[k]=1;log("执行防护","[记录] blob 生成 "+k);}
      return _cu.apply(URL,arguments);
    };
  }catch(e){}
  try{
    var _f=window.fetch;
    window.fetch=function(u){
      var url=(typeof u==="string")?u:(u&&u.url)||"";
      if(!reqCheck(url))throw new Error("dsw: 外发请求已拦截");
      return _f.apply(this,arguments);
    };
  }catch(e){}
  try{
    var _open=XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open=function(m,u){
      if(!reqCheck(typeof u==="string"?u:""))throw new Error("dsw: 外发请求已拦截");
      return _open.apply(this,arguments);
    };
  }catch(e){}
}

var navHooked=false;
function hookNav(){
  if(navHooked||!sel.f_nav_hook)return;
  navHooked=true;
  var oldOpen=window.open;
  try{
    window.open=function(u){
      log("跳转记录","window.open → "+(u||"(空)"));
      return oldOpen.apply(window,arguments);
    };
  }catch(e){}
  DOC.addEventListener("click",function(e){
    var a=e.target.closest&&e.target.closest("a[href]");
    if(a&&a.href&&a.href.indexOf("http")===0&&!ALLOW.test(a.href)){
      log("跳转记录","外链点击 → "+a.href);
    }
  },true);
}

var root;
function mountRoot(){
  root=DOC.getElementById("dsw-root");
  if(!root){root=DOC.createElement("div");root.id="dsw-root";BODY.appendChild(root);}
  if(!DOC.getElementById("dsw-panel")){
    root.innerHTML=
     '<div id="dsw-panel">'+
       '<div id="dsw-head"><span class="d" style="background:#666"></span><span class="d" style="background:#2dd4bf"></span><span class="d" style="background:#4f7cff"></span><span id="dsw-title">防毒切换台 v3.0.0</span><span id="dsw-close">✕</span></div>'+
       '<div id="dsw-status"><span id="dsw-led"></span>当前：<span id="dsw-now"></span><span style="flex:1"></span><span id="dsw-count">拦截 0</span></div>'+
       '<div id="dsw-scroll"></div>'+
       '<div id="dsw-confirm"><div id="dsw-ctxt"></div><div id="dsw-cbtns"><button id="dsw-cancel">取消</button><button id="dsw-ok">确认切换</button></div></div>'+
     '</div>'+
     '<div id="dsw-orb">🛡️</div>';
    bind();
  }
}
mountRoot();

var orb,panel,scroll;
function render(){
  if(!scroll)return;
  var html="";
  GROUPS.forEach(function(g){
    html+='<div class="dsw-g'+(g.open?" open":"")+'" data-g="'+g.id+'">';
    html+='<div class="dsw-gh">'+g.title+'<span class="arr">▼</span></div><div class="dsw-gb">';
    if(g.log){
      html+='<div id="dsw-log"></div><button id="dsw-clearlog">清空日志</button>';
    }
    g.opts.forEach(function(o){
      var on=g.feat?!!sel["f_"+o.v]:sel[g.key]===o.v;
      html+='<div class="dsw-o'+(on?" on":"")+(o.w?" warn":"")+'" data-k="'+(g.feat?"f_"+o.v:g.key)+'" data-v="'+o.v+'"'+(o.w?' data-w="'+o.w+'"':'')+'><span class="mk"></span><div class="tx"><div class="lb">'+o.l+'</div><div class="tg">'+o.t+'</div></div></div>';
    });
    html+='</div></div>';
  });
  scroll.innerHTML=html;
  var cur=GROUPS[0].opts.filter(function(o){return o.v===sel.defense_mode;})[0];
  DOC.getElementById("dsw-now").textContent=cur?cur.l:sel.defense_mode;
  var led=DOC.getElementById("dsw-led");
  var c=sel.defense_mode==="off"?"#f44336":sel.defense_mode==="testsuite"?"#9c27b0":sel.defense_mode==="quiet"?"#ff9800":"#4caf50";
  led.style.background=c;led.style.boxShadow="0 0 6px "+c;
  DOC.getElementById("dsw-count").textContent="拦截 "+count;
  renderLog();
  if(pos&&pos.x){orb.style.left=pos.x;orb.style.top=pos.y;orb.style.right="auto";orb.style.bottom="auto";}
}
function renderLog(){
  var box=DOC.getElementById("dsw-log");
  if(!box)return;
  if(!logs.length){box.innerHTML='<div class="dsw-le" style="color:#556">暂无记录</div>';return;}
  box.innerHTML=logs.map(function(e){
    return '<div class="dsw-le"><time>'+e.t+'</time><b>'+e.tag+'</b> '+e.msg+'</div>';
  }).join('');
}

var pend=null;
function apply(k,v){
  if(k.indexOf("f_")===0)sel[k]=!sel[k];
  else sel[k]=v;
  save("dsw_sel",sel);
  if(k==="f_nav_hook"&&sel.f_nav_hook)hookNav();
  render();
}
function choose(key,val,warn){
  if(key==="defense_mode"&&sel.defense_mode===val)return;
  if(warn){pend={k:key,v:val};DOC.getElementById("dsw-ctxt").textContent=warn;DOC.getElementById("dsw-confirm").classList.add("show");return;}
  apply(key,val);
}

function bind(){
  orb=DOC.getElementById("dsw-orb");panel=DOC.getElementById("dsw-panel");scroll=DOC.getElementById("dsw-scroll");

  scroll.addEventListener("click",function(e){
    var gh=e.target.closest(".dsw-gh");
    if(gh){gh.parentElement.classList.toggle("open");return;}
    if(e.target.id==="dsw-clearlog"){logs=[];seen={};renderLog();return;}
    var o=e.target.closest(".dsw-o");
    if(o)choose(o.dataset.k,o.dataset.v,o.dataset.w||"");
  });
  DOC.getElementById("dsw-cancel").onclick=function(){pend=null;DOC.getElementById("dsw-confirm").classList.remove("show");};
  DOC.getElementById("dsw-ok").onclick=function(){if(pend)apply(pend.k,pend.v);pend=null;DOC.getElementById("dsw-confirm").classList.remove("show");};

  var sx,sy,ox,oy,moved,dragging=false;
  orb.addEventListener("pointerdown",function(e){dragging=true;moved=false;sx=e.clientX;sy=e.clientY;var r=orb.getBoundingClientRect();ox=r.left;oy=r.top;try{orb.setPointerCapture(e.pointerId);}catch(err){}});
  orb.addEventListener("pointermove",function(e){if(!dragging)return;var dx=e.clientX-sx,dy=e.clientY-sy;if(Math.abs(dx)>6||Math.abs(dy)>6)moved=true;if(moved){orb.style.left=(ox+dx)+"px";orb.style.top=(oy+dy)+"px";orb.style.right="auto";orb.style.bottom="auto";}});
  orb.addEventListener("pointerup",function(){dragging=false;if(!moved){panel.classList.toggle("show");}save("dsw_pos",{x:orb.style.left,y:orb.style.top});});
  orb.addEventListener("pointercancel",function(){dragging=false;});

  var head=DOC.getElementById("dsw-head"),ph,py,pdrag=false;
  head.addEventListener("pointerdown",function(e){pdrag=true;var r=panel.getBoundingClientRect();ph=e.clientX-r.left;py=e.clientY-r.top;try{head.setPointerCapture(e.pointerId);}catch(err){}});
  head.addEventListener("pointermove",function(e){if(!pdrag)return;panel.style.left=(e.clientX-ph)+"px";panel.style.top=(e.clientY-py)+"px";panel.style.right="auto";panel.style.bottom="auto";});
  head.addEventListener("pointerup",function(){pdrag=false;save("dsw_pos",{x:orb.style.left,y:orb.style.top});});
  head.addEventListener("click",function(e){if(e.target.id==="dsw-close")panel.classList.remove("show");});

  render();
}

DOC.addEventListener("pointerup",function(e){
  var t=e.target;
  if(t&&t.closest&&t.closest("#dsw-orb")){
    var p=DOC.getElementById("dsw-panel");
    if(p)p.classList.toggle("show");
  }
},true);

function keep(){
  mountStyle();
  var r=DOC.getElementById("dsw-root");
  if(!r||!r.contains(DOC.getElementById("dsw-orb"))){mountRoot();r=DOC.getElementById("dsw-root");}
  if(r&&r.parentElement!==BODY)BODY.appendChild(r);
  if(r){
    var a=r.parentElement,bad=false;
    while(a&&a!==DOC.documentElement){
      var st;try{st=window.getComputedStyle(a);}catch(e){break;}
      if(st.transform!=="none"||st.filter!=="none"||st.perspective!=="none"){bad=true;break;}
      a=a.parentElement;
    }
    if(bad)DOC.documentElement.appendChild(r);
    r.style.pointerEvents="auto";
  }
}
var sweepTimer=null;
try{new MutationObserver(function(){keep();clearTimeout(sweepTimer);sweepTimer=setTimeout(sweep,300);}).observe(DOC.documentElement,{childList:true,subtree:true});}catch(e){}
setInterval(function(){keep();sweep();},2500);
installHooks();hookNav();sweep();

var CUR="3.0.0";
fetch("https://cdn.jsdelivr.net/gh/xk360/a@main/version.json",{cache:"no-store"})
.then(function(r){return r.json();})
.then(function(d){
  var t=DOC.createElement("div");
  t.id="dsw-toast";
  t.textContent=(d.version===CUR)?"防毒组件已是最新 v"+CUR:"发现新版 v"+d.version+"，看门人将自动换装";
  BODY.appendChild(t);
  setTimeout(function(){if(t.parentNode)t.parentNode.removeChild(t);},4000);
})
.catch(function(){});
}
if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",boot);}else{boot();}
})();
