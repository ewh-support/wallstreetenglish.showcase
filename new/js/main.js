$(document).ready(function () {
    $(".img-lazy").unveil(100, function () {
        $(this).load(function () {
            this.style.opacity = 1;
        });
    });
    window.addEventListener('resize', function () {
        ($(".img-lazy").trigger('unveil'));
    }, true);
    $.validator.addMethod("checkphone", function (value, element) {
        $result = true;
        $format_string = value.replace(/[^\d]/g, "");
        $length = $format_string.length;
        if ($length == 10) {
            patt = new RegExp(/^09[0-9]{8}$/g);
            $result = patt.test($format_string);
            patt = new RegExp(/^088[0-9]{7}$/g);
            $result = $result == true ? $result : patt.test($format_string);
            patt = new RegExp(/^086[0-9]{7}$/g);
            $result = $result == true ? $result : patt.test($format_string);
            patt = new RegExp(/^089[0-9]{7}$/g);
            $result = $result == true ? $result : patt.test($format_string);
        }
        else if ($length == 11) {
            patt = new RegExp(/^01[0-9]{9}$/g);
            $result = patt.test($format_string);
        }
        else {
            $result = false;
        }
        return $result;
    }, 'This is wrong format phone');
    $("[type='submit']").prop("disabled", false);
    $(".contact-form").each(function () {
        $form = $(this);
        $form.validate({
            ignore: ".ignore",
            errorClass: "text-white text-center",
            errorElement: 'p',
            rules: {
                fullname: {required: true},
                email: {required: true, email: true},
                phone: {required: true, checkphone: true},
                sales_act_id: {required: true},
                cityform: {required: true},
                yearform: {required: true},
            },
            errorPlacement: function (error, element) {
                $element = $(element);
                $type = $element.attr('type');
                if ($type != 'radio') {
                    $element.after($(error));
                } else {
                    $element.closest('.inline-row').find('.col-error').append($(error));
                }
            },
            submitHandler: function (form) {
                var current_url = window.location.href;
                var params = $(form).serialize() + '&current_url=' + current_url;
                dataLayer.push({'event': 'GAevent', 'eventCategory': 'Contact', 'eventAction': 'Send Contact'});
                var myurl = '/' + $('html').attr('lang') + "/sendcontact";
                $.ajax({
                    url: myurl, type: 'post', data: params, beforeSend: function () {
                        $(form).find('.submit_form').html('Đang gửi...');
                        $(form).find('.submit_form').attr("disabled", true);
                    }, success: function (data) {
                        if ($("html").attr("lang") == "vi") {
                            document.location = "/" + $("html").attr("lang") + "/phuong-phap-hoc-tieng-anh.html";
                        } else {
                            document.location = "/" + $("html").attr("lang") + "/our-method.html";
                        }
                    }, error: function (error) {
                        console.log(error);
                    }
                });
            },
        });
    })
    //if ($('#main_video').size() > 0) {
    //    jwplayer("main_video").setup({
    //        file: "/files/videos/method/WSE_UNIQUE_METHOD.mp4",
    //        image: "/files/videos/video-cover-our-method.png",
    //        width: "100%",
    //        aspectratio: "9:5"
    //    }).onPlay(function () {
    //    });
    //}

    $(window).load(function () {
        $("#top-button").click(function () {
            $("body,html").animate({scrollTop: 0, duration: 1000});
        });
    })
    $('.carousel-banner').carousel({interval: false});
    $('.carousel-banner').bind('slide.bs.carousel', function (e) {
        var idx = $('.carousel-inner .item.active').index();
        if (idx == '0') {
        } else {
        }
    });
    $('#carousel-prmotion').on('slide.bs.carousel', function () {
        $(".img-lazy").trigger('unveil');
    })
    var paused = false;
    var curr_action = $app.action;
    if (curr_action == "courses") {
        var position = '700';
    } else {
        var position = '1500';
    }
    $(document).scroll(function () {
        var top = $(this).scrollTop();
        if (top > 500) {
            $("#top-button").addClass('show');
        } else {
            $("#top-button").removeClass('show');
        }
        var position_animation = '70';
        var height_up = '-10';
        if(!$(".scare-english")[0]){
        if ($(window).scrollTop() > position && $(window).scrollTop() > $("#body").offset().top) {
            if (!paused) {
                var space_height = position_animation;
                var space_top = "0";
                for (i = 1; i < 21; i++) {
                    $(".chart" + i).animate({height: position_animation + "px", marginTop: height_up + "px"}, 500);
                }
                paused = true;
            }
            $('.sizeBox').show();
        }
        }
    });
    $('#block-right-mobile .block-mobile-click').on('click', function () {
        if ($(this).find('.fa').hasClass('fa-arrow-left')) {
            $('#block-right-mobile').css('right', '0');
            $(this).find('.fa').removeClass('fa-arrow-left').addClass("fa-arrow-right");
        } else {
            $('#block-right-mobile').css('right', '-60px');
            $(this).find('.fa').removeClass('fa-arrow-right').addClass("fa-arrow-left");
        }
    });
    $(".show-contact").on('click', function () {
        var popup = $("#block-right").attr("data-status");
        if (popup == "0") {
            $("#block-right").css('right', 0);
            $("#block-right").attr("data-status", "1");
        } else {
            $("#block-right").css('right', '-300px');
            $("#block-right").attr("data-status", "0");
        }
        return false;
    });
    $(".close_popup").on('click', function () {
        $("#block-right").attr("data-status", "0");
        $("#block-right").css('right', '-300px');
    });
    $('.display-test').on('click', function () {
        $('.actived').removeClass('actived');
        $(this).addClass('actived');
        $('.test-info').hide();
        var curr = $(this).data('type');
        $('.' + curr).show();
    });
    $('.btn-language').click(function () {
        var routeName = $(this).data('routename');
        console.log(routeName);
        var params = $(this).data('params');
        var lang = $(this).data('lang');
        changeLanguage(lang, routeName, params);
        return false;
    })
});
function changeLanguage(lang, routeName, params) {
    if (routeName.indexOf('blog') > -1) {
        $.ajax({
            url: "/" + lang + "/blog/index/locale",
            data: {lang: lang, route_name: routeName, route_params: params},
            cache: false,
            type: "POST",
            async: false,
            success: function (data) {
                data = JSON.parse(data);
                console.log(data);
                if (data.success) {
                    document.location = data.url;
                }
            },
            error: function (data) {
            }
        });
    } else {
        $.ajax({
            url: "/" + lang + "/index/locale",
            data: {lang: lang, route_name: routeName, route_params: params},
            cache: false,
            type: "POST",
            async: false,
            success: function (data) {
                data = JSON.parse(data);
                console.log(data);
                if (data.success) {
                    if ((location.pathname != '/') && (location.pathname != '/en/home.html')) {
                        if (routeName != 'alumni/default') {
                            document.location = data.url;
                        }
                    } else {
                        if (location.pathname == '/en/home.html') {
                            document.location = "/";
                        } else {
                            location.reload();
                        }
                    }
                }
            },
            error: function (data) {
            }
        });
    }
    return false;
}
var zChar = new Array(' ', '(', ')', '-', '.');
var maxphonelength = 20;
var phonevalue1;
var phonevalue2;
var cursorposition;
function ParseForNumber1(object) {
    phonevalue1 = ParseChar(object.value, zChar);
}
function ParseForNumber2(object) {
    phonevalue2 = ParseChar(object.value, zChar);
}
function backspacerUP(object, e) {
    if (e) {
        e = e
    } else {
        e = window.event
    }
    if (e.which) {
        var keycode = e.which
    } else {
        var keycode = e.keyCode
    }
    ParseForNumber1(object)
    if (keycode >= 48) {
        ValidatePhone(object)
    }
}
function backspacerDOWN(object, e) {
    if (e) {
        e = e
    } else {
        e = window.event
    }
    if (e.which) {
        var keycode = e.which
    } else {
        var keycode = e.keyCode
    }
    ParseForNumber2(object)
}
function GetCursorPosition() {
    var t1 = phonevalue1;
    var t2 = phonevalue2;
    var bool = false;
    for (i = 0; i < t1.length; i++) {
        if (t1.substring(i, 1) != t2.substring(i, 1)) {
            if (!bool) {
                cursorposition = i
                window.status = cursorposition
                bool = true
            }
        }
    }
}
function ValidatePhone(object) {
    var p = phonevalue1
    p = p.replace(/[^\d]*/gi, "")
    if (p.length < 3) {
        object.value = p
        if (p.length == 2) {
            if (p == "09") {
                maxphonelength = 14;
            } else {
                maxphonelength = 15;
            }
            if (p == "84") {
                object.value = "0";
            }
        }
    } else if (p.length == 3) {
        pp = p;
        d4 = p.indexOf('(')
        d5 = p.indexOf(')')
        if (d4 == -1) {
            pp = "(" + pp;
        }
        if (d5 == -1) {
            pp = pp + ")";
        }
        object.value = pp;
    } else if (p.length > 3 && p.length < 7) {
        p = "(" + p;
        l30 = p.length;
        p30 = p.substring(0, 4);
        p30 = p30 + ") "
        p31 = p.substring(4, l30);
        pp = p30 + p31;
        object.value = pp;
    } else if (p.length >= 7) {
        p = "(" + p;
        l30 = p.length;
        p30 = p.substring(0, 4);
        p30 = p30 + ") "
        p31 = p.substring(4, l30);
        pp = p30 + p31;
        l40 = pp.length;
        p40 = pp.substring(0, 9);
        p40 = p40 + "-"
        p41 = pp.substring(9, l40);
        ppp = p40 + p41;
        object.value = ppp.substring(0, maxphonelength);
    }
    GetCursorPosition()
    if (cursorposition >= 0) {
        if (cursorposition == 0) {
            cursorposition = 2
        } else if (cursorposition <= 2) {
            cursorposition = cursorposition + 1
        } else if (cursorposition <= 4) {
            cursorposition = cursorposition + 3
        } else if (cursorposition == 5) {
            cursorposition = cursorposition + 3
        } else if (cursorposition == 6) {
            cursorposition = cursorposition + 3
        } else if (cursorposition == 7) {
            cursorposition = cursorposition + 4
        } else if (cursorposition == 8) {
            cursorposition = cursorposition + 4
            e1 = object.value.indexOf(')')
            e2 = object.value.indexOf('-')
            if (e1 > -1 && e2 > -1) {
                if (e2 - e1 == 4) {
                    cursorposition = cursorposition - 1
                }
            }
        } else if (cursorposition == 9) {
            cursorposition = cursorposition + 4
        } else if (cursorposition < 11) {
            cursorposition = cursorposition + 3
        } else if (cursorposition == 11) {
            cursorposition = cursorposition + 1
        } else if (cursorposition == 12) {
            cursorposition = cursorposition + 1
        } else if (cursorposition >= 13) {
            cursorposition = cursorposition
        }
    }
}
function ParseChar(sStr, sChar) {
    if (sChar.length == null) {
        zChar = new Array(sChar);
    } else zChar = sChar;
    for (i = 0; i < zChar.length; i++) {
        sNewStr = "";
        var iStart = 0;
        var iEnd = sStr.indexOf(sChar[i]);
        while (iEnd != -1) {
            sNewStr += sStr.substring(iStart, iEnd);
            iStart = iEnd + 1;
            iEnd = sStr.indexOf(sChar[i], iStart);
        }
        sNewStr += sStr.substring(sStr.lastIndexOf(sChar[i]) + 1, sStr.length);
        sStr = sNewStr;
    }
    return sNewStr;
}
function titleMetaTag() {
    if ($("meta[property='og:title']").length > 0) {
        $("title").text($("meta[property='og:title']").attr('content'));
    }
}
titleMetaTag();
$(document).on('click', '.has-news', function () {
    $("#notification-dropdown").show();
});
$(document).on('click', '.has-news[aria-expanded="true"]', function () {
    $("#notification-dropdown").hide();
    $(this).attr('aria-expanded', false);
})
$(document).on('click', function () {
    $("#notification-dropdown").hide();
});
$(".call-phone").on("click", function () {
    dataLayer.push({'event': 'GAevent', 'eventCategory': 'Homepage CTA', 'eventAction': 'Call'});
})
$(".learnmore").on("click", function () {
    dataLayer.push({'event': 'GAevent', 'eventCategory': 'Homepage CTA', 'eventAction': 'See More'});
})
$(document).ready(function () {
    if ($("#banner-video-modal").length > 0) {
        $("#banner-video-modal").on("hide.bs.modal", function () {
            var iframe = $("#banner-video-frame")[0];
            console.log(iframe);
            iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        });
    }
});