``‘JS
(函数(){
if(window.__PIU_ORB_V8__)返回;window.__PIU_ORB_V8__=正确;

函数boot(){
var TW=窗口；
尝试{if(窗口。顶部窗口(&&W)。顶端。文档)TW=窗口顶部；}捕获(e){}
尝试{if((！TW.文档)&&窗口。父级&&窗口。父母。文档)TW=窗口。父；}捕获(e){}
var TD=TW.document；
var HOST=TD.身体||TD.documentElement；
if(！主机)返回；

var KEY='piu_orb_v8_state';

var GIF_URL='https://raw.githubusercontent.com/xk360/a/01b0b5a0ebc298af15f59d7e093d44a62451883c/gif_261009_095038.gif';
var MP3_SOURCES=[
'https://raw.githubusercontent.com/xk360/a/01b0b5a0ebc298af15f59d7e093d44a62451883c/1791510253.mp3',
'https://cdn.jsdelivr.net/gh/xk360/a@01b0b5a0ebc298af15f59d7e093d44a62451883c/1791510253.mp3',
'https://fastly.jsdelivr.net/gh/xk360/a@01b0b5a0ebc298af15f59d7e093d44a62451883c/1791510253.mp3'
];

函数ls(k，d){尝试{var v=TW.localStorage.getItem(k)；return v====空？d:JSON.parse(v)；}赶上(e){返回 d；}}
功能SS(k，v){尝试{TW.localStorage.setitem(k，JSON.Stringify(v))；}赶上(e){}}

var st=ls(KEY，{})；
var SPD=st.spd！==未定义？st.SPD:2；
var 免费的=true；
var Vol=st.vol！=未定义？st.Vol:80；
var PX=st.PX！==未定义？圣。PX：数学圆整((TW.InnerWidth-80)/2)；
var py=st.py！==未定义？圣。py：数学圆整((TW.InnerHeight-80)/2)；
功能persist(){ss(KEY，{PX:PX，py:py，spd:spd，free:free，vol:Vol})；}

var CSS=[
'#pio8-root{position:fixed；z索引：2147483647；用户选择：无；-webkit-user-select：无；font-family：-apple-system，"Pingfang SC"，"Microsoft Yahei"，无衬线；}'，
'#pio8-root*{box-sizing:border-box；margin:0；padding:0；-webkit-tap-highlight-color:transparent；}'，
'#pio8-ball{位置：固定；宽度：80px；高度：80px；边界半径：50%；溢出：隐藏；光标：抓取；触摸动作：无；边框：2px实心#ffffff；框阴影：06px20px rgba(0，0，0.6)；背景：#000000；}'，
'#pio8-ball。拖动{transform:scale(0.95)；box-shadow:010px26px rgba(0,0,0,0.75);}',
'#pio8-ball IMG{width:100%！important；height:100%！important；适合对象：cover！重要；指针事件：无！重要；显示：block！important；背景：#000000；}'，
'#pio8-deck{位置：固定；宽度：最小(290px，计算(100vw-24px))；背景：rgba(22，22，28，0.97)；边框：1px实体#363642；边框半径：16px；框阴影：018px48px RGBA(0，0，0.68)；显示：无；弯曲方向：列；溢出：隐藏；背景滤镜：模糊(10px)；-webkit-backdrop-filter：模糊(10px)；}'，
'#pio8-deck.on{display:flex；animation:pio8In.2s ease；}'，
'@keyframes pio8In{from{opacity:0；transform:scale(0.9)；}to{opacity:1；transform:scale(1)；}}'，
'#pio8-hd{display:flex；align-items:center；gap:7px；padding:12px14px；border-bottom:1px solid#2d2d38；光标：移动；触摸操作：无；背景：rgba(255，255，255，0.03)；}'，
'#pio8-hd I{width:9px；height:9px；border-roadius:50%；display:inline-block；}'，
'#pio8-tt{flex:1；color：#f0f0f5；font-size:13px；font-weight:700；}'，
'#pio8-x{color：#8c8c9a；font-size:16px；cursor:pointer；padding:2px6px；line-height:1；}'，
'#pio8-st{display:flex；align-items:center；gap:8px；padding:8px 14px；背景：#121216；字体大小：12px；颜色：#92929e；}'，
'#pio8-led{width:8px；height:8px；border-radius:50%；background：#4caf50；box-shadow:006px#4caf50；过渡：背景0.3s；}'，
'#pio8-stat{color：#2dd4bf；font-weight:600；}'，
'#pio8-bd{padding:14px；}'，
'。pio8-row{显示：flex；对齐项目：居中；对齐内容：间距；下边距：12px；字体大小：13px；颜色：#e8e8f2；}'，
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

      clearTimeout(LPT);
      LPT=setTimeout(功能(){
        如果(!已移动){
          甲板.classList.包含('开')?closeDeck():openDeck();
        }
      },600);

      尝试{球.setPointerCapture(e.pointerId);}赶上(犯错){}
      e.preventDefault();
      e.stopPropagation();
    });

    球.addEventListener('pointintermove',功能(e){
      如果(!拖曳)返回;
      var DX=e.ClientX-SX,Dy=e.客户-Sy;
      如果(数学.防抱死制动系统(DX)>4||数学.防抱死制动系统(Dy)>4){
        已移动=正确;
        clearTimeout(LPT);
      }
      如果(已移动)地方(牛+DX,Oy+Dy);
      e.preventDefault();
      e.stopPropagation();
    });

    功能 onPointerEnd(){
      clearTimeout(LPT);
      如果(!拖曳)返回;
      拖曳=假的;
      如果(球)球.classList.remove('拖动');

      如果(!已移动&&!甲板.classList.包含('开')&&澳元&&audioOK){
        如果(澳元.已暂停)tryPlayAudio();
        其他 澳元.暂停();
      }
      坚持();
    }

    球.addEventListener('指针连接',onPointerEnd);
    球.addEventListener('pointcancel',onPointerEnd);
    球.addEventListener('contextmenu',功能(e){e.preventDefault();});
  }

  如果(甲板&&甲板.数据集.b!=='1'){
    甲板.数据集.b='1';
    如果(西南){
      西南.检查=免费的;
      西南.onChange=功能(){免费的=西南.检查;坚持();刷新();};
    }
    如果(RG){
      RG.OnInput=功能(){SPD=parseInt(RG.价值,10);如果(房车)房车.textContent=SPD;坚持();刷新();};
    }
    如果(volRg){
      volRg.OnInput=功能(){applyVolume(volRg.价值);};
    }

    var xBtn=TD.getElementById('pio8-x');
    if(xBtn)xBtn.onclick=function(e){e.stopPropagation();closeDeck();};

    var midBtn=TD.getElementById('pio8-mid');
    if(midBtn)midBtn.onclick=function(){
      守卫('将球体弹回屏幕中央，覆盖当前位置？ ',function(){
        地方(Math.圆的((TW.innerWidth-80)/2),Math.圆的((TW.innerHeight-80)/2));
      });
    };

    var resetBtn=TD.getElementById('pio8-reset');
    if(resetBtn)resetBtn.onclick=function(){
      守卫('停止巡航平移并把球归位到中央？',function(){
        免费的=false;
        if(sw)sw.检查=false;
        刷新();
        地方(Math.圆的((TW.innerWidth-80)/2),Math.圆的((TW.innerHeight-80)/2));
      });
    };

    var gnoBtn=TD.getElementById('pio8-gno');
    if(gnoBtn)gnoBtn.onclick=function(){
      挂起=无效的;
      var GD=TD.getElementById('pio8-gd');
      如果(GD)GD.classList.remove('开');
    };

    var gyesBtn=TD.getElementById('pio8-gyes');
    如果(gyesBtn)gyesBtn.onClick=功能(){
      如果(挂起)挂起();
      挂起=无效的;
      var GD=TD.getElementById('pio8-gd');
      如果(GD)GD.classList.remove('开');
    };

    var hd=TD.getElementById('pio8-hd'),HDG=假的,HX,hy,九,iy;
    如果(hd){
      hd.addEventListener('指向下',功能(e){
        HDG=正确;
        var r=甲板.getBoundingClientRect();
        HX=e.ClientX-r.左;
        hy=e.客户-r.顶端;
        九=r.左;
        iy=r.顶端;
        尝试{hd.setPointerCapture(e.pointerId);}赶上(犯错){}
        e.preventDefault();
        e.stopPropagation();
      });
      hd.addEventListener('pointintermove',功能(e){
        如果(!HDG)返回;
        甲板.风格.左=(九+e.ClientX-HX)+'px';
        甲板.风格.顶端=(iy+e.客户-hy)+'px';
        e.preventDefault();
        e.stopPropagation();
      });
      hd.addEventListener('指针连接',功能(){HDG=假的;});
      hd.addEventListener('pointcancel',功能(){HDG=假的;});
    }

    甲板.addEventListener('指向下',功能(e){e.stopPropagation();});
  }

  如果(球){
    球.风格.左=PX+'px';
    球.风格.顶端=py+'px';
  }

  bindGlobalUnlock();
  刷新();
}

var VX=数学.随机()>.5?1:-1,Vy=数学.随机()>.5?1:-1;
功能 环(){
  如果(免费的&&球&&!拖曳){
    var NX=PX+VX*SPD,纽约=py+Vy*SPD;
    var MX=TW.innerWidth-80,我的=TW.innerHeight-80;
    如果(NX<=0){NX=0;VX=数学.防抱死制动系统(VX);}其他 如果(NX>=MX){NX=MX;VX=-数学.防抱死制动系统(VX);}
    如果(纽约<=0){纽约=0;Vy=数学.防抱死制动系统(Vy);}其他 如果(纽约>=我的){纽约=我的;Vy=-数学.防抱死制动系统(Vy);}
    PX=NX;py=纽约;
    球.风格.左=PX+'px';
    球.风格.顶端=py+'px';
    如果(甲板&&甲板.classList.包含('开'))placeDeck();
    如果(数学.随机()<0.02)坚持();
  }
  requestAnimationFrame(环);
}

功能 治愈(){
  mountStyle();
varvarhost=||TD靴子文档元素；var=TD.身体||TD.documentElement;
  如果！host其他返回；如果(!主办)返回;
var r=TD.getElementById('pio8-root')；varr=TD.getElementById('pio8-root');
如果(！R||！R.包含(TD.getElementById('pio8-ball')))建立()；如果(!r||!r.包含(TD.getElementById('pio8-ball')))建立();
  其他 如果(r.parentNode!==主办)主办.appendChild(r);其他 如果(r.parentNode!==主办)主办.appendChild(r);

``Js！免费的&&！(待定&&TD.getElementById('pio8-GD')&&TD.getElementById('pio8-GD').classList.包含('开')){如果(！免费的&&！(挂起&&TD.getElementById('pio8-GD')&&TD.getElementById('pio8-GD').classList.包含('开'))){
var 肿胀=TD.getElementById('pio8-free')；var肿胀=TD.getElementById('pio8-free');
    如果(肿胀&&!肿胀.匹配('：活动')){如果(肿胀&&!肿胀.匹配('：活动')){
      免费的=正确;免费的=正确;
如果(肿胀)肿胀.检查=正确；如果(肿胀)肿胀.检查=正确;
刷新()；刷新();
    }
  }

如果(澳元&&audioOK&&澳元.已暂停&&Vol>0){如果(澳元&&audioOK&&澳元.已暂停&&Vol>0){
tryPlayAudio()；tryPlayAudio();
  }
}

尝试{新的 MutationObserver(治愈).观察(TD.DocumentElement，{子列表:正确，子树:正确})；}赶上(e){}{新的 MutationObserver(治愈).观察(TD.documentElement,{子列表:正确,子树:正确});}赶上(e){}
setInterval(治愈，1500)；(治愈,1500);

TW.addEventListener('调整大小'，函数(){地方(PX，py)；})；.addEventListener('调整大小',功能(){地方(PX,py);});
TD.addEventListener('指向下'，函数(e){.addEventListener('指向下',功能(e){
如果(甲板&&甲板.classList.包含("打开")){如果(甲板&&甲板.classList.包含('开')){
如果(！甲板。包含(例如目标)&&e。目标！==球&&！球。包含(e.目标))closeDeck()；如果(!甲板.包含(e.目标)&&e.目标!==球&&!球.包含(e.目标))closeDeck();
  }
}，true)；,正确);

建立()；();
环()；();
}

如果(文件.readyState==='正在加载')文件.addEventListener('DOMContentLoaded'，boot)；(文件.readyState==='正在加载')文件.addEventListener('DOMContentLoaded',靴子);
其他 靴子()； 靴子();
})();
``
