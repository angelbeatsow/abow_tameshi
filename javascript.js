
const fire = 'f';
const water = 'w';
const grass = 'g';
const dark = 'd';
const light = 'l';
const heal = 'h';
const droplist = [fire,water,grass,dark,light,heal];
const dropcolor = ['rgb(237, 106, 106)','rgb(86, 167, 255)','rgb(133, 241, 131)','rgb(166, 84, 225)','rgb(255, 232, 75)','rgb(255, 85, 163)'];
const IDS = [
'b01','b02','b03','b04','b05','b06',
'b07','b08','b09','b10','b11','b12',
'b13','b14','b15','b16','b17','b18',
'b19','b20','b21','b22','b23','b24',
'b25','b26','b27','b28','b29','b30',
'b31','b32','b33','b34','b35','b36'
];
const sesource = [
        'https://raw.githubusercontent.com/angelbeatsow/abow/main/_1do.wav',
	'https://raw.githubusercontent.com/angelbeatsow/abow/main/_2re.wav',
	'https://raw.githubusercontent.com/angelbeatsow/abow/main/_3mi.wav',
	'https://raw.githubusercontent.com/angelbeatsow/abow/main/_4fa.wav',
	'https://raw.githubusercontent.com/angelbeatsow/abow/main/_5so.wav',
	'https://raw.githubusercontent.com/angelbeatsow/abow/main/_6ra.wav',
	'https://raw.githubusercontent.com/angelbeatsow/abow/main/_7si.wav',
	'https://raw.githubusercontent.com/angelbeatsow/abow/main/_8do.wav'
];
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
let gachaChikeCount = 0;

//koitsura ha gacha no hensuu
let animeFlag = 0;
let gachaStartFlag = 0;
let getCardId = ['R',0];
const one = 0b0001;
let syojiCardR = [0b00000,0b00000,0b00000,0b00000];
let syojiCardSR = [0b00000,0b00000,0b00000,0b00000];
let syojiCardSSR = [0b00000,0b00000,0b00000,0b00000];
let syojiCard = [syojiCardR,syojiCardSR,syojiCardSSR];
let checkCode = [0b00000,0b00000,0b00000];
const cardNameR = ['【R】ゆり','【R】かなで','【R】音無','【R】ユイ','【R】日向','【R】直井','【R】岩沢','【R】ひさ子','【R】関根','【R】入江','【R】椎名','【R】遊佐','【R】大山','【R】野田','【R】藤巻','【R】高松','【R】松下','【R】TK','【R】竹山'];
const cardNameSR = ['【SR】ゆり','【SR】かなで','【SR】音無','【SR】ユイ','【SR】日向','【SR】直井','【SR】岩沢','【SR】ひさ子','【SR】関根','【SR】入江','【SR】椎名','【SR】遊佐','【SR】大山','【SR】野田','【SR】藤巻','【SR】高松','【SR】松下','【SR】TK','【SR】竹山'];
const cardNameSSR = ['【SSR】ゆり','【SSR】かなで','【SSR】音無','【SSR】ユイ','【SSR】日向','【SSR】直井','【SSR】岩沢','【SSR】ひさ子','【SSR】関根','【SSR】入江','【SSR】椎名','【SSR】遊佐','【SSR】大山','【SSR】野田','【SSR】藤巻','【SSR】高松','【SSR】松下','【SSR】TK','【SSR】竹山'];
const cardName = [cardNameR,cardNameSR,cardNameSSR];
const jumonMoji = ['あ','い','う','え','お',
                   'か','き','く','け','こ',
                   'さ','し','す','せ','そ',
                   'た','ち','つ','て','と',
                   'な','に','ぬ','ね','の',
                   'は','ひ','ふ','へ','ほ',
                   'ま','み','む','め','も',
                   'や','ゆ','よ',
                   'ら','り','る','れ','ろ',
                   'わ',
                   'が','ぎ','ぐ','げ','ご',
                   'ざ','じ','ず','ぜ','ぞ',
                   'だ','ぢ','づ','で','ど',
                   'ば','び','ぶ','べ','ぼ'];
let animeCardWidth = 160;
let animeCardTop = 160;
const cardHiritsu = 420 / 529; // width/height
let isNewCard = false;
var gachaRAF;  //gachaRAF = requestAnimationFrame(gachaAnimation)
let isTensityan = true; //hukkatsu no jumon yomikomi syokai gentei no urawaza




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
		      fadeLayerFlash();
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
		      fadeLayerFlash();
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
		      fadeLayerFlash();
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
              $(IDS[row]).value = $(IDS[row - 6]).value;
              $(IDS[row]).style.backgroundColor = $(IDS[row - 6]).style.backgroundColor;
		    if($(IDS[row]).value == heal){
                   $(IDS[row]).classList.add('marukusuru');
                }else{
                   $(IDS[row]).classList.remove('marukusuru');
                }
              $(IDS[row - 6]).value = 'x';
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
        if(totalDissaper >= 100 * (gachaChikeCount + 1)){
          gachaChikeCount++;
          gachaChike = gachaChike + 3;
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
               console.log('se effect!');
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
  var libraryimg = document.getElementsByClassName('libraryImg');
  for(let yanyo = 0; yanyo < libraryimg.length;yanyo++){
    libraryimg[yanyo].onclick = popUpOpen;
  }
  $('reset').onclick = resetAction;
  $('bgmSelectButton').onclick = bgmChange;
  $('tweetButton').onclick = tweet;
  $('tensyonButton').onclick = tensyonOn;
  $('close-btn').onclick = popUpClose;
  $('bg-black').onclick = popUpClose;
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
};

//操作時間+3秒ボタン
$('sanbyouOn').onclick = function() {
   if(timeCount == true){
     alert('操作中は変更できません。');
     return;
   }
  
  if($('tensyonButton').innerHTML == 9999){
    alert('ハイテンション中は変更できません。');
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
}  ;

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
};

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
  let select = $('bgmSelect').value;
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
  console.log('high tension?');
  if($('tensyonButton').innerHTML == 100 && gaugewidth == 500){
    console.log('high-tension!!');
    tensyonKaisuu++;
    fadeLayerFlash();
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
               console.log('se effect!');
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
function gachaStart(){
  if(gachaStartFlag == 1){
    return;
  }
  if(gachaChike <= 0){
    alert('チケットがありません。');
    return;
  }
  gachaStartFlag = 1;
  isTensityan = false;
  gachaChike--;
  $('gachaChikeMaisuu').innerHTML = gachaChike;
  //nyuusyu card no kettei
  var random = Math.floor( Math.random() * 100) + 1; //1~100 no ransuu
  if(random <= 85){ //R card
    getCardId[0] = 'R';
    getCardId[1] = Math.floor( Math.random() * cardNameR.length);
    console.log((syojiCardR[ Math.floor( getCardId[1] / 5)] & (one << (getCardId[1] % 5))) + '<<0:this is new.,1:this is not new.');
    if((syojiCardR[ Math.floor( getCardId[1] / 5)] & (one << (getCardId[1] % 5)))?1:0){
      isNewCard = false;
    }else{ isNewCard = true;
    }
    syojiCardR[ Math.floor( getCardId[1] / 5)] = syojiCardR[ Math.floor( getCardId[1] / 5)] | (one << (getCardId[1] % 5));
  }else if(random <= 97){//SR card
    $('uramen').src = 'uramen_sample2.png';
    getCardId[0] = 'SR';
    getCardId[1] = Math.floor( Math.random() * cardNameSR.length);
    if((syojiCardSR[ Math.floor( getCardId[1] / 5)] & (one << (getCardId[1] % 5)))?1:0){
      isNewCard = false;
    }else{ isNewCard = true;
    }
    syojiCardSR[ Math.floor( getCardId[1] / 5)] = syojiCardSR[ Math.floor( getCardId[1] / 5)] | (one << (getCardId[1] % 5));
  }else{//SSR card
    $('uramen').src = 'uramen_sample2.png';
    getCardId[0] = 'SSR';
    getCardId[1] = Math.floor( Math.random() * cardNameSSR.length);
    if((syojiCardSSR[ Math.floor( getCardId[1] / 5)] & (one << (getCardId[1] % 5)))?1:0){
      isNewCard = false;
    }else{ isNewCard = true;
    }
    syojiCardSSR[ Math.floor( getCardId[1] / 5)] = syojiCardSSR[ Math.floor( getCardId[1] / 5)] | (one << (getCardId[1] % 5));
  }
  console.log('you get ' + getCardId[1] + 'th ' +  getCardId[0] + 'card!');
  
  //library ni hanei
  kobetsuHanei();
  
  //fade out
  document.getElementsByClassName('gachaTop')[0].classList.remove('showAnime');
  document.getElementsByClassName('gachaTop')[0].classList.add('hideAnime');
  setTimeout(function(){
    //fade in
    $('uramen').classList.add('showAnime');
    $('uramen').classList.remove('hideAnime');
    setTimeout(function(){
      //animation
      animeFlag = 1;
      gachaAnimation();
    },1000);
  },1000);
}


const gachaAnimation = () => {
  if(animeFlag == 1){
    //uramen wo jump saseru
    if($('uramen').width >= 160 * 1.5){
      $('uramen').width = 160 * 1.5;
      $('uramen').style.top = '270px';
      animeFlag = 2;
    }else{
      animeCardWidth = animeCardWidth + 4;
      if($('uramen').width <= 160 * 1.1){
        animeCardTop = animeCardTop - 2;
      }else{
        animeCardTop = animeCardTop + 4;
      }
      $('uramen').width = animeCardWidth ;
      $('uramen').height = Math.round(animeCardWidth / cardHiritsu);
      $('uramen').style.top = animeCardTop + 'px';
    }
    
  }else if(animeFlag == 2){
    if($('uramen').width <= 1){
      //card hyouji no syori
        $('uramen').src = 'card_' + getCardId[0] + getCardId[1] + '.png';
        $('uramen').onerror = function(){
          $('uramen').src = getCardId[0] + '_sample.png';
        };
      //kokomade
      animeFlag = 3;
    }else{
      animeCardWidth = animeCardWidth - 10;
      $('uramen').height = $('uramen').height ;
      $('uramen').width = animeCardWidth ;
    }    
    
  }else if(animeFlag == 3){
    if($('uramen').width >= 160 * 1.5){
      $('uramen').width = 160 * 1.5;
      animeFlag = 100;
    }else{
      animeCardWidth = animeCardWidth + 10;
    $('uramen').width = animeCardWidth ;
    }
    
  }else if(animeFlag == 100){
    $('tapMessage').classList.add('showAnime');
    $('tapMessage').classList.remove('hideAnime');
    if(isNewCard == true){
      $('newMessage').classList.add('showAnime');
      $('newMessage').classList.remove('hideAnime');
    }
    return;
  }
  gachaRAF = requestAnimationFrame(gachaAnimation);
};


//gachaGamen no onclickAction
function gachaGamen(){
  if(animeFlag == 0 || animeFlag == 101){
    return;
    
  }else if(animeFlag != 100){
    cancelAnimationFrame(gachaRAF);
    //card hyouji no syori
    $('uramen').src = 'card_' + getCardId[0] + getCardId[1] + '.png';
    $('uramen').onerror = function(){
      $('uramen').src = getCardId[0] + '_sample.png';
    };
    //kokomade
    $('uramen').width = 160 * 1.5;
    $('uramen').height = Math.round(160 * 1.5 / cardHiritsu);
    $('uramen').style.top = '270px';
    $('tapMessage').classList.add('showAnime');
    $('tapMessage').classList.remove('hideAnime');
    if(isNewCard == true){
      $('newMessage').classList.add('showAnime');
      $('newMessage').classList.remove('hideAnime');
    }
    animeFlag = 101;
    setTimeout(function(){
      animeFlag = 100;
    },1000);
    
  }else if(animeFlag == 100){
    animeFlag = 101;
    $('uramen').classList.remove('showAnime');
    $('uramen').classList.add('hideAnime');
    $('tapMessage').classList.remove('showAnime');
    $('tapMessage').classList.add('hideAnime');
    $('newMessage').classList.remove('showAnime');
    $('newMessage').classList.add('hideAnime');
    setTimeout(function(){
      $('uramen').width = 160;
      $('uramen').height = Math.round(160 / cardHiritsu);
      $('uramen').style.top = '250px';
      $('uramen').src = 'uramen_sample.png';
      animeCardWidth = 160;
      animeCardTop = 160;
      gachaStartFlag = 0;
      animeFlag = 0;
      document.getElementsByClassName('gachaTop')[0].classList.add('showAnime');
      document.getElementsByClassName('gachaTop')[0].classList.remove('hideAnime');
    },1010);
  }
}


//hukkatsu no jumon seisei
function u63(number){
  if(number > 63){
    return number - 64;
  }else if(number < 0){
    return number + 64;
  }else{
    return number;
  }
}

function hukkatsuSeisei(){
  let check1 = Math.floor( Math.random() * 8);
  //sakini 0 wo ireru
  syojiCardR[3] = (syojiCardR[3] | 0b10000) ^ 0b10000;
  syojiCardSR[3] = (syojiCardSR[3] | 0b10000) ^ 0b10000;
  syojiCardSSR[3] = (syojiCardSSR[3] | 0b10000) ^ 0b10000;
  //check1 wo ireru
  syojiCardR[3] = syojiCardR[3] | ((check1 << 2) & 0b10000);
  syojiCardSR[3] = syojiCardSR[3] | ((check1 << 3) & 0b010000);
  syojiCardSSR[3] = syojiCardSSR[3] | ((check1 << 4) & 0b0010000);
  let check2 = Math.floor( Math.random() * 32);
  checkCode[0] = check2;
  let check3 = 8 * (Math.floor( Math.random() * 2) + 4) + check1 - check2; //(check2+check3)%8=check1
  if(check3 > 32){check3 = check3 - 8 * (Math.floor( Math.random() * 3) + 2);}
  checkCode[1] = check3;
  let check4 = (check1 * check2 * check3)% 32;
  checkCode[2] = check4;
  
  let jumonMojiN = [];
  jumonMojiN[0] = Math.floor( Math.random() * 64);
  jumonMojiN[1] = u63(jumonMojiN[0] + syojiCardR[0] + 11);
  jumonMojiN[2] = u63(jumonMojiN[1] + syojiCardR[1] + 11);
  jumonMojiN[3] = u63(jumonMojiN[2] + syojiCardR[2] + 11);
  jumonMojiN[4] = u63(jumonMojiN[3] + syojiCardR[3]);
  jumonMojiN[5] = u63(jumonMojiN[4] + checkCode[0]);
  jumonMojiN[6] = u63(jumonMojiN[5] + syojiCardSR[0] + 11);
  jumonMojiN[7] = u63(jumonMojiN[6] + syojiCardSR[1] + 11);
  jumonMojiN[8] = u63(jumonMojiN[7] + syojiCardSR[2] + 11);
  jumonMojiN[9] = u63(jumonMojiN[8] + syojiCardSR[3]);
  jumonMojiN[10] = u63(jumonMojiN[9] + checkCode[1]);
  jumonMojiN[11] = u63(jumonMojiN[10] + syojiCardSSR[0] + 11);
  jumonMojiN[12] = u63(jumonMojiN[11] + syojiCardSSR[1] + 11);
  jumonMojiN[13] = u63(jumonMojiN[12] + syojiCardSSR[2] + 11);
  jumonMojiN[14] = u63(jumonMojiN[13] + syojiCardSSR[3]);
  jumonMojiN[15] = u63(jumonMojiN[14] + checkCode[2]);
  let jumon = jumonMoji[jumonMojiN[0]] + jumonMoji[jumonMojiN[1]] + jumonMoji[jumonMojiN[2]] + 
              jumonMoji[jumonMojiN[3]] + jumonMoji[jumonMojiN[4]] + jumonMoji[jumonMojiN[5]] + 
              jumonMoji[jumonMojiN[6]] + jumonMoji[jumonMojiN[7]] + jumonMoji[jumonMojiN[8]] + 
              jumonMoji[jumonMojiN[9]] + jumonMoji[jumonMojiN[10]] + jumonMoji[jumonMojiN[11]] + 
              jumonMoji[jumonMojiN[12]] + jumonMoji[jumonMojiN[13]] + jumonMoji[jumonMojiN[14]] + 
              jumonMoji[jumonMojiN[15]];
  console.log(syojiCard);
  console.log('check1:' + check1 + ',check2:' + check2 + ',check3:' + check3 +',check4:' + check4);

  $('jumon').innerHTML = jumon;
}

//hukkatsu no jumon yomikomi (onclick action)
function jumonYomikomi(){
  let nyuuryoku = $('jumonNyuuryoku').value;
  //moji wo suuji ni henkan
  let jumonMojiN = [];
  if(nyuuryoku =='てんしちゃんまじてんし' && isTensityan == true){ //saisyo dake no urawaza^~^
    gachaChike = gachaChike + 100;
    $('gachaChikeMaisuu').innerHTML = gachaChike;
    isTensityan = false;
    $('jumonNyuuryoku').value = '';
    alert('(*≧∀≦*)');
    return;
  }
  for(let w = 0;w < 16;w++){
    jumonMojiN[w] = jumonMoji.indexOf(nyuuryoku.charAt(w));
    if(jumonMojiN[w] == -1){
      alert('じゅもんが間違っています。');
      return;
    }
  }
  //check code wo siraberu
  let check1 = 0b00000;
  check1 = check1 | ((u63(jumonMojiN[4] - jumonMojiN[3]) & 0b10000) >>> 2);
  check1 = check1 | ((u63(jumonMojiN[9] - jumonMojiN[8]) & 0b10000) >>> 3);
  check1 = check1 | ((u63(jumonMojiN[14] - jumonMojiN[13]) & 0b10000) >>> 4);
  let check2 = u63(jumonMojiN[5] - jumonMojiN[4]);
  let check3 = u63(jumonMojiN[10] - jumonMojiN[9]);
  let check4 = u63(jumonMojiN[15] - jumonMojiN[14]);
  
  //yomikomu
  syojiCardR[0] = u63(jumonMojiN[1] - jumonMojiN[0] - 11);
  syojiCardR[1] = u63(jumonMojiN[2] - jumonMojiN[1] - 11);
  syojiCardR[2] = u63(jumonMojiN[3] - jumonMojiN[2] - 11);
  syojiCardR[3] = u63(jumonMojiN[4] - jumonMojiN[3]);
  syojiCardSR[0] = u63(jumonMojiN[6] - jumonMojiN[5] - 11);
  syojiCardSR[1] = u63(jumonMojiN[7] - jumonMojiN[6] - 11);
  syojiCardSR[2] = u63(jumonMojiN[8] - jumonMojiN[7] - 11);
  syojiCardSR[3] = u63(jumonMojiN[9] - jumonMojiN[8]);
  syojiCardSSR[0] = u63(jumonMojiN[11] - jumonMojiN[10] - 11);
  syojiCardSSR[1] = u63(jumonMojiN[12] - jumonMojiN[11] - 11);
  syojiCardSSR[2] = u63(jumonMojiN[13] - jumonMojiN[12] - 11);
  syojiCardSSR[3] = u63(jumonMojiN[14] - jumonMojiN[13]);
  console.log(syojiCard);
  console.log('check1:' + check1 + ',check2:' + check2 + ',check3:' + check3 +',check4:' + check4);
   if((check2+check3) % 8 != check1 ){
     alert('じゅもんが間違っています。a');
     return;
   }
  if(check4 != (check1 * check2 * check3)% 32){
    alert('じゅもんが間違っています。b');
      return;
   }

  alert('読み込みました!');
  isTensityan = false;
  $('jumonNyuuryoku').value = '';
  
  //library ni hanei
  for(let a = 0; a < 3;a++){  //R,SR,SSR
    for(let ap = 0;ap < syojiCard[a].length;ap++){ //juon1moji=5Card, mojisuu bun no syori
      for(let app = 0;app < 5;app++){  //jumon1moji no naka no 5Card
        if(ap == 3 && app == 4){//koko ha checkCode
          break;
        }
        if((syojiCard[a][ap] & (0b00001 << app))?1:0){
          let rearity = 'R';
          let divid = app + ap * 5 + 1;
          if(a == 1){
            rearity = 'SR'
            divid = divid + cardName[0].length;
          }else if(a == 2){
            rearity = 'SSR'
            divid = divid + cardName[0].length + cardName[1].length;
          }
          if(divid < 10){
            divid = '0' + divid;
          }
          $('c0' + divid + 'img').classList.add('syoji');
          $('c0' + divid + 'img').src = 'cardicon_' + rearity + (app + ap * 5) + '.png';
          $('c0' + divid + 'img').onerror = function(){
            $('c0' + divid + 'img').src = 'cardicon_sample.png';
          };
          $('c0' + divid + 'text').innerHTML = cardName[a][app + ap * 5];
        }
      }
    }
  }
}


//kobetsu library hanei
function kobetsuHanei(){
  let rearity ;
  let divid = getCardId[1] + 1;
  if(getCardId[0] == 'SSR'){
    rearity = 2;
    divid = divid + cardNameR.length + cardNameSR.length ;
  }else if(getCardId[0] == 'SR'){
    rearity = 1;
    divid = divid + cardNameR.length ;
  }else if(getCardId[0] == 'R'){
    rearity = 0;
  }
  //librarydiv ni class wo tsuika (click event no tame)
  //img no harikae
  //text no irekae
  if(divid < 10){
    $('c00' + divid + 'img').classList.add('syoji');
    $('c00' + divid + 'img').src = 'cardicon_' + getCardId[0] + getCardId[1] + '.png';
    $('c00' + divid + 'img').onerror = function(){
      $('c00' + divid + 'img').src = 'cardicon_sample.png';
    };
    $('c00' + divid + 'text').innerHTML = cardName[rearity][getCardId[1]] + '  *new*';
  }else if(divid < 100){
    $('c0' + divid + 'img').classList.add('syoji');
    $('c0' + divid + 'img').src = 'cardicon_' + getCardId[0] + getCardId[1] + '.png';
    $('c0' + divid + 'img').onerror = function(){
      $('c0' + divid + 'img').src = 'cardicon_sample.png';
    };
    $('c0' + divid + 'text').innerHTML = cardName[rearity][getCardId[1]] + '  *new*';
  }else if(divid < 1000){
    $('c' + divid + 'img').classList.add('syoji');
    $('c' + divid + 'img').src = 'cardicon_' + getCardId[0] + getCardId[1] + '.png';
    $('c' + divid + 'img').onerror = function(){
      $('c' + divid + 'img').src = 'cardicon_sample.png';
    };
    $('c' + divid + 'text').innerHTML = cardName[rearity][getCardId[1]] + '  *new*';
  }
  $('tapMessage').innerHTML = cardName[rearity][getCardId[1]];  //-TAP- no moji wo cardName ni sitemiru
}

//poppu up no oncjick action
function popUpClose(){
  $('popup').classList.remove('is-show');
}

//library wo oshits toki no action
function popUpOpen(e){
  //card wo mottenai nara return
  if(e.target.classList.contains('syoji') == false){
    return;
  }
  //card gazou no syutoku
  const eId = e.target.id;
  let eNu = parseInt(eId.replace(/[^0-9]/g, ""));
  let rearity = 'R';
  console.log(eNu);
  if(eNu > cardNameR.length + cardNameSR.length){
    eNu = eNu - cardNameR.length - cardNameSR.length - 1;
    rearity = 'SSR';
  }else if(eNu > cardNameR.length){
    eNu = eNu - cardNameR.length - 1;
    rearity = 'SR';
  }else{
    eNu = eNu - 1;
    rearity = 'R';
  }
  $('popupimg').src = 'card_' + rearity + eNu + '.png';
  $('popupimg').onerror = function(){
    $('popupimg').src = rearity + '_sample.png';
  };
  //popup no hyouji
  $('popup').classList.add('is-show');
}
