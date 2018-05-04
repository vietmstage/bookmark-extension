/* jshint strict:false */
var $showKB = false;
var $isFocus;



socket.on('chat',function(){if($.cookie('chatShow')==='true'){refres();}});
socket.on('c',function(msg){
  $('#members_count').text(msg.u);
  $('#guest_count').text(msg.a);
});
$(document).ready(function() {
  var x = location.hostname;

  if (x === 'lophoctiengnhat.com' || x === 'www.lophoctiengnhat.com' || x === 'hoidapnhatban.com' || x=== 'www.hoidapnhatban.com') {
    setTimeout(function(){if($('#members_count').length>0&&$('#members_count').text()==''){$.get('ajax/online/rs.php')}},10000);
    $('#chon-bh').click(function(e) {
      $('#chonbai_che').show();
    });
    $('#chon-bai-close').click(function(e) {
      $('#chonbai_che').hide();
    });


    //if ($('.isTest').length > 0) $isTest = true;
    /*====================================
    |              Online                    |
    ======================================*/
    $('#homedeatails-links > a').not('.go').click(function(e) {
      hass = $($(this).attr('rel')).attr('href').replace('#','');
      //alert(hass);
      window.location.hash = hass+'go';

      $('#homedeatails-links > a').removeClass('active');
      $(this).addClass('active');
      var $this = $(this).attr('data');
      $('.home-details').stop().slideUp();
      $('.homedt').removeClass('active');
      $($(this).attr('rel')).addClass('active');
      $('body, html').animate({scrollTop: $(this).offset().top - 80});
      $($this).stop().slideDown(function(){

      });

      return false;
    });
    $('.dl-show').click(function(e) {$('#'+$(this).attr('rel')+'_che').show();});

    $('.dl-close').click(function(e) {$(this).parents('.dl-che').hide();});
    $('#qc-close').click(function(e) {$.get('ajax/ads.php');});
    setTimeout(function(){$('#qc_che').show();},10000);

    $('.homedeatails-links > a').not('.go').click(function(e) {
      window.location.hash = $(this).attr('rel');
      var parent = $(this).parents('.img-group-wrap');
      parent.find('a').removeClass('active');
      $(this).addClass('active');
      var $this = $(this).attr('rel');
      parent.find('.home-details').not($this).stop().slideUp();
      $('body, html').animate({scrollTop: $(this).offset().top - 80});
      $($this).slideDown();

      return false;
    });


    $('.tab2_title .left-menu-item').click(function(e) {
      var parent = $(this).parents('.tab2_wrapper');
      parent.find('.left-menu-item').removeClass('active');
      $(this).addClass('active');
      parent.find('.tab2').hide();
      $($(this).attr('rel')).show();
    });

    $('.homedt').click(function(e) {
      if($('#homedeatails-links').length > 0){
        $('.homedt').removeClass('active');
        $(this).addClass('active');
        $($(this).attr('href')).trigger('click');
        return false;
      }
    });

    $('.linkto').click(function(e) {
      $link = '#section_'+$(this).attr('href');
      $top = $($link).offset().top;
      $('body, html').animate({scrollTop: $($link).offset().top - 80});
      return false;
    });
    $('.scroll').click(function(e) {

      $link = '#'+$(this).attr('href');
      $top = $($link).offset().top;
      $('body, html').animate({scrollTop: $($link).offset().top - 80});
      //alert($link);
      return false;

    });
    $('#onlineNB').click(function(){
      $('#onlineNB').hide();
      $('#onlineLoading').show();
      $('.inputText').each(function(index, element) {
        var val = $(this).val();
        var width = $(this).width();
        var wrong = $(this).hasClass('wrong')?'':' right';
        $(this).parent().append('<span style="width:'+width+'px" class="inputAnswer'+wrong+'">'+val+'</span>');
        $(this).remove();

      });

      $('.onlineTextbox').each(function(index, element) {
        var val = $(this).val().replace(/\n/g, "<br />");
        $(this).parent().append('<div class="textAnswer">'+val+'</div>');
        $(this).remove();
        $('.flex-text-wrap pre').remove();

      });

      var $content 	= 	$('#newsInner').html();
      var $olu 		=	$('#olu').val();
      var $oli		=	$('#oli').val();
      var $testWrong	=	$('#testWrong').text();
      var $testReScore=	$('#testReScore').text();
      var $testRight	=	$('#testRight').text();
      var $testDone	=	$('#testDone').text();
      var $data = {
        content		: $content,
        olu			: $olu,
        oli			: $oli,
        testWrong	: $testWrong,
        testReScore : $testReScore,
        testRight	: $testRight,
        testDone	: $testDone
      };

      $.post('ajax/onlineNB.php',$data,function(){
        $('#onlineNB').show();
        $('#onlineLoading').hide();
        $('#onlineComplete').slideUp();
        $('#olCompInfo').slideDown();
      });
    });
    $('#onlineRedo').click(function(){document.location.reload();});


    /*====================================
    |              ASK                    |
    ======================================*/
    $('#sua-ch-bt').click(function(	) {
      var data = $('#content-edit').serialize();
      //console.log(data);
      $.post('/ajax/ask/sua-ch.php',data, function($return) {
        $('#content-bb').html($return);
        $('#arc-title').text($('#sua-ch-title').val());
        $('#content-bb').show();
        $('#content-edit').hide();

      });
    });

    $('.sua-tl-bt').click(function(event) {
      rel = $(this).attr('rel');
      data = $('#content-edit-'+rel).serialize();
      $.post('/ajax/ask/sua-tl.php',data, function($return) {
        $('#nd-in-'+rel).html($return);
        $('#nd-in-'+rel).show();
        $('#content-edit-'+rel).hide();


      });
    });
    $('#sua-ch').click(function(event) {
      $('#content-bb').hide(1,function(){
        $('#content-edit').show(1,function(){
          $('.autoheight').flexText();
        });
      });


    });

    $('.suatl').click(function(event) {
      rel = $(this).attr('rel');
      $('#allAns form').hide();
      $('.nd-comment > span').show();
      $('#nd-in-'+rel).hide(1,function(){
        $('#content-edit-'+rel).show(1,function(){
          $('.autoheight').flexText();
        });
      });


    });
    $('#askMain i').click(function(event) {
      if ($(this).hasClass('icon-folder-open'))$(this).removeClass('icon-folder-open').addClass('icon-folder');
      else if ($(this).hasClass('icon-folder-open-o'))$(this).removeClass('icon-folder-open-o').addClass('icon-folder-o');
      else if ($(this).hasClass('icon-folder')) $(this).removeClass('icon-folder').addClass('icon-folder-open');
      else if ($(this).hasClass('icon-folder-o')) $(this).removeClass('icon-folder-o').addClass('icon-folder-open-o');
      $(this).parent().find('ul:first').slideToggle(200);
    });
    $('.like-ask').click(function(event) {
      if (!$(this).hasClass('disabled')) {
        var $this = $(this);
        rel = $(this).attr('rel');
        $.get('ajax/ask/like-ask.php@rel='+rel, function(data) {
          if (data == '0') {
            alert('Báº¡n Ä‘Ã£ thÃ­ch cÃ¢u há»i nÃ y');
          }else{
            lk = $this.parent().find('.like-count');
            curLike = lk.text()!=''?parseInt(lk.text()):0;
            lk.text(curLike + 1);
          }
          $this.addClass('disabled');
        });
      } else{
        alert('Báº¡n Ä‘Ã£ thÃ­ch cÃ¢u há»i nÃ y');
      };
    });

    $('.like-ans').click(function(event) {
      if (!$(this).hasClass('disabled')) {
        var $this = $(this);
        rel = $(this).attr('rel');
        $.get('ajax/ask/like-ans.php@rel='+rel, function(data) {
          if (data == '0') {
            alert('Báº¡n Ä‘Ã£ thÃ­ch cÃ¢u tráº£ lá»i nÃ y');
          }else{
            lk = $this.parent().find('.like-count');
            curLike = lk.text()!=''?parseInt(lk.text()):0;
            lk.text(curLike + 1);
          }
          $this.addClass('disabled');
        });
      } else{
        alert('Báº¡n Ä‘Ã£ thÃ­ch cÃ¢u tráº£ lá»i nÃ y');
      };
    });

    $('#sessInfo').slideDown(300,function(){
      setTimeout(function () {
        $('#sessInfo').slideUp(300);
      },5000);
    });

    $('#askTypeText').click(function() {
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $('#askListType').slideUp(200);
      } else{
        $(this).addClass('active');
        $('#askListType').slideDown(200);
      };

    });

    $('#askListType a').click(function() {
      $('#askTypeText span').text($(this).find('.askcatTxt').text());
      $('#askListType').fadeOut('200');
      $('#askType').val($(this).attr('rel'));
      $('#askTypeText').removeClass('active');
    });

    //Auto complete

    $("#ask-text").autocomplete({
      minLength: 3,
      //source:'ajax/ask/getAsk.php@term=' + $('#ask-text').val(),
      source: function (request, response) {
        // request.term is the term searched for.
        // response is the callback function you must call to update the autocomplete's
        // suggestion list.
        $.ajax({
          url: "ajax/ask/getAsk.php@term=" + $('#ask-text').val(),
          dataType: "json",
          success: response,
          error: function () {
            response([]);
          }
        })
      },
      appendTo: '#menu-container'
    });

    $("#ask-text-online").autocomplete({
      minLength: 3,
      //source:'ajax/ask/getAsk.php@term=' + $('#ask-text').val(),
      source: function (request, response) {
        // request.term is the term searched for.
        // response is the callback function you must call to update the autocomplete's
        // suggestion list.
        $.ajax({
          url: "ajax/askOnline/getAsk.php@term=" + $('#ask-text-online').val(),
          dataType: "json",
          success: response,
          error: function () {
            response([]);
          }
        })
      },
      appendTo: '#menu-container'
    });






    //=================Begin [Side-bar]
    $('.tabList a').click(function(e) {
      var rel = $(this).attr('rel');
      $('.tabList a').removeClass('active');
      $(this).addClass('active');
      $('.recList').hide();
      $('#' + rel).show();
    });

    $('#fbShareBtOP').click(function(e) {
      $('#quizFB').show();

    });
    $('#quiz-close').click(function(e) {
      $('#quizFB').hide();
    });
    $('#quizErrSend').click(function(e) {
      $(this).hide();
      $('#quizErrLoad').show();
      $('#quizErrExit').addClass('disabled');
      var quizWrongTrs = $('#quizWrongTrs').hasClass('selected') ? 1 : 0;
      var quizWrongQus = $('#quizWrongQus').hasClass('selected') ? 1 : 0;
      var quizWrongAns = $('#quizWrongAns').hasClass('selected') ? 1 : 0;
      var quizErrID = $('#quizErrID').val();
      var quizErrCont = $('#quizErrCont').val();
      var data = 'quizWrongTrs=' + quizWrongTrs + '&quizWrongQus=' + quizWrongQus + '&quizWrongAns=' + quizWrongAns + '&quizErrID=' + quizErrID + '&quizErrCont=' + quizErrCont;
      if (quizWrongTrs + quizWrongQus + quizWrongAns > 0 || quizErrCont != '') {
        $.post('ajax/quizSendError.php', data, function($return) {
          $('#quizErrExit').removeClass('disabled');
          $('#quizErrLoad').hide();
          $('#quizErrSend').show();
          $('.quizBaoloi').removeClass('selected');
          $('#quizErrCont').val('');
          $('#errFinish').slideDown(function() {
            setTimeout(function() {
              $('#errFinish').slideUp()
            }, 5000);
          });
        });
      } else {
        alert('Vui lÃ²ng chá»n ná»™i dung bÃ¡o lá»—i.');
        $('#quizErrExit').removeClass('disabled');
        $('#quizErrLoad').hide();
        $('#quizErrSend').show();
      }

    });

    $('#quizErrExit').click(function(e) {
      if (!$(this).hasClass('disabled')) $('#errWrap').hide();
    });

    $('.quizBaoloi').click(function(e) {
      if ($(this).hasClass('selected')) $(this).removeClass('selected');
      else $(this).addClass('selected');
    });

    $('#fullscreen').click(function(e) {
      $('#left-menu, #header, #right-menu,#lession-wrapper,#main-content,#foot-wrapper,#head-sep').addClass('fullscreen');
    });

    $('#restore').click(function(e) {
      $('.fullscreen').removeClass('fullscreen');
    });


    $('#addfriend').click(function(e) {
      $f = $(this).attr('rel');
      $(this).hide();
      $('#addfriendspin').show();
      $.get('ajax/addFriend.php@f=' + $f, function(data) {
        if (data == '') {
          $('#friendwrap').html('<span class="green">ÄÃ£ gá»­i lá»i má»i káº¿t báº¡n</span>');
        }
      });
    });

    $('#acceptfriend').click(function(e) {
      $f = $(this).attr('rel');
      $(this).hide();
      $('#acceptfriendspin').show();
      $.get('ajax/acceptfriend.php@f=' + $f, function(data) {
        if (data == '') {
          $('#friendwrap').html('<strong class="green">ÄÃ£ káº¿t báº¡n</strong>');
        }
      });
    });

    if ($('#quizActs').length > 0) {
      getQuizAct();
      setInterval(function() {
        getQuizAct();
      }, 10000);
    }


    $('#home-div.testHome .frame0').each(function() {
      height = $(this).height() - 20;
      $(this).find('.frame-inside').css('min-height', height + 'px');
      //alert(height);

    });

    $('#lession-wrapper').click(function(e) {
      $('.examWrap.selected').removeClass('selected');
    });
    if ($('#quizWrapper').length > 0) {
      $(document).keydown(function(e) {
        if ($loading) return false;
        if ($(('.exameQuiz.done').length > 0 || $('.exameQuiz').length == 0) && ($('#getQuiz:visible').length > 0 || $('#beginTest:visible').length > 0)) {
          if (e.keyCode == 13) {
            getQuiz();
          }
        } else {
          if ($('.done').length == 0) {
            if (e.keyCode == 38) {
              e.preventDefault();
              if ($('.examWrap.selected').length > 0) {
                $this = $('.examWrap.selected');
                if ($this.prev('.examWrap').length > 0) $this.prev('.examWrap').addClass('selected');
                else $('.examWrap:last').addClass('selected');
                $this.removeClass('selected');
              } else {
                $('.examWrap:last').addClass('selected')
              }
              if ($('.examWrap.selected .selected').length == 0) {
                $('.examWrap.selected .exameQuizWrap > span:first-child').find('.exameQuiz').addClass('selected')
              }

            }
            if (e.keyCode == 40) {
              e.preventDefault();
              if ($('.examWrap.selected').length > 0) {
                $this = $('.examWrap.selected');
                if ($this.next('.examWrap').length > 0) $this.next('.examWrap').addClass('selected');
                else $('.examWrap:first').addClass('selected');
                $this.removeClass('selected');
              } else {
                $('.examWrap:first').addClass('selected')
              }
              if ($('.examWrap.selected .selected').length == 0) {
                $('.examWrap.selected .exameQuizWrap > span:first-child').find('.exameQuiz').addClass('selected')
              }

            }

            if (e.keyCode == 37) {
              if ($('.examWrap.selected').length > 0) {
                e.preventDefault();
                if ($('.examWrap.selected .selected').length > 0) {
                  $this = $('.examWrap.selected .selected');
                  if ($this.parent().prev('span').length > 0) $this.parent().prev('span').find('.exameQuiz').addClass('selected');
                  else $('.examWrap.selected .exameQuizWrap > span:last-child').find('.exameQuiz').addClass('selected');
                  $this.removeClass('selected');
                } else {
                  $('.examWrap.selected .exameQuizWrap > span:last-child').find('.exameQuiz').addClass('selected')
                }
              }
            }

            if (e.keyCode == 39) {
              if ($('.examWrap.selected').length > 0) {
                e.preventDefault();
                if ($('.examWrap.selected .selected').length > 0) {
                  $this = $('.examWrap.selected .selected');
                  //alert($this.parent().next('span').attr('class'));
                  if ($this.parent().next('span').length > 0) $this.parent().next('span').find('.exameQuiz').addClass('selected');
                  else $('.examWrap.selected .exameQuizWrap > span:first-child').find('.exameQuiz').addClass('selected');
                  $this.removeClass('selected');
                } else {
                  $('.examWrap.selected .exameQuizWrap > span:first-child').find('.exameQuiz').addClass('selected')
                }

              }
            }
          }
          /*if(e.keyCode == 32 ){
          if($('.examWrap.selected').length>0){
            e.preventDefault();
            $('.examWrap.selected .exameQuizWrap .focus').parent().find('.selected').removeClass('selected');
            $('.examWrap.selected .exameQuizWrap .focus .exameQuiz').addClass('selected');
            //Nhay xuong
            if($('.examWrap.selected').length>0){
              $this = $('.examWrap.selected');
              if($this.next('.examWrap').length>0) $this.next('.examWrap').addClass('selected');
              else $('.examWrap:first').addClass('selected');
              $this.removeClass('selected');
            }else{$('.examWrap:first').addClass('selected')}
          }

        }*/
          if (e.keyCode == 13) {
            if ($('.examWrap.selected').length > 0) {
              e.preventDefault();
              quizSubmit();
            }
          }
          if (e.keyCode == 49 || e.keyCode == 97) {
            if ($('.examWrap.selected').length > 0) selectQuiz(0, e)
          }
          if (e.keyCode == 50 || e.keyCode == 98) {
            if ($('.examWrap.selected').length > 0) selectQuiz(1, e)
          }
          if (e.keyCode == 51 || e.keyCode == 99) {
            if ($('.examWrap.selected').length > 0) selectQuiz(2, e)
          }
          if (e.keyCode == 52 || e.keyCode == 100) {
            if ($('.examWrap.selected').length > 0) selectQuiz(3, e)
          }

        }
      });
    }


    $('#quiz_list .left-menu-item').click(function(e) {
      $('#quiz_list .active').removeClass('active');
      $(this).addClass('active');
    });



    $('.sub-bar').each(function() {
      var sideItem = $(this).parents('li').find('.side-item');
      sideItem.hasClass('active') ? sideItem.append('<span class="sup-sign icon-chevron-down">') :
        sideItem.append('<span class="sup-sign icon-chevron-right">');
    });

    $('.sub-bar .active').parents('.sub-bar').show().parents('#side-menu > li').find('.side-item').addClass('active');
    $('.side-item').click(function() {
      clearTimeout(to);
      var subBar = $(this).parent().find('.sub-bar');
      var supSign = $(this).find('.sup-sign');
      $('.side-item').not(this).removeClass('active');
      $('.sub-bar').not(subBar).slideUp(300, 'easeOutExpo');
      $('.sup-sign').not(supSign).removeClass('icon-chevron-down').addClass('icon-chevron-right');

      if (!$(this).hasClass('active')) {
        subBar.slideDown(300, 'easeOutExpo');
        $(this).addClass('active');
        $(this).find('.sup-sign').removeClass('icon-chevron-right').addClass('icon-chevron-down');
      }

      if ($(this).parent().find('.sub-item.active').length == 0) {
        to = setTimeout(function() {
          $('.sub-item.active').parents('ul').parents('li').find('.side-item').trigger('click');
        }, 5000);
      }
    });
    //----------------End [side-bar]


    $('#changPassBt').click(function(e) {
      var opass = $('#oPass').val();
      var npass = $('#nPass').val();
      var xpass = $('#xPass').val();
      var data = 'old=' + opass + '&new=' + npass + '&xn=' + xpass;
      $.post('ajax/changePass.php', data, function($return) {
        if ($return == '0') {
          alert('Äá»•i máº­t kháº©u thÃ nh cÃ´ng!');
        } else if ($return == '1') {
          alert('Máº­t kháº©u xÃ¡c nháº­n khÃ´ng chÃ­nh xÃ¡c!');
        } else {
          alert('Báº¡n nháº­p khÃ´ng Ä‘Ãºng máº­t kháº©u cÅ©!');
        }
        $('#doiMK input').val('');
      });
    });



    $('#homeslide').responsiveSlides({
      maxwidth: 1200,
      speed: 500,
      timeout: 8000,
      pager: true
    });
    $('.reponsice-slide').responsiveSlides({
      speed: 800
    });

    $('#backVersion').hover(function(e) {
      $(this).stop().animate({
        marginRight: 20,
        opacity: 1
      }, 'easeOutExpo')
    }, function() {
      $(this).stop().animate({
        marginRight: 0,
        opacity: 0.5
      }, 'easeOutExpo')
    });

    $('textarea:not(#ask_noidung),input').each(function(e) {
      if (!$(this).hasClass('noKB')) VKI_attach(this);
    });

    $('#v-keyboard').click(function(e) {
      if ($showKB) {
        $showKB = false;
        $(this).removeClass('active');
      } else {
        $showKB = true;
        $(this).addClass('active');
      }
    });

    $('.autoheight').flexText();
    $('#home-des').css('height', $('#home-tree').height() + 'px');
    $('#header-menu').before('<div id="menu-before"></div>');
    $('#left-menu').css('height', $(window).height() - 90 + 'px');
    $('#lef-menu-content-wrap').css('height', $('#left-menu').height() - 75 + 'px');
    $(window).scroll(function() {
      $_fixed = $('#header-menu,#menu-before,#left-menu,#head-sep,#main-content,#lession-wrapper');
      if (onScreen('#menu-before')) {
        $_fixed.removeClass('fixed');
        $('#left-menu').css('height', $(window).height() - 90 + 'px');
      } else {
        $_fixed.addClass('fixed');
        $('#left-menu').css('height', $(window).height() - 35 + 'px')
      };
    });
    $('#submit_dk').click(function() {
      checkDK();
    });
    $(this).mouseup(function(e) {
      //alert(getSelectionParentElement().className);
      if (!elementContainsSelection(document.getElementsByClassName('noQuichSearch')[0])) {;
        var selection = $.trim(getSelected().toString());
        $('#tc_button').css('display', 'none');
        if (isDict(selection.toString())) {
          $('#tc_button')
            .css('display', 'none').css({
            'left': e.pageX,
            'top': e.pageY - 48,
            'display': 'block'
          })
            .attr('rel', selection);
        }
      }

    });
    $('#tc_input').change(function() {
      var tc_val = $(this).val();
      if (isDict(tc_val)) {
        getSearch(tc_val);
        $(this).val('');
      }
    });
    $('#tc_close').click(function() {
      $('#tc_wrap').fadeOut();
      $('#page-bg').removeClass('fixed');
    });
    $('#tc_inside').click(function(e) {
      e.stopPropagation();
    });
    $('#tc_button').mouseup(function(e) {
      e.stopPropagation();
    });

    $('#tc_head a').click(function(e) {
      ths = $(this);
      if (!$(this).hasClass('active')) {
        $('#tc_head .active').removeClass('active');
        ths.addClass('active');
        customeSearch(ths.attr('rel'));
      }
    });

    $('#tc_button,.seachht').click(function(e) {
      e.preventDefault();
      clearSelect();
      getSearch($(this).attr('rel'));
    });


    if ($('.isTest').length > 0) $isTest = true;

    $('.radio-button').click(function() {
      var father = $(this).parents('.radio');
      var oldVal = father.find('input').val();
      var rel = $(this).prop('rel');
      if (oldVal != rel) {
        //alert (oldVal + '' + rel);
        father.find('input').val(rel).trigger('change');
        father.find('.radio-button span').removeClass('icon-check-square-o').addClass('icon-square-o');
        father.find('.radio-button').removeClass('active');
        $(this).find('span').addClass('icon-check-square-o').removeClass('icon-square-o');
        $(this).addClass('active');
      }

    });
    $('.chatBox').fancybox({
      maxHeight: '90%',
      minHeight: 500,
      width: '400'
    });
    $('.mo-tai-cho').fancybox({
      maxHeight: '90%'
    });
    $('.video-motaicho').fancybox({
      openEffect: 'none',
      closeEffect: 'none',
      closeClick: true,
      helpers: {
        media: {}
      }
    });

    /*$('.tudien .dt-mean-text span').bigText({
      maximumFontSize: 14
    });*/

    $('#person-avatar').hover(function() {
      var par = $(this).parent();
      var xtd = $('#extend-info');
      var info = $('#person-info');
      par.addClass('active');
      xtd.stop().css('opacity', 0).animate({
        height: 300,
        opacity: 1
      }, 300, 'easeOutExpo');
      info.stop().animate({
        opacity: 0
      });
    }, function() {
      var par = $(this).parent();
      var xtd = $('#extend-info');
      var info = $('#person-info');
      par.delay(500).removeClass('active');
      xtd.stop().animate({
        height: 0,
        opacity: 0
      }, 500, 'easeOutExpo', function() {
        info.stop().animate({
          opacity: 1
        });
      });


    })

    $('.changeAv-bt').click(function() {
      $('#changeAv').trigger('click')
    });
    $('#av-cancel').click(function() {
      $('#av-control').animate({
        height: 0
      }, 'easeOutExpo', function() {
        $('#changeAv-bt').fadeIn(1000)
      });
    });
    //alert($('.subMenu a:last').prop('href'));
    $('#main-menu').find('a').each(function() {
      if ($(this).prop('href') == window.location) {
        $(this).addClass('current');
        $(this).parents('.subMenu').parent().find('a').not('.subMenu a').addClass('current');
      }
    })
    $('.current').click(function() {
      return false
    });
    $('#changeAv').change(function(e) {
      var file = this.files[0];
      var reader = new FileReader();
      var image = new Image();
      reader.readAsDataURL(file);
      reader.onload = function(_file) {
        image.src = _file.target.result;
        image.onload = function() {
          if (~~(file.size / 1024) < 30) {
            $('#av-preview img').remove();
            $('#av-preview').append('<img src="' + this.src + '">');
            $('#av-control').animate({
              height: 58
            }, 'easeOutExpo');
            $('#changeAv-bt').fadeOut();
            $('.av-error').animate({
              top: -30
            }, 'easeOutExpo');
          } else {
            $('.av-error').css('top', '-30px');
            $('#av-error').animate({
              top: 0
            }, 'easeOutExpo');
            $('#changeAv-bt').fadeIn();
            $('#av-control').animate({
              height: 0
            }, 'easeOutExpo');

            clearTimeout(avOut);
            avOut = setTimeout(function() {
              $('#av-error').animate({
                top: -30
              }, 'easeOutExpo');
            }, 5000);
          }
        };
        image.onerror = function() {
          $('.av-error').css('top', '-30px');
          $('#av-error2').animate({
            top: 0
          }, 'easeOutExpo');
          $('#changeAv-bt').fadeIn();
          $('#av-control').animate({
            height: 0
          }, 'easeOutExpo');
          avOut = setTimeout(function() {
            $('#av-error2').animate({
              top: -30
            }, 'easeOutExpo');
          }, 5000);
        };

      };

    });

    var infoOut;
    var oldInfo;
    $('.userInfo').change(function() {
      type = $(this).attr('name');
      val = $(this).val();
      $.post(
        "ajax/userInfo/changeInfo.php",
        'type=' + type + '&val=' + val,
        function(data) {
          if (data.substring(0, 5) == 'Lá»—i! ') {
            $('#' + type).val(oldInfo);
            $('#userError').html(data);
            $('#userError').slideDown(500, 'easeOutExpo');
            clearTimeout(infoOut);
            infoOut = setTimeout(function() {
              $('#userError').slideUp(500, 'easeOutExpo')
            }, 3000);
          } else {
            $('#userMsg').html(data);
            $('#userMsg').slideDown(500, 'easeOutExpo');
            clearTimeout(infoOut);
            infoOut = setTimeout(function() {
              $('#userMsg').slideUp(500, 'easeOutExpo')
            }, 3000);
          }
        }
      );
    });


    $('.userInfo').focus(function() {
      $('.tooltip').remove();
      oldInfo = $(this).val();
    });

    $('#changeAvForm').ajaxForm({
      beforeSend: function() {
        $('.av-error').css('top', '-30px');
        $('#av-sending').animate({
          top: 0
        }, 200, 'easeOutExpo');
      },
      complete: function(xhr) {
        $return = xhr.responseText;
        $('.av-error').css('top', '-30px');
        if ($return == '1') $('#av-error3').animate({
          top: 0
        }, 'easeOutExpo');
        else if ($return == '3') $('#av-error').animate({
          top: 0
        }, 'easeOutExpo');
        else if ($return == '2') $('#av-error2').animate({
          top: 0
        }, 'easeOutExpo');
        else {
          $('#bigAv').attr('src', 'avt/150/200/' + $return);
          $('#av-success').animate({
            top: 0
          }, 'easeOutExpo');
          avOut = setTimeout(function() {
            $('.av-error').animate({
              top: -30
            }, 'easeOutExpo');
          }, 3000);
        }
        $('#changeAv-bt').fadeIn();
        $('#av-control').animate({
          height: 0
        }, 'easeOutExpo');
      }
    });

    $('#dk_form input').change(function(e) {
      $(this).removeClass('error');
      $(this).parents('.form-elem').find('.hint').not('.reg_error').show();
      $(this).parents('.form-elem').find('.reg_error').hide();
    });
    $('#dk_form').ajaxForm({
      beforeSend: function() {
        $('#reg_loading').show();
        $('#bot_hint').hide();
      },
      complete: function(xhr) {
        var out = $.parseJSON(xhr.responseText);
        $('.reg_error').hide();
        $('.hint').not('.reg_error').show();
        $('.error').removeClass('error');
        if (out.success == 0) {
          $.each(out.error, function(i, item) {
            $('#' + item).show();
            $('#' + item).parent().find('.hint').not('#' + item).hide();
            $('#' + item).parents('.form-elem').find('input').addClass('error');
          });
          $('#bot_hint').show();
        } else {
          $('#dk_form')[0].reset();
          $('#bot_hint').hide();
          $('#reg_success').slideDown();
        }
        $('#reg_loading').hide();

      }
    });


    $('.section').not(':first').append('<a class="up-link" href="javascript:void(0)"><span></span></a>');
    //Dich

    $('.jTime,.japan,#info_basic input,#info_basic a, button, .hasTip').hover(function() {
      if (!$(this).is(':focus')) {
        var title = $(this).attr('title') || '';
        if (title != '') {
          $(this).data('tipText', title).removeAttr('title');
          $('<p class="tooltip" style="position:absolute"></p>').html(title).appendTo('body').fadeIn('slow');
        }
      }
    }, function() {
      $(this).attr('title', $(this).data('tipText'));
      $('.tooltip').remove();
    }).mousemove(function(e) {
      var mousex = e.pageX - 20;
      var mousey = e.pageY + 10;
      $('.tooltip').css({
        top: mousey,
        left: mousex
      })
    });

    $('#control-bt a,.td_slider').hover(function() {
      var title = $(this).attr('title') || '';
      if (title != '') {
        $(this).data('tipText', title).removeAttr('title');
        $('<p class="tooltip"></p>').text(title).appendTo('body').fadeIn('slow');
      }
    }, function() {
      $(this).attr('title', $(this).data('tipText'));
      $('.tooltip').remove();
    }).mousemove(function(e) {
      var mousex = e.pageX - 20;
      var mousey = e.pageY - 60;
      $('.tooltip').css({
        top: mousey,
        left: mousex
      })
    });

    //Login
    $('.yahoo').click(function() {
      popup('login/yahoo', 'ÄÄƒng nháº­p báº±ng tÃ i khoáº£n Yahoo!', 520, 520);
    });
    $('.facebook').click(function() {
      popup('login/facebook', 'ÄÄƒng nháº­p báº±ng tÃ i khoáº£n Facebook', 900, 600)
    });
    $('.google').click(function() {
      popup('login/google', 'ÄÄƒng nháº­p báº±ng tÃ i khoáº£n Gmail', 450, 520);
    });
    //Lession title

    //$('#testScore').css('width',$('#lession-wrapper').width());
    //$(window).resize(function(){});

    //Left menu
    $('#an-menu').click(function() {
      if ($(this).hasClass('isHide')) {
        $('#left-menu').show();
        $('#left-menu').stop().animate({
          left: 10
        }, 'easeOutExpo');
        $('#main-content').stop().animate({
          marginLeft: 210
        }, 'easeOutExpo');
        //$('#testScore').stop().animate({width:$('#lession-wrapper').width()-200},'easeOutExpo',function(){$(window).trigger('resize');});
        $('#an-text').text('áº¨n Menu');
        $(this).removeClass('isHide');
      } else {
        $('#left-menu').stop().animate({
          left: -200
        }, 'easeOutExpo');
        //$('#testScore').stop().animate({width:$('#lession-wrapper').width()+200},'easeOutExpo');
        $('#main-content').stop().animate({
          marginLeft: 10
        }, 'easeOutExpo', function() {
          $('#left-menu').hide();
          $(window).trigger('resize');
        });
        $('#an-text').text('Hiá»‡n Menu');
        $(this).addClass('isHide');
      }

    });

    $('.up-link').click(function() {
      $('html, body').animate({
        scrollTop: 0
      }, 700, 'easeOutExpo');
    });



    var to;
    //For users
    //=================Bagin [Side-bar]
    /*$('.sub-bar').each(function(){
    var sideItem = $(this).parents('li').find('.side-item');
    sideItem.hasClass('active')?sideItem.append('<span class="sup-sign icon-chevron-down">'):
    sideItem.append('<span class="sup-sign icon-chevron-right">');
  });*/


    /*$('.side-item').click(function(){
    clearTimeout(to);
    var subBar = $(this).parent().find('.sub-bar');
    var supSign = $(this).find('.sup-sign');
    $('.side-item').not(this).removeClass('active');
    $('.sub-bar').not(subBar).slideUp(300,'easeOutExpo');
    $('.sup-sign').not(supSign).removeClass('icon-chevron-down').addClass('icon-chevron-right');

    if(!$(this).hasClass('active')) {
      subBar.slideDown(300,'easeOutExpo');
      $(this).addClass('active');
      $(this).find('.sup-sign').removeClass('icon-chevron-right').addClass('icon-chevron-down');
    }

    if($(this).parent().find('.sub-item.active').length==0){
      to = setTimeout(function(){
        $('.sub-item.active').parents('ul').parents('li').find('.side-item').trigger('click');
      },5000);
    }
  });*/
    //----------------End [side-bar]


    //alert(window.location.hash)



    //listLeftMenu
    $('.listLeftMenu').click(function() {
      var rel = $('#' + $(this).attr('rel'));
      if ($(rel).css('display') == 'none') {
        $('.listLeftMenu').removeClass('active');
        $(this).addClass('active');
        $('.left-menu-content').hide();
        $(rel).fadeIn();
      }
    })



    //Quick links
    var secNum = 1;
    $('.section').each(function() {
      $(this).prop('id', 'section_' + secNum);
      secNum++;
    });
    if ($('.section').length == 0) $('#quick-menu').remove();
    /*	$('#quick-icon').click(function(){
    parent = $(this).parent();
    if(parent.hasClass('active')) parent.removeClass('active').addClass('inactive');
    else parent.addClass('active').removeClass('inactive');
  })*/


    //Search
    $('#sch-type-wrap').click(function() {
      ul = $(this).find('ul');
      if (ul.hasClass('active')) ul.removeClass('active');
      else ul.addClass('active');
    })
    $('#sch-type-items').find('a').click(function() {
      $('#sch-type').text($(this).text());
      $('#search-type').val($(this).prop('rel'));
    });

    //Audio
    $('.jTime').click(function() {
      me = $(this).find('a');
      id = me.prop('rel');
      if (me.hasClass('playing')) {
        $("#" + id).jPlayer("pause");
        $('.playing').removeClass('playing');
        end = 9999999;
      } else {
        $('.playing').removeClass('playing');
        start = parseFloat($(this).find('.start').text());
        end = parseFloat($(this).find('.end').text());
        me.addClass('playing');
        $("#" + id).jPlayer("play", start).bind($.jPlayer.event.timeupdate, function(event) {
          var status = event.jPlayer.status;
          if (status.currentTime > end) {
            $("#" + id).jPlayer("pause");
            me.removeClass('playing');
            $('.jTime').removeClass('playingPart');
            end = 9999999;
          }
        });
      }
    });


    //Slide

    $('.slide-title').click(function() {
      var title = $(this);
      var content = $(this).parent().find('.slide-content');
      if ($(content).css('display') == 'none') {
        title.addClass('active');
        content.slideDown('easeOutExpo');
      } else {
        title.removeClass('active');
        content.slideUp('easeOutExpo');
      }
    });


    //Answer
    var $_diem = 0;
    var $_caudung = 0;
    var $_causai = 0;
    var $_dalam = 0;
    if($('#isOnlineExam').length > 0){
      $('.khung-wrapper.tc.dk').hide();
      $('#onlineComplete').find('.khung-wrapper').show();
      $('#onlineRedo').hide();
      $('#onlineComplete .khung-content p').html('Vui lÃ²ng click vÃ o nÃºt "Ná»™p bÃ i" Ä‘á»ƒ hoÃ n táº¥t bÃ i thi.' );
      $('body').addClass('examination');
    }
    $_tongcauhoi = ($('.answer').not('.q2').length + $('.quiz').not('.q2').length) / 4 + $('.inputText').length;
    $_tongTest = parseInt(($('.q2').length) / 4 + $('.inputText').length);
    $('#testRemain').text($_tongTest);
    $('#ans-total').text($_tongcauhoi);
    $('.answer:not(.onlineHomeWork .answer)').click(function(e) {
      x = e.pageX - window.pageXOffset - 50;
      y = e.pageY - window.pageYOffset - 50;
      ANS_top = y - 100;
      $this = $(this);
      rel = $this.attr('rel');
      if (!$this.hasClass('done')) {
        if (!$this.hasClass('q2')) {
          $_dalam++;
          $('.answer[rel="' + rel + '"]').addClass('done');
          if ($this.hasClass('d')) {
            $('body').append('<div class="right-popup" id="pop' + $_dalam + '">+1</div>');
            $_caudung++;
          } else {
            $('body').append('<div class="right-popup red" id="pop' + $_dalam + '">+0</div>');
            $_causai++;
          }
          $('#practiceScore').css('display') != 'block' ? $('#practiceScore').fadeIn(function() {
            $('#practiceScore span').animate({
              opacity: 1
            });
            $('#ans-score').text($_caudung);
            $('#ans-total').text($_tongcauhoi);
            $('#ans-finish').text($_dalam);
            $('#ans-wrong').text($_dalam - $_caudung);
          }) : $('#practiceScore span').animate({
            opacity: 0.5
          }, function() {
            $('#practiceScore span').animate({
              opacity: 1
            });
            $('#ans-score').text($_caudung);
            $('#ans-total').text($_tongcauhoi);
            $('#ans-finish').text($_dalam);
            $('#ans-wrong').text($_dalam - $_caudung);
          });
          $('#pop' + $_dalam).css('top', y + 'px');
          $('#pop' + $_dalam).css('left', x + 'px');
          $('#pop' + $_dalam).animate({
            top: ANS_top,
            opacity: 0
          }, 1000, function() {
            $(this).remove(), 'easeOutExpo'
          });
        } else {
          beginTest();
          if ($this.parents('.cauhoi-wrap').find('.selected').length == 0) {
            $('#testRemain').text(parseInt($('#testRemain').text()) - 1);
          }
        }
        $('.answer[rel="' + rel + '"]').removeClass('selected');
        $this.addClass('selected');
      }
    });
    $('#testFinish').click(function() {
      $('#testReaminSec').text('00');
      $('#testRemainMin').text('00');
      endTest();
    });
    //Image input
    $('.quiz').click(function(e) {
      $this = $(this);
      x = e.pageX - window.pageXOffset - 50;
      y = e.pageY - window.pageYOffset - 50;
      ANS_top = y - 100;

      if (!$(this).hasClass('done')) {
        rel = $(this).attr('rel');

        if (!$this.hasClass('q2')) {
          $_dalam++;
          $('.quiz[rel="' + rel + '"]').addClass('done');
          if ($this.hasClass('d')) {
            $('body').append('<div class="right-popup" id="pop' + $_dalam + '">+1</div>');
            $_caudung++;
          } else {
            $('body').append('<div class="right-popup red" id="pop' + $_dalam + '">+0</div>');
            $_causai++;
          }
          $('#practiceScore').css('display') != 'block' ? $('#practiceScore').fadeIn(function() {
            $('#practiceScore span').animate({
              opacity: 1
            });
            $('#ans-score').text($_caudung);
            $('#ans-total').text($_tongcauhoi);
            $('#ans-finish').text($_dalam);
            $('#ans-wrong').text($_causai);
          }) : $('#practiceScore span').animate({
            opacity: 0.5
          }, function() {
            $('#practiceScore span').animate({
              opacity: 1
            });
            $('#ans-score').text($_caudung);
            $('#ans-total').text($_tongcauhoi);
            $('#ans-finish').text($_dalam);
            $('#ans-wrong').text($_causai);
          });
          $('#pop' + $_dalam).css('top', y + 'px');
          $('#pop' + $_dalam).css('left', x + 'px');
          $('#pop' + $_dalam).animate({
            top: ANS_top,
            opacity: 0
          }, 1000, function() {
            $(this).remove(), 'easeOutExpo'
          });
        } else {
          beginTest();
          if ($this.parents('.cauhoi-wrap').find('.selected').length == 0) {
            $('#testRemain').text(parseInt($('#testRemain').text()) - 1);
          }
        }
        $('.quiz[rel="' + rel + '"]').removeClass('selected')
        $(this).addClass('selected');
      }
    });

    //INPUT
    //$('.inputResult').hide();
    $('.inputText').val('');
    $('.inputText').keypress(function(e) {
      if (e.which == 13 && $(this).val() != '') {
        $('.last:contains("Enter")').trigger('click');

      }
    });

    $('.inputText:not(.onlineHomeWork .inputText)').change(function(e) {
      $this = $(this);
      var rightAnswer = $(this).attr('rel').toLowerCase().replace(/\s+/g, '');
      var answer = $(this).val().toLowerCase().replace(/\s+/g, '');
      var index = $(this).attr('tabindex');
      var next = parseInt(index) + 1;
      if (!$isTest) {
        e = $(this).offset();
        x = e.left - window.pageXOffset + 50;
        y = e.top - window.pageYOffset - 50;
        //alert(x);
        ANS_top = y - 100;
        $_dalam++;
        $(this).attr('readonly', 'readonly');
        if (rightAnswer == answer) {
          $('body').append('<div class="right-popup" id="pop' + $_dalam + '">+1</div>');
          $(this).addClass('right').removeClass('wrong');
          $('.inputResult#inputResult' + index).hide(500);
          $_caudung++;
        } else {
          $('body').append('<div class="right-popup red" id="pop' + $_dalam + '">+0</div>');
          $(this).addClass('wrong').removeClass('right');
          $('.inputResult#inputResult' + index).show(500);
          $_causai++;
        }
        $('#practiceScore').css('display') != 'block' ? $('#practiceScore').fadeIn(function() {
          $('#practiceScore span').animate({opacity: 1});
          $('#ans-score').text($_caudung);
          $('#ans-total').text($_tongcauhoi);
          $('#ans-finish').text($_dalam);
          $('#ans-wrong').text($_causai);
        }) : $('#practiceScore span').animate({
          opacity: 0.5
        }, function() {
          $('#practiceScore span').animate({
            opacity: 1
          });
          $('#ans-score').text($_caudung);
          $('#ans-total').text($_tongcauhoi);
          $('#ans-finish').text($_dalam);
          $('#ans-wrong').text($_causai);
        });
        $('#pop' + $_dalam).css('top', y + 'px');
        $('#pop' + $_dalam).css('left', x + 'px');
        $('#pop' + $_dalam).animate({
          top: ANS_top,
          opacity: 0
        }, 1000, function() {
          $(this).remove(), 'easeOutExpo'
        });
      } else {
        beginTest();
        if (!$(this).hasClass('selected')) {
          $('#testRemain').text(parseInt($('#testRemain').text()) - 1);
          $(this).addClass('selected');
        }
        rightAnswer == answer ? $(this).addClass('d') : $(this).removeClass('d');
        if (answer == '') {
          $(this).removeClass('selected');
          $('#testRemain').text(parseInt($('#testRemain').text()) + 1);
        }
      }

      if (!$(this).hasClass('stop')) $('.inputText[tabindex="' + next + '"]').focus().trigger('click');
    });

    //tested
    if ($('#tested').length > 0) {
      $('.q2').addClass('done');
      $('.inputText').attr('readonly', 'readonly');
      $('#practiceScore').html($('#tested').html());
      $('#practiceScore').slideDown();
      $('#tested,#testScore').remove();
      testInter = setInterval(function() {
        curSec = parseInt($('#testedRemainSec').text()) - 1;
        if (curSec <= -1) {
          curSec = 59;
          curMin = parseInt($('#testedRemainMin').text()) - 1;
          if (curMin <= -1) {
            clearInterval(testInter);
            window.location.reload();
            return;
          } else $('#testedRemainMin').text(addZero(curMin));
        }
        $('#testedRemainSec').text(addZero(curSec));
      }, 1000);
    }



    //Exame
    exameNum = 1;
    $('.examQestion').each(function(index, element) {
      rst = $(this).find('p:first');
      rst.html(exameNum + '. ' + rst.html());
      exameNum++;
    });

    $('.exameQuiz').click(function(e) {
      if (!$(this).hasClass('done')) {
        beginExam();
        if (!$(this).hasClass('selected')) {
          $(this).parents('.exameQuizWrap').find('.selected').removeClass('selected');
          $(this).addClass('selected');
        }
      }
    });
    $('.exameQuizWrap').each(function(index, element) {
      $(this).find('.frame2').shuffle();
      $(this).find('.frame0').shuffle();
      $(this).find('.frame4').shuffle();
    });


    $('#exameFinish').click(function() {
      $('#exameSec').text('00');
      $('#exameMin').text('00');
      endExam();
    });



    //ghi chÃº

    if ($.cookie('noteShow') == 'true') {
      $('#userNote').show();
      $('#noteShow').addClass('active');
      //alert('ok');
    }

    $('#note-close').click(function() {
      $('#userNote').hide();
      $('#noteShow').removeClass('active');
      $.cookie('noteShow', 'false', {
        expires: 360,
        path: '/'
      });
    });

    $('#noteShow').click(function() {
      $('#userNote').show();
      $('#noteShow').addClass('active');
      $.cookie('noteShow', 'true', {
        expires: 360,
        path: '/'
      });
    });

    //Chat
    //$('#send').click(function(){if($('#chat-noidung').val()!=""){shout()};});
    if ($.cookie('chatShow') == 'false') {
      $('#chat-box').hide();
      $('#chat-open').show();
    }
    else if ($.cookie('chatShow') == 'true') refres();
    else {
      $.cookie('chatShow', 'false', {
        expires: 360,
        path: '/'
      });
      $('#chat-box').hide();
      $('#chat-open').show();
    }


    $('#chat-close').click(function() {
      $('#chat-box').hide();
      $('#chat-open').show()
      $.cookie('chatShow', 'false', {
        expires: 360,
        path: '/'
      });
    });


    $('#chat-open').click(function() {
      $.cookie('chatShow', 'true', {
        expires: 360,
        path: '/'
      });
      refres();
    });
    $('#chat-noidung').keypress(function(e) {
      if (e.which == 13 && !e.shiftKey) {
        e.preventDefault();
        if ($('#chat-noidung').val() != "") {
          shout();
        }
      }
    });
    $('#clearchat').click(function() {
      $.ajax({
        url: "clearchat"
      });
    });

    $('#chat-box #send').click(function() {
      if ($('.emoticon').length == 0) $('#emopic').load('/ajax/chat/loadIcons.php',function(){
        $('.emo').click(function() {
          var code = $(this).attr('rel');
          insertAtCaret('chat-noidung', code);
        });
      });
      var bb = $('#bbcode-wrap');
      bb.hasClass('active')
        ? bb.stop().animate({height: 0}, 'easeOutExpo').removeClass('active')
        : bb.stop().animate({height: 262}, 300, 'easeOutExpo').addClass('active');

    });



    //Video
    var $allVideos = $("iframe[src^='http://www.youtube.com']"),
      $fluidEl = $("#lession-cotent");
    $allVideos.each(function() {
      $(this).data('aspectRatio', this.height / this.width).removeAttr('height').removeAttr('width');
      var newWidth = $fluidEl.width();
      $allVideos.each(function() {
        var $el = $(this);
        $el.width(newWidth).height(newWidth * $el.data('aspectRatio'));
      });
    });



    //date pickker
    $('.datepicker').datepicker({
      changeMonth: true,
      changeYear: true,
      maxDate: "-12Y",
      dateFormat: 'dd/mm/yy',
      firstDay: 1
    });

    $.datepicker.regional['vi'] = {
      monthNames: ['ThÃ¡ng Má»™t', 'ThÃ¡ng Hai', 'ThÃ¡ng Ba', 'ThÃ¡ng Bá»‘n', 'ThÃ¡ng NÄƒm', 'ThÃ¡ng SÃ¡u',
        'ThÃ¡ng Báº£y', 'ThÃ¡ng TÃ¡m', 'ThÃ¡ng ChÃ­n', 'ThÃ¡ng MÆ°á»i', 'ThÃ¡ng MÆ°á»i má»™t', 'ThÃ¡ng MÆ°á»i hai'
      ],
      monthNamesShort: ['Má»™t', 'Hai', 'Ba', 'Bá»‘n', 'NÄƒm', 'SÃ¡u', 'Báº£y', 'TÃ¡m', 'ChÃ­n', 'MÆ°á»i', 'MÆ°á»i má»™t', 'MÆ°á»i hai'],
      dayNames: ['Chá»§ nháº­t', 'Thá»© Hai', 'Thá»© Ba', 'Thá»© TÆ°', 'Thá»© NÄƒm', 'Thá»© SÃ¡u', 'Thá»© Báº£y'],
      dayNamesShort: ['Hai', 'Ba', 'TÆ°', 'NÄƒm', 'SÃ¡u', 'Báº£y', 'CN'],
      dayNamesMin: ['CN', 'Hai', 'Ba', 'TÆ°', 'NÄƒm', 'SÃ¡u', 'Báº£y'],
      clearText: 'Effacer',
      clearStatus: '',
      closeText: 'ÄÃ³ng',
      closeStatus: 'ÄÃ³ng cá»­a sá»•',
      prevText: '<TrÆ°á»›c',
      prevStatus: 'ThÃ¡ng trÆ°á»›c',
      nextText: 'Sau>',
      nextStatus: 'ThÃ¡ng sau',
      currentText: 'HÃ´m nay',
      currentStatus: 'Voir le mois courant',
      monthStatus: 'Voir un autre mois',
      yearStatus: 'Voir un autre annÃ©e',
      weekHeader: 'Sm',
      weekStatus: '',
      dayStatus: 'Utiliser DD comme premier jour de la semaine',
      dateStatus: 'Choisir le DD, MM d',
      dateFormat: 'dd/mm/yy',
      firstDay: 0,
      initStatus: 'Choisir la date',
      isRTL: false
    };
    $.datepicker.setDefaults($.datepicker.regional['vi']);


    //Luyá»‡n tá»«
    $('#td_full').click(function() {
      if ($(this).hasClass('full')) {
        $(this).removeClass('full').addClass('mini');
        if (i < 999) {
          $('#pic-che').fadeIn();
          $('#control-panel').addClass('full');
          td_setPos();
        }
      } else {
        $(this).removeClass('mini').addClass('full');
        $('#pic-che').fadeOut();
        $('#control-panel').removeClass('full');
      }
    });

    $('.td_rd').click(function() {
      if ($(this).hasClass('td_random')) {
        $(this).removeClass('td_random');
        $(this).addClass('td_norandom');
        $('#td-rd').removeAttr('checked');
      } else {
        $(this).removeClass('td_norandom');
        $(this).addClass('td_random');
        $('#td-rd').attr('checked', 'checked');
      }
      if (i != 999) i = td_order[i];
    });
    $('#td_volume').click(function() {
      $(this).hasClass('nomute') ? $(this).addClass('readhint').removeClass('nomute') :
        $(this).hasClass('readhint') ? $(this).removeClass('readhint').addClass('mute') :
          $(this).addClass('nomute').removeClass('mute');
    });
    $('.td_rep').click(function() {
      if ($(this).hasClass('td_repeat')) {
        $(this).removeClass('td_repeat');
        $(this).addClass('td_norepeat');
        $('#td-cont').removeAttr('checked');
      } else {
        $(this).removeClass('td_norepeat');
        $(this).addClass('td_repeat');
        $('#td-cont').attr('checked', 'checked')
      }
    });
    $('.td_control.lang').click(function() {
      rel = $(this).attr('rel');
      if ($(this).hasClass('dis')) {
        $(this).removeClass('dis');
        $('.' + rel).slideDown(function() {
          /*if (rel == 'dt-mean-text') $('.tudien .dt-mean-text span').bigText({
            maximumFontSize: 14
          });*/
        });
      } else {
        $(this).addClass('dis');
        $('.' + rel).slideUp();
      }
    });

    $('.td_play').click(function() {
      td_play()
    });
    $('.td_pause, .read').click(function() {
      td_pause()
    });
    $('.td_stop').click(function() {
      !$(this).hasClass('disabled') ? td_stop() : ''
    });
    $('.td_previous').click(function() {
      !$(this).hasClass('disabled') ? td_previos() : ''
    });
    $('.td_next').click(function() {
      !$(this).hasClass('disabled') ? td_next() : ''
    });
    $('.td_readthis').click(function() {
      !$(this).hasClass('disabled') ? td_repeat() : ''
    });
    $('.td_slider').slider({
      value: 1,
      min: 0,
      max: 5,
      step: 1,
      slide: function(event, ui) {
        $(this).attr('id') == 'td_speed' ? speed = ui.value * 1000 : delay = ui.value * 1000;
      }
    });
    //TD text select
    $('.textChooser').click(function(e) {
      var ths = $(this);
      var ID = ths.attr('id');
      var width = $('#pic-content').width();
      var height = $('#pic-content').height();

      $('.pic-item').each(function(index, element) {
        var txt = $(this).find('.' + ID).text();
        var app = '<div class="textDisplay" style="width:' + width + 'px; height:' + height + 'px"><span class="textInner">' + txt + '</span></div>';
        $(this).find('.textDisplay').remove();
        $(this).find('.pic-img').hide();
        $(this).append(app);
        var inheight = $(this).find('.textInner').height();
        var inmargin = (height - inheight) / 2;
        $(this).find('.textInner').css('margin-top', 100 + 'px');
      });
    });

    //Home
    $('li.top-tree > a').click(function(e) {
      $(this).parent().find('ul').stop().toggle(800, 'easeOutExpo', function() {
        $('#home-des').css('height', $('#home-tree').height() + 'px');
      }); //====================
      $(this).toggleClass('icon-folder-open').toggleClass('icon-folder');
    });


    $('.home-branch a').click(function(e) {
      e.preventDefault();
      $('.cur-tree').removeClass('cur-tree');
      $(this).addClass('cur-tree');
      $('#home-des').load('ajax/home-des.php@n=' + $(this).attr('href'));
    });
    //Nap credit
    $('.lstTelco').click(function(e) {
      $('#lstTelco').val($(this).attr('rel'));
      $('.lstTelco .icon-check').removeClass('icon-check');
      $(this).find('.fa').addClass('icon-check');
    });


    //Dang nhap
    $('#login-bt,.login-bt').click(function() {
      $('#dn-che').show();
    });
    $('.cre-show').click(function() {
      $('#credit_che').show();
    });
    $('.closeBox').click(function() {
      $('#' + $(this).attr('rel')).hide();
    });
    $('.vip-show').click(function() {
      $('#vip_che').show();
    });
    $('#dn-close').click(function() {
      $('#dn-che').hide();
    });
    $('#cre-close').click(function() {
      $('#credit_che').hide();
    });
    $('#test-close').click(function() {
      $('#testScoreWrapper').hide();
      $('#testReview').show();
    });
    $('#testReview').click(function() {
      $(this).hide();
      $('#testScoreWrapper').fadeIn(100);
    });
    $('#vip-close').click(function() {
      $('#vip_che').hide();
    });
    $('#login_gn').click(function(e) {
      fa = $('#login_gn_ck').find('span');
      if (fa.hasClass('icon-check')) {
        fa.removeClass('icon-check');
        $('#ck_ghinho').val(0);
      } else {
        fa.addClass('icon-check');
        $('#ck_ghinho').val(1);
      }
    });
    $('.dn_text').keydown(function(e) {
      if (e.keyCode == 13) {
        checkLogin();
      }
    })

    /* TABS  */
    $('.tab_title a').not('.go').click(function(e) {
      var parent = $(this).closest('.tab_wrapper');
      if(!parent.hasClass('noControl')){
        var $link = $(this).attr('href');
        parent.find('.tab_content').hide();
        parent.find('.tab_title a').removeClass('active');
        $(this).addClass('active');
        $($link).show();
        return false;
      }
    });



    $(window).resize(function() {
      td_setPos();
      var newWidth = $fluidEl.width();
      $allVideos.each(function() {
        var $el = $(this);
        $el.width(newWidth).height(newWidth * $el.data('aspectRatio'));
      });
      $('#lession-wrapper').css('min-height', $('#right-menu').height() + 8 + 'px');
      /*$('.tudien .dt-mean-text span').bigText({
        maximumFontSize: 14,
        padding: 3,
      });*/
      $('#left-menu').css('height', $(window).height() - 90 + 'px');
      $('#lef-menu-content-wrap').css('height', $('#left-menu').height() - 75 + 'px');
      //$('#testScore').css('width',$('#lession-wrapper').width());
    }).resize();
  }else $('html').remove();
});

$(window).load(function() {
  $('#login-bt').fadeIn(300);
  if($('#home-details').length >0){
    var hash = window.location.hash;
    var dtnum = hash.replace('#detail-link-','');
    $('#homedt-'+dtnum).addClass('active');
    $(hash).trigger('click');

  }

  if ($('#test_list_wrap').length > 0 && window.location.hash != '') {
    hash = window.location.hash.replace('#', '');
    $('.tab_title li').eq(hash).find('a').trigger('click');
    //alert(hash);
  }


  if ($('.img-group-wrap').length > 0 && window.location.hash != '') {
    hash = window.location.hash;
    $('a[rel='+hash+']').trigger('click');
    //alert(hash);
  }

  if ($('.section').length > 0) {
    $('#quick-menu').append('<ul id="quick-items">');
    var items = '';
    $('.section').each(function() {
      id = $(this).prop('id');
      text = $(this).text();
      $('#quick-items').append('<li>');
      $('#quick-items li:last').append('<a>');
      $('#quick-items li:last a').prop('href', 'javascript:void(0)');
      $('#quick-items li:last a').prop('rel', id);
      $('#quick-items li:last a').text(text);
      $('#quick-items li:last a').click(function() {
        $('html, body').stop().animate({
          scrollTop: $('#' + $(this).prop('rel')).offset().top - 140
        }, 1000, 'easeOutExpo');
      });
    });
  }
  $('#lession-wrapper').css('min-height', $('#right-menu').height() + 8 + 'px');
  $('#lef-menu-content-wrap,#tc_scroll').mCustomScrollbar({
    scrollButtons: {
      enable: true
    },
    scrollInertia: 500,
    autoHideScrollbar: true,
    advanced: {
      updateOnContentResize: true
    }
  });



  $('#admin-contact-wrap').height($('#lastNews').height());
  $('#admin-contact').height($('#lastNews').height() - 80);
  /*window.___gcfg = {
    lang: 'vi'
  };
  (function() {
    var po = document.createElement('script');
    po.type = 'text/javascript';
    po.async = true;
    po.src = 'https://apis.google.com/js/platform.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(po, s);
  })();*/

  $('#admin-contact-wrap').height($('#lastNews').height());
  $('#admin-contact').height($('#lastNews').height() - 80);

  //if($('#isTest').length > 0) tmpLoad();

});