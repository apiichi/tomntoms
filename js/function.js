// 모바일용
$(function(){
  	//메인메뉴 나타나고 우측으로 이동.
	$('.nav-btn').on('click', function() {
		$('nav').stop().show().animate({
			left:0
		})
		$('.nav-bg').fadeIn(400);
	});

	//메인메뉴 좌측이동하며 사라짐 - X버튼
	$('.nav-clse').on('click', function(evt) {
		$('nav').stop().animate({
			left:-270
		},function(){
			$('nav').hide()
		})
		$('.nav-bg').fadeOut(400);
		evt.preventDefault();
	});

	//메인메뉴 좌측이동하며 사라짐 - 배경
	$('.nav-bg').on('click', function() {
		$('nav').stop().animate({
			left:-270
		},function(){
			$('nav').hide()
		})
		$('.nav-bg').fadeOut(400);
	});
})

//PC & Moblie 공통(fade, 스크롤)
$(function(){
	// -----------변수선언----------
	//section
	const $main_visual = $('.main_visual-container > li');
	const $main_indi = $('.main_visual-indicator>li>a');
	const $main_btn = $('.main_visual-btn');
	//footer
	const $goTop = $('.goTop');
	const $evnet = $('.event-container');
	//기타
	let nowIdx = 0;
	let intevalId = null;
	const topVal = [];

  //-----------함수 선언----------
  //페이드 효과 함수
	const mainFadeFn = function() {
		// 인디케이터 활성화
		$main_indi.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');
		// 슬라이드 페이드효과
		$main_visual.filter('.on').stop().fadeOut(500).removeClass('on');
		$main_visual.eq(nowIdx).stop().fadeIn(500).addClass('on');
		if($('.bk').hasClass('on')){
			$('.main_visual > .main_visual-navi').addClass('bg')
		}else{
			$('.main_visual > .main_visual-navi').removeClass('bg')
		}
		// 페이지 변경
		$('.main_visual-page>span').text(nowIdx + 1);
  };
  
  	//정지 함수
	const pause = function() {
		clearInterval(intevalId);
  };
  
  //main - 슬라이드 자동재생
	const mainAutoPlay = function() {
		intevalId = setInterval(function() {
			if (nowIdx < 3) {
				nowIdx++;
			} else {
				nowIdx = 0;
			}
			mainFadeFn();
		}, 3000);
  };
  
  // ------------초기화-----------
  mainAutoPlay();
  
  //event - 새로고침하면 위에서 내려옴.
  $evnet.stop().animate(
    {
      top: 184
    },
    500
	);

	// ----------이벤트 등록---------
	//event - X버튼으로 닫기.
	$evnet.children('.event-clse').on('click', function(evt) {
		$evnet.hide();
		evt.preventDefault();
	});

	//스크롤 이벤트
	$(window).on('scroll', function() {
		scrollTop = $(this).scrollTop();

		//header - 스크롤 내리면 줄어듦.
		if (scrollTop > 134) {
			$('.header-container').addClass('down');
		} else {
			$('.header-container').removeClass('down');
		}

		//goTop  - 일정 스크롤되면 나타남.
		if (scrollTop > 200) {
			$goTop.fadeIn(400);
		} else {
			$goTop.fadeOut(400);
		}

		//event  - 스크롤에 따라 따라 움직임.
		if (scrollTop > 0) {
			$evnet.animate(
				{
					top: 184 + scrollTop
				},
				50
			);

			//sect02 - 나타남>상승
			if (scrollTop > 100) {
				$('.menu').fadeIn(800);
				$('.menu').find('.tit').animate({ top: -50 }, 700);
				$('.menu').find('.slides-pagination').animate({ top: -30 }, 850);
				$('.menu').find('.slides-wrap').animate({ top: -50 }, 850);
			}

		
			//sect03
			if (scrollTop > 970) {
				$('.brand').fadeIn(800);
				$('.brand').find('h2').animate({ marginTop: -50 }, 400);
				$('.brand').find('.frame').animate({ marginTop: -50 }, 550);
				$('.brand').find('p').animate({ marginTop: -50 }, 700);
				$('.brand').find('.brand-btn>.member').animate({ marginTop: -50 }, 850);
				$('.brand').find('.brand-btn>div>a:nth-child(1)').animate({ marginTop: -50 }, 1050);
				$('.brand').find('.brand-btn>div>a:nth-child(2)').animate({ marginTop: -50 }, 1250);
			}

			if (scrollTop > 1600) {
				$('.md').fadeIn(800);
				$('.md').find('.tit').animate({ top: -50 }, 700);
				$('.md').find('.slides-pagination').animate({ top: -30 }, 850);
				$('.md').find('.slides-wrap').animate({ top: -50 }, 850);
			}

			//sect05
			if (scrollTop > 2400) {
				$('.sns').fadeIn(800);
				$('.sns').find('.tit').animate({ top: -50 }, 700);
				$('.sns').find('.sns-container').animate({ marginTop: -50 }, 850);
			}
		}



		//logo, goTop - 최상위로 이동
		$('#logo, .goTop').on('click', function(evt) {
			evt.preventDefault();
			$('html,body').stop().animate(
				{
					scrollTop: 0
				},
				400
			);
    });
  });
  
  //main슬라이드 인디케이터 활성화
	$main_indi.on('click', function(evt) {
		nowIdx = $main_indi.index(this);
		mainFadeFn();
		pause();
		$('.main_visual-btn').removeClass('pause').text('일시정지');
		evt.preventDefault();
	});

	//main슬라이드 자동재생<>멈춤 버튼
	$main_btn.on('click', function(evt) {
		if ($(this).hasClass('pause')) {
			pause();
			$(this).removeClass('pause').text('자동재생');
		} else {
			mainAutoPlay();
			$(this).addClass('pause').text('일시정지');
		}
		evt.preventDefault();
  });
})

//header
$(function(){
  const $gnb = $('.gnb>li');
	const $lnb = $('.lnb>li');
	let nowIdx = 0;

  $(window).on('load resize', function() {
		const currentW = $(window).width();

		//PC용
		if (currentW > 768) {
			$gnb.off('clcik')
			//메인메뉴(gnb) 활성화
			$gnb.on({
				mouseover: function() {
					nowIdx = $gnb.index(this);
					$gnb.eq(nowIdx).children('.lnb').stop().fadeIn(200);
					$(this).addClass('on');
				},
				mouseleave: function() {
					$gnb.eq(nowIdx).children('.lnb').stop().fadeOut(200);
					$(this).removeClass('on');
				}
			});

			// 메인 서브메뉴(lnb) 활성화
			$lnb.on({
				mouseenter: function() {
					$(this).addClass('on');
				},
				mouseleave: function() {
					$(this).removeClass('on');
				}
			});

			//Moblie용
		} else {
			$gnb.off('mouseover mouseleave')
			//메인메뉴(gnb) 활성화
			$gnb.on('click', function(evt) {
				nowIdx = $gnb.index(this);
				$(this).addClass('on').siblings().removeClass('on');
				$gnb.eq(nowIdx).children('.lnb').stop().slideDown(200).addClass('checked');
				$gnb.eq(nowIdx).siblings().children('.lnb').stop().slideUp();
				evt.preventDefault();
			});
		}
	});
})

//section - main_visual:notice
$(function() {
	const $notice = $('.main_visual-notice>div>ul');
	let nowIdx = 0;

	$(window).on('load resize', function() {
		const currentW = $(window).width();

		//PC용
		if (currentW > 768) {
			setInterval(function() {
				if (nowIdx < 4) {
					nowIdx++;
				} else {
					nowIdx = 0;
				}
				$notice.stop().animate({
					top: -60 * nowIdx
				});
			}, 4000);

			//Moblie용
		} else {
			setInterval(function() {
				if (nowIdx < 9) {
					nowIdx++;
				} else {
					nowIdx = 0;
				}
				$notice.stop().animate({
					top: -60 * nowIdx
				});
			}, 4000);
		}
	});
});

//section - menu - mobile만
$(function(){
	let nowIdx = 0;

	// ---------함수 선언---------
	// sect04 가로슬라이드 함수
	const menu_moveFn_m = function() {
		// 가로 슬라이딩
		$('.menu .slides-container').stop().animate({
			left: -nowIdx * 100 + '%'
		});
	};

	// ----------이벤트 등록---------
	//sect4 이전버튼
	$('.menu .prev').on('click', function(evt) {
		if (nowIdx > 0) {
			nowIdx--;
		} else {
			nowIdx = 2
		}

		menu_moveFn_m();
		evt.preventDefault();
	});

	//sect4 다음버튼
	$('.menu .next').on('click', function(evt) {
		if (nowIdx < 2) {
			nowIdx++;
		} else {
			nowIdx = 0;
		}
		menu_moveFn_m()
		evt.preventDefault();
	});

})

//section - md
$(function(){
	const $md_indi = $('.md .slides-pagination-indicator > li > a');
	const $md_btn = $('.md .slides-pagination-btn');
	let nowIdx = 0;
	let intervalId = null;

	// ---------함수 선언---------
	// sect04 인디케이터 활성화 함수
	const md_indiFn = function() {
		$md_indi.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');
	};

	//sect04 이전인덱스 함수
	const prevIdx = function() {
		if (nowIdx > 0) {
			nowIdx--;
		} else {
			nowIdx = 4;
		}
	};

	//sect04 다음인덱스 함수
	const nextIdx = function() {
		if (nowIdx < 4) {
			nowIdx++;
		} else {
			nowIdx = 0;
		}
	};

	//정지 함수
	const pause = function() {
		clearInterval(intervalId);
	};

	$(window).on('load resize', function() {
		const currentW = $(window).width();
		if (currentW > 768) {

		//sect04 자동재생 함수
		const md_AutoPlay = function() {
			intervalId = setInterval(function() {
				nextIdx();
				md_moveFn();
			}, 3000);
		};

		// sect04 가로슬라이드 함수
		const md_moveFn = function() {
			md_indiFn();
			// 가로 슬라이딩
			$('.md .slides-container').stop().animate({
				left: -nowIdx * 33.3333 + '%'
			});
			// 페이지 변경
			$('.md .slides-pagination-page>span').text(nowIdx + 1);
		};
		
		// -------------초기화-----------
		md_AutoPlay();

		// ----------이벤트 등록---------
		//sect4 슬라이드에 따른 인디케이터 활성화
		$md_indi.on('click', function(evt) {
			nowIdx = $md_indi.index(this);
			pause();
			md_moveFn();
			$md_btn.removeClass('pause').text('일시정지');
			evt.preventDefault();
		});

		//sect4 이전버튼
		$('.md .prev').on('click', function(evt) {
			prevIdx();
			pause();
			md_moveFn();
			evt.preventDefault();
		});

		//sect4 다음버튼
		$('.md .next').on('click', function(evt) {
			nextIdx();
			pause();
			md_moveFn();
			evt.preventDefault();
		});

		//sect4 자동재생<>멈춤 버튼 활성화
		$md_btn.on('click', function(evt) {
			if ($(this).hasClass('pause')) {
				pause();
				$(this).removeClass('pause').text('일시정지');
			} else {
				md_AutoPlay();
				$(this).addClass('pause').text('자동재생');
			}
			evt.preventDefault();
			});
		}else{
			// pause()
			clearInterval(intervalId);
	

			// ---------함수 선언---------
			// sect04 가로슬라이드 함수
			const md_moveFn_m = function() {
				md_indiFn();
				// 가로 슬라이딩
				$('.md .slides-container').stop().animate({
					left: -nowIdx * 100 + '%'
				});
			};

			// ----------이벤트 등록---------
			//sect4 이전버튼
			$('.md .prev').on('click', function(evt) {
				prevIdx();
				md_moveFn_m();
				evt.preventDefault();
			});

			//sect4 다음버튼
			$('.md .next').on('click', function(evt) {
				nextIdx();
				md_moveFn_m();
				evt.preventDefault();
			});
		}

		
	});
});
