// JavaScript Document
// ローダーJquery
	$(window).on('load',function(){  // ローディング画面をフェードアウトさせる
	    $(function() { 
	        $("#loading").fadeOut();
	    });
	});

	$(window).on('load',function() {  //全ての読み込みが完了したら実行する
	    $('#loader-bg').delay(900).fadeOut(800);
	    $('#loading').delay(600).fadeOut(300);
	    $('#main-contents').css('display', 'block');
	    svgAnimation();
	});

//5秒で強制的にロード画面を非表示
	$(function(){
		setTimeout('stopload()',5000);
	});

	function stopload(){
		$('#main-contents').css('display', 'block');
		$('#loader-bg').delay(900).fadeOut(800);
	    $('#loading').delay(600).fadeOut(300);
	}

// SVGアニメーション

	function svgAnimation(){
		new Vivus('svg-mask', {
		type: 'scenario-sync',
		duration: 13, 
		forceRender: false ,
		animTimingFunction:Vivus.EASE_IN
		});
	}

	$(function(){
//クリックしたらゆっくり移動するJquery
//aに#が付いているものに対して、クリックしたらgoTargetを代入する。
	var headerH = 0;

	$("a[href^='#']:not(a[href^='#modal'])").on('click',goTarget);

	  function goTarget(){
	    var targetId = $(this).attr("href");
		//targerIDの一番上から距離をとってくる。
		var targetPos = $(targetId).offset().top;
		targetPos = targetPos - headerH;//固定ナビの高さを引いて止める位置を調整する
		
	    $("html,body").animate({"scrollTop":targetPos},800);
	    return false;
	  }
  
 	var idPos = [];//ナビのhref属性の中身を取得して格納する配列
  	
	idPosGet();
	$(window).on("load",btnApp);
  	$(window).on("scroll",idPosGet);

	function idPosGet(){
		idPos = [];
		for(i = 0;i < 5;i++){
			var n = i+1;
			var idName = $(".menuList__menuItem:nth-child("+n+") a").attr("href");
			idPos.push($(idName).offset().top);
		}			
	}
 //現在地のナビにアンダーラインを入れる
//はじめはHOMEにカレント表示
	$(window).on("load",firstClass);
		function firstClass(){
			$(".menuList__menuItem").removeClass("selected");
			$(".menuList__menuItemFirst").addClass("selected");
		}
//スクロールごとにカレント表示変える
		$(window).scroll(btnApp);
		function btnApp(){
			//bodyのスクロール量を取得する
			var winscrl = $(this).scrollTop();
			var scrollHeader = $("#about").offset().top;
	
			for(i = 0;i < 5;i++){
				if(winscrl >= (idPos[i]-100)){
					var n = i+1;
					$(".menuList__menuItem").removeClass("selected");
					$(".menuList__menuItem:nth-child("+n+")").addClass("selected");
				}
			}

//#aboutまでスクロールすると、ヘッダーが半透明になる。
		if(winscrl > scrollHeader){
			$(".pageheader").addClass("pageheader_color");
		}else{
			$(".pageheader").removeClass("pageheader_color");
		}
	}

//スクロールするごとに背景色が変わる。
	var bgH = 300;
	
	$(window).on("scroll", bgChangeColor);
	
	function bgChangeColor(){
	var bgChangeAbout = $('#about').offset().top;
	var bgChangeSkill = $('#skill').offset().top;
	var bgChangeWork = $('#work').offset().top;	
	var bgChangeContact = $('#contact').offset().top;		
	
	if($(document).scrollTop() < bgChangeAbout){
		$('.body-wrapper').css('background', "#f0f5f9");
	} 
	else if ($(document).scrollTop() < bgChangeSkill - bgH) { //about
		$('.body-wrapper').css('background', $("#about").attr("data-color"));
	  } else if ($(document).scrollTop() < bgChangeWork - bgH) { //skill
		$('.body-wrapper').css('background', $("#skill").attr("data-color"));
	  } else if ($(document).scrollTop() < bgChangeContact - bgH) { //work
		$('.body-wrapper').css('background', $("#work").attr("data-color"));
	  }	else if (bgChangeContact - bgH < $(document).scrollTop() ) { //contact
		$('.body-wrapper').css('background', $("#contact").attr("data-color"));
	  }	
	}

// slider
	$(function(){
			var slick = $('.slider').slick({
			autoplay: true,//自動再生
			autoplaySpeed: 800,//自動再生スピード
			slidesToShow: 3,//スライド数
			centerMode: true,//.currentが真ん中に来るようにする。
			centerPadding: '150px',
			speed: 1500,//スライドスピード
			arrows: false,//デフォルトの矢印をなくす
			rtl: true,//侵攻方向を逆にする
			draggable: false,//ドラッグを不可にする。
			easing: 'easeInQuad',//jqueryイージング
			lazyLoad: 'progressive',//
			pauseOnFocus: false,//マウスフォーカス時、自動再生停止させない
			pauseOnHover: false,//マウスホバー時、自動再生停止させない
			
			 responsive: [
			{
			  breakpoint: 1200,     // 767〜1200px
			  settings: {
				slidesToShow: 3,
				centerPadding: '0'
			  }
			},
		
			{
			breakpoint: 768, //767px以下のサイズに適用
			settings: {
			  slidesToShow:1,
			  centerPadding: '0px'
			}
		   }
		 ]//responsive
	});

		$('.slick-next').on('click', function () {
			slick.slick("slickNext");
		});
	
		$('.slick-prev').on('click', function () {
			slick.slick("slickPrev");
		});


// 文字を変える
	//ロードした瞬間に効くやつ
	$(".slider-caption span").text(MyCaption);
	//スライドが動いた瞬間に効くやつ
	slick.on('afterChange', function(slick, currentSlide, nextSlide){
	  $(".slider-caption span").text(MyCaption);
	});

	function MyCaption(){
			// slick-currentを持ったタグがguitarをもってる場合
			if($(".slick-current").hasClass("guitar")){
				// スパンにGUITAR入れる
				return "GUITAR";
			}else if($(".slick-current").hasClass("ocarina")){
				return "OCARINA";
			}else if($(".slick-current").hasClass("civilization")){
				return "ANCIENT";
			}else if($(".slick-current").hasClass("bike")){
				return "BIKE";
			}else if($(".slick-current").hasClass("hat")){
				return "HAT";
			}else if($(".slick-current").hasClass("art")){
				return "ART";
			}else if($(".slick-current").hasClass("trip")){
				return "TRAVEL";
			}else if($(".slick-current").hasClass("anime")){
				return "ANIME";
			}
		}
	});

//moddal
$(function(){
	$('.modal-thumbnail').modaal({ 
		animation_speed: '500', 	// アニメーションのスピードをミリ秒単位で指定
		overlay_opacity: '0.8',	// 背景のオーバーレイの透明度を変更
		background_scroll: 'false',	// 背景をスクロールさせるか否か
		loading_content: 'Now Loading, Please Wait.'	// 読み込み時のテキスト表示
	});
});


//inview
$(function() {
  $('.inview-box').on('inview', function(event, isInView) {
    if (isInView) {
    //表示領域に入った時
      $(this).addClass('fadeIn');
    } else {
    //表示領域から出た時
      $(this).removeClass('fadeIn');
      $(this).css('opacity',0); //非表示にしておく
    }
  });
});


var number = 10;

var x = 10; //number=10 x=10
var y = 11; //number=10 x=10 y=11
number = 20; //number=20 x=10 y=11 
var w = x;// number=20 x=10 y=11 w=10

function x() { //number=10
	return number;
}
var y = 1 + x(); //number=10 y=11
number = 20; //number=20 y=11
var w = x(); //number=20 y=11 w=20



	








 

});



