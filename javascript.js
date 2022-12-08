
const fire = 'f';
const water = 'w';
const grass = 'g';
const dark = 'd';
const light = 'l';
const heal = 'h';
const droplist = [fire,water,grass,dark,light,heal]
const dropcolor = ['rgb(237, 106, 106)','rgb(86, 167, 255)','rgb(133, 241, 131)','rgb(166, 84, 225)','rgb(255, 232, 75)','rgb(255, 85, 163)']
const IDS = [
'b01','b02','b03','b04','b05','b06',
'b07','b08','b09','b10','b11','b12',
'b13','b14','b15','b16','b17','b18',
'b19','b20','b21','b22','b23','b24',
'b25','b26','b27','b28','b29','b30',
'b31','b32','b33','b34','b35','b36'
]
const sesource = [
        'https://raw.githubusercontent.com/angelbeatsow/abow/main/_1do.wav',
	'https://raw.githubusercontent.com/angelbeatsow/abow/main/_2re.wav',
	'https://raw.githubusercontent.com/angelbeatsow/abow/main/_3mi.wav',
	'https://raw.githubusercontent.com/angelbeatsow/abow/main/_4fa.wav',
	'https://raw.githubusercontent.com/angelbeatsow/abow/main/_5so.wav',
	'https://raw.githubusercontent.com/angelbeatsow/abow/main/_6ra.wav',
	'https://raw.githubusercontent.com/angelbeatsow/abow/main/_7si.wav',
	'https://raw.githubusercontent.com/angelbeatsow/abow/main/_8do.wav'
]
const startbyou = ['10','261','500','760','1048','1306','1607','2231','2512','2804','3041','3336','3561','3885','4221','4572','4891','5249','5535','5774','6024','6314','6675','7041']
let douganumber = 0;

let isRun = true;
let isRunning = false;
let isDissaper = false;
let Rnumber = 1;
let senumber = 0;
let firstPoint = 0;
let lastPoint = [0,0];
let howManyDissaper = 0;
let saidaiDissaper = 0;
let whatTimeDissaper = 0; //消した回数
let whatTimeDissaperInThisTurn = 0; //消した回数
let saidaiCombo = 0;
let totalDissaper = 0;
let spendedTurn = 0;
let timeCount = false;
let countzeroWorking = false;
let tensyonSuuji = 0;
let tensyonKaisuu = 0;
let tensyonKoritsuSentaku = false;
let gachaChike = 0; //枚数

function $(id){
  return document.getElementById(id);
}

function randomNumber(){　
    Rnumber = Math.random()*6;
    return Math.trunc( Rnumber );    
}

function suujihenkan(suuji){
  for(let aunt = 1;aunt < 37;aunt++){
    if(suuji == 'b0' + aunt ||suuji == 'b' + aunt){
      return aunt;
    }
  }
}


//カウントを減らす処理
let sousajikan = 5;
let gaugewidth = 500;
function count(){
     if(gaugewidth >= 10){
	gaugewidth = gaugewidth - 10;
	$('timegauge').style.width = gaugewidth +'px';	
     }else{
	     gaugewidth = 0;
	     $('timegauge').style.width = '0px';	
     }
}

//カウントが0になったときの処理
function countzero(){
      console.log('カウントが0になった!');
      $('fadeLayer').style.visibility = "visible";
  spendedTurn　= spendedTurn + 1;
  console.log('ターン数:' + spendedTurn);
  
  //high tensyon no baai
  if($('tensyonButton').innerHTML == 9999){
    console.log('high tension finished ^~^');
    clickendAction();
    //戦績の処理b
	      $('sensekiTurn').innerHTML = spendedTurn;
	      if(saidaiCombo < whatTimeDissaperInThisTurn){
		      saidaiCombo = whatTimeDissaperInThisTurn;
	              $('sensekiCombo').innerHTML = saidaiCombo;
              }
       whatTimeDissaperInThisTurn = 0;
	      let unko = whatTimeDissaper / spendedTurn;
	      unko = unko * 100;
	      $('sensekiComboHeikin').innerHTML = Math.round(unko) / 100;
	      //ここまで
    tensyonSuuji = 0;
    $('tensyonButton').innerHTML = '0';
    $('tensyonButton').style.color = 'rgb(172, 178, 180)';
    $('tensyonButton').style.backgroundColor = 'rgb(99, 102, 101)';
    for(let row=0;row < 36;row++){
       $(IDS[row]).removeEventListener('touchstart',tensyonAction,{ passive: true });
    }
    setTimeout(function(){
		      fadeLayerFlash()
       for(let row=0;row < 36;row++){
          $(IDS[row]).removeEventListener('touchstart',tensyonAction,{ passive: true });
          $(IDS[row]).addEventListener('touchstart',clickAction,{ passive: false });
          $(IDS[row]).addEventListener('touchend',clickendAction);
          $(IDS[row]).addEventListener('touchmove',untilClick,{ passive: false });
       }
      gaugewidth = 500;
      $('timegauge').style.width = gaugewidth + 'px';
      timeCount = false;
      countzeroWorking = false;
    },1000);
    
  }else if(isRun == false){
        $(firstPoint).removeEventListener('touchmove',untilClick);
	      clickendAction();
	      
	      //戦績の処理b
	      $('sensekiTurn').innerHTML = spendedTurn;
	      if(saidaiCombo < whatTimeDissaperInThisTurn){
		      saidaiCombo = whatTimeDissaperInThisTurn;
	              $('sensekiCombo').innerHTML = saidaiCombo;
              }
	      whatTimeDissaperInThisTurn = 0;
	      let unko = whatTimeDissaper / spendedTurn;
	      unko = unko * 100;
	      $('sensekiComboHeikin').innerHTML = Math.round(unko) / 100;
	      //ここまで
	      
	      setTimeout(function(){
		      fadeLayerFlash()
	         $(firstPoint).addEventListener('touchmove',untilClick,{ passive: false});
                    gaugewidth = 500;
		      $('timegauge').style.width = gaugewidth + 'px';
                    timeCount = false;
		      countzeroWorking = false;
	            },1000);
      }else{
	      //戦績の処理b
	      $('sensekiTurn').innerHTML = spendedTurn;
	      if(saidaiCombo < whatTimeDissaperInThisTurn){
		      saidaiCombo = whatTimeDissaperInThisTurn;
	              $('sensekiCombo').innerHTML = saidaiCombo;
              }
	      whatTimeDissaperInThisTurn = 0;
	      let unko = whatTimeDissaper / spendedTurn;
	      unko = unko * 100;
	      $('sensekiComboHeikin').innerHTML = Math.round(unko) / 100;
	      //ここまで
	      
	      setTimeout(function(){
		      fadeLayerFlash()
	          gaugewidth = 500;
		      $('timegauge').style.width = gaugewidth + 'px';
                    timeCount = false;
		      countzeroWorking = false;
		    },1000);
      }
}

//ピカッとさせる
function fadeLayerFlash(){
	$('fadeLayer').style.opacity = "0.4";
	$('fadeLayer').style.backgroundColor = "#ffffff";
	$('fadeLayer').style.visibility = "visible";
        setTimeout(function(){
            $('fadeLayer').style.opacity = "0.7";
            setTimeout(function(){
		$('fadeLayer').style.opacity = "0.5";
		setTimeout(function(){
                        $('fadeLayer').style.opacity = "0.2";
			setTimeout(function(){
				   
				$('fadeLayer').style.visibility = "hidden";
				$('fadeLayer').style.backgroundColor = "#000000";
				$('fadeLayer').style.opacity = "0.5";
                                   
                        },50);
                },50);
            },100);
        },50);
}

function clickAction(event){
  if(isRun == false){
    return;
  }
 if(gaugewidth == 0){
     return;
 }
  event.preventDefault();
  senumber = 0;
  isDissaper = false;
  firstPoint = event.target.id;
  let object = $(firstPoint).value;
  lastPoint = [firstPoint,object];
  isRun = false;
  isRunning = true;
  $(firstPoint).value = 'x';
  console.log('last point is ' + lastPoint[0]);
  console.log('last value is ' + lastPoint[1]);
}

function clickendAction(event){
  if(tensyonKoritsuSentaku){
    return;
  }
      if(isDissaper == true || $('tensyonButton').innerHTML == 9999){
        isRun = false;
        isRunning = false;
	      isDissaper = false;
        
        //ブロックを落とす
        for(let n = 0;n < 5;n++){
          for(let row=6;row < 36;row++){
            if($(IDS[row]).value == 'x'){
              $(IDS[row]).value = $(IDS[row - 6]).value
              $(IDS[row]).style.backgroundColor = $(IDS[row - 6]).style.backgroundColor;
		    if($(IDS[row]).value == heal){
                   $(IDS[row]).classList.add('marukusuru');
                }else{
                   $(IDS[row]).classList.remove('marukusuru');
                }
              $(IDS[row - 6]).value = 'x'
              $(IDS[row - 6]).style.backgroundColor = 'black';
		     $(IDS[row - 6]).classList.remove('marukusuru');
            }
          }
        }
        //xにブロックを入れる
        for(let row=0;row < 36;row++){
            if($(IDS[row]).value == 'x'){
              let randoma = randomNumber();
              $(IDS[row]).value = droplist[randoma];
              $(IDS[row]).style.backgroundColor = dropcolor[randoma];
	      if($(IDS[row]).value == heal){
                   $(IDS[row]).classList.add('marukusuru');
                }else{
                   $(IDS[row]).classList.remove('marukusuru');
                }
            }}
	      
	      //カウントの処理
	      if(timeCount == false){
		      //カウント開始
	        timeCount = true;
	      }else if($('timegauge').style.width != '0px' && $('tensyonButton').innerHTML != 9999){
	      //消したブロックに応じてカウントを増やす
		        gaugewidth = gaugewidth + howManyDissaper * 10 * 5 / sousajikan ;
		        $('timegauge').style.width = gaugewidth + 'px';
	      }else if($('tensyonButton').innerHTML == 9999){
	        gaugewidth = gaugewidth + howManyDissaper * 5 * 5 / sousajikan ;
		        $('timegauge').style.width = gaugewidth + 'px';
	      }
   
		      
	      //戦績の処理a
	      totalDissaper = totalDissaper + howManyDissaper;
        $('sensekiTotal').innerHTML = totalDissaper;
        //gachaChike no syori
        if(totalDissaper >= 10 * (gachaChike + 10)){
          gachaChike = gachaChike + 10;
          $('gachaChikeMaisuu').innerHTML = gachaChike;
        }
        //gachaChike no syori kokomade
	          if(saidaiDissaper < howManyDissaper){
		           saidaiDissaper = howManyDissaper;
	            $('sensekiRensa').innerHTML = saidaiDissaper;
	          }
        
        if($('tensyonButton').innerHTML != 9999 || tensyonSuuji != 100){
        //tensyon no suuji no syori
        if(howManyDissaper < 7 && howManyDissaper > 1){
          tensyonSuuji = tensyonSuuji + howManyDissaper - 1;
        }else if(howManyDissaper >= 7){
          tensyonSuuji = tensyonSuuji + 5;
        }
        if(tensyonSuuji >= 100){
          tensyonSuuji = 100;
          $('tensyonButton').style.color = '#ffffff';
        }
        $('tensyonButton').innerHTML = tensyonSuuji;
        //tensyon no suuji no syori kokomade
        }
        
	      whatTimeDissaper = whatTimeDissaper + 1;
	      whatTimeDissaperInThisTurn　= whatTimeDissaperInThisTurn + 1;
	      let unchi = totalDissaper / whatTimeDissaper;
	      unchi = unchi * 100;
	      $('sensekiRensaHeikin').innerHTML = Math.round(unchi) / 100;
        howManyDissaper = 0;
	      //ここまで
	      
              isRun = true;
        }else if(isRun == false){
          //xを元に戻す
          $(lastPoint[0]).value = lastPoint[1];
          isRun = true;
          isRunning = false;
          isDissaper = false;
      }
}
    
        

function untilClick(event){
  if(!isRunning){
    return;
  }
 if(gaugewidth == 0){
     return;
 }
  //zahyou no syutoku
  let x = event.clientX;
  let y = event.clientY;
  if (event.touches && event.touches[0]) {
		   x = event.touches[0].clientX;
		   y = event.touches[0].clientY;
  } else if (event.originalEvent && event.originalEvent.changedTouches[0]) {
	   	x = event.originalEvent.changedTouches[0].clientX;
		   y = event.originalEvent.changedTouches[0].clientY;
  	} else if (event.clientX && event.clientY) {
   		x = event.clientX;
   		y = event.clientY;
	}
  
  
  
  //基準の座標を取得
  var lastxy = $(lastPoint[0]).getBoundingClientRect();
  let lastx = lastxy.left;
  let lasty = lastxy.top;
  let lnumber = suujihenkan(lastPoint[0]);
  
  let nnumber = 100;
  
//基準との位置関係を取得
  if(x > lastx - 80 && x < lastx + 130){
    if(y > lasty - 80 && y < lasty +130){
      
      
      if(x < lastx - 30 && lnumber % 6 != 1){
                 if(y < lasty - 30 && lnumber > 6){
                      nnumber = lnumber - 7;
                 }else if(y > lasty && y < lasty + 50){
                      nnumber = lnumber - 1;
                }else if(y > lasty + 80 && lnumber < 31){
                      nnumber = lnumber + 5;
                }else{
                      return;
                }
       }else if(x > lastx && x < lastx + 50){
            if(y < lasty - 30 && lnumber > 6){
                nnumber = lnumber - 6;
            }else if(y > lasty + 80 && lnumber < 31){
                nnumber = lnumber + 6;
            }else{
                return;
            }
      }else if(x > lastx + 80 && lnumber % 6 != 0){
            if(y < lasty - 30 && lnumber > 6){
                 nnumber = lnumber - 5;
            }else if(y > lasty && y < lasty + 50){
                 nnumber = lnumber + 1;
            }else if(y > lasty + 80 && lnumber < 31){
                 nnumber = lnumber + 7;
            }
      }else{
            return;
      }
    }else{
    return;
    }
  }else{
    return;
  }
      
                      
        
        //rinsetsu suru onaji zokusei ka douka
        if(nnumber < 37 && nnumber > 0){
             console.log('rinsetsu');
		let nowbotton = IDS[nnumber - 1];
             if($(nowbotton).value == lastPoint[1]){
               console.log('dousyoku');
               
		     //sentaku sareta
               lastPoint[0] = nowbotton;
               $(nowbotton).value = 'x';
               isDissaper = true;
		     if(howManyDissaper == 0){
		        howManyDissaper = 2;
		     }else{
			howManyDissaper = howManyDissaper + 1;
		     }
               
               //se no syori
		     if( navigator.onLine ){//online nara jikkou
               console.log('se effect!')
               	var audio = new Audio;
               	audio.src = sesource[senumber % 8];
               senumber++;
               console.log('senuber is' + senumber);
               
		     audio.volume = $('volrange').value / 10;
               audio.autoplay = true;
               audio.load();
               
                 //se no syori owari
               }
                     }
             }
      }


function resetAction(){
  for(let row=0;row < 36;row++){
      let randoma = randomNumber();
      $(IDS[row]).value = droplist[randoma];
      $(IDS[row]).style.backgroundColor = dropcolor[randoma];
      if($(IDS[row]).value == heal){
          $(IDS[row]).classList.add('marukusuru');
        }else{
          $(IDS[row]).classList.remove('marukusuru');
        }
}}


function onloadAction(){
  for(let row=0;row < 36;row++){
      let randoma = randomNumber();
      $(IDS[row]).value = droplist[randoma];
      $(IDS[row]).style.backgroundColor = dropcolor[randoma];
      if($(IDS[row]).value == heal){
           $(IDS[row]).classList.add('marukusuru');
         }else{
           $(IDS[row]).classList.remove('marukusuru');
         }
      $(IDS[row]).addEventListener('touchstart',clickAction,{ passive: false });
      $(IDS[row]).addEventListener('touchend',clickendAction);
      $(IDS[row]).addEventListener('touchmove',untilClick,{ passive: false });
    }
  $('reset').onclick = resetAction;
  $('bgmSelectButton').onclick = bgmChange;
  $('tweetButton').onclick = tweet;
  $('tensyonButton').onclick = tensyonOn;
  $('gachaButton').onclick = gachaStart;
  }
	
	
  // スクロールを禁止にする関数
  function disableScroll(event) {
    event.preventDefault();
  }
	// スクロール禁止ボタンの設定
  document.getElementById('on').onclick = function() {
    // イベントと関数を紐付け
	  if(document.getElementById('on').value == 'スクロール禁止をonにする'){
    document.addEventListener('touchmove', disableScroll, { passive: false });
    document.body.classList.add('overflow-hidden');
		  document.getElementById('on').value = 'スクロール禁止をoffにする';
          }else{
	document.removeEventListener('touchmove', disableScroll, { passive: false });
        document.body.classList.remove('overflow-hidden');
		  document.getElementById('on').value = 'スクロール禁止をonにする';
  }
}

//操作時間+3秒ボタン
$('sanbyouOn').onclick = function() {
   if(timeCount == true){
     alert('操作中は変更できません。')
     return;
   }
  
  if($('tensyonButton').innerHTML == 9999){
    alert('ハイテンション中は変更できません。')
	   return;
   }
  
  var really = confirm('戦績とテンション値がリセットされますが、よろしいですか?');
  if(really){
   if($('sanbyouOn').value == 'onにする'){
	   sousajikan = 8;
	   $('sanbyouOn').value = 'offにする';
	   spendedTurn = 0;
           totalDissaper = 0;
           saidaiDissaper = 0;
           whatTimeDissaper = 0;
           saidaiCombo = 0;
           tensyonKaisuu = 0;
           tensyonSuuji = 0;
           $('sensekiTurn').innerHTML = 0;
           $('sensekiTotal').innerHTML = 0;
           $('sensekiRensa').innerHTML = 0;
           $('sensekiRensaHeikin').innerHTML = 0;
           $('sensekiCombo').innerHTML = 0;
           $('sensekiComboHeikin').innerHTML = 0;
           $('sensekiTensyon').innerHTML = 0;
           $('tensyonButton').innerHTML = 0;
   }else{
	   sousajikan = 5;
	   $('sanbyouOn').value = 'onにする';
	   spendedTurn = 0;
           totalDissaper = 0;
           saidaiDissaper = 0;
           whatTimeDissaper = 0;
           saidaiCombo = 0;
           tensyonKaisuu = 0;
           tensyonSuuji = 0;
           $('sensekiTurn').innerHTML = 0;
           $('sensekiTotal').innerHTML = 0;
           $('sensekiRensa').innerHTML = 0;
           $('sensekiRensaHeikin').innerHTML = 0;
           $('sensekiCombo').innerHTML = 0;
           $('sensekiComboHeikin').innerHTML = 0;
           $('sensekiTensyon').innerHTML = 0;
           $('tensyonButton').innerHTML = 0;
   }
  }
}  

//ツイートボタン
function tweet(){
  if(gaugewidth != 500){
    return;
  }
   let sanbyouText = '';
   if(sousajikan == 8){
	 sanbyouText = '＋3秒:on%0a';
   }
   let dataText =sanbyouText + '経過ターン数:' + spendedTurn + 'ターン%0a' +
                          '消したブロック数合計:' + totalDissaper + '個%0a' +
                          '一度に消したブロック最大数:' + saidaiDissaper + '個(平均:' + $('sensekiRensaHeikin').innerHTML + '個)%0a' +
	                  '最大コンボ数:' + saidaiCombo + 'コンボ(平均:' + $('sensekiComboHeikin').innerHTML +'コンボ)%0a' +
                  'ハイテンション:' + tensyonKaisuu + '回%0a' +
	                  'ABOW(仮)';
	window.open('https://twitter.com/share?text=' + dataText + '&url=https://angelbeatsow.github.io/abow/&hashtags=ABOW_仮');
}


//windowアクションですよーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
window.onload = onloadAction();

//カウントsetInterval　sousajikanの変更に対応するためsetTimeout
var countinterval = function(){
    if(timeCount == true && gaugewidth != 0){
        count();
    }else if(gaugewidth == 0 && countzeroWorking == false){
	    countzeroWorking = true;
	countzero();
    }
    setTimeout(countinterval,sousajikan * 20);
}

setTimeout(countinterval,sousajikan * 20);



//youtube no seigyo
var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('umekomidouga', {
		playerVars: {
                   controls: 0,
                   sandbox: 'allow-scripts'
		},
                events: {
                  'onReady': onPlayerReady,
                  'onStateChange': onPlayerStateChange
                }
        });
      }

function onPlayerReady(event) {
        player.cueVideoById({'videoId':'JMzDWbqROT4',
			     'startSeconds': 10
   });
      }

function onPlayerStateChange(event) {
   if (event.data == 0) {
       player.seekTo(startbyou[douganumber]);
       event.target.playVideo();
   }
}

//ライブボタンの設定
function bgmChange(){
	if( navigator.onLine ){//online nara jikkou
  let select = $('bgmSelect').value
  for(let aunt = 1;aunt < 24;aunt++){
    if(select == 'm0' + aunt ||select == 'm' + aunt){
      douganumber = aunt - 1;
	    player.seekTo(startbyou[douganumber]);
	   }
}
	}else{
		alert('オフラインです。');
        }
}


//動画が指定時間になったらシークバーを戻すsetInterval
window.setInterval(function(){
	if( navigator.onLine ){//online nara jikkou
  if(player.getPlayerState() == 1){//saisei tyuu nara jikkou
    if(player.getCurrentTime() > startbyou[douganumber + 1] - 3){
         player.seekTo(startbyou[douganumber]);
     }
  }
         }
}, 1000);
		

//tensyon button no ivent
function tensyonOn(){
  console.log('high tension?')
  if($('tensyonButton').innerHTML == 100 && gaugewidth == 500){
    console.log('high-tension!!');
    tensyonKaisuu++;
    fadeLayerFlash()
    $('sensekiTensyon').innerHTML = tensyonKaisuu;
    $('tensyonButton').innerHTML = '9999';
    $('tensyonButton').style.color = 'rgb(194, 33, 48)';
    $('tensyonButton').style.backgroundColor = 'rgb(255, 242, 130)';
    for(let row=0;row < 36;row++){
      $(IDS[row]).removeEventListener('touchstart',clickAction,{ passive: false });
      $(IDS[row]).removeEventListener('touchend',clickendAction);
      $(IDS[row]).removeEventListener('touchmove',untilClick,{ passive: false });
      $(IDS[row]).addEventListener('touchstart',tensyonAction,{ passive: true });
    }
  }
}

function tensyonAction(event){
  let touchId = event.target.id ;
  let touchValue = $(touchId).value ;
  $(touchId).value = 'x';
  howManyDissaper = 1;
  tensyonKoritsuSentaku = false;
  for(let tenshichan = 1;tenshichan <= 18;tenshichan++){
    for(let row=0;row < 36;row++){
      if($(IDS[row]).value == 'x'){
        if(row >= 7){
           if($(IDS[row - 7]).value == touchValue && row % 6 != 0){
             $(IDS[row - 7]).value = 'x';
             howManyDissaper++;
           }
        }
        if(row >= 6){
           if($(IDS[row - 6]).value == touchValue){
             $(IDS[row - 6]).value = 'x';
             howManyDissaper++;
           }
           if($(IDS[row - 5]).value == touchValue && row % 6 != 5){
             $(IDS[row - 5]).value = 'x';
             howManyDissaper++;
           }
        }
        if(row % 6 != 0){
           if($(IDS[row - 1]).value == touchValue){
             $(IDS[row - 1]).value = 'x';
             howManyDissaper++;
           }
        }
        if(row % 6 != 5){
           if($(IDS[row + 1]).value == touchValue){
             $(IDS[row + 1]).value = 'x';
             howManyDissaper++;
           }
        }
        if(row <= 29){
           if($(IDS[row + 5]).value == touchValue && row % 6 != 0){
             $(IDS[row + 5]).value = 'x';
             howManyDissaper++;
           }
           if($(IDS[row + 6]).value == touchValue){
             $(IDS[row + 6]).value = 'x';
             howManyDissaper++;
           }
        }
        if(row <= 28){
           if($(IDS[row + 7]).value == touchValue && row % 6 != 5){
             $(IDS[row + 7]).value = 'x';
             howManyDissaper++;
           }
        }
      }
    }
  }
  if(howManyDissaper == 1){
    tensyonKoritsuSentaku = true;
    $(touchId).value = touchValue;
    howManyDissaper = 0;
  }else{
    //カウントの処理
	      if(timeCount == false){
	        timeCount = true;
	      }
    //
     for(let row=0;row < 36;row++){
       $(IDS[row]).removeEventListener('touchstart',tensyonAction,{ passive: true });
     }
       setTimeout(function(){
          clickendAction();
	       
	       //se no syori
	       if( navigator.onLine ){//online nara jikkou
               console.log('se effect!')
               	var audio = new Audio;
               	audio.src = 'https://raw.githubusercontent.com/angelbeatsow/abow/main/koukaon_tensyongeshi.wav';
		audio.volume = $('volrange').value / 10;
                audio.autoplay = true;
                audio.load();}
                 //se no syori owari
	       
         if(gaugewidth != 0){
          for(let row=0;row < 36;row++){
            $(IDS[row]).addEventListener('touchstart',tensyonAction,{ passive: true });
          }
         }
       },250);
  }
}


//gacha no event
let syojiCard = [0b0000,0b0000,0b0000,0b0000,0b0000]
let animeCardWidth = 160;
let animeFlag = 0;
let getCardId = 0;

function gachaStart(){
  if(gachaChike == 0){
    alert('チケットがありません。');
    //return;
  }
  //fade out
  document.getElementsByClassName('gachaTop')[0].classList.add('hideAnime');
  setTimeout(function(){
    //fade in
    $('uramen').classList.add('showAnime');
    $('uramen').classList.remove('hideAnime');
    setTimeout(function(){
      //animation
      animeFlag = 0;
    gachaAnimation();
    },1000)
  },1000);
}

const gachaAnimation = () => {
  if(animeFlag == 0){
    //uramen wo jump saseru
    animeCardWidth = animeCardWidth + 1;
    $('uramen').width = animeCardWidth;
    $('uramen').style.transform = 'translateY(-1px)';
    if($('uramen').width == 160 * 1.2){
      animeFlag = 1;
    }
    requestAnimationFrame(gachaAnimation);
    
  }else if(animeFlag == 1){
    //uramen wo tyakuti saseru
    animeCardWidth = animeCardWidth + 1;
    $('uramen').width = animeCardWidth;
    $('uramen').style.transform = 'translateY(0,1px)';
    if($('uramen').width == 160 * 1.4){
      animeFlag = 2;
    }
    requestAnimationFrame(gachaAnimation);
    
  }else if(animeFlag == 2){
    $('uramen').style.transform = 'scaleX(0.5)';
    if($('uramen').width <= 1){
       if(getCardId == 0){
         $('uramen').src = 'omotemen_sample.png'
       }
       animeFlag = 3;
    }
    requestAnimationFrame(gachaAnimation);
    
  }else if(animeFlag == 3){
    $('uramen').style.transform = 'scaleX(1.5)';
    if($('uramen').width >= 160 * 1.4){
       animeFlag = 100;
    }
    requestAnimationFrame(gachaAnimation);
  }
};





