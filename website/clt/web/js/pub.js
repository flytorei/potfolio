var cltUi = {}
/*메인*/
cltUi.main = function () {
    var windowH = $(window).height(),
        windowW = $('#container').width(),
        num = 0;
    if (windowH < 650) {
        windowH = 650;
    }
    $('#container').css({
        'height': windowH
    })
    $('.view').css({
        'height': windowH
    })
    cltUi.wheelEven(num, windowH);
    cltUi.mouseTrnas(num);
    cltUi.actObjdown(num);
    cltUi.navBtn(num, windowH);
    cltUi.subMain()
    return false;
}
/*서브*/
cltUi.sub = function () {
    if ($('.location_area').length > 0) {
        var locaTop = $('.location_area').offset().top;
    }

    $(window).on('scroll', function () {
        var scrollT = $(window).scrollTop();
        if (scrollT >= locaTop) {
            $('.location_area').css({
                position: 'fixed',
                top: 0
            })
            return false;
        } else {
            $('.location_area').css({
                position: 'absolute',
                top: 320
            })
            return false;
        }
    });
    $('.lo_inner>ul>li').on('click', function () {
        var idx = $(this).index();
        $(this).children('a').addClass('on').closest('li').siblings().children('a').removeClass('on');
        $('.lo_inner_box>div').eq(idx).addClass('on').siblings().removeClass('on');
    });

    if ($('#wrap').hasClass('login')) {
        $(window).resize(function () {
            var windowH = $(window).height(),
                headH = $('#head').outerHeight(true),
                footerH = $('#footer').outerHeight(true),
                s = windowH - headH - footerH - 2;
            $('#container,.login_main_txt').css('height', s)
            $('.login_box ').css('top', (s / 3.2) - 80)
        }).trigger('resize');
    }
    $('.sub_ov_tap li').on('click', function () {
        var idx = $(this).index();
        $(this).addClass('on').siblings().removeClass('on')
        $(this).parents('.sub_ov_tap').next('div').children().eq(idx).addClass('on').siblings().removeClass('on');
        return false;
    });

}
/*게이트*/
cltUi.gateLayout = function (h) {
    var windowH = $(window).height() - $('#head').outerHeight();
    var footH = $('.gate #footer').height()
    if (h == 'fixed') {
        $('.gate #container').css({
            height: windowH - footH
        });
        $('.gate #container').css({
            overflow: 'hidden',
            paddingLeft: 330
        })
        $('.gate #contents').css({
            overflowY: 'auto',
            overflowX: 'hidden'
        })
    }

    $('.btn_side_more').on('click', function () {
        var act = $(this).hasClass('on')
        if (act == false) {

            if ($('#aside_section').hasClass('half')) {
                $('#aside_section').addClass('half_chk');
            }

            $('.aside_inner').css({
                 overflow:'hidden',
                 overflowY: 'hidden',
                 overflowX: 'hidden',
            })
            
            $(this).addClass('on')
            $('#aside_section').css({
                /*  'left':-369,*/
                
                transition: 'width 0.5s',
                width: 0
            })
            $('#container').css({
                transition: 'padding-left 0.5s',
                paddingLeft: 30
            })

            $('#container,#aside_section').removeClass('half');

            $('.dca_section .depth01_inner,.dca_section .depth02_inner').css({
                transition: 'padding-left 0.5s',
                paddingLeft: 180
            })
            $('.box-validation.on').show()
            $('.box-validation.off').hide()


            $('.left_text').css({
                transition: 'left 0.5s',
                left: 30
            })
            $('.select_box').css({
                transition: 'left 0.5s',
                left: 50
            })

            return false;

        } else {
           
            if ($('#aside_section').hasClass('half_chk')) {

                $('#aside_section').css({
                   
                    transition: 'width 0.5s,padding-bottom:115 0.5s',
                    width: 199,
                    paddingBottom: 130
                })
               
                
                $('#aside_section').addClass('half');
                $('#aside_section').removeClass('half_chk');
                $('#container').css({
                    paddingLeft: 230
                })
                $('.tab_bottom li').eq(1).find('a').addClass('on');
                $('.tab_bottom li').eq(2).find('a').removeClass('on')

                $('.left_text').css({
                    transition: 'left 0.5s',
                    left: 230
                });
                $('.select_box').css({
                    transition: 'left 0.5s',
                    left: 250
                })
                return false;

            } else {

                $('#aside_section').css({
                    transition: 'width 0.5s,padding-bottom:115 0.5s',
                    width: 300,
                    paddingBottom: 90

                })
                
                
                $('#container').css({
                    paddingLeft: 330
                })
                $('.tab_bottom li').eq(2).find('a').addClass('on')
                $('#container,#aside_section').removeClass('half');

            }

            $(this).removeClass('on')

            $('#container').removeClass('half');
            $('.tab_bottom li').eq(0).find('a').removeClass('on')
            $('.dca_section .depth01_inner,.dca_section .depth02_inner').css({
                transition: 'padding-left 0.5s',
                paddingLeft: 80
            })

            $('.box-validation.on').hide()
            $('.box-validation.off').show()

            $('.aside_inner').css({
                height: '100%',
                overflowY: 'auto',
                overflowX: 'hidden'
            })

            $('.left_text').css({
                transition: 'left 0.5s',
                left: 330
            })
            $('.select_box').css({
                transition: 'left 0.5s',
                left: 350
            })

            return false;
        }
    });
    //토글 버튼
    $('.util').addClass('off');
    $('.sw').on('click', function () {
        if ($(this).is(':animated')) {
            return false;
        }
        var act = $(this).hasClass('on')
        if (act == false) {
            $(this).find('span').animate({
                left: 18
            }, function () {
                $('.sw').addClass('on');
                $('.util').removeClass('off').addClass('on');
                $('.util .util_inner > ul').animate({
                    width: 600
                });
                $('.util .util_inner > ul > li > a span').removeClass('blind')
                $('.util .util_inner > ul > li > a').css({
                    width: 'auto',
                    paddingLeft: 32
                })
                $('.util .util_inner > ul > li').css({
                    marginLeft: 20
                });
            })
            return false;
        } else if (act == true) {
            $(this).find('span').animate({
                left: 0
            }, function () {
                $('.util').addClass('off').removeClass('on');
                $('.sw').removeClass('on');
                $('.util .util_inner > ul').animate({
                    width: 221
                }, function () {
                    $('.util .util_inner > ul > li > a span').addClass('blind')
                    $('.util .util_inner > ul > li > a').css({
                        width: 26,
                        paddingLeft: 0
                    })
                    $('.util .util_inner > ul > li').css({
                        'margin-left': 7
                    })
                });
            })
            return false;
        }
    });
    cltUi.gateGnb();
    cltUi.Openpop();

    



    $('.tab_bottom li').on('click', function (e) {
        var idx = $(this).index();
        $('.tab_bottom a').removeClass('on')
        $(this).find('a').addClass('on');

        if (idx == 0) {
            $('#aside_section').css({
                transition: 'width 0.5s',
                width: 0
            })

            setTimeout(function () {
                $('.aside_inner').css({
                    overflow: 'hidden',
                    height: 0
                })
            }, 500);

            $('#container').css({
                transition: 'padding-left 0.5s',
                paddingLeft: 30
            })
            $('.btn_side_more').addClass('on');
            $('#container').removeClass('half');

            $('.dca_section .depth01_inner,.dca_section .depth02_inner').css({
                transition: 'padding-left 0.5s',
                paddingLeft: 180
            })
            $('.box-validation.on').show()
            $('.box-validation.off').hide()
            $('.left_text').css({
                transition: 'left 0.5s',
                left: 30
            })
            $('.select_box').css({
                transition: 'left 0.5s',
                left: 50
            })

            return false;
        } else if (idx == 1) {

            $('#container').css({
                transition: 'padding-left 0.5s',
                paddingLeft: 230

            })
            $('#aside_section').css({
                transition: 'width 0.5s,padding-bottom 0.5s',
                width: 199,
                paddingBottom: 130
            })
            $('#aside_section').addClass('half')

            $('.aside_inner').css({

                height: '100%'
            })

            $('.left_text').css({
                transition: 'left 0.5s',
                left: 230
            })
            $('.select_box').css({
                transition: 'left 0.5s',
                left: 250
            })


            return false;
        } else if (idx == 2) {
            $('#container').css({
                transition: 'padding-left 0.5s',
                paddingLeft: 330
            })
            $('#aside_section').css({
                transition: 'width 0.5s, padding-bottom 0.5s',
                width: 300,
                paddingBottom: 90

            })
            $('#aside_section').removeClass('half')
            $('#container').removeClass('half');
            $('.btn_side_more').removeClass('on');

            $('.aside_inner').css({
                overflow: 'visible',
                overflowY: 'auto',
                overflowX: 'hidden'
            })

            $('.left_text').css({
                transition: 'left 0.5s',
                left: 330
            })
            $('.select_box').css({
                transition: 'left 0.5s',
                left: 350
            })

            return false;
        }
    })

    $('.shadow_open').on('click', function () {
        var act = $(this).hasClass('on');
        if (act == false) {
            $(this).addClass('on');
            $(this).parent().find('.shadow_box').show();
            $(this).parent().find('.cls').on('click', function () {
                $(this).parent().parent().parent().find('.shadow_box').hide();
                $(this).parent().parent().parent().find('.shadow_open').removeClass('on');
            })
            return false;
        } else {
            $(this).removeClass('on');
            $(this).parent().find('.shadow_box').hide();
            return false;
        }

    })

    $('.tg1').cltToggle();
    $('.tg1_1').cltToggle();
    $('.tg2').cltToggle({
        open: true
    });
    $('.tg3').cltToggle({
        open: true,
        set: false,
        pri: true
    });
    $('.tg4').cltToggle({
        open: true,
        set: true
    });



    /* if ($('.calinder').length > 0) {
         $("#datepicker1").datepicker({
             dateFormat: 'yy/mm/dd'
         });

         $("#datepicker2").datepicker({
             dateFormat: 'yy/mm/dd'
         });

         $("#datepicker3").datepicker({
             dateFormat: 'yy/mm/dd'
         });
     }*/

    var tabIdx = 0
    $('.tab_box2 li').on('click', function () {
        var w_box = $('.tab_box2 li').outerWidth();
        var crIdx = $(this).index();

        $('.tab_box2 li a').removeClass('on');
        $(this).find('a').addClass('on')
        if (tabIdx < crIdx) {
            if (w_box * crIdx < 1160) {
                return false;
            }

            $('.scroll_box').animate({
                scrollLeft: w_box * crIdx
            });
        } else if (tabIdx > crIdx) {

            $('.scroll_box').animate({
                scrollLeft: w_box * crIdx - 500
            });
        }
        tabIdx = crIdx
    })


    $('.tab_box li').eq(0).find('a').addClass('on')
    $('.tab_cts > div').eq(0).addClass('on')
    $('.tab_box li').on('click', function () {
        var idx = $(this).index();
        $('.tab_box li a').removeClass('on');
        $(this).find('a').addClass('on');
        $('.tab_cts > div').removeClass('on');
        $('.tab_cts > div').eq(idx).addClass('on');
    })

    var uBox_len = $('#footer .u_box').length
    $('.foot_util').addClass('fu' + uBox_len);
    $('.u_box').each(function (e) {
        var num = e + 1
        $(this).addClass('u' + num);
    })

    $('.vali_btn').on('click', function () {
        $('.btn_side_more').addClass('on');
        $('#aside_section').css({
            /*  'left':-369,*/
            transition: 'width 0.5s',
            width: 0
        })
        $('#container').css({
            transition: 'padding-left 0.5s',
            paddingLeft: 30
        })
        $('.dca_section .depth01_inner,.dca_section .depth02_inner').css({
            transition: 'padding-left 0.5s',
            paddingLeft: 180
        })
        $('.box-validation.on').show()
        $('.box-validation.off').hide()

        return false;

    })

    $('.open_pop_toggle').on('click', function () {
        var act = $(this).hasClass('on');
        if (act == false) {
            $(this).addClass('on');
            $('.pop_toggle').show();
        } else {
            $(this).removeClass('on');
            $('.pop_toggle').hide();
        }

    })

    $('.gate .btn_more').on('click', function () {
        $('.gate_all_menu').show();
    })

    $('.gate_all_menu .close').on('click', function () {
        $('.gate_all_menu').hide();
    })
    
    
    var plaTxt='';
    $('.input_val').on('focusin',function(){
        $(this).val('')
         plaTxt=$(this).attr('placeholder');
    });
    $('.input_val').on('focusout',function(){
        $(this).val(plaTxt+' '+$(this).val());
        plaTxt='';
    });
}

cltUi.gateGnb = function(){
    $('.location .dep_01 > li').on('click', function (e) {
        e.preventDefault();
        $('.location .dep_01 > li').removeClass('on');
        $('.location .dep_01 > li > .dep_02').stop().slideUp('fast');
        /*   $(this).addClass('on');*/
        $(this).find('> .dep_02').slideDown('fast');
        return false;
    })


    $('.location .dep_01 > li').on('mouseleave', function (e) {
        e.preventDefault();
        $('.location .dep_01 > li > .dep_02').stop().slideUp('fast');
        $('.location .dep_01 > li').removeClass('on')
        return false;
    })

    $('.location .dep_02 > li').on('mouseenter', function (e) {
        e.preventDefault();
        $('.dep_02 > li').removeClass('on')
        $(this).addClass('on');
        $('.dep_02 .dep_03').hide();
        $(this).find('.dep_03').show();
        return false;
    })

    $('.location .dep_02 > li').on('click', function (e) {
        
        var $href = $(this).find('a').attr('href');
        if ($href == '#') {
            return false;
        } else {
            window.location = $href
            return false;
        }
    })

    $('.location .dep_03_inner > li').on('mouseenter', function (e) {
        e.preventDefault();
        $('.dep_03_inner > li').removeClass('on');
        $(this).addClass('on');
        $('.dep_03_inner .dep_04').hide();
        $(this).find('.dep_04').show();
        return false;
    })

    $('.location .dep_03_inner > li').on('click', function (e) {
       
        var $href = $(this).find('a').attr('href');
        if ($href == '#') {
            return false;
        } else {
            window.location = $href
            return false;
        }
    })

    $('.location .dep_04_inner > li').on('mouseenter', function (e) {
        e.preventDefault();
        $('.dep_04_inner > li').removeClass('on')
        $(this).addClass('on');
        $('.dep_04_inner .dep_05').hide();
        $(this).find('.dep_05').show();
        return false;
    })

    $('.location .dep_04_inner > li').on('click', function (e) {
       
        var $href = $(this).find('a').attr('href');
        if ($href == '#') {
            return false;
        } else {
            window.location = $href
            return false;
        }
    })


    $('.location .dep_05_inner > li').on('mouseenter', function (e) {
        e.preventDefault();
        $('.dep_05_inner > li').removeClass('on')
        $(this).addClass('on');
        $('.dep_05_inner .dep_06').hide();
        $(this).find('.dep_06').show();
        return false;
    })

    $('.location .dep_05_inner > li').on('click', function (event) {
        
        var $href = $(this).find('a').attr('href');
        if ($href == '#') {
            return false;
        } else {
            window.location = $href
            return false;
        }
    })

    $('.location .dep_06_inner > li').on('mouseenter', function (e) {
        e.preventDefault();
        $('.dep_06_inner > li').removeClass('on')
        $(this).addClass('on');
        $('.dep_06_inner .dep_07').hide();
        $(this).find('.dep_07').show();
        return false;
    })

    $('.location .dep_06_inner > li').on('click', function () {
       
        var $href = $(this).find('a').attr('href');
        if ($href == '#') {
            return false;
        } else {
            window.location = $href;
            return false;
        }

    })
}

cltUi.wheelEven = function (num, windowH) {
    $('.item').on('mousewheel DOMMouseScroll', function (e) {
        if ($('.view').is(':animated')) {
            return false;
        }
        num = $(this).index();
        even = e.originalEvent.wheelDelta;
        if (even == undefined) {
            even = -e.originalEvent.detail;
        }
        if (even < 0) {
            num++;
            cltUi.actObjdown(num)
        } else if (even > 0) {
            num--;
            cltUi.actObjup(num)
        };
        if (num > $('.item').length - 1) {
            num = $('.item').length - 1;
            return false;
        } else if (num < 0) {
            num = 0;
            return false;
        };
        cltUi.mouseTrnas(num)
        $('.view').animate({
            'margin-top': -num * windowH
        }, 800);
        $('.nav_lnb li').eq(num).addClass('on').siblings().removeClass('on');
        return false;
    });
}

cltUi.navBtn = function (num, windowH) {
    var navH = $('.nav_lnb').height();
    $('.nav_lnb').css('margin-top', -navH / 2)
    $('.nav_lnb li').on('click', function () {
        if ($('.view').is(':animated')) {
            return false;
        }
        var idx = $(this).index();
        /* if(num==idx){return false}*/
        num = idx;
        $('.nav_lnb li').eq(num).addClass('on').siblings().removeClass('on')
        $('.view').animate({
            'margin-top': -num * windowH
        });
        cltUi.actObjdown(num);
        cltUi.mouseTrnas(num);
        return false;
    });
}

cltUi.actObjdown = function (a) {
    var aa = ($(window).height() - 950) / 2;
    if ($(window).height() < 600) {
        aa = -150;
    } else if ($(window).height() >= 950) {
        aa = 0;
    };
    console.log(aa)
    if ($('.item').hasClass('main01')) {
        if (a == 0) {
            $('.item:nth-child(1)').actObj({
                ele: 'span',
                st: '800px',
                et: 277 + aa + 'px',
                time: 1500,
                delay: false
            })
            $('.item:nth-child(1)').actObj({
                ele: 'h2',
                st: '800px',
                et: 378 + aa + 'px',
                time: 1500,
                delay: true,
                speed: 200
            })
            $('.item:nth-child(1)').actObj({
                ele: 'p',
                st: '800px',
                et: 514 + aa + 'px',
                time: 1500,
                delay: true,
                speed: 400
            })
            return false;
        } else if (a !== 0) {
            $('.item:nth-child(' + (a + 1) + ')').actObj({
                ele: 'h2',
                st: '800px',
                et: 306 + aa + 'px',
                time: 1500,
                delay: false
            })
            $('.item:nth-child(' + (a + 1) + ')').actObj({
                ele: 'p',
                st: '800px',
                et: 478 + aa + 'px',
                time: 1500,
                delay: true,
                speed: 200
            })
            $('.item:nth-child(' + (a + 1) + ')').actObj({
                ele: '.btn_main',
                st: '800px',
                et: 650 + aa + 'px',
                time: 1500,
                delay: true,
                speed: 400,
                marginL: true
            })
            return false;
        }
        // else if (a == 2) {
        //     $('.item:nth-child(3)').actObj({
        //         ele: 'h2',
        //         st: '800px',
        //         et: '306px',
        //         time: 1500,
        //         delay: false
        //     })
        //     $('.item:nth-child(3)').actObj({
        //         ele: 'p',
        //         st: '800px',
        //         et: '478px',
        //         time: 1500,
        //         delay: true,
        //         speed: 200
        //     })
        //     $('.item:nth-child(3)').actObj({
        //         ele: '.btn_main',
        //         st: '800px',
        //         et: '650px',
        //         time: 1500,
        //         delay: true,
        //         speed: 400,
        //         marginL: true
        //     });
        //     return false;
        // }
    } else {
        if (a == 0) {
            $('.item:nth-child(1)').actObj({
                ele: 'h2',
                st: '700px',
                et: '145px',
                time: 1500,
                delay: false
            })
            $('.item:nth-child(1)').actObj({
                ele: 'p',
                st: '700px',
                et: '215px',
                time: 1500,
                delay: true,
                speed: 200
            })
            $('.item:nth-child(1)').actObj({
                ele: 'span',
                st: '700px',
                et: '280px',
                time: 1500,
                delay: true,
                speed: 400
            })
            return false;
        } else if (a == 1) {
            $('.item:nth-child(2)').actObj({
                ele: 'h2',
                st: '700px',
                et: 256+aa+'px',
                time: 1500,
                delay: false
            })
            $('.item:nth-child(2)').actObj({
                ele: '.main02_txt',
                st: '700px',
                et: 400+aa+'px',
                time: 1500,
                delay: true,
                speed: 200
            })
            return false;
        } else if (a == 2) {
            if(180+aa<100){aa=-80};
            $('.item:nth-child(3)').actObj({
                ele: 'h2',
                st: '700px',
                et: 180+aa+'px',
                time: 1500,
                delay: false
            })
            $('.item:nth-child(3)').actObj({
                ele: 'p',
                st: '700px',
                et: 235+aa+'px',
                time: 1500,
                delay: true,
                speed: 200
            })
            $('.item:nth-child(3)').actObj({
                ele: '.sub_cara_slide',
                st: '700px',
                et: 295+aa+'px',
                time: 1500,
                delay: true,
                speed: 400
            });
            return false;
        }
    }
};

cltUi.actObjup = function (a) {
    var aa = ($(window).height() - 950) / 2;
    if ($(window).height() < 600) {
        aa = -150;
    } else if ($(window).height() >= 950) {
        aa = 0;
    };
    if ($('.item').hasClass('main01')) {
        if (a == 0) {
            $('.item:nth-child(1)').actObj({
                ele: 'span',
                st: '100px',
                et: 277 + aa + 'px',
                time: 1500,
                delay: true,
                speed: 400
            })
            $('.item:nth-child(1)').actObj({
                ele: 'h2',
                st: '100px',
                et: 378 + aa + 'px',
                time: 1500,
                delay: true,
                speed: 200
            })
            $('.item:nth-child(1)').actObj({
                ele: 'p',
                st: '100px',
                et: 514 + aa + 'px',
                time: 1500,
                delay: false
            })
            return false;
        } else if (a !== 0) {
            $('.item:nth-child(' + (a + 1) + ')').actObj({
                ele: 'h2',
                st: '100px',
                et: 306 + aa + 'px',
                time: 1500,
                delay: true,
                speed: 400
            })
            $('.item:nth-child(' + (a + 1) + ')').actObj({
                ele: 'p',
                st: '100px',
                et: 478 + aa + 'px',
                time: 1500,
                delay: true,
                speed: 200
            })
            $('.item:nth-child(' + (a + 1) + ')').actObj({
                ele: '.btn_main',
                st: '100px',
                et: 650 + aa + 'px',
                time: 1500,
                delay: false,
                marginL: true
            })
            return false;
        }
        // else if (a == 2) {
        //     $('.item:nth-child(3)').actObj({
        //         ele: 'h2',
        //         st: '100px',
        //         et: '306px',
        //         time: 1500,
        //         delay: true,
        //         speed: 400
        //     })
        //     $('.item:nth-child(3)').actObj({
        //         ele: 'p',
        //         st: '100px',
        //         et: '478px',
        //         time: 1500,
        //         delay: true,
        //         speed: 200
        //     })
        //     $('.item:nth-child(3)').actObj({
        //         ele: '.btn_main',
        //         st: '100px',
        //         et: '650px',
        //         time: 1500,
        //         delay: false,
        //         marginL: true
        //     })
        //     return false;
        // }
    } else if ($('.item').hasClass('main02')) {
        if (a == 0) {
            $('.item:nth-child(1)').actObj({
                ele: 'h2',
                st: '130px',
                et: '145px',
                time: 1500,
                delay: true,
                speed: 400
            })
            $('.item:nth-child(1)').actObj({
                ele: 'p',
                st: '100px',
                et: '215px',
                time: 1500,
                delay: true,
                speed: 200
            })
            $('.item:nth-child(1)').actObj({
                ele: 'span',
                st: '100px',
                et: '280px',
                time: 1500,
                delay: true,
                speed: 000
            })
            return false;
        } else if (a == 1) {
            $('.item:nth-child(2)').actObj({
                ele: 'h2',
                st: '100px',
                et: 256+aa+'px',
                time: 1500,
                delay: true,
                speed: 400
            })
            $('.item:nth-child(2)').actObj({
                ele: '.main02_txt',
                st: '100px',
                et: 400+aa+'px',
                time: 1500,
                delay: true,
                speed: 200
            })
            return false;
        } else if (a == 2) {
            if(180+aa<100){aa=-80};
            $('.item:nth-child(3)').actObj({
                ele: 'h2',
                st: '100px',
                et: 180+aa+'px',
                time: 1500,
                delay: true,
                speed: 400
            })
            $('.item:nth-child(3)').actObj({
                ele: 'p',
                st: '100px',
                et: 235+aa+'px',
                time: 1500,
                delay: true,
                speed: 200
            })
            $('.item:nth-child(3)').actObj({
                ele: '.sub_cara_slide',
                st: 295+aa+'px',
                et: '650px',
                time: 1500,
                delay: true,
                speed: 200
            })
            return false;
        }
    }
};

cltUi.centerObj = function () {
    var windowW = $('#container').width()
    itemEq0 = $('.item').eq(0);
    itemEq1 = $('.item').eq(1);
    itemEq2 = $('.item').eq(2);
    itemEq3 = $('.item').eq(3);
    itemEq4 = $('.item').eq(4);
    itemEq5 = $('.item').eq(5);

    itemEq0.find('span').css({
        'left': (windowW / 2) - (itemEq0.find('span').outerWidth(true) / 2)
    });
    itemEq1.find('.btn_main').css({
        'left': (windowW / 2)
    })
    itemEq2.find('.btn_main').css({
        'left': (windowW / 2)
    })
    itemEq2.find('span').css({
        'left': (windowW / 2) - (itemEq2.find('span').outerWidth(true) / 2)
    });
    itemEq3.find('.btn_main').css({
        'left': (windowW / 2)
    })
    itemEq3.find('span').css({
        'left': (windowW / 2) - (itemEq3.find('span').outerWidth(true) / 2)
    });
    itemEq4.find('.btn_main').css({
        'left': (windowW / 2)
    })
    itemEq4.find('.sub_cara_slide').css({
        'left': (windowW / 2) - (itemEq4.find('.sub_cara_slide').outerWidth(true) / 2)
    });
    itemEq5.find('.btn_main').css({
        'left': (windowW / 2)
    })
    itemEq5.find('.sub_cara_slide').css({
        'left': (windowW / 2) - (itemEq5.find('.sub_cara_slide').outerWidth(true) / 2)
    });

    return false;
}

cltUi.mouseTrnas = function (num) {
    if (num == $('.item').length - 1) {
        $('.main_wheel').css({
            'transform': 'rotate(-180deg)',
            '-webkit-transform': 'rotate(-180deg)',
            '-o-transform': 'rotate(-180deg)',
            '-mos-transform': 'rotate(-180deg)',
            '-ms-transform': 'rotate(-180deg)',
            'transition': 'transform 0.5s',
            '-webkit-transition': 'transform 0.5s',
            '-o-transition': 'transform 0.5s',
            '-mos-transition': 'transform 0.5s',
            '-ms-transition': 'transform 0.5s'
        })
    } else {
        $('.main_wheel').css({
            'transform': 'rotate(0deg)',
            '-webkit-transform': 'rotate(0deg)',
            '-o-transform': 'rotate(0deg)',
            '-mos-transform': 'rotate(0deg)',
            '-ms-transform': 'rotate(0deg)',
            'transition': 'transform 0.5s',
            '-webkit-transition': 'transform 0.5s',
            '-o-transition': 'transform 0.5s',
            '-mos-transition': 'transform 0.5s',
            '-ms-transition': 'transform 0.5s'
        })
    };
};

cltUi.Openpop = function () {
    $('.open_pop').popUp({
        layerPop: '.layer_pop',
        dim: false,
        fade: true,
        fixed: true
    });
    $('.open_s_pop').popUp({
        layerPop: ".layer_s_pop",
        dim: true,
        fade: false,
        fixed: false,
        display: 'none'
    });
}

cltUi.subActOpenpop = function () {
    $('.pop_box').css('height', $(window).height()-40)
    $('.pop_section>div').each(function (e) {
        $('.pop_section>div').eq(e).stop().css({
            'transform': 'translate3d(0px,0px,0)',
            'transition-delay': +(e * 0.2) + 's'
        }).animate({
            'opacity': 1
        })
    });
    return false;
}

/*cltUi.subActClosepop = function () {
    $('.pop_section>div').each(function (e) {
        switch (e) {
            case 0:
                $('.pop_section>div').eq(e).stop().css({
                    'transform': 'translate3d(-300px,-300px,0)',
                    'transition-delay': '1.2s'
                }).animate({
                    'opacity': 0
                });
                break;
            case 1:
                $('.pop_section>div').eq(e).stop().css({
                    'transform': 'translate3d(0px,-300px,0)',
                    'transition-delay': '1s'
                }).animate({
                    'opacity': 0
                });
                break;
            case 2:
                $('.pop_section>div').eq(e).stop().css({
                    'transform': 'translate3d(300px,-300px,0)',
                    'transition-delay': '0.8s'
                }).animate({
                    'opacity': 0
                });
                break;
            case 3:
                $('.pop_section>div').eq(e).stop().css({
                    'transform': 'translate3d(-300px,-300px,0)',
                    'transition-delay': '0.6s'
                }).animate({
                    'opacity': 0
                });
                break;
            case 4:
                $('.pop_section>div').eq(e).stop().css({
                    'transform': 'translate3d(-300px,300px,0)',
                    'transition-delay': '0.4s'
                }).animate({
                    'opacity': 0
                });
                break;
            case 5:
                $('.pop_section>div').eq(e).stop().css({
                    'transform': 'translate3d(300px,300px,0)',
                    'transition-delay': '0.2s'
                }).animate({
                    'opacity': 0
                });
                break;
            case 6:
                $('.pop_section>div').eq(e).stop().css({
                    'transform': 'translate3d(300px,300px,0)',
                    'transition-delay': '0s'
                }).animate({
                    'opacity': 0
                });
                break;
        }
    });
    return false;
}*/

cltUi.subMain = function () {
    var rows = [],
        rows02 = [],
        idx = 0,
        idxLength = $('.sub_slide_item>div').length,
        itemWidth = $('.sub_slide_item>div').width(),
        mm = [];
    $('.sub_slide_txt>div').each(function (e) {
        mm.push({
            tit: $('.sub_slide_txt>div').eq(e).children('h2').html(),
            txt: $('.sub_slide_txt>div').eq(e).children('p').html()
        });
    });
    $('.sub_slide_txt>div').eq(idx).siblings().remove();
    $('.sub_slide_item>div').each(function (e) {
        rows[e] = $('.sub_slide_item>div').eq(e).clone();
    });
    $('.sub_slide_item').html(rows[idx]);
    $('.sub_cara_bnt>a').on('click', function () {
        var this_class = $(this).attr('class');
        if ($('.sub_slide_item').is(':animated')) {
            return false;
        }
        if (this_class == 'cara_prev') {
            idx--;
            if (idx < 0) {
                idx = idxLength - 1
            };
            $('.sub_slide_item').css('margin-left', -itemWidth);
            $('.sub_slide_item').prepend(rows[idx]);
            $('.sub_slide_item').animate({
                'margin-left': 0
            }, 1000, 'easeInOutCubic', function () {
                $('.sub_slide_item>div').last().remove();
                $('.sub_slide_item').removeAttr('style');
            });
        } else if (this_class == 'cara_next') {
            idx++;
            if (idx > idxLength - 1) {
                idx = 0
            }
            $('.sub_slide_item').append(rows[idx]);
            $('.sub_slide_item').animate({
                'margin-left': -itemWidth
            }, 1000, 'easeInOutCubic', function () {
                $('.sub_slide_item>div').first().remove();
                $('.sub_slide_item').removeAttr('style');
            });
        };
        $('.sub_slide_txt>div').children('h2').html(mm[idx].tit);
        $('.sub_slide_txt>div').children('p').html(mm[idx].txt);

        if ($('.sub_slide_txt>div').children('h2').height() > 60) {
            $('.sub_slide_txt>div').children('h2').css('font-size', '40px')
        } else {
            $('.sub_slide_txt>div').children('h2').css('font-size', '50px')
        }
        return false;
    });
}

/*팝업*/
jQuery.fn.popUp = function (opts) {
    var $opts = {
        layerPop: '.layer',
        fade: false,
        dim: true,
        fixed: false,
        top: 0,
        left: 0,
        display: 'none'
    };
    $.extend($opts, opts);
    var $popL = $($opts.layerPop);
    var $select = $(this);
    var $href = $(this).attr('href');
    var $fade = $opts.fade;
    var $dim = $opts.dim;
    var $fixed = $opts.fixed;
    var $display = $opts.display;
    var $top = $opts.top;
    var $left = $opts.left;

    //위치값 계산
    var bodyH = $(window).outerHeight();
    var bodyW = $(window).outerWidth();
    var layerH = $popL.outerHeight();
    var layerW = $popL.outerWidth();
    var centerH = (bodyH / 2) - (layerH / 2);
    var centerW = -layerW / 2;

    // 샘플 필요시
    if ($display == 'block') {
        $popL.attr('tabindex', 0).show().focus();
        $popL.css({
            "top": centerH,
            'margin-left': centerW,
            zIndex: 99999
        });

        $('#wrap').append('<div class="dim"></div>')
        $(".dim").show();
        $(".dim").css({
            background: '#000',
            opacity: '0.7',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 99998
        });
        if ($dim == false) {
            $(".dim").hide();
        }

        if ($fixed == true) {
            $popL.css({
                "top": $top, //centerH
                "left": $left, //centerW,
                zIndex: 99998
            });
        }

        return false
    }

    return $select.on("click", function (e) {

        if ($popL.is(':animated')) {
            return false;
        }
        /*페이드 효과*/


        if ($fade == false) {
            $($href).attr('tabindex', 0).show().focus();
        } else {
            $($href).attr('tabindex', 0).stop().fadeIn().focus();

            if ($fixed == true) {
                cltUi.subActOpenpop();
            }
        }
        /*딤 생성*/
        if ($dim == true) {
            $('#wrap').append('<div class="dim"></div>')
            $(".dim").show();
            $(".dim").css({
                background: '#000',
                opacity: '0.7',
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 99998
            })
        } else if ($dim == false) {
            $(".dim").hide();
        }

        if ($fixed == true) {
            $popL.css({
                "top": $top, //centerH
                "left": $left, //centerW,
                zIndex: 99998
            });
        } else {
            $popL.css({
                "top": centerH,
                'margin-left': centerW,
                position: 'fixed',
                zIndex: 99999
            });
        }
        $("body").css({
            "overflow": 'hidden'
        });

        $popL.find('.cls').on("click", function () {
            
            if ($popL.is(':animated')) {
                return false;
            }
            var $this = $(this);

            $popL.css({
                top: 0,
                position: 'absolute',
            })
            $(".dim").remove();
            $("body").css({
                "overflow": 'inherit'
            });
            $select.focus();
            
            if ($fade == false) {
                $popL.hide();
               
                return false
            } else {
                
                $popL.stop().fadeOut();
                if ($fixed == true) {
                   
                    $popL.stop().delay(1000).fadeOut();
                    //  cltUi.subActClosepop();
                }
                return false;
            }
           
        });
    });
}
/* // 팝업*/

/*메인 글자액션*/
jQuery.fn.actObj = function (opts) {
    var $actBox = $(this),
        windowW = $('#container').width(),
        $opts = {
            ele: 'h2',
            st: '800px',
            et: '277px',
            time: 1500,
            delay: false,
            speed: 200,
            marginL: false
        };
    $.extend($opts, opts);

    var $els = $opts.ele,
        $st = $opts.st,
        $et = $opts.et,
        $time = $opts.time,
        $delay = $opts.delay,
        $speed = $opts.speed,
        $marginL = $opts.marginL

    if ($delay == true && $marginL == true) {
        $actBox.find($els).stop().css({
            'opacity': 0,
            'top': $st,
            'left': windowW / 2
            // 'margin-left': -$actBox.find($els).width() / 2
        }).delay(1.5 * $speed).animate({
            'opacity': 1,
            'top': $et
        }, $time, 'easeInOutCubic');
        return false;
    }
    if ($marginL == true) {
        $actBox.find($els).stop().css({
            'opacity': 0,
            'top': $st,
            'left': windowW / 2
            // 'margin-left': -$actBox.find($els).width() / 2
        }).animate({
            'opacity': 1,
            'top': $et
        }, $time, 'easeInOutCubic');
        return false;
    }
    if ($delay == false) {
        $actBox.find($els).stop().css({
            'opacity': 0,
            'top': $st
            // 'left': windowW / 2 - ($actBox.find($els).width() / 2)
        }).animate({
            'opacity': 1,
            'top': $et
        }, $time, 'easeInOutCubic');
        return false;
    }
    if ($delay == true) {
        $actBox.find($els).stop().css({
            'opacity': 0,
            'top': $st
            // 'left': windowW / 2 - ($actBox.find($els).width() / 2)
        }).delay(1.5 * $speed).animate({
            'opacity': 1,
            'top': $et
        }, $time, 'easeInOutCubic')
        return false;
    }
}

/*토글*/
jQuery.fn.cltToggle = function (opts) {
    var $ele = $(this);
    $opts = {
        open: false,
        set: false,
        pri: false
    };
    $.extend($opts, opts);

    var $open = $opts.open;
    var $set = $opts.set;
    var $pri = $opts.pri;

    if ($open == true) {
        $ele.find('dd').show()
        $ele.find('dt a').addClass('on')
    }

    if ($set == true) {
        $ele.addClass('set');
    } else {
        $ele.removeClass('set');
    }
    return $ele.find('dt > a').on('click', function (event) {
        event.stopPropagation();
        var act = $(this).hasClass('on');
        if ($open == true) {
            if (act == false) {
                if ($pri == true) {
                    $(this).addClass('on');
                    $(this).parent().next('dd').slideDown('fast');

                } else if ($pri == false) {
                    $ele.find('dt a').removeClass('on');
                    $(this).addClass('on')
                    $ele.find('dd').slideUp('fast');
                    $(this).parent().next().slideDown('fast');

                }

                if ($set == true) {
                    $(this).parent().parent().parent().parent().find('dd').slideDown('fast');
                    $(this).parent().parent().parent().parent().find('dt > a').addClass('on');
                    return false;
                }
                return false;
            } else if (act == true) {
                if ($pri == true) {
                    $(this).removeClass('on');
                    $(this).parent().next('dd').slideUp('fast');

                } else if ($pri == false) {
                    $(this).removeClass('on')
                    $(this).parent().next().slideUp('fast');

                }
                if ($set == true) {                  
                    
                    $(this).parent().parent().parent().parent().find('dt a').removeClass('on');
                    $(this).parent().parent().parent().parent().find('dd').slideUp('fast');
                    return false;
                }
                return false;
            }
            return false;
        } else if ($open == false) {
            if (act == false) {
                if ($pri == true) {
                    $(this).addClass('on');
                    $(this).parent().next('dd').slideDown('fast');
                    return false
                }

                if ($set == true) {
                    $(this).parent().parent().parent().parent().find('dd').slideDown('fast');
                    $(this).parent().parent().parent().parent().find('dt > a').addClass('on');
                    return false;
                }

                $ele.find('dt a').removeClass('on');
                $(this).addClass('on');
                $ele.find('dd').slideUp('fast').removeClass('on');
                $(this).parent().next('dd').slideDown('fast');
            } else {
                if ($pri == true) {
                    $(this).removeClass('on');
                    $(this).parent().next('dd').slideUp('fast');
                    return false
                }

                if ($set == true) {
                    $(this).parent().parent().parent().parent().find('dt a').removeClass('on');
                    $(this).parent().parent().parent().parent().find('dd').slideUp('fast');
                    return false;
                }
                $ele.find('dt a').removeClass('on');
                $(this).parent().next('dd').slideUp('fast');
            }
            return false;
        }
    })
}

$(window).on('resize load', function () {
    cltUi.centerObj();
})
