```javascript
(function(){
if(window.__PIU_ORB_V8__)return;window.__PIU_ORB_V8__=true;

function boot(){
var TW=window;
try{if(window.top&&window.top.document)TW=window.top;}catch(e){}
try{if((!TW.document)&&window.parent&&window.parent.document)TW=window.parent;}catch(e){}
var TD=TW.document;
var HOST=TD.body||TD.documentElement;
if(!HOST)return;

var KEY='piu_orb_v8_state';

var GIF_URL='https://raw.githubusercontent.com/xk360/a/01b0b5a0ebc298af15f59d7e093d44a62451883c/gif_261009_095038.gif';
var MP3_SOURCES=[
  'https://raw.githubusercontent.com/xk360/a/01b0b5a0ebc298af15f59d7e093d44a62451883c/1791510253.mp3',
  'https://cdn.jsdelivr.net/gh/xk360/a@01b0b5a0ebc298af15f59d7e093d44a62451883c/1791510253.mp3',
  'https://fastly.jsdelivr.net/gh/xk360/a@01b0b5a0ebc298af15f59d7e093d44a62451883c/1791510253.mp3'
];

function ls(k,d){try{var v=TW.localStorage.getItem(k);return v===null?d:JSON.parse(v);}catch(e){return d;}}
function ss(k,v){try{TW.localStorage.setItem(k,JSON.stringify(v));}catch(e){}}

var st=ls(KEY,{});
var spd=st.spd!==undefined?st.spd:2;
var free=true;
var vol=st.vol!==undefined?st.vol:80;
var px=st.px!==undefined?st.px:Math.round((TW.innerWidth-80)/2);
var py=st.py!==undefined?st.py:Math.round((TW.innerHeight-80)/2);
function persist(){ss(KEY,{px:px,py:py,spd:spd,free:free,vol:vol});}

var CSS=[
'#pio8-root{position:fixed;z-index:2147483647;user-select:none;-webkit-user-select:none;font-family:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;}',
'#pio8-root *{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;}',
'#pio8-ball{position:fixed;width:80px;height:80px;border-radius:50%;overflow:hidden;cursor:grab;touch-action:none;border:2px solid #ffffff;box-shadow:0 6px 20px rgba(0,0,0,0.6);background:#000000;}',
'#pio8-ball.drag{transform:scale(0.95);box-shadow:0 10px 26px rgba(0,0,0,0.75);}',
'#pio8-ball img{width:100%!important;height:100%!important;object-fit:cover!important;pointer-events:none!important;display:block!important;background:#000000;}',
'#pio8-deck{position:fixed;width:min(290px,calc(100vw - 24px));background:rgba(22,22,28,0.97);border:1px solid #363642;border-radius:16px;box-shadow:0 18px 48px rgba(0,0,0,0.68);display:none;flex-direction:column;overflow:hidden;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);}',
'#pio8-deck.on{display:flex;animation:pio8In .2s ease;}',
'@keyframes pio8In{from{opacity:0;transform:scale(0.9);}to{opacity:1;transform:scale(1);}}',
'#pio8-hd{display:flex;align-items:center;gap:7px;padding:12px 14px;border-bottom:1px solid #2d2d38;cursor:move;touch-action:none;background:rgba(255,255,255,0.03);}',
'#pio8-hd i{width:9px;height:9px;border-radius:50%;display:inline-block;}',
'#pio8-tt{flex:1;color:#f0f0f5;font-size:13px;font-weight:700;}',
'#pio8-x{color:#8c8c9a;font-size:16px;cursor:pointer;padding:2px 6px;line-height:1;}',
'#pio8-st{display:flex;align-items:center;gap:8px;padding:8px 14px;background:#121216;font-size:12px;color:#92929e;}',
'#pio8-led{width:8px;height:8px;border-radius:50%;background:#4caf50;box-shadow:0 0 6px #4caf50;transition:background 0.3s;}',
'#pio8-stat{color:#2dd4bf;font-weight:600;}',
'#pio8-bd{padding:14px;}',
'.pio8-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;font-size:13px;color:#e8e8f2;}',
'.pio8-row:last-child{margin-bottom:0;}',
'.pio8-sw{position:relative;width:40px;height:22px;display:inline-block;}',
'.pio8-sw input{display:none;}',
'.pio8-swb{position:absolute;inset:0;background:#444452;border-radius:22px;cursor:pointer;transition:0.25s;}',
'.pio8-swb:before{content:"";position:absolute;width:16px;height:16px;left:3px;top:3px;background:#ffffff;border-radius:50%;transition:0.25s;}',
'.pio8-sw input:checked+.pio8-swb{background:#2dd4bf;}',
'.pio8-sw input:checked+.pio8-swb:before{transform:translateX(18px);}',
'.pio8-ctrl-box{display:flex;align-items:center;gap:8px;}',
'.pio8-ctrl-box input[type=range]{width:90px;height:4px;accent-color:#2dd4bf;cursor:pointer;}',
'.pio8-ctrl-box b{color:#8fe3b0;min-width:34px;text-align:right;font-size:12px;}',
'.pio8-btn{width:100%;padding:8px 0;border:none;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;margin-top:6px;transition:opacity 0.2s;}',
'.pio8-btn.c1{background:#0f766e;color:#ffffff;}',
'.pio8-btn.c2{background:#881337;color:#ffe4e6;}',
'.pio8-btn:active{transform:scale(0.98);opacity:0.85;}',
'#pio8-gd{position:absolute;inset:0;background:rgba(10,10,14,0.92);display:none;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:20px;text-align:center;}',
'#pio8-gd.on{display:flex;}',
'#pio8-gm{color:#f0f0f5;font-size:13px;line-height:1.6;}',
'#pio8-gbs{display:flex;gap:12px;}',
'#pio8-gbs button{padding:8px 20px;border:none;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;}',
'#pio8-gno{background:#2e2e38;color:#d0d0d8;}',
'#pio8-gyes{background:#b91c1c;color:#ffffff;}'
].join('');

function mountStyle(){
  var s=TD.getElementById('pio8-style');
  if(!s){
    s=TD.createElement('style');
    s.id='pio8-style';
    s.textContent=CSS;
    (TD.head||TD.documentElement).appendChild(s);
  }
}

var ball,gifImg,aud,deck,sw,rg,rv,volRg,volRv,led,stat,pend=null;
var drag=false,moved=false,sx,sy,ox,oy,lpT=null,audioOK=false;
var audioSrcIndex=0;
var touchUnlockBound=false;
var autoRetryTimer=null;

function clamp(v,a,b){return Math.max(a,Math.min(b,v));}

function place(nx,ny){
  px=clamp(nx,0,Math.max(0,TW.innerWidth-80));
  py=clamp(ny,0,Math.max(0,TW.innerHeight-80));
  if(ball){
    ball.style.left=px+'px';
    ball.style.top=py+'px';
  }
  persist();
  if(deck&&deck.classList.contains('on'))placeDeck();
}

function placeDeck(){
  if(!deck)return;
  var w=deck.offsetWidth||290,h=deck.offsetHeight||290;
  var x=px+90,y=py;
  if(x+w>TW.innerWidth-12)x=px-w-12;
  if(x<12)x=12;
  if(y+h>TW.innerHeight-12)y=TW.innerHeight-h-12;
  if(y<12)y=12;
  deck.style.left=x+'px';
  deck.style.top=y+'px';
}

function openDeck(){if(!deck)return;deck.classList.add('on');placeDeck();}
function closeDeck(){if(!deck)return;deck.classList.remove('on');}

function refresh(){
  if(stat)stat.textContent=free?('巡航中 · '+spd+'级'):'待机 · 固定位';
  if(led){
    var c=free?'#4caf50':'#ff9800';
    led.style.background=c;
    led.style.boxShadow='0 0 6px '+c;
  }
}

function applyVolume(val){
  vol=clamp(parseInt(val,10),0,100);
  if(volRv)volRv.textContent=vol+'%';
  if(volRg)volRg.value=vol;
  if(aud){
    aud.volume=vol/100;
    if(vol===0)aud.muted=true;
    else if(audioOK)aud.muted=false;
  }
  persist();
}

function tryPlayAudio(){
  if(!aud)return;
  var p=aud.play();
  if(p&&p.catch)p.catch(function(){});
}

function loadNextAudioSource(){
  if(!aud)return;
  audioSrcIndex=(audioSrcIndex+1)%MP3_SOURCES.length;
  aud.src=MP3_SOURCES[audioSrcIndex];
  aud.load();
  tryPlayAudio();
}

function autoStartAudio(){
  if(!aud)return;
  aud.volume=vol/100;
  aud.muted=false;
  var p=aud.play();
  if(p&&p.catch){
    p.catch(function(){
      aud.muted=true;
      var q=aud.play();
      if(q&&q.catch)q.catch(function(){});
      scheduleUnlockRetry();
    });
  }else{
    audioOK=true;
  }
}

function scheduleUnlockRetry(){
  if(autoRetryTimer)return;
  var tries=0;
  autoRetryTimer=setInterval(function(){
    tries++;
    if(!aud){clearInterval(autoRetryTimer);autoRetryTimer=null;return;}
    aud.muted=false;
    aud.volume=vol/100;
    var p=aud.play();
    if(p&&p.catch){
      p.catch(function(){aud.muted=true;});
    }else{
      audioOK=true;
      clearInterval(autoRetryTimer);
      autoRetryTimer=null;
      return;
    }
    if(tries>=10){clearInterval(autoRetryTimer);autoRetryTimer=null;}
  },2000);
}

function bindGlobalUnlock(){
  if(touchUnlockBound)return;
  touchUnlockBound=true;
  function unlock(){
    if(!aud)return;
    audioOK=true;
    aud.muted=(vol===0);
    aud.volume=vol/100;
    tryPlayAudio();
    if(autoRetryTimer){clearInterval(autoRetryTimer);autoRetryTimer=null;}
    TD.removeEventListener('pointerdown',unlock,true);
    TW.removeEventListener('touchstart',unlock,true);
  }
  TD.addEventListener('pointerdown',unlock,true);
  TW.addEventListener('touchstart',unlock,true);
}

function guard(msg,fn){
  pend=fn;
  var gm=TD.getElementById('pio8-gm');
  var gd=TD.getElementById('pio8-gd');
  if(gm)gm.textContent=msg;
  if(gd)gd.classList.add('on');
}

function build(){
  mountStyle();
  var host=TD.body||TD.documentElement;
  if(!host)return;

  var rootWrap=TD.getElementById('pio8-root');
  if(!rootWrap){
    rootWrap=TD.createElement('div');
    rootWrap.id='pio8-root';
    host.appendChild(rootWrap);

    ball=TD.createElement('div');
    ball.id='pio8-ball';
    ball.innerHTML='<img src="'+GIF_URL+'" alt="orb" draggable="false">';
    rootWrap.appendChild(ball);

    aud=TD.createElement('audio');
    aud.id='pio8-audio';
    aud.src=MP3_SOURCES[0];
    aud.preload='auto';
    aud.loop=true;
    aud.muted=true;
    aud.volume=vol/100;
    rootWrap.appendChild(aud);

    deck=TD.createElement('div');
    deck.id='pio8-deck';
    deck.innerHTML=
     '<div id="pio8-hd"><i style="background:#666"></i><i style="background:#2dd4bf"></i><i style="background:#4f7cff"></i><span id="pio8-tt">✦ 悬浮球控制台</span><span id="pio8-x">✕</span></div>'+
     '<div id="pio8-st"><span id="pio8-led"></span>状态：<span id="pio8-stat"></span></div>'+
     '<div id="pio8-bd">'+
       '<div class="pio8-row"><span>自由平移</span><label class="pio8-sw"><input type="checkbox" id="pio8-free"><span class="pio8-swb"></span></label></div>'+
       '<div class="pio8-row"><span>巡航移速</span><div class="pio8-ctrl-box"><input type="range" id="pio8-range" min="1" max="6" value="'+spd+'"><b id="pio8-spdv">'+spd+'</b></div></div>'+
       '<div class="pio8-row"><span>音频音量</span><div class="pio8-ctrl-box"><input type="range" id="pio8-vol-range" min="0" max="100" value="'+vol+'"><b id="pio8-vol-val">'+vol+'%</b></div></div>'+
       '<button class="pio8-btn c1" id="pio8-mid">快速居中</button>'+
       '<button class="pio8-btn c2" id="pio8-reset">停止巡航并归位</button>'+
     '</div>'+
     '<div id="pio8-gd"><div id="pio8-gm"></div><div id="pio8-gbs"><button id="pio8-gno">取消</button><button id="pio8-gyes">确认执行</button></div></div>';
    rootWrap.appendChild(deck);
  }

  ball=TD.getElementById('pio8-ball');
  deck=TD.getElementById('pio8-deck');
  gifImg=ball.querySelector('img');
  aud=TD.getElementById('pio8-audio');
  sw=TD.getElementById('pio8-free');
  rg=TD.getElementById('pio8-range');
  rv=TD.getElementById('pio8-spdv');
  volRg=TD.getElementById('pio8-vol-range');
  volRv=TD.getElementById('pio8-vol-val');
  led=TD.getElementById('pio8-led');
  stat=TD.getElementById('pio8-stat');

  if(aud&&aud.dataset.b!=='1'){
    aud.dataset.b='1';
    aud.onerror=function(){loadNextAudioSource();};
    aud.onstalled=function(){tryPlayAudio();};
    autoStartAudio();
  }

  if(gifImg&&gifImg.dataset.b!=='1'){
    gifImg.dataset.b='1';
    gifImg.onerror=function(){
      gifImg.src='https://cdn.jsdelivr.net/gh/xk360/a@01b0b5a0ebc298af15f59d7e093d44a62451883c/gif_261009_095038.gif';
    };
  }

  if(ball&&ball.dataset.b!=='1'){
    ball.dataset.b='1';
    ball.addEventListener('pointerdown',function(e){
      if(e.button!==undefined&&e.button!==0)return;
      drag=true;moved=false;sx=e.clientX;sy=e.clientY;ox=px;oy=py;
      ball.classList.add('drag');

      if(!audioOK&&aud){
        audioOK=true;
        aud.muted=(vol===0);
        aud.volume=vol/100;
        tryPlayAudio();
        if(autoRetryTimer){clearInterval(autoRetryTimer);autoRetryTimer=null;}
      }

      clearTimeout(lpT);
      lpT=setTimeout(function(){
        if(!moved){
          deck.classList.contains('on')?closeDeck():openDeck();
        }
      },600);

      try{ball.setPointerCapture(e.pointerId);}catch(err){}
      e.preventDefault();
      e.stopPropagation();
    });

    ball.addEventListener('pointermove',function(e){
      if(!drag)return;
      var dx=e.clientX-sx,dy=e.clientY-sy;
      if(Math.abs(dx)>4||Math.abs(dy)>4){
        moved=true;
        clearTimeout(lpT);
      }
      if(moved)place(ox+dx,oy+dy);
      e.preventDefault();
      e.stopPropagation();
    });

    function onPointerEnd(){
      clearTimeout(lpT);
      if(!drag)return;
      drag=false;
      if(ball)ball.classList.remove('drag');

      if(!moved&&!deck.classList.contains('on')&&aud&&audioOK){
        if(aud.paused)tryPlayAudio();
        else aud.pause();
      }
      persist();
    }

    ball.addEventListener('pointerup',onPointerEnd);
    ball.addEventListener('pointercancel',onPointerEnd);
    ball.addEventListener('contextmenu',function(e){e.preventDefault();});
  }

  if(deck&&deck.dataset.b!=='1'){
    deck.dataset.b='1';
    if(sw){
      sw.checked=free;
      sw.onchange=function(){free=sw.checked;persist();refresh();};
    }
    if(rg){
      rg.oninput=function(){spd=parseInt(rg.value,10);if(rv)rv.textContent=spd;persist();refresh();};
    }
    if(volRg){
      volRg.oninput=function(){applyVolume(volRg.value);};
    }

    var xBtn=TD.getElementById('pio8-x');
    if(xBtn)xBtn.onclick=function(e){e.stopPropagation();closeDeck();};

    var midBtn=TD.getElementById('pio8-mid');
    if(midBtn)midBtn.onclick=function(){
      guard('将球体弹回屏幕中央，覆盖当前位置？',function(){
        place(Math.round((TW.innerWidth-80)/2),Math.round((TW.innerHeight-80)/2));
      });
    };

    var resetBtn=TD.getElementById('pio8-reset');
    if(resetBtn)resetBtn.onclick=function(){
      guard('停止巡航平移并把球归位到中央？',function(){
        free=false;
        if(sw)sw.checked=false;
        refresh();
        place(Math.round((TW.innerWidth-80)/2),Math.round((TW.innerHeight-80)/2));
      });
    };

    var gnoBtn=TD.getElementById('pio8-gno');
    if(gnoBtn)gnoBtn.onclick=function(){
      pend=null;
      var gd=TD.getElementById('pio8-gd');
      if(gd)gd.classList.remove('on');
    };

    var gyesBtn=TD.getElementById('pio8-gyes');
    if(gyesBtn)gyesBtn.onclick=function(){
      if(pend)pend();
      pend=null;
      var gd=TD.getElementById('pio8-gd');
      if(gd)gd.classList.remove('on');
    };

    var hd=TD.getElementById('pio8-hd'),hdg=false,hx,hy,ix,iy;
    if(hd){
      hd.addEventListener('pointerdown',function(e){
        hdg=true;
        var r=deck.getBoundingClientRect();
        hx=e.clientX-r.left;
        hy=e.clientY-r.top;
        ix=r.left;
        iy=r.top;
        try{hd.setPointerCapture(e.pointerId);}catch(err){}
        e.preventDefault();
        e.stopPropagation();
      });
      hd.addEventListener('pointermove',function(e){
        if(!hdg)return;
        deck.style.left=(ix+e.clientX-hx)+'px';
        deck.style.top=(iy+e.clientY-hy)+'px';
        e.preventDefault();
        e.stopPropagation();
      });
      hd.addEventListener('pointerup',function(){hdg=false;});
      hd.addEventListener('pointercancel',function(){hdg=false;});
    }

    deck.addEventListener('pointerdown',function(e){e.stopPropagation();});
  }

  if(ball){
    ball.style.left=px+'px';
    ball.style.top=py+'px';
  }

  bindGlobalUnlock();
  refresh();
}

var vx=Math.random()>.5?1:-1,vy=Math.random()>.5?1:-1;
function loop(){
  if(free&&ball&&!drag){
    var nx=px+vx*spd,ny=py+vy*spd;
    var mx=TW.innerWidth-80,my=TW.innerHeight-80;
    if(nx<=0){nx=0;vx=Math.abs(vx);}else if(nx>=mx){nx=mx;vx=-Math.abs(vx);}
    if(ny<=0){ny=0;vy=Math.abs(vy);}else if(ny>=my){ny=my;vy=-Math.abs(vy);}
    px=nx;py=ny;
    ball.style.left=px+'px';
    ball.style.top=py+'px';
    if(deck&&deck.classList.contains('on'))placeDeck();
    if(Math.random()<0.02)persist();
  }
  requestAnimationFrame(loop);
}

function heal(){
  mountStyle();
  var host=TD.body||TD.documentElement;
  if(!host)return;
  var r=TD.getElementById('pio8-root');
  if(!r||!r.contains(TD.getElementById('pio8-ball')))build();
  else if(r.parentNode!==host)host.appendChild(r);

  if(!free&&!(pend&&TD.getElementById('pio8-gd')&&TD.getElementById('pio8-gd').classList.contains('on'))){
    var swEl=TD.getElementById('pio8-free');
    if(swEl&&!swEl.matches(':active')){
      free=true;
      if(swEl)swEl.checked=true;
      refresh();
    }
  }

  if(aud&&audioOK&&aud.paused&&vol>0){
    tryPlayAudio();
  }
}

try{new MutationObserver(heal).observe(TD.documentElement,{childList:true,subtree:true});}catch(e){}
setInterval(heal,1500);

TW.addEventListener('resize',function(){place(px,py);});
TD.addEventListener('pointerdown',function(e){
  if(deck&&deck.classList.contains('on')){
    if(!deck.contains(e.target)&&e.target!==ball&&!ball.contains(e.target))closeDeck();
  }
},true);

build();
loop();
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);
else boot();
})();
```
