(function(){
/* ===== DSW 看门人 v4.1.1 xk360 ===== */
var V='4.1.1';
if(window.__DSW_LOADED__&&document.getElementById('dsw-orb'))return;
window.__DSW_LOADED__=true;

var K_ST='dsw_g4_state',K_LG='dsw_g4_log';
var st,logs,mut=null,root=null,panel=null,logBox=null,statusEl=null,modeBox=null,modBox=null;
var seen={};

var MODES={full:['全量拦截','发现即摘除并记录'],observe:['静默观察','只记录不动手'],test:['测试套件','dry-run 心跳日志'],off:['关闭防护','哨兵停摆']};
var MODS=[
 ['wl','脚本白名单','外链 script 域名过滤'],
 ['flt','野悬浮层哨兵','摘除顶层注入横幅'],
 ['ifr','iframe 清理','外链/伪造框摘除，blob 放行'],
 ['red','跳转记录','window.open 与外链点击'],
 ['exe','执行层防护','eval/Function 签名查杀 + blob 记录'],
 ['req','请求层监控','fetch/XHR 外发域名查杀'],
 ['msg','内容安检','消息气泡链接与社工话术扫描']
];
var ALLOW={};
['raw.githubusercontent.com','cdn.jsdelivr.net','testingcf.jsdelivr.net','cdn.jsdmirror.com','ghfast.top','github.com','avatars.githubusercontent.com','unpkg.com','cdnjs.cloudflare.com'].forEach(function(h){ALLOW[h]=1;});
var KEYWORD=/验证|解封|解锁|领取|奖励|礼包|账号异常|立即处理|输入密码|token|私钥|助记词|扫码|转账|空投/i;

function J(k,d){try{var v=JSON.parse(localStorage.getItem(k));return v==null?d:v;}catch(e){return d;}}
function PJ(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function ts(){var d=new Date(),p=function(n){return n<10?'0'+n:''+n;};return p(d.getHours())+':'+p(d.getMinutes())+':'+p(d.getSeconds());}
function hostOf(u){try{return new URL(String(u),location.href).hostname;}catch(e){return '';}}
function okSrc(u){var h=hostOf(u);return !h||h===location.hostname||ALLOW[h]===1;}
function mname(){return (MODES[st.mode]||MODES.full)[0];}
function dedup(key){var n=Date.now();if(seen[key]&&n-seen[key]<30000)return true;seen[key]=n;return false;}

st=J(K_ST,null);
if(!st||typeof st!=='object')st={mode:'full',cnt:0};
if(!st.mod)st.mod={wl:1,flt:1,ifr:1,red:1,exe:1,req:1,msg:1};
if(typeof st.mod.msg==='undefined')st.mod.msg=1;
if(typeof st.cnt!=='number')st.cnt=0;
if(!MODES[st.mode])st.mode='full';
logs=J(K_LG,null);if(!logs||!logs.push)logs=[];

function saveSt(){PJ(K_ST,st);}
function log(mod,lvl,msg){
  logs.push({t:ts(),m:mod,l:lvl,x:String(msg)});
  if(logs.length>150)logs.shift();
  if(lvl==='已拦截')st.cnt++;
  PJ(K_LG,logs);saveSt();paintLogs();paintStatus();
}
function emit(k,name,msg,act){
  if(st.mode==='off'||!st.mod[k])return;
  if(st.mode==='full'){try{act&&act();}catch(e){} log(name,'已拦截',msg);}
  else log(name,'记录',msg);
}
function observeLog(tag,what){
  if(st.mode==='off')return;
  if(dedup('o|'+tag+'|'+what.slice(0,40)))return;
  var from='-';
  try{
    var s=new Error().stack.split('\n');
    for(var i=2;i<s.length;i++){
      if(s[i].indexOf('dsw')<0&&s[i].indexOf('guard')<0){from=s[i].trim().slice(0,90);break;}
    }
  }catch(e){}
  log('观察','记录',tag+' · '+what+' @'+from);
}
function inDsw(n){var p=n;while(p&&p.nodeType===1){if((p.id||'').indexOf('dsw-')===0)return true;p=p.parentElement;}return false;}
function rm(el){return function(){if(el&&el.parentNode)el.parentNode.removeChild(el);};}

function scanMsg(node){
  if(!node||node.nodeType!==1||inDsw(node))return;
  if(node.tagName!=='DIV'&&node.tagName!=='SECTION'&&node.tagName!=='ARTICLE'&&node.tagName!=='P')return;
  if(!node.querySelector('a[href]')&&!KEYWORD.test((node.innerText||'').slice(0,600)))return;
  var findings=[],i,a;
  var as=node.querySelectorAll('a[href]');
  for(i=0;i<as.length;i++){
    a=as[i].getAttribute('href')||'';
    if(/^(javascript:|data:)/i.test(a))findings.push('危险协议 '+a.slice(0,40));
    else if(/^https?:/i.test(a)){
      var h=hostOf(a);
      if(h&&h!==location.hostname&&!ALLOW[h])findings.push('外链 '+h);
    }
  }
  var txt=(node.innerText||'').slice(0,600);
  var bare=txt.match(/https?:\/\/[^\s，。、）)]+/g)||[];
  for(i=0;i<bare.length;i++){
    var bh=hostOf(bare[i]);
    if(bh&&bh!==location.hostname&&!ALLOW[bh]&&findings.join(' ').indexOf(bh)<0)findings.push('裸链 '+bh);
  }
  var hit=txt.match(KEYWORD);
  if(!findings.length&&!hit)return;
  if(hit)findings.push('关键词「'+hit[0]+'」');
  var key='msg|'+findings.join(',').slice(0,50);
  if(dedup(key))return;
  emit('msg','内容安检','气泡可疑 · '+findings.join(' · '),function(){
    node.style.outline='2px solid #ff5b5b';
    node.style.outlineOffset='2px';
    node.title='DSW 内容安检：'+findings.join('；');
  });
}

function handleFrame(f){
  var src=f.getAttribute('src'),sd=f.getAttribute('srcdoc')||'';
  if(src){
    if(src.indexOf('blob:')===0)return;
    if(src.indexOf('data:')===0){emit('ifr','iframe 清理','data 内嵌框',rm(f));return;}
    if(!okSrc(src))emit('ifr','iframe 清理','外链 '+hostOf(src),rm(f));
    else observeLog('站内框架',src.slice(0,60));
    return;
  }
  if(sd){
    var risky=/<script|javascript:|onerror\s*=|eval\s*\(/i.test(sd);
    if(risky)emit('ifr','iframe 清理','srcdoc 伪造框 '+sd.length+'字',rm(f));
    else if(st.mode!=='full'&&!dedup('sd|'+sd.length))log('iframe 清理','记录','srcdoc 本地框 '+sd.length+'字');
  }
}
function onAdd(n){
  if(!n||n.nodeType!==1||inDsw(n))return;
  var tag=n.tagName;
  if(tag==='SCRIPT'){
    var u=n.getAttribute('src');
    observeLog('新脚本',u?('外链 '+u.slice(0,60)):('内联 '+(n.textContent||'').length+'字'));
    if(u&&u.indexOf('data:')!==0&&!okSrc(u))
      emit('wl','脚本白名单','外链 '+hostOf(u),rm(n));
    return;
  }
  if(tag==='IFRAME'){handleFrame(n);return;}
  if(tag==='DIV'||tag==='SECTION'){
    try{
      var cs=getComputedStyle(n),par=n.parentElement;
      if(cs.position==='fixed'&&par&&par.tagName==='BODY'&&(parseInt(cs.zIndex,10)||0)>=100000){
        emit('flt','野悬浮层哨兵','顶层横幅 #'+(n.className||n.id||'?'),rm(n));
      }
    }catch(e){}
  }
  scanMsg(n);
}
function startObs(){
  if(mut)return;
  try{
    mut=new MutationObserver(function(ms){
      if(st.mode==='off')return;
      ms.forEach(function(m){
        Array.prototype.forEach.call(m.addedNodes,onAdd);
      });
    });
    mut.observe(document.documentElement,{childList:true,subtree:true});
  }catch(e){}
}
function stopObs(){if(mut){try{mut.disconnect();}catch(e){}mut=null;}}

function hookNav(){
  if(!window.__dsw_nav){
    window.__dsw_nav=1;
    try{
      var wo=window.open;
      window.open=function(u){
        if(st.mode!=='off'&&st.mod.red)log('跳转记录','记录','window.open '+String(u||'').slice(0,60));
        return wo.apply(window,arguments);
      };
    }catch(e){}
    document.addEventListener('click',function(e){
      if(st.mode==='off'||!st.mod.red)return;
      var a=e.target&&e.target.closest?e.target.closest('a[href]'):null;
      if(!a)return;
      var h=a.href;
      if(!h||h.indexOf('javascript:')===0)return;
      var host=hostOf(h);
      if(host&&host!==location.hostname&&!dedup('clk|'+host))log('跳转记录','记录','外链点击 '+host);
    },true);
  }
}
function hookExec(){
  if(window.__dsw_exe)return;window.__dsw_exe=1;
  try{
    var ev=window.eval;
    window.eval=function(code){
      var s=String(code||'');
      if(st.mode!=='off'&&st.mod.exe){
        var bad=/fetch\s*\(|XMLHttpRequest|document\.cookie|localStorage\.setItem/.test(s);
        if(bad&&st.mode==='full'){log('执行层防护','已拦截','eval 特征 '+s.slice(0,60));throw new Error('DSW-BLOCK');}
        if(!dedup('ev|'+s.slice(0,40)))log('执行层防护','记录','eval '+s.slice(0,60));
      }
      return ev.call(window,code);
    };
    var FN=window.Function;
    window.Function=function(){
      if(st.mode!=='off'&&st.mod.exe){
        try{
          var s=Array.prototype.join.call(arguments,'').slice(0,60);
          if(!dedup('fn|'+s))log('执行层防护','记录','Function() '+s);
        }catch(e){}
      }
      return FN.apply(null,arguments);
    };
    window.Function.prototype=FN.prototype;
    if(window.URL&&URL.createObjectURL&&!URL.__dsw){
      URL.__dsw=1;
      var co=URL.createObjectURL;
      URL.createObjectURL=function(b){
        try{
          if(b&&b.type==='text/html'&&st.mode!=='off'&&st.mod.exe&&!dedup('bl|'+(b.size||0)))
            log('执行层防护','记录','blob 生成 text/html:'+(b.size||0));
        }catch(e){}
        return co.apply(URL,arguments);
      };
    }
  }catch(e){}
}
function hookReq(){
  if(window.__dsw_req)return;window.__dsw_req=1;
  try{
    var f=window.fetch;
    if(f){
      window.fetch=function(){
        var u=(arguments[0]&&arguments[0].url)||arguments[0];
        var h=typeof u==='string'?hostOf(u):'';
        if(h&&h!==location.hostname&&!ALLOW[h]&&st.mode!=='off'&&st.mod.req){
          if(st.mode==='full'){log('请求层监控','已拦截','外发 '+h);return Promise.reject(new Error('DSW: blocked '+h));}
          log('请求层监控','记录','外发 '+h);
        }
        return f.apply(window,arguments);
      };
    }
    var xp=XMLHttpRequest&&XMLHttpRequest.prototype;
    if(xp&&xp.send&&!xp.__dsw){
      xp.__dsw=1;
      var oo=xp.open;
      xp.open=function(m,u){this.__dsw_u=u;return oo.apply(this,arguments);};
      var os=xp.send;
      xp.send=function(){
        var h=hostOf(this.__dsw_u||'');
        if(h&&h!==location.hostname&&!ALLOW[h]&&st.mode!=='off'&&st.mod.req){
          if(st.mode==='full'){log('请求层监控','已拦截','XHR '+h);throw new Error('DSW');}
          log('请求层监控','记录','XHR '+h);
        }
        return os.apply(this,arguments);
      };
    }
  }catch(e){}
}
function copy(t){
  try{navigator.clipboard.writeText(t);return;}catch(e){}
  try{
    var ta=document.createElement('textarea');ta.value=t;
    document.body.appendChild(ta);ta.select();document.execCommand('copy');
    document.body.removeChild(ta);
  }catch(e){}
}
function trace(){
  var o={v:V,page:location.href,ref:document.referrer||'-',at:new Date().toString(),
         ua:navigator.userAgent,store:Object.keys(localStorage),scripts:[],iframes:[]};
  Array.prototype.forEach.call(document.scripts,function(s){
    var u=s.getAttribute('src');
    o.scripts.push(u?u.slice(0,80):'内联·'+(s.textContent||'').length+'字');
  });
  Array.prototype.forEach.call(document.querySelectorAll('iframe'),function(f){
    var u=f.getAttribute('src'),sd=f.getAttribute('srcdoc');
    o.iframes.push((u?u.slice(0,70):(sd?'srcdoc·'+sd.length+'字':'-'))+' | parent='+(f.parentElement?(f.parentElement.id||f.parentElement.tagName):'-'));
  });
  o.observe=logs.filter(function(e){return e.m==='观察';}).slice(-20);
  return JSON.stringify(o,null,1);
}
function buildUI(){
  var d=document;
  root=d.createElement('div');root.id='dsw-root';
  root.style.cssText='position:fixed;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:2147483000;';
  panel=d.createElement('div');panel.id='dsw-panel';
  panel.style.cssText='position:fixed;top:12%;left:50%;transform:translateX(-50%);width:94%;max-width:560px;max-height:76vh;overflow:auto;background:#17171c;color:#ddd;border-radius:14px;box-shadow:0 12px 44px rgba(0,0,0,.65);font:14px/1.5 system-ui,-apple-system,sans-serif;display:none;pointer-events:auto;';
  panel.innerHTML=
    '<div style="display:flex;align-items:center;gap:8px;padding:12px 14px;border-bottom:1px solid #2a2a33;position:sticky;top:0;background:#17171c;z-index:2">'
    +'<i style="width:10px;height:10px;border-radius:50%;background:#666"></i>'
    +'<i style="width:10px;height:10px;border-radius:50%;background:#12d6a0"></i>'
    +'<i style="width:10px;height:10px;border-radius:50%;background:#4d7dff"></i>'
    +'<b style="flex:1;text-align:center;font-size:16px">防毒切换台 v'+V+'</b>'
    +'<b id="dsw-x" style="cursor:pointer;color:#999;font-size:20px;padding:0 4px">×</b></div>'
    +'<div id="dsw-status" style="display:flex;justify-content:space-between;padding:10px 16px;font-weight:600"></div>'
    +'<div style="padding:2px 16px 0;color:#9aa;font-size:13px">🛡 防护总控（单选）</div>'
    +'<div id="dsw-modes" style="padding:6px 10px"></div>'
    +'<div style="padding:2px 16px 0;color:#9aa;font-size:13px">🧩 防护模块（开关）</div>'
    +'<div id="dsw-mods" style="padding:6px 10px"></div>'
    +'<div style="padding:6px 16px 0;color:#9aa;font-size:13px">📜 拦截日志</div>'
    +'<div id="dsw-logs" style="max-height:170px;overflow:auto;padding:4px 16px;font:12px/1.75 monospace"></div>'
    +'<div style="display:flex;gap:8px;padding:10px 16px 14px">'
    +'<button id="dsw-clear" style="background:#24242c;color:#ccc;border:1px solid #3a3a46;border-radius:6px;padding:6px 12px">清空日志</button>'
    +'<button id="dsw-trace" style="background:#24242c;color:#ccc;border:1px solid #3a3a46;border-radius:6px;padding:6px 12px">溯源</button></div>';
  var orb=d.createElement('div');orb.id='dsw-orb';
  orb.style.cssText='position:fixed;right:14px;bottom:118px;width:54px;height:54px;border-radius:50%;background:linear-gradient(135deg,#2ad7ff,#2f6bff);box-shadow:0 8px 20px rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;font-size:24px;cursor:pointer;pointer-events:auto;';
  orb.textContent='🛡️';
  root.appendChild(panel);root.appendChild(orb);
  d.body.appendChild(root);
  orb.onclick=function(){panel.style.display=panel.style.display==='block'?'none':'block';};
  panel.querySelector('#dsw-x').onclick=function(){panel.style.display='none';};
  panel.querySelector('#dsw-clear').onclick=function(){logs=[];PJ(K_LG,logs);paintLogs();};
  panel.querySelector('#dsw-trace').onclick=function(){copy(trace());log('溯源','记录','环境画像已复制');};
  bindRefs();
}
function bindRefs(){
  panel=panel||document.getElementById('dsw-panel');
  if(!panel)return false;
  logBox=panel.querySelector('#dsw-logs');
  statusEl=panel.querySelector('#dsw-status');
  modeBox=panel.querySelector('#dsw-modes');
  modBox=panel.querySelector('#dsw-mods');
  return !!(logBox&&statusEl&&modeBox&&modBox);
}
function paintStatus(){
  if(!statusEl)return;
  statusEl.innerHTML='<span>当前： <b style="color:'+(st.mode==='off'?'#f55':'#12d6a0')+'">'+esc(mname())+'</b></span><span>拦截 '+st.cnt+'</span>';
}
function paintModes(){
  if(!modeBox)return;
  var h='';
  Object.keys(MODES).forEach(function(k){
    var on=st.mode===k;
    h+='<div data-m="'+k+'" style="display:flex;gap:10px;align-items:center;padding:8px;border-radius:8px;'+(on?'border:1px solid #12d6a0;background:rgba(18,214,160,.07);':'border:1px solid transparent;')+'cursor:pointer">'
      +'<i style="width:12px;height:12px;border-radius:50%;background:'+(on?'#12d6a0':'#444')+'"></i>'
      +'<div><div style="font-weight:'+(on?'700':'400')+';color:'+(k==='off'?'#f55':(on?'#fff':'#ccc'))+'">'+MODES[k][0]+'</div>'
      +'<div style="font-size:12px;color:#777">'+MODES[k][1]+'</div></div></div>';
  });
  modeBox.innerHTML=h;
  Array.prototype.forEach.call(modeBox.children,function(el){
    el.onclick=function(){setMode(el.getAttribute('data-m'));};
  });
}
function setMode(k){
  if(!MODES[k])return;
  st.mode=k;saveSt();
  if(k==='off')stopObs();else startObs();
  paintModes();paintStatus();
  log('系统','记录','模式 → '+MODES[k][0]);
}
function modName(k){for(var i=0;i<MODS.length;i++)if(MODS[i][0]===k)return MODS[i][1];return k;}
function paintMods(){
  if(!modBox)return;
  var h='';
  MODS.forEach(function(m){
    var on=!!st.mod[m[0]];
    h+='<div data-k="'+m[0]+'" style="display:flex;gap:10px;align-items:center;padding:8px;margin:4px 0;border-radius:8px;border:1px solid '+(on?'#12d6a0':'#333')+';background:'+(on?'rgba(18,214,160,.06)':'transparent')+';cursor:pointer">'
      +'<div style="flex:1"><div style="font-weight:600;color:'+(on?'#fff':'#888')+'">'+m[1]+'</div><div style="font-size:12px;color:#777">'+m[2]+'</div></div>'
      +'<i style="width:14px;height:14px;border-radius:3px;background:'+(on?'#12d6a0':'#444')+'"></i></div>';
  });
  modBox.innerHTML=h;
  Array.prototype.forEach.call(modBox.children,function(el){
    el.onclick=function(){
      var k=el.getAttribute('data-k');
      st.mod[k]=st.mod[k]?0:1;saveSt();paintMods();
      log('系统','记录',(st.mod[k]?'开启 ':'关闭 ')+modName(k));
    };
  });
}
function paintLogs(){
  if(!logBox)return;
  var h='';
  for(var i=0;i<logs.length;i++){
    var e=logs[i],c=e.l==='已拦截'?'#ff5b5b':'#8a8a8a';
    h+='<div><span style="color:#555">'+esc(e.t)+'</span> <span style="color:#f90">'+esc(e.m)+'</span> <span style="color:'+c+'">['+esc(e.l)+']</span> <span style="color:#ccc">'+esc(e.x)+'</span></div>';
  }
  logBox.innerHTML=h||'<div style="color:#555">暂无记录</div>';
  logBox.scrollTop=logBox.scrollHeight;
}
function scanOld(){
  try{
    Array.prototype.forEach.call(document.querySelectorAll('iframe'),function(f){
      var u=f.getAttribute('src'),sd=f.getAttribute('srcdoc');
      observeLog('存量框架',u?u.slice(0,60):(sd?'srcdoc·'+sd.length+'字':'-'));
    });
    Array.prototype.forEach.call(document.scripts,function(s){
      var u=s.getAttribute('src');
      if(u)observeLog('存量脚本',u.slice(0,60));
    });
    Array.prototype.forEach.call(document.querySelectorAll('div,article,p'),function(el){
      if(el.closest&&el.closest('#dsw-root'))return;
      if(el.offsetHeight&&el.innerText&&el.querySelector('a[href]'))scanMsg(el);
    });
  }catch(e){}
}
function cmp(a,b){
  var x=String(a).split('.'),y=String(b).split('.');
  for(var i=0;i<3;i++){var p=+x[i]||0,q=+y[i]||0;if(p>q)return 1;if(p<q)return -1;}
  return 0;
}
function selfCheck(){
  var urls=[
    'https://ghfast.top/https://raw.githubusercontent.com/xk360/a/main/version.json',
    'https://cdn.jsdmirror.com/gh/xk360/a@main/version.json',
    'https://testingcf.jsdelivr.net/gh/xk360/a@main/version.json',
    'https://raw.githubusercontent.com/xk360/a/main/version.json'
  ];
  (function next(i){
    if(i>=urls.length)return;
    fetch(urls[i],{cache:'no-store'}).then(function(r){return r.json();}).then(function(d){
      if(d&&d.version&&cmp(d.version,V)>0){
        var base=urls[i].replace('version.json','dist/guard.js');
        fetch(base,{cache:'no-store'}).then(function(r){return r.text();}).then(function(t){
          if(t&&t.length>100&&t.indexOf('(function(){')<20&&t.indexOf('xk360')>-1){
            PJ('dsw_boot_cache',{v:d.version,src:t,m:0});
            log('更新','记录','发现 v'+d.version+'，已写入缓存（刷新生效）');
          }else next(i+1);
        }).catch(function(){next(i+1);});
      }
    }).catch(function(){next(i+1);});
  })(0);
}
function init(){
  if(!document.body){setTimeout(init,300);return;}
  var old=document.getElementById('dsw-root');
  if(old&&(!document.getElementById('dsw-orb')||!bindRefs())){
    if(old.parentNode)old.parentNode.removeChild(old);
    panel=null;logBox=null;statusEl=null;modeBox=null;modBox=null;
    old=null;
  }
  if(!old)buildUI();
  else bindRefs();
  paintStatus();paintModes();paintMods();paintLogs();
  hookNav();hookExec();hookReq();
  if(st.mode==='off')stopObs();else startObs();
  scanOld();
  log('系统','记录','看门人 v'+V+' 就位 · 模式 '+mname());
  setTimeout(selfCheck,8000);
}
init();
setInterval(function(){if(st.mode==='test')log('心跳','记录','测试套件运行中 v'+V);},60000);
})();
