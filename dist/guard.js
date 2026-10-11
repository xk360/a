```js
(function(){
if(window.__DSW2__)return;window.__DSW2__=true;
function boot(){
var W=window;
try{if(W.top&&W.top.document)W=W.top;}catch(e){}
var DOC=W.document,BODY=DOC.body||DOC.documentElement;

var css=[
'#dsw2-root{position:fixed;z-index:2147483647;font-family:-apple-system,"PingFang SC",sans-serif;user-select:none}',
'#dsw2-root *{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}',
'#dsw2-orb{position:fixed;right:14px;bottom:96px;width:54px;height:54px;border-radius:50%;background:linear-gradient(135deg,#2dd4bf,#4f7cff);display:flex;align-items:center;justify-content:center;font-size:24px;box-shadow:0 6px 18px rgba(0,0,0,.5);touch-action:none}',
'#dsw2-panel{position:fixed;right:12px;bottom:164px;width:min(360px,calc(100vw - 20px));max-height:min(76vh,660px);background:rgba(24,24,29,.98);border:1px solid #34343c;border-radius:18px;display:none;flex-direction:column;overflow:hidden;box-shadow:0 16px 48px rgba(0,0,0,.65)}',
'#dsw2-panel.show{display:flex}',
'#dsw2-head{display:flex;align-items:center;gap:8px;padding:14px 16px;border-bottom:1px solid #2b2b33;touch-action:none}',
'#dsw2-head .d{width:11px;height:11px;border-radius:50%}',
'#dsw2-title{flex:1;color:#f0f0f2;font-size:15px;font-weight:700}',
'#dsw2-close{color:#888;font-size:17px;cursor:pointer;padding:2px 6px}',
'#dsw2-status{display:flex;align-items:center;gap:8px;padding:9px 16px;background:#131318;font-size:12px;color:#999}',
'#dsw2-led{width:8px;height:8px;border-radius:50%;background:#4caf50;box-shadow:0 0 6px #4caf50}',
'#dsw2-now{color:#2dd4bf;font-weight:600}',
'#dsw2-scroll{overflow-y:auto;flex:1;padding-bottom:6px}',
'#dsw2-scroll::-webkit-scrollbar{width:4px}#dsw2-scroll::-webkit-scrollbar-thumb{background:#3a3a44;border-radius:2px}',
'.dsw2-g{border-bottom:1px solid #26262e}',
'.dsw2-gh{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;cursor:pointer;color:#e6e6ea;font-size:14px}',
'.dsw2-gh .arr{color:#777;font-size:10px;transition:transform .2s}',
'.dsw2-g.open .dsw2-gh .arr{transform:rotate(180deg)}',
'.dsw2-gb{display:none;padding:2px 10px 10px}',
'.dsw2-g.open .dsw2-gb{display:block}',
'.dsw2-o{display:flex;align-items:center;gap:10px;padding:11px 13px;margin-top:6px;border-radius:11px;background:#1f1f28;border:1px solid transparent;cursor:pointer}',
'.dsw2-o.on{border-color:#2dd4bf;background:#10323a}',
'.dsw2-o .mk{width:9px;height:9px;border-radius:50%;background:#4a4a55;flex-shrink:0}',
'.dsw2-o.on .mk{background:#2dd4bf;box-shadow:0 0 7px #2dd4bf}',
'#dsw2-log{max-height:200px;overflow-y:auto;padding:2px 12px}',
'.dsw2-le{font-size:11px;color:#9aa;padding:5px 6px;border-bottom:1px dashed #26262e;line-height:1.5;word-break:break-all}',
'.dsw2-le b{color:#f59e0b}',
'.dsw2-le time{color:#556;margin-right:6px}',
'#dsw2-clearlog{margin:8px 12px;padding:7px;border:none;border-radius:8px;background:#2b2b34;color:#bbb;font-size:12px;cursor:pointer}'
].join('');

function mountStyle(){var s=DOC.getElementById('dsw2-style');if(!s){s=DOC.createElement('style');s.id='dsw2-style';s.textContent=css;(DOC.head||BODY).appendChild(s);}}
mountStyle();

var MODES=[
 {v:'full',l:'全量拦截',t:'发现即摘除并记录'},
 {v:'quiet',l:'静默观察',t:'只记录不动手'},
 {v:'testsuite',l:'测试套件',t:'dry-run 心跳日志'},
 {v:'off',l:'关闭防护',t:'哨兵停摆',w:'关闭后不再扫描与拦截，确认切换？'}];
var FEATURES=[
 {v:'script_whitelist',l:'脚本白名单',t:'外链脚本域名过滤'},
 {v:'element_sentinel',l:'野悬浮层哨兵',t:'摘除顶层注入横幅'},
 {v:'iframe_guard',l:'iframe 清理',t:'清掉嵌入框架'},
 {v:'nav_hook',l:'跳转记录',t:'window.open 与外链点击'}];
var DEF={defense_mode:'full',f_script_whitelist:true,f_element_sentinel:true,f_iframe_guard:true,f_nav_hook:true};
function load(k,d){try{var v=localStorage.getItem(k);return v===null?d:JSON.parse(v);}catch(e){return d;}}
function save(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
var sel=load('dsw2_sel',DEF);for(var kk in DEF)if(!(kk in sel))sel[kk]=DEF[kk];
var pos=load('dsw2_pos',null);
var ALLOW=/githubusercontent|github\.io|piupiu|jsdelivr|unpkg|cloudflare/i;

var logs=[],seen={},count=0;
function log(tag,msg){
  logs.unshift({t:new Date().toLocaleTimeString(),tag:tag,msg:msg});
  if(logs.length>60)logs.pop();
  renderLog();
}
function hit(tag,msg,el){
  var key=tag+'|'+msg;
  if(seen[key])return;
  seen[key]=1;count++;
  var dry=sel.defense_mode!=='full';
  log(tag,(dry?'[仅记录] ':'[已拦截] ')+msg);
  if(!dry&&el&&el.parentNode)el.parentNode.removeChild(el);
  var cn=DOC.getElementById('dsw2-count');
  if(cn)cn.textContent='拦截 '+count;
}

function sweep(){
  var mode=sel.defense_mode;
  if(mode==='off')return;
  if(sel.f_script_whitelist){
    var ss=DOC.getElementsByTagName('script');
    for(var i=ss.length-1;i>=0;i--){
      var s=ss[i];
      if(s.src&&s.id!=='dsw2-style'&&!ALLOW.test(s.src))hit('脚本白名单',s.src,s);
    }
  }
  if(sel.f_iframe_guard){
    var fr=DOC.getElementsByTagName('iframe');
    for(var j=fr.length-1;j>=0;j--){
      var f=fr[j];
      if(!f.src||!ALLOW.test(f.src))hit('iframe 清理',f.src||'(空src)',f);
    }
  }
  if(sel.f_element_sentinel){
    var all=DOC.querySelectorAll('div,section,aside');
    for(var k=0;k<all.length;k++){
      var el=all[k];
      if(el.closest('#dsw2-root'))continue;
      var st=W.getComputedStyle?W.getComputedStyle(el):null;
      if(!st)continue;
      if(st.position==='fixed'&&parseInt(st.zIndex||0)>=2147483646){
        hit('悬浮层哨兵','#'+(el.id||el.className||el.tagName),el);
      }
    }
  }
  if(mode==='testsuite')log('测试套件','[心跳] 扫描完成 · 目标 '+DOC.getElementsByTagName('*').length);
}

var navHooked=false;
function hookNav(){
  if(navHooked||!sel.f_nav_hook)return;
  navHooked=true;
  var oldOpen=W.open;
  try{
    W.open=function(u){
      log('跳转记录','window.open → '+(u||'(空)'));
      return oldOpen.apply(W,arguments);
    };
  }catch(e){}
  DOC.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[href]');
    if(a&&a.href&&a.href.indexOf('http')===0&&!ALLOW.test(a.href)){
      log('跳转记录','外链点击 → '+a.href);
    }
  },true);
}

var root;
function mountRoot(){
  root=DOC.getElementById('dsw2-root');
  if(!root){root=DOC.createElement('div');root.id='dsw2-root';BODY.appendChild(root);}
  if(!DOC.getElementById('dsw2-panel')){
    root.innerHTML=
     '<div id="dsw2-panel">'+
       '<div id="dsw2-head"><span class="d" style="background:#666"></span><span class="d" style="background:#2dd4bf"></span><span class="d" style="background:#4f7cff"></span><span id="dsw2-title">防毒切换台 · 真开关版</span><span id="dsw2-close">✕</span></div>'+
       '<div id="dsw2-status"><span id="dsw2-led"></span>当前：<span id="dsw2-now"></span><span style="flex:1"></span><span id="dsw2-count">拦截 0</span></div>'+
       '<div id="dsw2-scroll"></div>'+
       '<div id="dsw2-confirm" style="position:absolute;inset:0;background:rgba(8,8,12,.9);display:none;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:22px;text-align:center">'+
         '<div id="dsw2-ctxt" style="color:#eee;font-size:14px;line-height:1.7"></div>'+
         '<div style="display:flex;gap:12px"><button id="dsw2-cancel" style="padding:9px 24px;border:none;border-radius:9px;background:#2b2b34;color:#ccc;font-size:13px">取消</button><button id="dsw2-ok" style="padding:9px 24px;border:none;border-radius:9px;background:#b91c1c;color:#fff;font-size:13px">确认切换</button></div>'+
       '</div>'+
     '</div>'+
     '<div id="dsw2-orb">🛡️</div>';
    bind();
  }
}
mountRoot();

var orb,panel,scroll;
function render(){
  if(!scroll)return;
  var html='';
  html+='<div class="dsw2-g open"><div class="dsw2-gh">🎯 防护总控<span class="arr">▼</span></div><div class="dsw2-gb">';
  MODES.forEach(function(o){
    var on=sel.defense_mode===o.v;
    html+='<div class="dsw2-o'+(on?' on':'')+'" data-mk="mode" data-v="'+o.v+'"'+(o.w?' data-w="'+o.w+'"':'')+'><span class="mk"></span><div><div style="color:#e8e8ec;font-size:13px">'+o.l+'</div><div style="color:#6f6f7a;font-size:11px;margin-top:2px">'+o.t+'</div></div></div>';
  });
  html+='</div></div>';
  html+='<div class="dsw2-g open"><div class="dsw2-gh">🧩 防护模块<span class="arr">▼</span></div><div class="dsw2-gb">';
  FEATURES.forEach(function(o){
    var on=sel['f_'+o.v];
    html+='<div class="dsw2-o'+(on?' on':'')+'" data-mk="feat" data-v="'+o.v+'"><span class="mk"></span><div><div style="color:#e8e8ec;font-size:13px">'+o.l+'</div><div style="color:#6f6f7a;font-size:11px;margin-top:2px">'+o.t+'</div></div></div>';
  });
  html+='</div></div>';
  html+='<div class="dsw2-g open"><div class="dsw2-gh">📜 拦截日志<span class="arr">▼</span></div><div class="dsw2-gb"><div id="dsw2-log"></div><button id="dsw2-clearlog">清空日志</button></div></div>';
  scroll.innerHTML=html;
  var cur=MODES.filter(function(o){return o.v===sel.defense_mode;})[0];
  DOC.getElementById('dsw2-now').textContent=cur?cur.l:sel.defense_mode;
  var led=DOC.getElementById('dsw2-led');
  var c=sel.defense_mode==='off'?'#f44336':sel.defense_mode==='testsuite'?'#9c27b0':sel.defense_mode==='quiet'?'#ff9800':'#4caf50';
  led.style.background=c;led.style.boxShadow='0 0 6px '+c;
  DOC.getElementById('dsw2-count').textContent='拦截 '+count;
  renderLog();
  if(pos&&pos.x){orb.style.left=pos.x;orb.style.top=pos.y;orb.style.right='auto';orb.style.bottom='auto';}
}
function renderLog(){
  var box=DOC.getElementById('dsw2-log');
  if(!box)return;
  if(!logs.length){box.innerHTML='<div class="dsw2-le" style="color:#556">暂无记录</div>';return;}
  box.innerHTML=logs.map(function(e){
    return '<div class="dsw2-le"><time>'+e.t+'</time><b>'+e.tag+'</b> '+e.msg+'</div>';
  }).join('');
}

var pend=null;
function choose(key,val,warn){
  if(key==='mode'&&sel.defense_mode===val)return;
  if(warn){pend={k:key,v:val};DOC.getElementById('dsw2-ctxt').textContent=warn;DOC.getElementById('dsw2-confirm').style.display='flex';return;}
  apply(key,val);
}
function apply(k,v){
  if(k==='mode')sel.defense_mode=v;else sel['f_'+v]=!sel['f_'+v];
  save('dsw2_sel',sel);
  if(k==='feat'&&v==='nav_hook'&&sel.f_nav_hook)hookNav();
  render();
}

function bind(){
  orb=DOC.getElementById('dsw2-orb');panel=DOC.getElementById('dsw2-panel');scroll=DOC.getElementById('dsw2-scroll');
  scroll.addEventListener('click',function(e){
    var gh=e.target.closest('.dsw2-gh');
    if(gh){gh.parentElement.classList.toggle('open');return;}
    var o=e.target.closest('.dsw2-o');
    if(o)choose(o.dataset.mk,o.dataset.v,o.dataset.w||'');
    if(e.target.id==='dsw2-clearlog'){logs=[];seen={};renderLog();}
  });
  DOC.getElementById('dsw2-cancel').onclick=function(){pend=null;DOC.getElementById('dsw2-confirm').style.display='none';};
  DOC.getElementById('dsw2-ok').onclick=function(){if(pend)apply(pend.k,pend.v);pend=null;DOC.getElementById('dsw2-confirm').style.display='none';};

  var sx,sy,ox,oy,moved,dragging=false;
  orb.addEventListener('pointerdown',function(e){dragging=true;moved=false;sx=e.clientX;sy=e.clientY;var r=orb.getBoundingClientRect();ox=r.left;oy=r.top;try{orb.setPointerCapture(e.pointerId);}catch(err){}});
  orb.addEventListener('pointermove',function(e){if(!dragging)return;var dx=e.clientX-sx,dy=e.clientY-sy;if(Math.abs(dx)>6||Math.abs(dy)>6)moved=true;if(moved){orb.style.left=(ox+dx)+'px';orb.style.top=(oy+dy)+'px';orb.style.right='auto';orb.style.bottom='auto';}});
  orb.addEventListener('pointerup',function(){dragging=false;if(!moved)panel.classList.toggle('show');save('dsw2_pos',{x:orb.style.left,y:orb.style.top});});
  orb.addEventListener('pointercancel',function(){dragging=false;});

  var head=DOC.getElementById('dsw2-head'),ph,py,pdrag=false;
  head.addEventListener('pointerdown',function(e){pdrag=true;var r=panel.getBoundingClientRect();ph=e.clientX-r.left;py=e.clientY-r.top;try{head.setPointerCapture(e.pointerId);}catch(err){}});
  head.addEventListener('pointermove',function(e){if(!pdrag)return;panel.style.left=(e.clientX-ph)+'px';panel.style.top=(e.clientY-py)+'px';panel.style.right='auto';panel.style.bottom='auto';});
  head.addEventListener('pointerup',function(){pdrag=false;save('dsw2_pos',{x:orb.style.left,y:orb.style.top});});
  head.addEventListener('click',function(e){if(e.target.id==='dsw2-close')panel.classList.remove('show');});
  render();
}

function keep(){
  mountStyle();
  var r=DOC.getElementById('dsw2-root');
  if(!r||!r.contains(DOC.getElementById('dsw2-orb'))){mountRoot();render();}
}
var sweepTimer=null;
function debouncedSweep(){clearTimeout(sweepTimer);sweepTimer=setTimeout(sweep,300);}
try{new MutationObserver(function(){keep();debouncedSweep();}).observe(DOC.documentElement,{childList:true,subtree:true});}catch(e){}
setInterval(function(){keep();sweep();},2500);
hookNav();sweep();

var CUR='2.0.0';
fetch('https://raw.githubusercontent.com/xk360/piu/main/version.json',{cache:'no-store'})
.then(function(r){return r.json();})
.then(function(d){
  var t=document.createElement('div');
  t.id='dsw2-toast';
  t.textContent=(d.version===CUR)?'防毒组件已是最新 v'+CUR:'发现新版 v'+d.version+'，去仓库拉新';
  t.style.cssText='position:fixed;top:12px;left:50%;transform:translateX(-50%);background:#111;color:#2dd4bf;padding:8px 16px;border-radius:20px;font-size:12px;z-index:2147483645;box-shadow:0 4px 14px rgba(0,0,0,.5)';
  document.body.appendChild(t);
  setTimeout(function(){t.remove();},4000);
})
.catch(function(){});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);
else boot();
})();
```
