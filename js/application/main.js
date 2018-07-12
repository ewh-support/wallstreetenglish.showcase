//css browser
// var uaInfo={ua:'',is:function(t){return RegExp(t,"i").test(uaInfo.ua);},version:function(p,n){n=n.replace(".","_");var i=n.indexOf('_'),ver="";while(i>0){ver+=" "+p+n.substring(0,i);i=n.indexOf('_',i+1);}
// ver+=" "+p+n;return ver;},getBrowser:function(){var g='gecko',w='webkit',c='chrome',f='firefox',s='safari',o='opera',a='android',bb='blackberry',dv='device_',ua=uaInfo.ua,is=uaInfo.is;return[(!(/opera|webtv/i.test(ua))&&/msie\s(\d+)/.test(ua))?('ie ie'+(/trident\/4\.0/.test(ua)?'8':RegExp.$1)):is('firefox/')?g+" "+f+(/firefox\/((\d+)(\.(\d+))(\.\d+)*)/.test(ua)?' '+f+RegExp.$2+' '+f+RegExp.$2+"_"+RegExp.$4:''):is('gecko/')?g:is('opera')?o+(/version\/((\d+)(\.(\d+))(\.\d+)*)/.test(ua)?' '+o+RegExp.$2+' '+o+RegExp.$2+"_"+RegExp.$4:(/opera(\s|\/)(\d+)\.(\d+)/.test(ua)?' '+o+RegExp.$2+" "+o+RegExp.$2+"_"+RegExp.$3:'')):is('konqueror')?'konqueror':is('blackberry')?(bb+(/Version\/(\d+)(\.(\d+)+)/i.test(ua)?" "+bb+RegExp.$1+" "+bb+RegExp.$1+RegExp.$2.replace('.','_'):(/Blackberry ?(([0-9]+)([a-z]?))[\/|;]/gi.test(ua)?' '+bb+RegExp.$2+(RegExp.$3?' '+bb+RegExp.$2+RegExp.$3:''):''))):is('android')?(a+(/Version\/(\d+)(\.(\d+))+/i.test(ua)?" "+a+RegExp.$1+" "+a+RegExp.$1+RegExp.$2.replace('.','_'):'')+(/Android (.+); (.+) Build/i.test(ua)?' '+dv+((RegExp.$2).replace(/ /g,"_")).replace(/-/g,"_"):'')):is('chrome')?w+' '+c+(/chrome\/((\d+)(\.(\d+))(\.\d+)*)/.test(ua)?' '+c+RegExp.$2+((RegExp.$4>0)?' '+c+RegExp.$2+"_"+RegExp.$4:''):''):is('iron')?w+' iron':is('applewebkit/')?(w+' '+s+(/version\/((\d+)(\.(\d+))(\.\d+)*)/.test(ua)?' '+s+RegExp.$2+" "+s+RegExp.$2+RegExp.$3.replace('.','_'):(/ Safari\/(\d+)/i.test(ua)?((RegExp.$1=="419"||RegExp.$1=="417"||RegExp.$1=="416"||RegExp.$1=="412")?' '+s+'2_0':RegExp.$1=="312"?' '+s+'1_3':RegExp.$1=="125"?' '+s+'1_2':RegExp.$1=="85"?' '+s+'1_0':''):''))):is('mozilla/')?g:''];},getPlatform:function(){var ua=uaInfo.ua,version=uaInfo.version,is=uaInfo.is;return[is('j2me')?'j2me':is('ipad|ipod|iphone')?((/CPU( iPhone)? OS (\d+[_|\.]\d+([_|\.]\d+)*)/i.test(ua)?'ios'+version('ios',RegExp.$2):'')+' '+(/(ip(ad|od|hone))/gi.test(ua)?RegExp.$1:"")):is('playbook')?'playbook':is('kindle|silk')?'kindle':is('playbook')?'playbook':is('mac')?'mac'+(/mac os x ((\d+)[.|_](\d+))/.test(ua)?(' mac'+(RegExp.$2)+' mac'+(RegExp.$1).replace('.',"_")):''):is('win')?'win'+(is('windows nt 6.2')?' win8':is('windows nt 6.1')?' win7':is('windows nt 6.0')?' vista':is('windows nt 5.2')||is('windows nt 5.1')?' win_xp':is('windows nt 5.0')?' win_2k':is('windows nt 4.0')||is('WinNT4.0')?' win_nt':''):is('freebsd')?'freebsd':is('x11|linux')?'linux':''];},getMobile:function(){var is=uaInfo.is;return[is("android|mobi|mobile|j2me|iphone|ipod|ipad|blackberry|playbook|kindle|silk")?'mobile':''];},getIpadApp:function(){var is=uaInfo.is;return[(is('ipad|iphone|ipod')&&!is('safari'))?'ipad_app':''];},getLang:function(){var ua=uaInfo.ua;return[/[; |\[](([a-z]{2})(\-[a-z]{2})?)[)|;|\]]/i.test(ua)?('lang_'+RegExp.$2).replace("-","_")+(RegExp.$3!=''?(' '+'lang_'+RegExp.$1).replace("-","_"):''):''];}}
// var screenInfo={width:(window.outerWidth||html.clientWidth)-15,height:window.outerHeight||html.clientHeight,screens:[0,768,980,1200],screenSize:function(){screenInfo.width=(window.outerWidth||html.clientWidth)-15;screenInfo.height=window.outerHeight||html.clientHeight;var screens=screenInfo.screens,i=screens.length,arr=[],maxw,minw;while(i--){if(screenInfo.width>=screens[i]){if(i){arr.push("minw_"+screens[(i)]);}
// if(i<=2){arr.push("maxw_"+(screens[(i)+1]-1));}
// break;}}
// return arr;},getOrientation:function(){return screenInfo.width<screenInfo.height?["orientation_portrait"]:["orientation_landscape"];},getInfo:function(){var arr=[];arr=arr.concat(screenInfo.screenSize());arr=arr.concat(screenInfo.getOrientation());return arr;},getPixelRatio:function(){var arr=[],pixelRatio=window.devicePixelRatio?window.devicePixelRatio:1;if(pixelRatio>1){arr.push('retina_'+parseInt(pixelRatio)+'x');arr.push('hidpi');}else{arr.push('no-hidpi');}
// return arr;}}
// var dataUriInfo={data:new Image(),div:document.createElement("div"),isIeLessThan9:false,getImg:function(){dataUriInfo.data.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";dataUriInfo.div.innerHTML="<!--[if lt IE 9]><i></i><![endif]-->";dataUriInfo.isIeLessThan9=dataUriInfo.div.getElementsByTagName("i").length==1;return dataUriInfo.data;},checkSupport:function(){if(dataUriInfo.data.width!=1||dataUriInfo.data.height!=1||dataUriInfo.isIeLessThan9){return["no-datauri"];}
// else{return["datauri"];}}}
// function css_browser_selector(u,ns){var html=document.documentElement,b=[]
// ns=ns?ns:"";uaInfo.ua=u.toLowerCase();b=b.concat(uaInfo.getBrowser());b=b.concat(uaInfo.getPlatform());b=b.concat(uaInfo.getMobile());b=b.concat(uaInfo.getIpadApp());b=b.concat(uaInfo.getLang());b=b.concat(['js']);b=b.concat(screenInfo.getPixelRatio());b=b.concat(screenInfo.getInfo());var updateScreen=function(){html.className=html.className.replace(/ ?orientation_\w+/g,"").replace(/ [min|max|cl]+[w|h]_\d+/g,"");html.className=html.className+' '+screenInfo.getInfo().join(' ');}
// window.addEventListener('resize',updateScreen);window.addEventListener('orientationchange',updateScreen);var data=dataUriInfo.getImg();data.onload=data.onerror=function(){html.className+=' '+dataUriInfo.checkSupport().join(' ');}
// b=b.filter(function(e){return e;});b[0]=ns?ns+b[0]:b[0];html.className=b.join(' '+ns);return html.className;}
// var css_browser_selector_ns=css_browser_selector_ns||"";css_browser_selector(navigator.userAgent,css_browser_selector_ns);
//bootstrap min
if (!jQuery)throw new Error("Bootstrap requires jQuery");
+function (a) {
    "use strict";
    function b() {
        var a = document.createElement("bootstrap"), b = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var c in b)if (void 0 !== a.style[c])return {end: b[c]}
    }

    a.fn.emulateTransitionEnd = function (b) {
        var c = !1, d = this;
        a(this).one(a.support.transition.end, function () {
            c = !0
        });
        var e = function () {
            c || a(d).trigger(a.support.transition.end)
        };
        return setTimeout(e, b), this
    }, a(function () {
        a.support.transition = b()
    })
}(window.jQuery), +function (a) {
    "use strict";
    var b = '[data-dismiss="alert"]', c = function (c) {
        a(c).on("click", b, this.close)
    };
    c.prototype.close = function (b) {
        function c() {
            f.trigger("closed.bs.alert").remove()
        }

        var d = a(this), e = d.attr("data-target");
        e || (e = d.attr("href"), e = e && e.replace(/.*(?=#[^\s]*$)/, ""));
        var f = a(e);
        b && b.preventDefault(), f.length || (f = d.hasClass("alert") ? d : d.parent()), f.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one(a.support.transition.end, c).emulateTransitionEnd(150) : c())
    };
    var d = a.fn.alert;
    a.fn.alert = function (b) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.alert");
            e || d.data("bs.alert", e = new c(this)), "string" == typeof b && e[b].call(d)
        })
    }, a.fn.alert.Constructor = c, a.fn.alert.noConflict = function () {
        return a.fn.alert = d, this
    }, a(document).on("click.bs.alert.data-api", b, c.prototype.close)
}(window.jQuery), +function (a) {
    "use strict";
    var b = function (c, d) {
        this.$element = a(c), this.options = a.extend({}, b.DEFAULTS, d)
    };
    b.DEFAULTS = {loadingText: "loading..."}, b.prototype.setState = function (a) {
        var b = "disabled", c = this.$element, d = c.is("input") ? "val" : "html", e = c.data();
        a += "Text", e.resetText || c.data("resetText", c[d]()), c[d](e[a] || this.options[a]), setTimeout(function () {
            "loadingText" == a ? c.addClass(b).attr(b, b) : c.removeClass(b).removeAttr(b)
        }, 0)
    }, b.prototype.toggle = function () {
        var a = this.$element.closest('[data-toggle="buttons"]');
        if (a.length) {
            var b = this.$element.find("input").prop("checked", !this.$element.hasClass("active")).trigger("change");
            "radio" === b.prop("type") && a.find(".active").removeClass("active")
        }
        this.$element.toggleClass("active")
    };
    var c = a.fn.button;
    a.fn.button = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.button"), f = "object" == typeof c && c;
            e || d.data("bs.button", e = new b(this, f)), "toggle" == c ? e.toggle() : c && e.setState(c)
        })
    }, a.fn.button.Constructor = b, a.fn.button.noConflict = function () {
        return a.fn.button = c, this
    }, a(document).on("click.bs.button.data-api", "[data-toggle^=button]", function (b) {
        var c = a(b.target);
        c.hasClass("btn") || (c = c.closest(".btn")), c.button("toggle"), b.preventDefault()
    })
}(window.jQuery), +function (a) {
    "use strict";
    var b = function (b, c) {
        this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = this.sliding = this.interval = this.$active = this.$items = null, "hover" == this.options.pause && this.$element.on("mouseenter", a.proxy(this.pause, this)).on("mouseleave", a.proxy(this.cycle, this))
    };
    b.DEFAULTS = {interval: 5e3, pause: "hover", wrap: !0}, b.prototype.cycle = function (b) {
        return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
    }, b.prototype.getActiveIndex = function () {
        return this.$active = this.$element.find(".item.active"), this.$items = this.$active.parent().children(), this.$items.index(this.$active)
    }, b.prototype.to = function (b) {
        var c = this, d = this.getActiveIndex();
        return b > this.$items.length - 1 || 0 > b ? void 0 : this.sliding ? this.$element.one("slid", function () {
            c.to(b)
        }) : d == b ? this.pause().cycle() : this.slide(b > d ? "next" : "prev", a(this.$items[b]))
    }, b.prototype.pause = function (b) {
        return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition.end && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, b.prototype.next = function () {
        return this.sliding ? void 0 : this.slide("next")
    }, b.prototype.prev = function () {
        return this.sliding ? void 0 : this.slide("prev")
    }, b.prototype.slide = function (b, c) {
        var d = this.$element.find(".item.active"), e = c || d[b](), f = this.interval, g = "next" == b ? "left" : "right", h = "next" == b ? "first" : "last", i = this;
        if (!e.length) {
            if (!this.options.wrap)return;
            e = this.$element.find(".item")[h]()
        }
        this.sliding = !0, f && this.pause();
        var j = a.Event("slide.bs.carousel", {relatedTarget: e[0], direction: g});
        if (!e.hasClass("active")) {
            if (this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid", function () {
                    var b = a(i.$indicators.children()[i.getActiveIndex()]);
                    b && b.addClass("active")
                })), a.support.transition && this.$element.hasClass("slide")) {
                if (this.$element.trigger(j), j.isDefaultPrevented())return;
                e.addClass(b), e[0].offsetWidth, d.addClass(g), e.addClass(g), d.one(a.support.transition.end, function () {
                    e.removeClass([b, g].join(" ")).addClass("active"), d.removeClass(["active", g].join(" ")), i.sliding = !1, setTimeout(function () {
                        i.$element.trigger("slid")
                    }, 0)
                }).emulateTransitionEnd(600)
            } else {
                if (this.$element.trigger(j), j.isDefaultPrevented())return;
                d.removeClass("active"), e.addClass("active"), this.sliding = !1, this.$element.trigger("slid")
            }
            return f && this.cycle(), this
        }
    };
    var c = a.fn.carousel;
    a.fn.carousel = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.carousel"), f = a.extend({}, b.DEFAULTS, d.data(), "object" == typeof c && c), g = "string" == typeof c ? c : f.slide;
            e || d.data("bs.carousel", e = new b(this, f)), "number" == typeof c ? e.to(c) : g ? e[g]() : f.interval && e.pause().cycle()
        })
    }, a.fn.carousel.Constructor = b, a.fn.carousel.noConflict = function () {
        return a.fn.carousel = c, this
    }, a(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function (b) {
        var c, d = a(this), e = a(d.attr("data-target") || (c = d.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "")), f = a.extend({}, e.data(), d.data()), g = d.attr("data-slide-to");
        g && (f.interval = !1), e.carousel(f), (g = d.attr("data-slide-to")) && e.data("bs.carousel").to(g), b.preventDefault()
    }), a(window).on("load", function () {
        a('[data-ride="carousel"]').each(function () {
            var b = a(this);
            b.carousel(b.data())
        })
    })
}(window.jQuery), +function (a) {
    "use strict";
    var b = function (c, d) {
        this.$element = a(c), this.options = a.extend({}, b.DEFAULTS, d), this.transitioning = null, this.options.parent && (this.$parent = a(this.options.parent)), this.options.toggle && this.toggle()
    };
    b.DEFAULTS = {toggle: !0}, b.prototype.dimension = function () {
        var a = this.$element.hasClass("width");
        return a ? "width" : "height"
    }, b.prototype.show = function () {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var b = a.Event("show.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.$parent && this.$parent.find("> .panel > .in");
                if (c && c.length) {
                    var d = c.data("bs.collapse");
                    if (d && d.transitioning)return;
                    c.collapse("hide"), d || c.data("bs.collapse", null)
                }
                var e = this.dimension();
                this.$element.removeClass("collapse").addClass("collapsing")[e](0), this.transitioning = 1;
                var f = function () {
                    this.$element.removeClass("collapsing").addClass("in")[e]("auto"), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                };
                if (!a.support.transition)return f.call(this);
                var g = a.camelCase(["scroll", e].join("-"));
                this.$element.one(a.support.transition.end, a.proxy(f, this)).emulateTransitionEnd(350)[e](this.$element[0][g])
            }
        }
    }, b.prototype.hide = function () {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var b = a.Event("hide.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.dimension();
                this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), this.transitioning = 1;
                var d = function () {
                    this.transitioning = 0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
                };
                return a.support.transition ? (this.$element[c](0).one(a.support.transition.end, a.proxy(d, this)).emulateTransitionEnd(350), void 0) : d.call(this)
            }
        }
    }, b.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    };
    var c = a.fn.collapse;
    a.fn.collapse = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.collapse"), f = a.extend({}, b.DEFAULTS, d.data(), "object" == typeof c && c);
            e || d.data("bs.collapse", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }, a.fn.collapse.Constructor = b, a.fn.collapse.noConflict = function () {
        return a.fn.collapse = c, this
    }, a(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]", function (b) {
        var c, d = a(this), e = d.attr("data-target") || b.preventDefault() || (c = d.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, ""), f = a(e), g = f.data("bs.collapse"), h = g ? "toggle" : d.data(), i = d.attr("data-parent"), j = i && a(i);
        g && g.transitioning || (j && j.find('[data-toggle=collapse][data-parent="' + i + '"]').not(d).addClass("collapsed"), d[f.hasClass("in") ? "addClass" : "removeClass"]("collapsed")), f.collapse(h)
    })
}(window.jQuery), +function (a) {
    "use strict";
    function b() {
        a(d).remove(), a(e).each(function (b) {
            var d = c(a(this));
            d.hasClass("open") && (d.trigger(b = a.Event("hide.bs.dropdown")), b.isDefaultPrevented() || d.removeClass("open").trigger("hidden.bs.dropdown"))
        })
    }

    function c(b) {
        var c = b.attr("data-target");
        c || (c = b.attr("href"), c = c && /#/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
        var d = c && a(c);
        return d && d.length ? d : b.parent()
    }

    var d = ".dropdown-backdrop", e = "[data-toggle=dropdown]", f = function (b) {
        a(b).on("click.bs.dropdown", this.toggle)
    };
    f.prototype.toggle = function (d) {
        var e = a(this);
        if (!e.is(".disabled, :disabled")) {
            var f = c(e), g = f.hasClass("open");
            if (b(), !g) {
                if ("ontouchstart"in document.documentElement && !f.closest(".navbar-nav").length && a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click", b), f.trigger(d = a.Event("show.bs.dropdown")), d.isDefaultPrevented())return;
                f.toggleClass("open").trigger("shown.bs.dropdown"), e.focus()
            }
            return !1
        }
    }, f.prototype.keydown = function (b) {
        if (/(38|40|27)/.test(b.keyCode)) {
            var d = a(this);
            if (b.preventDefault(), b.stopPropagation(), !d.is(".disabled, :disabled")) {
                var f = c(d), g = f.hasClass("open");
                if (!g || g && 27 == b.keyCode)return 27 == b.which && f.find(e).focus(), d.click();
                var h = a("[role=menu] li:not(.divider):visible a", f);
                if (h.length) {
                    var i = h.index(h.filter(":focus"));
                    38 == b.keyCode && i > 0 && i--, 40 == b.keyCode && i < h.length - 1 && i++, ~i || (i = 0), h.eq(i).focus()
                }
            }
        }
    };
    var g = a.fn.dropdown;
    a.fn.dropdown = function (b) {
        return this.each(function () {
            var c = a(this), d = c.data("dropdown");
            d || c.data("dropdown", d = new f(this)), "string" == typeof b && d[b].call(c)
        })
    }, a.fn.dropdown.Constructor = f, a.fn.dropdown.noConflict = function () {
        return a.fn.dropdown = g, this
    }, a(document).on("click.bs.dropdown.data-api", b).on("click.bs.dropdown.data-api", ".dropdown form", function (a) {
        a.stopPropagation()
    }).on("click.bs.dropdown.data-api", e, f.prototype.toggle).on("keydown.bs.dropdown.data-api", e + ", [role=menu]", f.prototype.keydown)
}(window.jQuery), +function (a) {
    "use strict";
    var b = function (b, c) {
        this.options = c, this.$element = a(b), this.$backdrop = this.isShown = null, this.options.remote && this.$element.load(this.options.remote)
    };
    b.DEFAULTS = {backdrop: !0, keyboard: !0, show: !0}, b.prototype.toggle = function (a) {
        return this[this.isShown ? "hide" : "show"](a)
    }, b.prototype.show = function (b) {
        var c = this, d = a.Event("show.bs.modal", {relatedTarget: b});
        this.$element.trigger(d), this.isShown || d.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.$element.on("click.dismiss.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.backdrop(function () {
            var d = a.support.transition && c.$element.hasClass("fade");
            c.$element.parent().length || c.$element.appendTo(document.body), c.$element.show(), d && c.$element[0].offsetWidth, c.$element.addClass("in").attr("aria-hidden", !1), c.enforceFocus();
            var e = a.Event("shown.bs.modal", {relatedTarget: b});
            d ? c.$element.find(".modal-dialog").one(a.support.transition.end, function () {
                c.$element.focus().trigger(e)
            }).emulateTransitionEnd(300) : c.$element.focus().trigger(e)
        }))
    }, b.prototype.hide = function (b) {
        b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one(a.support.transition.end, a.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal())
    }, b.prototype.enforceFocus = function () {
        a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function (a) {
            this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.focus()
        }, this))
    }, b.prototype.escape = function () {
        this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", a.proxy(function (a) {
            27 == a.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal")
    }, b.prototype.hideModal = function () {
        var a = this;
        this.$element.hide(), this.backdrop(function () {
            a.removeBackdrop(), a.$element.trigger("hidden.bs.modal")
        })
    }, b.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, b.prototype.backdrop = function (b) {
        var c = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var d = a.support.transition && c;
            if (this.$backdrop = a('<div class="modal-backdrop ' + c + '" />').appendTo(document.body), this.$element.on("click.dismiss.modal", a.proxy(function (a) {
                    a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
                }, this)), d && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b)return;
            d ? this.$backdrop.one(a.support.transition.end, b).emulateTransitionEnd(150) : b()
        } else!this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(a.support.transition.end, b).emulateTransitionEnd(150) : b()) : b && b()
    };
    var c = a.fn.modal;
    a.fn.modal = function (c, d) {
        return this.each(function () {
            var e = a(this), f = e.data("bs.modal"), g = a.extend({}, b.DEFAULTS, e.data(), "object" == typeof c && c);
            f || e.data("bs.modal", f = new b(this, g)), "string" == typeof c ? f[c](d) : g.show && f.show(d)
        })
    }, a.fn.modal.Constructor = b, a.fn.modal.noConflict = function () {
        return a.fn.modal = c, this
    }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (b) {
        var c = a(this), d = c.attr("href"), e = a(c.attr("data-target") || d && d.replace(/.*(?=#[^\s]+$)/, "")), f = e.data("modal") ? "toggle" : a.extend({remote: !/#/.test(d) && d}, e.data(), c.data());
        b.preventDefault(), e.modal(f, this).one("hide", function () {
            c.is(":visible") && c.focus()
        })
    }), a(document).on("show.bs.modal", ".modal", function () {
        a(document.body).addClass("modal-open")
    }).on("hidden.bs.modal", ".modal", function () {
        a(document.body).removeClass("modal-open")
    })
}(window.jQuery), +function (a) {
    "use strict";
    var b = function (a, b) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", a, b)
    };
    b.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1
    }, b.prototype.init = function (b, c, d) {
        this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d);
        for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
            var g = e[f];
            if ("click" == g)this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this)); else if ("manual" != g) {
                var h = "hover" == g ? "mouseenter" : "focus", i = "hover" == g ? "mouseleave" : "blur";
                this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = a.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, b.prototype.getDefaults = function () {
        return b.DEFAULTS
    }, b.prototype.getOptions = function (b) {
        return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
            show: b.delay,
            hide: b.delay
        }), b
    }, b.prototype.getDelegateOptions = function () {
        var b = {}, c = this.getDefaults();
        return this._options && a.each(this._options, function (a, d) {
            c[a] != d && (b[a] = d)
        }), b
    }, b.prototype.enter = function (b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
        return clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? (c.timeout = setTimeout(function () {
            "in" == c.hoverState && c.show()
        }, c.options.delay.show), void 0) : c.show()
    }, b.prototype.leave = function (b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
        return clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? (c.timeout = setTimeout(function () {
            "out" == c.hoverState && c.hide()
        }, c.options.delay.hide), void 0) : c.hide()
    }, b.prototype.show = function () {
        var b = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            if (this.$element.trigger(b), b.isDefaultPrevented())return;
            var c = this.tip();
            this.setContent(), this.options.animation && c.addClass("fade");
            var d = "function" == typeof this.options.placement ? this.options.placement.call(this, c[0], this.$element[0]) : this.options.placement, e = /\s?auto?\s?/i, f = e.test(d);
            f && (d = d.replace(e, "") || "top"), c.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(d), this.options.container ? c.appendTo(this.options.container) : c.insertAfter(this.$element);
            var g = this.getPosition(), h = c[0].offsetWidth, i = c[0].offsetHeight;
            if (f) {
                var j = this.$element.parent(), k = d, l = document.documentElement.scrollTop || document.body.scrollTop, m = "body" == this.options.container ? window.innerWidth : j.outerWidth(), n = "body" == this.options.container ? window.innerHeight : j.outerHeight(), o = "body" == this.options.container ? 0 : j.offset().left;
                d = "bottom" == d && g.top + g.height + i - l > n ? "top" : "top" == d && g.top - l - i < 0 ? "bottom" : "right" == d && g.right + h > m ? "left" : "left" == d && g.left - h < o ? "right" : d, c.removeClass(k).addClass(d)
            }
            var p = this.getCalculatedOffset(d, g, h, i);
            this.applyPlacement(p, d), this.$element.trigger("shown.bs." + this.type)
        }
    }, b.prototype.applyPlacement = function (a, b) {
        var c, d = this.tip(), e = d[0].offsetWidth, f = d[0].offsetHeight, g = parseInt(d.css("margin-top"), 10), h = parseInt(d.css("margin-left"), 10);
        isNaN(g) && (g = 0), isNaN(h) && (h = 0), a.top = a.top + g, a.left = a.left + h, d.offset(a).addClass("in");
        var i = d[0].offsetWidth, j = d[0].offsetHeight;
        if ("top" == b && j != f && (c = !0, a.top = a.top + f - j), /bottom|top/.test(b)) {
            var k = 0;
            a.left < 0 && (k = -2 * a.left, a.left = 0, d.offset(a), i = d[0].offsetWidth, j = d[0].offsetHeight), this.replaceArrow(k - e + i, i, "left")
        } else this.replaceArrow(j - f, j, "top");
        c && d.offset(a)
    }, b.prototype.replaceArrow = function (a, b, c) {
        this.arrow().css(c, a ? 50 * (1 - a / b) + "%" : "")
    }, b.prototype.setContent = function () {
        var a = this.tip(), b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
    }, b.prototype.hide = function () {
        function b() {
            "in" != c.hoverState && d.detach()
        }

        var c = this, d = this.tip(), e = a.Event("hide.bs." + this.type);
        return this.$element.trigger(e), e.isDefaultPrevented() ? void 0 : (d.removeClass("in"), a.support.transition && this.$tip.hasClass("fade") ? d.one(a.support.transition.end, b).emulateTransitionEnd(150) : b(), this.$element.trigger("hidden.bs." + this.type), this)
    }, b.prototype.fixTitle = function () {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
    }, b.prototype.hasContent = function () {
        return this.getTitle()
    }, b.prototype.getPosition = function () {
        var b = this.$element[0];
        return a.extend({}, "function" == typeof b.getBoundingClientRect ? b.getBoundingClientRect() : {
            width: b.offsetWidth,
            height: b.offsetHeight
        }, this.$element.offset())
    }, b.prototype.getCalculatedOffset = function (a, b, c, d) {
        return "bottom" == a ? {
            top: b.top + b.height,
            left: b.left + b.width / 2 - c / 2
        } : "top" == a ? {
            top: b.top - d,
            left: b.left + b.width / 2 - c / 2
        } : "left" == a ? {top: b.top + b.height / 2 - d / 2, left: b.left - c} : {
            top: b.top + b.height / 2 - d / 2,
            left: b.left + b.width
        }
    }, b.prototype.getTitle = function () {
        var a, b = this.$element, c = this.options;
        return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
    }, b.prototype.tip = function () {
        return this.$tip = this.$tip || a(this.options.template)
    }, b.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, b.prototype.validate = function () {
        this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
    }, b.prototype.enable = function () {
        this.enabled = !0
    }, b.prototype.disable = function () {
        this.enabled = !1
    }, b.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled
    }, b.prototype.toggle = function (b) {
        var c = b ? a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type) : this;
        c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
    }, b.prototype.destroy = function () {
        this.hide().$element.off("." + this.type).removeData("bs." + this.type)
    };
    var c = a.fn.tooltip;
    a.fn.tooltip = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.tooltip"), f = "object" == typeof c && c;
            e || d.data("bs.tooltip", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }, a.fn.tooltip.Constructor = b, a.fn.tooltip.noConflict = function () {
        return a.fn.tooltip = c, this
    }
}(window.jQuery), +function (a) {
    "use strict";
    var b = function (a, b) {
        this.init("popover", a, b)
    };
    if (!a.fn.tooltip)throw new Error("Popover requires tooltip.js");
    b.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), b.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), b.prototype.constructor = b, b.prototype.getDefaults = function () {
        return b.DEFAULTS
    }, b.prototype.setContent = function () {
        var a = this.tip(), b = this.getTitle(), c = this.getContent();
        a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content")[this.options.html ? "html" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
    }, b.prototype.hasContent = function () {
        return this.getTitle() || this.getContent()
    }, b.prototype.getContent = function () {
        var a = this.$element, b = this.options;
        return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
    }, b.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    }, b.prototype.tip = function () {
        return this.$tip || (this.$tip = a(this.options.template)), this.$tip
    };
    var c = a.fn.popover;
    a.fn.popover = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.popover"), f = "object" == typeof c && c;
            e || d.data("bs.popover", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }, a.fn.popover.Constructor = b, a.fn.popover.noConflict = function () {
        return a.fn.popover = c, this
    }
}(window.jQuery), +function (a) {
    "use strict";
    function b(c, d) {
        var e, f = a.proxy(this.process, this);
        this.$element = a(c).is("body") ? a(window) : a(c), this.$body = a("body"), this.$scrollElement = this.$element.on("scroll.bs.scroll-spy.data-api", f), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || (e = a(c).attr("href")) && e.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.offsets = a([]), this.targets = a([]), this.activeTarget = null, this.refresh(), this.process()
    }

    b.DEFAULTS = {offset: 10}, b.prototype.refresh = function () {
        var b = this.$element[0] == window ? "offset" : "position";
        this.offsets = a([]), this.targets = a([]);
        var c = this;
        this.$body.find(this.selector).map(function () {
            var d = a(this), e = d.data("target") || d.attr("href"), f = /^#\w/.test(e) && a(e);
            return f && f.length && [[f[b]().top + (!a.isWindow(c.$scrollElement.get(0)) && c.$scrollElement.scrollTop()), e]] || null
        }).sort(function (a, b) {
            return a[0] - b[0]
        }).each(function () {
            c.offsets.push(this[0]), c.targets.push(this[1])
        })
    }, b.prototype.process = function () {
        var a, b = this.$scrollElement.scrollTop() + this.options.offset, c = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight, d = c - this.$scrollElement.height(), e = this.offsets, f = this.targets, g = this.activeTarget;
        if (b >= d)return g != (a = f.last()[0]) && this.activate(a);
        for (a = e.length; a--;)g != f[a] && b >= e[a] && (!e[a + 1] || b <= e[a + 1]) && this.activate(f[a])
    }, b.prototype.activate = function (b) {
        this.activeTarget = b, a(this.selector).parents(".active").removeClass("active");
        var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]', d = a(c).parents("li").addClass("active");
        d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate")
    };
    var c = a.fn.scrollspy;
    a.fn.scrollspy = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.scrollspy"), f = "object" == typeof c && c;
            e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function () {
        return a.fn.scrollspy = c, this
    }, a(window).on("load", function () {
        a('[data-spy="scroll"]').each(function () {
            var b = a(this);
            b.scrollspy(b.data())
        })
    })
}(window.jQuery), +function (a) {
    "use strict";
    var b = function (b) {
        this.element = a(b)
    };
    b.prototype.show = function () {
        var b = this.element, c = b.closest("ul:not(.dropdown-menu)"), d = b.attr("data-target");
        if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
            var e = c.find(".active:last a")[0], f = a.Event("show.bs.tab", {relatedTarget: e});
            if (b.trigger(f), !f.isDefaultPrevented()) {
                var g = a(d);
                this.activate(b.parent("li"), c), this.activate(g, g.parent(), function () {
                    b.trigger({type: "shown.bs.tab", relatedTarget: e})
                })
            }
        }
    }, b.prototype.activate = function (b, c, d) {
        function e() {
            f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), b.addClass("active"), g ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu") && b.closest("li.dropdown").addClass("active"), d && d()
        }

        var f = c.find("> .active"), g = d && a.support.transition && f.hasClass("fade");
        g ? f.one(a.support.transition.end, e).emulateTransitionEnd(150) : e(), f.removeClass("in")
    };
    var c = a.fn.tab;
    a.fn.tab = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.tab");
            e || d.data("bs.tab", e = new b(this)), "string" == typeof c && e[c]()
        })
    }, a.fn.tab.Constructor = b, a.fn.tab.noConflict = function () {
        return a.fn.tab = c, this
    }, a(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (b) {
        b.preventDefault(), a(this).tab("show")
    })
}(window.jQuery), +function (a) {
    "use strict";
    var b = function (c, d) {
        this.options = a.extend({}, b.DEFAULTS, d), this.$window = a(window).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(c), this.affixed = this.unpin = null, this.checkPosition()
    };
    b.RESET = "affix affix-top affix-bottom", b.DEFAULTS = {offset: 0}, b.prototype.checkPositionWithEventLoop = function () {
        setTimeout(a.proxy(this.checkPosition, this), 1)
    }, b.prototype.checkPosition = function () {
        if (this.$element.is(":visible")) {
            var c = a(document).height(), d = this.$window.scrollTop(), e = this.$element.offset(), f = this.options.offset, g = f.top, h = f.bottom;
            "object" != typeof f && (h = g = f), "function" == typeof g && (g = f.top()), "function" == typeof h && (h = f.bottom());
            var i = null != this.unpin && d + this.unpin <= e.top ? !1 : null != h && e.top + this.$element.height() >= c - h ? "bottom" : null != g && g >= d ? "top" : !1;
            this.affixed !== i && (this.unpin && this.$element.css("top", ""), this.affixed = i, this.unpin = "bottom" == i ? e.top - d : null, this.$element.removeClass(b.RESET).addClass("affix" + (i ? "-" + i : "")), "bottom" == i && this.$element.offset({top: document.body.offsetHeight - h - this.$element.height()}))
        }
    };
    var c = a.fn.affix;
    a.fn.affix = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.affix"), f = "object" == typeof c && c;
            e || d.data("bs.affix", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }, a.fn.affix.Constructor = b, a.fn.affix.noConflict = function () {
        return a.fn.affix = c, this
    }, a(window).on("load", function () {
        a('[data-spy="affix"]').each(function () {
            var b = a(this), c = b.data();
            c.offset = c.offset || {}, c.offsetBottom && (c.offset.bottom = c.offsetBottom), c.offsetTop && (c.offset.top = c.offsetTop), b.affix(c)
        })
    })
}(window.jQuery);
//bootstrap hover
(function (e, t, n) {
    var r = e();
    e.fn.dropdownHover = function (n) {
        r = r.add(this.parent());
        return this.each(function () {
            var s = e(this), o = s.parent(), u = {
                delay: 500,
                instantlyCloseOthers: !0
            }, a = {
                delay: e(this).data("delay"),
                instantlyCloseOthers: e(this).data("close-others")
            }, f = e.extend(!0, {}, u, n, a), l;
            o.hover(function (e) {
                if (!o.hasClass("open") && !s.is(e.target))return !0;
                if (i) {
                    f.instantlyCloseOthers === !0 && r.removeClass("open");
                    t.clearTimeout(l);
                    o.addClass("open")
                }
            }, function () {
                i && (l = t.setTimeout(function () {
                    o.removeClass("open")
                }, f.delay))
            });
            s.hover(function () {
                if (i) {
                    f.instantlyCloseOthers === !0 && r.removeClass("open");
                    t.clearTimeout(l);
                    o.addClass("open")
                }
            });
            o.find(".dropdown-submenu").each(function () {
                var n = e(this), r;
                n.hover(function () {
                    if (i) {
                        t.clearTimeout(r);
                        n.children(".dropdown-menu").show();
                        n.siblings().children(".dropdown-menu").hide()
                    }
                }, function () {
                    var e = n.children(".dropdown-menu");
                    i ? r = t.setTimeout(function () {
                        e.hide()
                    }, f.delay) : e.hide()
                })
            })
        })
    };
    var i = !1, s = {hits: 0, x: null, y: null};
    e(document).ready(function () {
        e('[data-hover="dropdown"]').dropdownHover();
        e(document).mousemove(function (t) {
            s.hits++;
            if (s.hits > 20 || Math.abs(t.pageX - s.x) + Math.abs(t.pageY - s.y) < 4) {
                e(this).unbind(t);
                i = !0
            } else {
                s.x = t.pageX;
                s.y = t.pageY
            }
        })
    });
    var o = ".dropdown-submenu:hover>.dropdown-menu{display:none}", u = document.createElement("style");
    u.type = "text/css";
    u.styleSheet ? u.styleSheet.cssText = o : u.appendChild(document.createTextNode(o));
    e("head")[0].appendChild(u)
})(jQuery, this);
//altooltip
(function ($) {
    $.fn.aToolTip = function (options) {
        var defaults = {
            closeTipBtn: 'aToolTipCloseBtn',
            toolTipId: 'aToolTip',
            fixed: false,
            clickIt: false,
            inSpeed: 200,
            outSpeed: 100,
            tipContent: '',
            toolTipClass: 'defaultTheme',
            xOffset: 5,
            yOffset: 5,
            onShow: null,
            onHide: null
        }, settings = $.extend({}, defaults, options);
        return this.each(function () {
            var obj = $(this);
            if (obj.attr('title')) {
                var tipContent = obj.attr('title');
            } else {
                var tipContent = settings.tipContent;
            }
            var buildaToolTip = function () {
                $('body').append("<div id='" + settings.toolTipId + "' class='" + settings.toolTipClass + "'><p class='aToolTipContent'>" + tipContent + "</p></div>");
                if (tipContent && settings.clickIt) {
                    $('#' + settings.toolTipId + ' p.aToolTipContent').append("<a id='" + settings.closeTipBtn + "' href='#' alt='close'>close</a>");
                }
            }, positionaToolTip = function () {
                $('#' + settings.toolTipId).css({
                    top: (obj.offset().top - $('#' + settings.toolTipId).outerHeight() - settings.yOffset) + 'px',
                    left: (obj.offset().left + obj.outerWidth() + settings.xOffset) + 'px'
                }).stop().fadeIn(settings.inSpeed, function () {
                    if ($.isFunction(settings.onShow)) {
                        settings.onShow(obj);
                    }
                });
            }, removeaToolTip = function () {
                $('#' + settings.toolTipId).stop().fadeOut(settings.outSpeed, function () {
                    $(this).remove();
                    if ($.isFunction(settings.onHide)) {
                        settings.onHide(obj);
                    }
                });
            };
            if (tipContent && !settings.clickIt) {
                obj.hover(function () {
                    $('#' + settings.toolTipId).remove();
                    obj.attr({title: ''});
                    buildaToolTip();
                    positionaToolTip();
                }, function () {
                    removeaToolTip();
                });
            }
            if (tipContent && settings.clickIt) {
                obj.click(function (el) {
                    $('#' + settings.toolTipId).remove();
                    obj.attr({title: ''});
                    buildaToolTip();
                    positionaToolTip();
                    $('#' + settings.closeTipBtn).click(function () {
                        removeaToolTip();
                        return false;
                    });
                    return false;
                });
            }
            if (!settings.fixed && !settings.clickIt) {
                obj.mousemove(function (el) {
                    $('#' + settings.toolTipId).css({
                        top: (el.pageY - $('#' + settings.toolTipId).outerHeight() - settings.yOffset),
                        left: (el.pageX + settings.xOffset)
                    });
                });
            }
        });
    };
})(jQuery);
if (typeof jwplayer != 'undefined') {
    // key jwplayer
    jwplayer.key = "SPO3wyn+RYBnL5aOiiX0FF15vm2ofmpsaiKUNA==";
}

//phone format
var zChar = new Array(' ', '(', ')', '-', '.');
var maxphonelength = 20;
var phonevalue1;
var phonevalue2;
var cursorposition;

//detect mobile
var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

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

        // var txtRange = object.createTextRange();
        // txtRange.moveStart( "character", cursorposition);
        // txtRange.moveEnd( "character", cursorposition - object.value.length);
        // txtRange.select();
    }

}

function ParseChar(sStr, sChar) {

    if (sChar.length == null) {
        zChar = new Array(sChar);
    }
    else zChar = sChar;

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

//validation
/* added if(getInternetExplorerVersion() > 7 ) to make it work on IE 7 */
(function ($) {
    $.extend($.fn, {
        validate: function (options) {
            if (!this.length) {
                if (options && options.debug && window.console) {
                    console.warn("nothing selected, can't validate, returning nothing");
                }
                return;
            }
            var validator = $.data(this[0], 'validator');
            if (validator) {
                return validator;
            }
            if (getInternetExplorerVersion() > 7) {
                this.attr('novalidate', 'novalidate')
            }
            ;
            validator = new $.validator(options, this[0]);
            $.data(this[0], 'validator', validator);
            if (validator.settings.onsubmit) {
                this.validateDelegate(":submit", "click", function (ev) {
                    if (validator.settings.submitHandler) {
                        validator.submitButton = ev.target;
                    }
                    if ($(ev.target).hasClass('cancel')) {
                        validator.cancelSubmit = true;
                    }
                });
                this.submit(function (event) {
                    if (validator.settings.debug) {
                        event.preventDefault();
                    }
                    function handle() {
                        var hidden;
                        if (validator.settings.submitHandler) {
                            if (validator.submitButton) {
                                hidden = $("<input type='hidden'/>").attr("name", validator.submitButton.name).val(validator.submitButton.value).appendTo(validator.currentForm);
                            }
                            validator.settings.submitHandler.call(validator, validator.currentForm, event);
                            if (validator.submitButton) {
                                hidden.remove();
                            }
                            return false;
                        }
                        return true;
                    }

                    if (validator.cancelSubmit) {
                        validator.cancelSubmit = false;
                        return handle();
                    }
                    if (validator.form()) {
                        if (validator.pendingRequest) {
                            validator.formSubmitted = true;
                            return false;
                        }
                        return handle();
                    } else {
                        validator.focusInvalid();
                        return false;
                    }
                });
            }
            return validator;
        }, valid: function () {
            console.log(this[0]);
            if ($(this[0]).is('form')) {
                return this.validate().form();
            } else {
                var valid = true;
                var validator = $(this[0].form).validate();
                this.each(function () {
                    valid &= validator.element(this);
                });
                return valid;
            }
        }, removeAttrs: function (attributes) {
            var result = {}, $element = this;
            $.each(attributes.split(/\s/), function (index, value) {
                result[value] = $element.attr(value);
                $element.removeAttr(value);
            });
            return result;
        }, rules: function (command, argument) {
            var element = this[0];
            if (command) {
                var settings = $.data(element.form, 'validator').settings;
                var staticRules = settings.rules;
                var existingRules = $.validator.staticRules(element);
                switch (command) {
                    case"add":
                        $.extend(existingRules, $.validator.normalizeRule(argument));
                        staticRules[element.name] = existingRules;
                        if (argument.messages) {
                            settings.messages[element.name] = $.extend(settings.messages[element.name], argument.messages);
                        }
                        break;
                    case"remove":
                        if (!argument) {
                            delete staticRules[element.name];
                            return existingRules;
                        }
                        var filtered = {};
                        $.each(argument.split(/\s/), function (index, method) {
                            filtered[method] = existingRules[method];
                            delete existingRules[method];
                        });
                        return filtered;
                }
            }
            var data = $.validator.normalizeRules($.extend({}, $.validator.classRules(element), $.validator.attributeRules(element), $.validator.dataRules(element), $.validator.staticRules(element)), element);
            if (data.required) {
                var param = data.required;
                delete data.required;
                data = $.extend({required: param}, data);
            }
            return data;
        }
    });
    $.extend($.expr[":"], {
        blank: function (a) {
            return !$.trim("" + a.value);
        }, filled: function (a) {
            return !!$.trim("" + a.value);
        }, unchecked: function (a) {
            return !a.checked;
        }
    });
    $.validator = function (options, form) {
        this.settings = $.extend(true, {}, $.validator.defaults, options);
        this.currentForm = form;
        this.init();
    };
    $.validator.format = function (source, params) {
        if (arguments.length === 1) {
            return function () {
                var args = $.makeArray(arguments);
                args.unshift(source);
                return $.validator.format.apply(this, args);
            };
        }
        if (arguments.length > 2 && params.constructor !== Array) {
            params = $.makeArray(arguments).slice(1);
        }
        if (params.constructor !== Array) {
            params = [params];
        }
        $.each(params, function (i, n) {
            source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
        });
        return source;
    };
    $.extend($.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            validClass: "valid",
            errorElement: "label",
            focusInvalid: true,
            errorContainer: $([]),
            errorLabelContainer: $([]),
            onsubmit: true,
            ignore: ":hidden",
            ignoreTitle: false,
            onfocusin: function (element, event) {
                this.lastActive = element;
                if (this.settings.focusCleanup && !this.blockFocusCleanup) {
                    if (this.settings.unhighlight) {
                        this.settings.unhighlight.call(this, element, this.settings.errorClass, this.settings.validClass);
                    }
                    this.addWrapper(this.errorsFor(element)).hide();
                }
            },
            onfocusout: function (element, event) {
                if (!this.checkable(element) && (element.name in this.submitted || !this.optional(element))) {
                    this.element(element);
                }
            },
            onkeyup: function (element, event) {
                if (event.which === 9 && this.elementValue(element) === '') {
                    return;
                } else if (element.name in this.submitted || element === this.lastElement) {
                    this.element(element);
                }
            },
            onclick: function (element, event) {
                if (element.name in this.submitted) {
                    this.element(element);
                }
                else if (element.parentNode.name in this.submitted) {
                    this.element(element.parentNode);
                }
            },
            highlight: function (element, errorClass, validClass) {
                if (element.type === 'radio') {
                    this.findByName(element.name).addClass(errorClass).removeClass(validClass);
                } else {
                    $(element).addClass(errorClass).removeClass(validClass);
                }
            },
            unhighlight: function (element, errorClass, validClass) {
                if (element.type === 'radio') {
                    this.findByName(element.name).removeClass(errorClass).addClass(validClass);
                } else {
                    $(element).removeClass(errorClass).addClass(validClass);
                }
            }
        },
        setDefaults: function (settings) {
            $.extend($.validator.defaults, settings);
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date (ISO).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            maxlength: $.validator.format("Please enter no more than {0} characters."),
            minlength: $.validator.format("Please enter at least {0} characters."),
            rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
            range: $.validator.format("Please enter a value between {0} and {1}."),
            max: $.validator.format("Please enter a value less than or equal to {0}."),
            min: $.validator.format("Please enter a value greater than or equal to {0}.")
        },
        autoCreateRanges: false,
        prototype: {
            init: function () {
                this.labelContainer = $(this.settings.errorLabelContainer);
                this.errorContext = this.labelContainer.length && this.labelContainer || $(this.currentForm);
                this.containers = $(this.settings.errorContainer).add(this.settings.errorLabelContainer);
                this.submitted = {};
                this.valueCache = {};
                this.pendingRequest = 0;
                this.pending = {};
                this.invalid = {};
                this.reset();
                var groups = (this.groups = {});
                $.each(this.settings.groups, function (key, value) {
                    if (typeof value === "string") {
                        value = value.split(/\s/);
                    }
                    $.each(value, function (index, name) {
                        groups[name] = key;
                    });
                });
                var rules = this.settings.rules;
                $.each(rules, function (key, value) {
                    rules[key] = $.validator.normalizeRule(value);
                });
                function delegate(event) {
                    var validator = $.data(this[0].form, "validator"), eventType = "on" + event.type.replace(/^validate/, "");
                    if (validator.settings[eventType]) {
                        validator.settings[eventType].call(validator, this[0], event);
                    }
                }

                $(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, " + "[type='number'], [type='search'] ,[type='tel'], [type='url'], " + "[type='email'], [type='datetime'], [type='date'], [type='month'], " + "[type='week'], [type='time'], [type='datetime-local'], " + "[type='range'], [type='color'] ", "focusin focusout keyup", delegate).validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", delegate);
                if (this.settings.invalidHandler) {
                    $(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler);
                }
            }, form: function () {
                this.checkForm();
                $.extend(this.submitted, this.errorMap);
                this.invalid = $.extend({}, this.errorMap);
                if (!this.valid()) {
                    $(this.currentForm).triggerHandler("invalid-form", [this]);
                }
                this.showErrors();
                return this.valid();
            },
            checkForm: function () {
                this.prepareForm();
                for (var i = 0, elements = (this.currentElements = this.elements()); elements[i]; i++) {
                    if (this.findByName(elements[i].name).length != undefined && this.findByName(elements[i].name).length > 1) {
                        for (var cnt = 0; cnt < this.findByName(elements[i].name).length; cnt++) {
                            this.check(this.findByName(elements[i].name)[cnt]);
                        }
                    } else {
                        this.check(elements[i]);
                    }
                }
                return this.valid();
            },
            element: function (element) {
                element = this.validationTargetFor(this.clean(element));
                this.lastElement = element;
                this.prepareElement(element);
                this.currentElements = $(element);
                var result = this.check(element) !== false;
                if (result) {
                    delete this.invalid[element.name];
                } else {
                    this.invalid[element.name] = true;
                }
                if (!this.numberOfInvalids()) {
                    this.toHide = this.toHide.add(this.containers);
                }
                this.showErrors();
                return result;
            }, showErrors: function (errors) {
                if (errors) {
                    $.extend(this.errorMap, errors);
                    this.errorList = [];
                    for (var name in errors) {
                        this.errorList.push({message: errors[name], element: this.findByName(name)[0]});
                    }
                    this.successList = $.grep(this.successList, function (element) {
                        return !(element.name in errors);
                    });
                }
                if (this.settings.showErrors) {
                    this.settings.showErrors.call(this, this.errorMap, this.errorList);
                } else {
                    this.defaultShowErrors();
                }
            }, resetForm: function () {
                if ($.fn.resetForm) {
                    $(this.currentForm).resetForm();
                }
                this.submitted = {};
                this.lastElement = null;
                this.prepareForm();
                this.hideErrors();
                this.elements().removeClass(this.settings.errorClass).removeData("previousValue");
            }, numberOfInvalids: function () {
                return this.objectLength(this.invalid);
            }, objectLength: function (obj) {
                var count = 0;
                for (var i in obj) {
                    count++;
                }
                return count;
            }, hideErrors: function () {
                this.addWrapper(this.toHide).hide();
            }, valid: function () {
                return this.size() === 0;
            }, size: function () {
                return this.errorList.length;
            }, focusInvalid: function () {
                if (this.settings.focusInvalid) {
                    try {
                        $(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin");
                    } catch (e) {
                    }
                }
            }, findLastActive: function () {
                var lastActive = this.lastActive;
                return lastActive && $.grep(this.errorList, function (n) {
                        return n.element.name === lastActive.name;
                    }).length === 1 && lastActive;
            }, elements: function () {
                var validator = this, rulesCache = {};
                return $(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function () {
                    if (!this.name && validator.settings.debug && window.console) {
                        console.error("%o has no name assigned", this);
                    }
                    if (this.name in rulesCache || !validator.objectLength($(this).rules())) {
                        return false;
                    }
                    rulesCache[this.name] = true;
                    return true;
                });
            }, clean: function (selector) {
                return $(selector)[0];
            }, errors: function () {
                var errorClass = this.settings.errorClass.replace(' ', '.');
                return $(this.settings.errorElement + "." + errorClass, this.errorContext);
            }, reset: function () {
                this.successList = [];
                this.errorList = [];
                this.errorMap = {};
                this.toShow = $([]);
                this.toHide = $([]);
                this.currentElements = $([]);
            }, prepareForm: function () {
                this.reset();
                this.toHide = this.errors().add(this.containers);
            }, prepareElement: function (element) {
                this.reset();
                this.toHide = this.errorsFor(element);
            }, elementValue: function (element) {
                var type = $(element).attr('type'), val = $(element).val();
                if (type === 'radio' || type === 'checkbox') {
                    return $('input[name="' + $(element).attr('name') + '"]:checked').val();
                }
                if (typeof val === 'string') {
                    return val.replace(/\r/g, "");
                }
                return val;
            }, check: function (element) {
                element = this.validationTargetFor(this.clean(element));
                var rules = $(element).rules();
                var dependencyMismatch = false;
                var val = this.elementValue(element);
                var result;
                for (var method in rules) {
                    var rule = {method: method, parameters: rules[method]};
                    try {
                        result = $.validator.methods[method].call(this, val, element, rule.parameters);
                        if (result === "dependency-mismatch") {
                            dependencyMismatch = true;
                            continue;
                        }
                        dependencyMismatch = false;
                        if (result === "pending") {
                            this.toHide = this.toHide.not(this.errorsFor(element));
                            return;
                        }
                        if (!result) {
                            this.formatAndAdd(element, rule);
                            return false;
                        }
                    } catch (e) {
                        if (this.settings.debug && window.console) {
                            console.log("exception occured when checking element " + element.id + ", check the '" + rule.method + "' method", e);
                        }
                        throw e;
                    }
                }
                if (dependencyMismatch) {
                    return;
                }
                if (this.objectLength(rules)) {
                    this.successList.push(element);
                }
                return true;
            }, customDataMessage: function (element, method) {
                return $(element).data('msg-' + method.toLowerCase()) || (element.attributes && $(element).attr('data-msg-' + method.toLowerCase()));
            }, customMessage: function (name, method) {
                var m = this.settings.messages[name];
                return m && (m.constructor === String ? m : m[method]);
            }, findDefined: function () {
                for (var i = 0; i < arguments.length; i++) {
                    if (arguments[i] !== undefined) {
                        return arguments[i];
                    }
                }
                return undefined;
            }, defaultMessage: function (element, method) {
                return this.findDefined(this.customMessage(element.name, method), this.customDataMessage(element, method), !this.settings.ignoreTitle && element.title || undefined, $.validator.messages[method], "<strong>Warning: No message defined for " + element.name + "</strong>");
            }, formatAndAdd: function (element, rule) {
                var message = this.defaultMessage(element, rule.method), theregex = /\$?\{(\d+)\}/g;
                if (typeof message === "function") {
                    message = message.call(this, rule.parameters, element);
                } else if (theregex.test(message)) {
                    message = $.validator.format(message.replace(theregex, '{$1}'), rule.parameters);
                }
                this.errorList.push({message: message, element: element});
                this.errorMap[element.name] = message;
                this.submitted[element.name] = message;
            }, addWrapper: function (toToggle) {
                if (this.settings.wrapper) {
                    toToggle = toToggle.add(toToggle.parent(this.settings.wrapper));
                }
                return toToggle;
            }, defaultShowErrors: function () {
                var i, elements;
                for (i = 0; this.errorList[i]; i++) {
                    var error = this.errorList[i];
                    if (this.settings.highlight) {
                        this.settings.highlight.call(this, error.element, this.settings.errorClass, this.settings.validClass);
                    }
                    this.showLabel(error.element, error.message);
                }
                if (this.errorList.length) {
                    this.toShow = this.toShow.add(this.containers);
                }
                if (this.settings.success) {
                    for (i = 0; this.successList[i]; i++) {
                        this.showLabel(this.successList[i]);
                    }
                }
                if (this.settings.unhighlight) {
                    for (i = 0, elements = this.validElements(); elements[i]; i++) {
                        this.settings.unhighlight.call(this, elements[i], this.settings.errorClass, this.settings.validClass);
                    }
                }
                this.toHide = this.toHide.not(this.toShow);
                this.hideErrors();
                this.addWrapper(this.toShow).show();
            }, validElements: function () {
                return this.currentElements.not(this.invalidElements());
            }, invalidElements: function () {
                return $(this.errorList).map(function () {
                    return this.element;
                });
            }, showLabel: function (element, message) {
                var label = this.errorsFor(element);
                if (label.length) {
                    label.removeClass(this.settings.validClass).addClass(this.settings.errorClass);
                    if (label.attr("generated")) {
                        label.html(message);
                    }
                } else {
                    label = $("<" + this.settings.errorElement + "/>").attr({
                        "for": this.idOrName(element),
                        generated: true
                    }).addClass(this.settings.errorClass).html(message || "");
                    if (this.settings.wrapper) {
                        label = label.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();
                    }
                    if (!this.labelContainer.append(label).length) {
                        if (this.settings.errorPlacement) {
                            this.settings.errorPlacement(label, $(element));
                        } else {
                            label.insertAfter(element);
                        }
                    }
                }
                if (!message && this.settings.success) {
                    label.text("");
                    if (typeof this.settings.success === "string") {
                        label.addClass(this.settings.success);
                    } else {
                        this.settings.success(label, element);
                    }
                }
                this.toShow = this.toShow.add(label);
            }, errorsFor: function (element) {
                var name = this.idOrName(element);
                return this.errors().filter(function () {
                    return $(this).attr('for') === name;
                });
            }, idOrName: function (element) {
                return this.groups[element.name] || (this.checkable(element) ? element.name : element.id || element.name);
            }, validationTargetFor: function (element) {
                if (this.checkable(element)) {
                    element = this.findByName(element.name).not(this.settings.ignore)[0];
                }
                return element;
            }, checkable: function (element) {
                return (/radio|checkbox/i).test(element.type);
            }, findByName: function (name) {
                return $(this.currentForm).find('[name="' + name + '"]');
            }, getLength: function (value, element) {
                switch (element.nodeName.toLowerCase()) {
                    case'select':
                        return $("option:selected", element).length;
                    case'input':
                        if (this.checkable(element)) {
                            return this.findByName(element.name).filter(':checked').length;
                        }
                }
                return value.length;
            }, depend: function (param, element) {
                return this.dependTypes[typeof param] ? this.dependTypes[typeof param](param, element) : true;
            }, dependTypes: {
                "boolean": function (param, element) {
                    return param;
                }, "string": function (param, element) {
                    return !!$(param, element.form).length;
                }, "function": function (param, element) {
                    return param(element);
                }
            }, optional: function (element) {
                var val = this.elementValue(element);
                return !$.validator.methods.required.call(this, val, element) && "dependency-mismatch";
            }, startRequest: function (element) {
                if (!this.pending[element.name]) {
                    this.pendingRequest++;
                    this.pending[element.name] = true;
                }
            }, stopRequest: function (element, valid) {
                this.pendingRequest--;
                if (this.pendingRequest < 0) {
                    this.pendingRequest = 0;
                }
                delete this.pending[element.name];
                if (valid && this.pendingRequest === 0 && this.formSubmitted && this.form()) {
                    $(this.currentForm).submit();
                    this.formSubmitted = false;
                } else if (!valid && this.pendingRequest === 0 && this.formSubmitted) {
                    $(this.currentForm).triggerHandler("invalid-form", [this]);
                    this.formSubmitted = false;
                }
            }, previousValue: function (element) {
                return $.data(element, "previousValue") || $.data(element, "previousValue", {
                        old: null,
                        valid: true,
                        message: this.defaultMessage(element, "remote")
                    });
            }
        },
        classRuleSettings: {
            required: {required: true},
            email: {email: true},
            url: {url: true},
            date: {date: true},
            dateISO: {dateISO: true},
            number: {number: true},
            digits: {digits: true},
            creditcard: {creditcard: true}
        },
        addClassRules: function (className, rules) {
            if (className.constructor === String) {
                this.classRuleSettings[className] = rules;
            } else {
                $.extend(this.classRuleSettings, className);
            }
        },
        classRules: function (element) {
            var rules = {};
            var classes = $(element).attr('class');
            if (classes) {
                $.each(classes.split(' '), function () {
                    if (this in $.validator.classRuleSettings) {
                        $.extend(rules, $.validator.classRuleSettings[this]);
                    }
                });
            }
            return rules;
        },
        attributeRules: function (element) {
            var rules = {};
            var $element = $(element);
            for (var method in $.validator.methods) {
                var value;
                if (method === 'required') {
                    value = $element.get(0).getAttribute(method);
                    if (value === "") {
                        value = true;
                    }
                    value = !!value;
                } else {
                    value = $element.attr(method);
                }
                if (value) {
                    rules[method] = value;
                } else if ($element[0].getAttribute("type") === method) {
                    rules[method] = true;
                }
            }
            if (rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength)) {
                delete rules.maxlength;
            }
            return rules;
        },
        dataRules: function (element) {
            var method, value, rules = {}, $element = $(element);
            for (method in $.validator.methods) {
                value = $element.data('rule-' + method.toLowerCase());
                if (value !== undefined) {
                    rules[method] = value;
                }
            }
            return rules;
        },
        staticRules: function (element) {
            var rules = {};
            var validator = $.data(element.form, 'validator');
            if (validator.settings.rules) {
                rules = $.validator.normalizeRule(validator.settings.rules[element.name]) || {};
            }
            return rules;
        },
        normalizeRules: function (rules, element) {
            $.each(rules, function (prop, val) {
                if (val === false) {
                    delete rules[prop];
                    return;
                }
                if (val.param || val.depends) {
                    var keepRule = true;
                    switch (typeof val.depends) {
                        case"string":
                            keepRule = !!$(val.depends, element.form).length;
                            break;
                        case"function":
                            keepRule = val.depends.call(element, element);
                            break;
                    }
                    if (keepRule) {
                        rules[prop] = val.param !== undefined ? val.param : true;
                    } else {
                        delete rules[prop];
                    }
                }
            });
            $.each(rules, function (rule, parameter) {
                rules[rule] = $.isFunction(parameter) ? parameter(element) : parameter;
            });
            $.each(['minlength', 'maxlength', 'min', 'max'], function () {
                if (rules[this]) {
                    rules[this] = Number(rules[this]);
                }
            });
            $.each(['rangelength', 'range'], function () {
                var parts;
                if (rules[this]) {
                    if ($.isArray(rules[this])) {
                        rules[this] = [Number(rules[this][0]), Number(rules[this][1])];
                    } else if (typeof rules[this] === 'string') {
                        parts = rules[this].split(/[\s,]+/);
                        rules[this] = [Number(parts[0]), Number(parts[1])];
                    }
                }
            });
            if ($.validator.autoCreateRanges) {
                if (rules.min && rules.max) {
                    rules.range = [rules.min, rules.max];
                    delete rules.min;
                    delete rules.max;
                }
                if (rules.minlength && rules.maxlength) {
                    rules.rangelength = [rules.minlength, rules.maxlength];
                    delete rules.minlength;
                    delete rules.maxlength;
                }
            }
            return rules;
        },
        normalizeRule: function (data) {
            if (typeof data === "string") {
                var transformed = {};
                $.each(data.split(/\s/), function () {
                    transformed[this] = true;
                });
                data = transformed;
            }
            return data;
        },
        addMethod: function (name, method, message) {
            $.validator.methods[name] = method;
            $.validator.messages[name] = message !== undefined ? message : $.validator.messages[name];
            if (method.length < 3) {
                $.validator.addClassRules(name, $.validator.normalizeRule(name));
            }
        },
        methods: {
            required: function (value, element, param) {
                if (!this.depend(param, element)) {
                    return "dependency-mismatch";
                }
                if (element.nodeName.toLowerCase() === "select") {
                    var val = $(element).val();
                    return val && val.length > 0;
                }
                if (this.checkable(element)) {
                    return this.getLength(value, element) > 0;
                }
                return $.trim(value).length > 0;
            }, remote: function (value, element, param) {
                if (this.optional(element)) {
                    return "dependency-mismatch";
                }
                var previous = this.previousValue(element);
                if (!this.settings.messages[element.name]) {
                    this.settings.messages[element.name] = {};
                }
                previous.originalMessage = this.settings.messages[element.name].remote;
                this.settings.messages[element.name].remote = previous.message;
                param = typeof param === "string" && {url: param} || param;
                if (previous.old === value) {
                    return previous.valid;
                }
                previous.old = value;
                var validator = this;
                this.startRequest(element);
                var data = {};
                data[element.name] = value;
                $.ajax($.extend(true, {
                    url: param,
                    mode: "abort",
                    port: "validate" + element.name,
                    dataType: "json",
                    data: data,
                    success: function (response) {
                        validator.settings.messages[element.name].remote = previous.originalMessage;
                        var valid = response === true || response === "true";
                        if (valid) {
                            var submitted = validator.formSubmitted;
                            validator.prepareElement(element);
                            validator.formSubmitted = submitted;
                            validator.successList.push(element);
                            delete validator.invalid[element.name];
                            validator.showErrors();
                        } else {
                            var errors = {};
                            var message = response || validator.defaultMessage(element, "remote");
                            errors[element.name] = previous.message = $.isFunction(message) ? message(value) : message;
                            validator.invalid[element.name] = true;
                            validator.showErrors(errors);
                        }
                        previous.valid = valid;
                        validator.stopRequest(element, valid);
                    }
                }, param));
                return "pending";
            }, minlength: function (value, element, param) {
                var length = $.isArray(value) ? value.length : this.getLength($.trim(value), element);
                return this.optional(element) || length >= param;
            }, maxlength: function (value, element, param) {
                var length = $.isArray(value) ? value.length : this.getLength($.trim(value), element);
                return this.optional(element) || length <= param;
            }, rangelength: function (value, element, param) {
                var length = $.isArray(value) ? value.length : this.getLength($.trim(value), element);
                return this.optional(element) || (length >= param[0] && length <= param[1]);
            }, min: function (value, element, param) {
                return this.optional(element) || value >= param;
            }, max: function (value, element, param) {
                return this.optional(element) || value <= param;
            }, range: function (value, element, param) {
                return this.optional(element) || (value >= param[0] && value <= param[1]);
            }, email: function (value, element) {
                return this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);
            }, url: function (value, element) {
                return this.optional(element) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
            }, date: function (value, element) {
                return this.optional(element) || !/Invalid|NaN/.test(new Date(value).toString());
            }, dateISO: function (value, element) {
                return this.optional(element) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(value);
            }, number: function (value, element) {
                return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
            }, digits: function (value, element) {
                return this.optional(element) || /^\d+$/.test(value);
            }, creditcard: function (value, element) {
                if (this.optional(element)) {
                    return "dependency-mismatch";
                }
                if (/[^0-9 \-]+/.test(value)) {
                    return false;
                }
                var nCheck = 0, nDigit = 0, bEven = false;
                value = value.replace(/\D/g, "");
                for (var n = value.length - 1; n >= 0; n--) {
                    var cDigit = value.charAt(n);
                    nDigit = parseInt(cDigit, 10);
                    if (bEven) {
                        if ((nDigit *= 2) > 9) {
                            nDigit -= 9;
                        }
                    }
                    nCheck += nDigit;
                    bEven = !bEven;
                }
                return (nCheck % 10) === 0;
            }, equalTo: function (value, element, param) {
                var target = $(param);
                if (this.settings.onfocusout) {
                    target.unbind(".validate-equalTo").bind("blur.validate-equalTo", function () {
                        $(element).valid();
                    });
                }
                return value === target.val();
            }
        }
    });
    $.format = $.validator.format;
}(jQuery));
(function ($) {
    var pendingRequests = {};
    if ($.ajaxPrefilter) {
        $.ajaxPrefilter(function (settings, _, xhr) {
            var port = settings.port;
            if (settings.mode === "abort") {
                if (pendingRequests[port]) {
                    pendingRequests[port].abort();
                }
                pendingRequests[port] = xhr;
            }
        });
    } else {
        var ajax = $.ajax;
        $.ajax = function (settings) {
            var mode = ("mode"in settings ? settings : $.ajaxSettings).mode, port = ("port"in settings ? settings : $.ajaxSettings).port;
            if (mode === "abort") {
                if (pendingRequests[port]) {
                    pendingRequests[port].abort();
                }
                return (pendingRequests[port] = ajax.apply(this, arguments));
            }
            return ajax.apply(this, arguments);
        };
    }
}(jQuery));
(function ($) {
    $.extend($.fn, {
        validateDelegate: function (delegate, type, handler) {
            return this.bind(type, function (event) {
                var target = $(event.target);
                if (target.is(delegate)) {
                    return handler.apply(target, arguments);
                }
            });
        }
    });
}(jQuery));

//main
$(document).ready(function () {

    $.validator.addMethod("checkphone", function (value, element) {
        $result = false;
        $format_string = value.replace(/[^\d]/g, "");
        $length = $format_string.length;
        if ($length == 10) {
            patt = new RegExp(/^09[0-9]{8}$/g);
            $result = patt.test($format_string);
            patt = new RegExp(/^088[0-9]{7}$/g);
            $result = $result == true ? $result : patt.test($format_string);
            patt = new RegExp(/^086[0-9]{7}$/g);
            $result = $result == true ? $result : patt.test($format_string);
        }
        else if ($length == 11) {
            patt = new RegExp(/^01[0-9]{9}$/g);
            $result = patt.test($format_string);
        }
        return $result;
    }, 'This is wrong format phone');
    //console.log($.cookie('isSendContact'));
    var contactFormRules = {
        name: {
            required: true,
            minlength: 2
        },
        email: {
            required: true,
            email: true
        },
        telephone: {
            required: true
        }

    }


    if ($('#master-class-modal').size() > 0) {
        $('#master-class-modal').modal({
            backdrop: 'static'
        });
    }

    var original_submit_label;
    var targe_sending_text;

    if ($("html").attr("lang") == "en") {
        targe_sending_text = "Sending...";
    }
    else {
        targe_sending_text = "Đang gửi...";
    }

    if ($('#facebook_like_box').size() > 0) {
        $(window).bind("load resize", function () {
            var container_width = $('#facebook_like_box').width();
            //$('#facebook_like_box').html('<div class="fb-like-box" data-href="https://www.facebook.com/WSE.VietNam" data-width="'+container_width+'" data-height="300" data-show-faces="true" data-header="true" data-stream="false" data-show-border="true"></div>');
            //FB.XFBML.parse( );
        });
    }

    if ($(".dynamic-pos").size() > 0) {
        if ($("#banner-header").height() != null) {
            $(".dynamic-pos").css("background-position", "center " + ($("#banner-header").height() + 101) + "px");
            $(".bg-ads-event").css("display", "block");
        }
    }
    else {
        $(".bg-ads-event").css("display", "block");
    }

    if ($(".breadcumbs.update-17-03").size() > 0) {
        var last_breadcrumb = $(".breadcumbs.update-17-03 a:last-child").text();
        $(".breadcumbs.update-17-03 a:last-child").remove();
        $(".breadcumbs.update-17-03").append("<span>" + last_breadcrumb + "</span>");
    }

    if ($('#corporate_video').size() > 0) {
        jwplayer("corporate_video").setup({
            file: "/files/videos/new-way-new-method.m4v",
            image: "/files/videos/new-way-new-method-cover.png",
            width: 690,
            height: 389
        }).onPlay(function () {
        });
    }

    if ($("#method-video").length > 0) {
//       jwplayer("method-video").setup({
//           file: "/files/videos/method/WSE_UNIQUE_METHOD.mp4",
//           image: "/files/videos/video-cover-our-method.png",
//           width: "100%",
//           aspectratio: "16:9"
//       });

        $("#image-map area").on("click", function () {
            $(".method-slider").carousel($(this).data("position") - 1);
        });

        $(window).bind('scroll', function (event) {
            var s = $(window).scrollTop(),
                d = $(document).height(),
                c = $(window).height();
            pos = (s / (d - c)) * 100;

            if (pos >= 20 && pos < 45) {
//               if(jwplayer('method-video').getState() != 'PLAYING')
//               {
//                   jwplayer('method-video').play();
//               }
            }
            else {
                //jwplayer('method-video').stop();
            }

        });
    }

    //if($("#promotion-march").length > 0){
    //    $(".banner-bg").on("load", onResize);
    //    $(window).bind("resize", onResize);
    //    function onResize(){
    //        var banner = ($(".banner-bg"));
    //        var height = banner.height();
    //        if(height != 0){
    //            $(".block-container-1").css("height", height + "px");
    //        }
    //    }
    //}


    if ($('#main_video').size() > 0) {
        jwplayer("main_video").setup({
            file: "/files/videos/we-build-confidence-before-speech-s1-resize.mp4",
            image: "/files/videos/video-cover-our-method-18-08.png",
            width: "100%",
            aspectratio: "9:5"
//		    width: 450,
//		    height: 250
        }).onPlay(function () {
        });

//	   	 if(!isMobile){
//        $(window).one('scroll', function (event) {
//
//            var s = $(window).scrollTop(),
//                d = $(document).height(),
//                c = $(window).height();
//            pos = (s / (d - c)) * 100;
//
//            if (pos >= 30 && pos < 55) {
//                if (jwplayer('main_video').getState() != 'PLAYING') {
//                    jwplayer('main_video').play();
//                }
//            }
//            else {
//                jwplayer('main_video').stop();
//            }
//
//        });
//	   	 }

    }


    $(".background-english-fit").on("mousemove", function (e) {

        if (e.pageY > 155) {
            $(this).css("cursor", "pointer");
        }
        else {
            $(this).css("cursor", "default");
        }

    });

    //background-english-fit,background-campaign
    $(".background-campaign").on("click", function (e) {

        if (e.pageY > 150) {
            if ($("html").attr("lang") == "en") {
                //location.href = "/en/courses/english-fit.html";
                //location.href = "/en/center/12-pico-plaza-center.html";
            }
            else {
                //location.href = "/vi/khoa-hoc-tieng-anh/english-fit.html";
                //location.href = "/vi/trung-tam/12-pico-plaza-center.html";
            }
        }
    });

    $(".social-group li a").aToolTip({xOffset: 7, yOffset: -50});

    if ($(".english-main-section").size() > 0) {
        $(".fit-section-item").aToolTip({xOffset: 7, yOffset: -50});
    }

    ///////////////////////////////////////////////////////////////
    // SETUP MULTI LANGUAGE
    ///////////////////////////////////////////////////////////////
    var language = '';

    $('.js-activated').dropdownHover().dropdown();

    $('img').each(function (index, el) {

        if ($(el).hasClass("img-responsive") == false && $(el).hasClass('not-responsive') == false) {
            $(el).addClass('img-responsive');
        }

    });

    $("#en_btn").on('click', function (e) {
        if ($("#article-translate-link").size() == 0) {
            changeLanguage('en');
            e.preventDefault();
        }
        else {
            translateBlog();
        }

    });
    $("#en_btn_01").on('click', function (e) {

        if ($("#article-translate-link").size() == 0) {
            location.href = "/en/home.html";
        }
        else {
            translateBlog();
        }
    });

    $("#vi_btn").on('click', function (e) {
        if ($("#article-translate-link").size() == 0) {
            changeLanguage('vi');
            e.preventDefault();
        }
        else {
            translateBlog();
        }
    });

    if ($("#switch-article-btn").size() > 0) {
        $("#switch-article-btn").attr('href', $("#article-translate-link").val());
//		$("#switch-article-btn").on("click", function(){
//			translateBlog();
//		});
    }

    function translateBlog() {
        location.href = $("#article-translate-link").val();
    }


    ///////////////////////////////////////////////////////////////
    // HANDLE MAIN/SUBMENU
    ///////////////////////////////////////////////////////////////

    // SET THE ACTIVE MENU FOR CURRENT PAGE

    var DELAY = 3000;
    var REPEAT = 1000;
    var timeOut = null;
    var interval = null;
    var _parent;
    var _isMenuOver = false;
    var _isDropOver = false;

    $('.sub-menu').on('mouseover', submenuHover);
    $('.sub-menu').on('mouseout', submenuOut);

    $('.sub-menu .dropdown-menu li a').on('mouseover', dropdownHover);
    $('.sub-menu .dropdown-menu li a').on('mouseout', dropdownOut);

    setActiveCurrentPage();

    function setActiveCurrentPage() {
        if ($(".vertical-menu").size() == 0) {
            if (_isMenuOver == false && _isDropOver == false) {
                $('.hidden-xs .dropdown-menu').css("display", "none");
                $('.main-menu .nav.navbar-nav li').each(function (index, element) {

                    if ($(this).hasClass("active")) {
                        $(this).find(".dropdown-menu").css("display", "block");
                    }
                });
            }
        }
    }

    function submenuHover() {
        if ($(".vertical-menu").size() == 0) {
            if ($(this).hasClass('active') == false) {
                $('.hidden-xs .dropdown-menu').css("display", "none");
                $(this).find('.dropdown-menu').css("display", 'block');
                _isMenuOver = true;
                //	_isDropOver = false;
            }
        }
        else {
            $('.hidden-xs .dropdown-menu').css("display", "none");
            $(this).find('.dropdown-menu').css("display", 'block');
            _isMenuOver = true;
        }
    }

    function submenuOut() {
        _isMenuOver = false;
        //_isDropOver = false;
        _parent = $(this);

        if ($(".vertical-menu").size() == 0) {
            if ($(this).hasClass('active') == false) {
                timeOut = setTimeout(function () {

                    if (_isMenuOver == false && _isDropOver == false) {
                        _parent.find('.dropdown-menu').css("display", 'none');
                        setActiveCurrentPage();
                    }

                    clearTimeout(timeOut);

                }, DELAY)

            }
        }
        else {
            timeOut = setTimeout(function () {

                if (_isMenuOver == false && _isDropOver == false) {
                    _parent.find('.dropdown-menu').css("display", 'none');
                    setActiveCurrentPage();
                }

                clearTimeout(timeOut);

            }, DELAY)
        }

    }

    function dropdownHover() {
        //_isMenuOver = false;
        _isDropOver = true;

        clearTimeout(timeOut);

        $(this).closest('.sub-menu').find('.dropdown-menu').css("display", 'block');

        if ($(this).hasClass('submenu-item-active') == false) {
            $(this).addClass("submenu-item-hover");
        }

    }

    function dropdownOut() {
        //_isMenuOver = false;
        _isDropOver = false;

        if ($(this).hasClass('submenu-item-active') == false) {
            $(this).removeClass("submenu-item-hover");
        }

    }

    //*************************************************************************
    // TAB SWITCH CONTENT
    //*************************************************************************
//	$('#myTab a').click(function (e) {
//		  e.preventDefault()
//		  $(this).tab('show')
//	});

    // $(".call-back-button").submit({return false});

    // VALIDATE LEFT CONTACT FORM SYSTEM
    if ($(".left-call-back-form-system").length > 0) {
        $(".left-call-back-form-system").validate({
            rules: {
                fullname: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true,
                    minlength: 12
                },
                sales_act_id: {
                    required: true
                }
            },
            errorPlacement: function (error, element) {
                $element = $(element);
                $type = $element.attr('type');
                if ($type != 'radio') {
                    $element.after($(error));

                }
                else {
                    $element.closest('.form-group').find('p:last-child').after($(error));
                }
            },
            submitHandler: function (form) {
                //ssda('send', 'submit_form', form);
                dataLayer
                    .push({
                        'event': 'GAevent',
                        'eventCategory': 'Contact',
                        'eventAction': 'Send Contact'
                    });
            }

        });
    }
    // END OF LEFT CONTACT FORM SYSTEM

    if ($(".call-back-form").length > 0) {
        $(".call-back-form").validate({
            rules: {
                fullname: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true,
                    minlength: 12
                },
                sales_act_id: {
                    required: true
                }
            },
            errorPlacement: function (error, element) {
                $element = $(element);
                $type = $element.attr('type');
                if ($type != 'radio') {
                    $element.after($(error));

                }
                else {
//                    $element.closest('.row').find('.col-sm-7').append($(error));
                    $element.closest('.row').find('.sale-act-title').append($(error));
                }
            },
            submitHandler: function (form) {
                //ssda('send', 'submit_form', form);
                dataLayer
                    .push({
                        'event': 'GAevent',
                        'eventCategory': 'Contact',
                        'eventAction': 'Send Contact'
                    });
            }

        });
    }

    if ($(".call-back-form-right").length > 0) {
        $(".call-back-form-right").validate({
            rules: {
                fullname: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true,
                    minlength: 12
                }
            },
            submitHandler: function (form) {
                //ssda('send', 'submit_form', form);
            }

        });
    }

    if ($(".call-back-form-2").length > 0) {
        $(".call-back-form-2").validate({
            rules: {
                fullname: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true
                }
            },
            submitHandler: function (form) {
                //ssda('send', 'submit_form', form);
            }

        });
    }

    if ($(".call-back-form-method").length > 0) {
        $(".call-back-form-method").validate({
            rules: {
                fullname: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true,
                    checkphone: true
                },
                sales_act_id: {
                    required: true
                }
            },
            errorPlacement: function (error, element) {
                $element = $(element);
                $type = $element.attr('type');
                if ($type != 'radio') {
                    $element.after($(error));

                }
                else {
                    $element.closest('.row').find('.col-sm-7').append($(error));
                }
            },
            submitHandler: function (form) {
                //ssda('send', 'submit_form', form);
            }

        });
    }

    if ($(".call-back-form-why-choose-us").length > 0) {
        $(".call-back-form-why-choose-us").validate({
            rules: {
                fullname: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true
                }
            },
            submitHandler: function (form) {
                //ssda('send', 'submit_form', form);
            }

        });
    }

    if ($(".call-back-form-scholarship").length > 0) {
        $(".call-back-form-scholarship").validate({
            rules: {
                fullname: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true
                }
            },
            submitHandler: function (form) {
                //ssda('send', 'submit_form', form);
            }

        });
    }


    //$('.district').selectpicker();

    //************ MAIN FORM : Home-Page, Left-Side, Right-Side, Contact-Page *****************

    submitMainForm(".left-call-back-form-system", "#submit_left_contact_form_system", "/sendcontact", "");
    submitMainForm(".call-back-form", "#submit_contact", "/sendcontact", "");
    submitMainForm(".call-back-form-right", "#submit_contact_right", "/sendcontact", "");
    submitMainForm(".call-back-form-method", "#submit_contact_method", "/sendcontact", "/wse-our-method/contact-form.html");
    submitMainForm(".call-back-form-why-choose-us", "#submit_contact_why_choose_us", "/sendcontact", "/why-choose-us/contact-form.html");
    submitMainForm(".call-back-form-scholarship", "#submit_contact_scholarship", "/sendcontact", "/scholarship/scholarship.html");
    submitMainForm(".call-back-form-toeic", "#submit_contact_toeic", "/sendcontact", "");
    submitMainForm(".call-back-form-2", "#submit_contact_courses", "/sendcontact", "");

    function submitMainForm(_form, _button_submit, _link, _gaq_link) {
        $(_button_submit).click(function () {

            //ga('send', 'event', 'Contact', 'Send Contact');
            var page_location = $(_button_submit).data('local');
            var form = $(_form).eq(0);
            original_submit_label = $(_button_submit).text();

            var district = $(_form).find('.district').val();
            //if (district != 0) {
            if (true) {
                if (form.valid()) {

                    $(_button_submit).addClass("disabled").text(targe_sending_text);

                    var current_url = window.location.href;
                    var params = form.serialize() + '&current_url=' + current_url;

                    window._fbq = window._fbq || [];
                    if (_button_submit == "#submit_contact_scholarship") {

                        window._fbq.push(['track', '6016779380767', {'value': '1.00', 'currency': 'VND'}]);
//						window._fbq.push(['track', '6017943312167', {'value':'1.00','currency':'VND'}]);
                    }
                    if (_button_submit == "#submit_contact_method") {
                        window._fbq.push(['track', '6016867287367', {'value': '1.00', 'currency': 'VND'}]);
                    }

                    $.ajax({
                        type: 'POST',
                        url: _link,
                        cache: false,
                        data: params,
                        success: function (data) {
                            //ssda('send', 'submit_form', form[0]);
                            var modal = $("#contact_modal");

                            //$("#iframe_thank").get(0).contentWindow.location.href = "/"+$("html").attr("lang")+"/contact/thank.html";

                            $(_button_submit).removeClass("disabled").text(original_submit_label);
                            dataLayer.push({
                                'event': 'GAevent',
                                'eventCategory': 'Contact',
                                'eventAction': 'Send Contact'
                            });

                            //var _gaq = window._gaq || [];
                            //_gaq.push(['_setAccount', 'UA-40208321-1']);

                            if ((page_location == 'home')) {
                                //_gaq.push(['_trackPageview', '/contact/home-contact.html']);
                                //ga('send', 'pageview', '/contact/home-contact.html');
                                //dataLayer.push({event: 'pageview', pageview: '/contact/home-contact.html'});

                            }
                            else if (page_location == 'sub') {
                                //_gaq.push(['_trackPageview', '/contact/sub-contact.html']);`
                                //ga('send', 'pageview', '/contact/sub-contact.html');
                                //dataLayer.push({event: 'pageview', pageview: '/contact/sub-contact.html'});
                            }
                            else if (page_location == 'main') {
                                //_gaq.push(['_trackPageview', '/contact/cam-on.html']);
                                //ga('send', 'pageview', '/contact/cam-on.html');
                                //dataLayer.push({event: 'pageview', pageview: '/contact/cam-on.html'});
                            }
                            else {
                                //_gaq.push(['_trackPageview', _gaq_link]);
                                //ga('send', 'pageview', _gaq_link);
                                //dataLayer.push({event: 'pageview', pageview: _gaq_link});
                            }

                            if (data == "success") {

                                if ($(_form).find('input[name="is_promotion"]').size() > 0) {
                                    if ($(_form).find('input[name="is_promotion"]').val() == 1) {
                                        console.log('111');
                                        //campaignAfterAmbient();
                                    }
                                }

                                form.find("input, textarea").each(function (index) {
                                    $(this).val('');
                                    modal.find('.fail').hide();
                                });

                            }
                            else {
                                modal.find('.success').hide();
                            }

                            document.location = "/" + $("html").attr("lang") + "/contact/thank.html";

                            //$('#contact_modal').modal('show');
//							$('#contact_modal').on('hidden.bs.modal', function (e) {
//								  console.log("thanks for register");
//							})

                        }
                    });

                }

            } else {
                $('#district_select').modal('show');
            }
        })
    }

// submit event
//    $(document).on("submit", "form", function (e) {
//      console.log('submit call');
//    })

    function campaignAfterAmbient() {
        AbdTracking.Retargeting({'id': 1403067259});

        // try{

        // 	AbdTracking.Retargeting({'id':1403067259});
        // 	//return;
        // }catch(e){}

    }

    //////////////////////////////////////////////////////////////
    //	TIMELINE ANIMATION FOR ABOUT PAGE
    //////////////////////////////////////////////////////////////

    var TIMELINE_SECONDS = 0.5;
    var INFOR_SECONDS = 0.3;
    var STEP = 104;
    //var STEP_INFOR = 754;
    var STEP_INFOR = 790;
    var num_milestone = $(".timeline-list > li.m-item").size();
    var new_pos;
    var current_milestone = 0;
    var next_milestone = 0;

    $(".n-year-btn").each(function (index, event) {

        $(this).on('click', function (e) {

            $(".n-year-btn").removeClass("active");
            $(this).addClass("active");
            next_milestone = $('.n-year-btn').index(this);
            excuteAnimation();

            if (next_milestone > 0 && next_milestone < num_milestone) {
                $(".milestone-control .m-next-btn").show();
                $(".milestone-control .m-prev-btn").show();
            }
            console.log(num_milestone);
            console.log(next_milestone);
            if (next_milestone == num_milestone - 1) {
                $(".milestone-control .m-next-btn").hide();
                $(".milestone-control .m-prev-btn").show();
            }
            if (next_milestone == 0) {
                $(".milestone-control .m-prev-btn").hide();
                $(".milestone-control .m-next-btn").show();
            }
        });

    });

    $(".milestone-control .m-prev-btn").hide();

    $(".milestone-control .m-prev-btn").on('click', function () {
        $(".milestone-control .m-next-btn").show();
        if (current_milestone > 0) {
            next_milestone--;
            resetActiveItem();
        }
        if (current_milestone == 0) {
            $(this).hide();
            $(".milestone-control .m-next-btn").show();
        }
    });

    $(".milestone-control .m-next-btn").on('click', function () {
        $(".milestone-control .m-prev-btn").show();
        if (current_milestone < num_milestone - 1) {
            next_milestone++;
            resetActiveItem();
        }
        if (current_milestone == num_milestone - 1) {
            $(this).hide();
            $(".milestone-control .m-prev-btn").show();
        }
    });
//
    function resetActiveItem() {
        $(".timeline-list").find(".n-year-btn").removeClass("active");
        $(".timeline-list").find(".n-year-btn").eq(next_milestone).addClass("active");
        excuteAnimation();
    }

    function excuteAnimation() {
        new_pos = ($(".timeline-list").position().left - 15) - ((next_milestone - current_milestone) * STEP);
        current_milestone = next_milestone;
        TweenMax.to($(".timeline-list"), TIMELINE_SECONDS, {left: new_pos + "px"});
        TweenMax.to($(".milestone-list"), INFOR_SECONDS, {left: -(STEP_INFOR * next_milestone) + "px"});
    }

    //////////////////////////////////////////////////////////////
    // END OF TIMELINE ANIMATION FOR ABOUT PAGE
    //////////////////////////////////////////////////////////////

    if ($('.question-section').size() > 0 || $('.section-courses').size() > 0) {
        $('.collapse').on('hidden.bs.collapse', function () {
            $(this).closest('.panel.panel-default').find('.expand-contract-icon').text("+");
        });

        $('.collapse').on('show.bs.collapse', function () {
            $(this).closest('.panel.panel-default').find('.expand-contract-icon').text("-");
        });
    }
    if ($('#promotion-form').length > 0) {
        $phrases = $.parseJSON($("#phrases").val());
        var $form = $('#promotion-form');

        var template = $('body').find('.current_template').val();

        console.log(template);

        $form.validate({
            rules: {
                fullname: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true,
                    checkphone: true
                },
                myconfirm: {
                    required: true,
                },
                sales_act_id: {
                    required: true,
                },
                'cityform': {
                    required: true
                },
                'yearform': {
                    required: true
                },
            },
            submitHandler: function (form) {
                //ssda('send', 'submit_form', form);
                dataLayer.push({'event': 'GAevent', 'eventCategory': 'Promotion', 'eventAction': 'Send Contact'});
                var $data = $form.serialize();

                $('#modal_progress').modal({
                    show: true,
                    backdrop: false
                });
                var myurl = '/' + $('html').attr('lang') + "/sendcontact";
                var curr_saleId = $('#promotion-form').find('input[name="sales_act_id"]').val()

                var currThank = '/contact/thank.html';
                if (curr_saleId == "2234") {
                    var currThank = '/but-pha-de-dan-dau/thank.html';
                }
                if (curr_saleId == "2020") {
                    var currThank = '/dap-tan-lo-au-tu-tin-hoc/thank.html';
                }
                $.ajax({
                    type: "POST",
                    cache: false,
                    data: $data,
                    url: myurl,
                    success: function (result) {
                        document.location = "/" + $("html").attr("lang") + currThank;
                    },
                    error: function (data) {
                    }
                });
            },
            messages: {
                fullname: {
                    required: $phrases.name_required
                },
                email: {
                    required: $phrases.email_required,
                    email: $phrases.email_email
                },
                phone: {
                    required: $phrases.phone_required,
                    checkphone: $phrases.phone_checkphone
                },
                myconfirm: {
                    required: $phrases.terms_required,
                },
                sales_act_id: {
                    required: $phrases.terms_required,
                },
                'yearform': {
                    required: "Chưa chọn độ tuổi"
                },
                'cityform': {
                    required: "Chưa chọn thành phố"
                }
            },
            errorPlacement: function (error, element) {
                $element = $(element);
                $type = $element.attr('type');

                if ($type != 'checkbox' && $type != 'radio' && $type != 'hidden') {
                    $element.after($(error));

                }
                else {
                    if (template == 'templatea') {
                        $element.closest('.form-popup-summer').find('.myconfirm-line').append($(error));
                    } else {
                        if ($type == 'checkbox') {
                            $('body').find('.myconfirm-line').append($(error));
                        }
                        if ($type == 'radio' || $type == 'hidden') {
                            $('body').find('.myconfirm-line2').append($(error));
                        }

                    }
                }
            },
            errorElement: 'p'
        });
    }
    if ($('#payment-form').length > 0) {
        var $form = $('#payment-form');
        $form.validate({
            rules: {
                fullname: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true,
                    checkphone: true
                }
            },
            submitHandler: function (form) {
                //ssda('send', 'submit_form', form);
                dataLayer.push({'event': 'GAevent', 'eventCategory': 'Contact', 'eventAction': 'Send Contact'});
                var $data = $form.serialize();

                $('#modal_progress').modal({
                    show: true,
                    backdrop: false
                });
                var myurl = '/' + $('html').attr('lang') + "/sendcontact";
                $.ajax({
                    type: "POST",
                    cache: false,
                    data: $data,
                    url: myurl,
                    success: function (result) {
                        document.location = "/" + $("html").attr("lang") + "/contact/thank.html";
                    },
                    error: function (data) {
                    }
                });
            }

        });
    }

    $(".info-user").validate({

        rules: {
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            telephone: {
                required: true
            }

        },
        submitHandler: function (form) {
            //ssda('send', 'submit_form', form);
            $("#submit-user-info").button("loading");
            var type = $(".info-user input[name='type']").val();

            if (type == "website_method_test") {
//				console.log('type1', type);

                //var _gaq = window._gaq || [];
                //_gaq.push(['_setAccount', 'UA-40208321-1']);

                //_gaq.push(['_trackEvent', 'English Test', 'Send Contact']);
                //ga('send', 'event', 'English Test', 'Send Contact');
                dataLayer.push({'event': 'GAevent', 'eventCategory': 'English Test', 'eventAction': 'Send Contact'});

            }

            if (type == "facebook_method_test") {
//				console.log('type2', type);
                //var _gaq = window._gaq || [];
                //_gaq.push(['_setAccount', 'UA-40208321-1']);

                //ga('send', 'event', 'Facebook App', 'Send Contact');
                dataLayer.push({'event': 'GAevent', 'eventCategory': 'Contact', 'eventAction': 'Send Contact'});
                //_gaq.push(['_trackEvent', 'Facebook App', 'Send Contact']);
                window._fbq.push(['track', '6016685910967', {'value': '1.00', 'currency': 'VND'}]);
                console.log("send facebook conversion code");
            }
            $.ajax({
                url: $(".info-user input[name='action_url']").val(),
                type: 'post',
                data: {
                    name: $(".info-user input[name='name']").val(),
                    email: $(".info-user input[name='email']").val(),
                    phone: $(".info-user input[name='telephone']").val(),
                    type: type,
                    insert_id: $(".info-user input[name='insert_id']").val(),
                    message: $(".info-user input[name='message']").val(),
                    fromurl: $(".info-user input[name='fromurl']").val(),
                    result: $(".info-user input[name='result']").val()
                },
                async: false,
                success: function (rs) {
                    rs = jsonParse(rs);
                    if (rs) {
                        if (rs.status == "success") {
                            console.log("type", type);
                            if (type == "ask_question") {

                                //var _gaq = window._gaq || [];
                                //_gaq.push(['_setAccount', 'UA-40208321-1']);

                                //_gaq.push(['_trackPageview', '/wse-question/question-bar.html']);
//								ga('send', 'pageview', '/wse-question/question-bar.html');
                                //ga('send', 'event', 'Contact', 'Send Contact');
                                dataLayer.push({
                                    'event': 'GAevent',
                                    'eventCategory': 'Contact',
                                    'eventAction': 'Send Contact'
                                });
                            }

                            if (typeof rs.redirect_url != "undefined") {
                                // $("#info-user-box").on("hidden.bs.modal", function(){
                                window.location.href = rs.redirect_url;
                                // });
                            }
                            $("#submit-user-info").button("reset");
                            $("#info-user-box").modal('hide');
                            $("#info-user-box").on("hidden.bs.modal", function (e) {
                                if ($("#contact_modal").length > 0) {
                                    $('#contact_modal').find('.fail').hide();
                                    $('#contact_modal').modal('show');
                                }
                            });
                        }
                        else {
                            if ($("#contact_modal").length > 0) {
                                $('#contact_modal').find('.success').hide();
                                $('#contact_modal').modal('show');
                            }
                        }
                    }

                }
            });
        }
    });


    if ($('#promotion-form-tieng-anh').length > 0) {
        $phrases = $.parseJSON($("#phrases").val());
        var $form = $('#promotion-form-tieng-anh');

        $form.validate({
            rules: {
                fullname: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true,
                    checkphone: true
                },
                sales_act_id: {
                    required: true,
                }
            },
            submitHandler: function (form) {
                //ssda('send', 'submit_form', form);
                dataLayer.push({'event': 'GAevent', 'eventCategory': 'Promotion', 'eventAction': 'Send Contact'});
                var $data = $form.serialize();

                $('#modal_progress').modal({
                    show: true,
                    backdrop: false
                });
                var myurl = '/' + $('html').attr('lang') + "/sendcontact";
                $.ajax({
                    type: "POST",
                    cache: false,
                    data: $data,
                    url: myurl,
                    success: function (result) {
                        document.location = "/" + $("html").attr("lang") + "/contact/thank.html";
                    },
                    error: function (data) {
                    }
                });
            },
            messages: {
                fullname: {
                    required: $phrases.name_required
                },
                fullname2: {
                    required: $phrases.name_required
                },
                email: {
                    required: $phrases.email_required,
                    email: $phrases.email_email
                },
                phone: {
                    required: $phrases.phone_required,
                    checkphone: $phrases.phone_checkphone
                },
                phone2: {
                    required: $phrases.phone_required,
                    checkphone: $phrases.phone_checkphone
                },
                sales_act_id: {
                    required: $phrases.terms_required,
                },
            },
            errorPlacement: function (error, element) {
                $element = $(element);
                $type = $element.attr('type');

                if ($type != 'checkbox' && $type != 'radio' && $type != 'hidden') {
                    $element.after($(error));

                }
                else {
                }
            },
            errorElement: 'p'
        });
    }

    var pre_question = "";

    $("#ask-question").on("click", function (e) {
        e.preventDefault();
        var question = $(".ask-question input").val();
        if (question == '') return false;
        if (pre_question != question) {
            pre_question = question;
            var type = "ask_question";
            var fromurl = window.location.href;
            var url = "/store-user-info";
            if (question != "") {
                $.ajax({
                    url: url,
                    type: 'post',
                    data: {
                        message: question,
                        type: type,
                        fromurl: fromurl
                    },
                    async: false,
                    success: function (rs) {
                        rs = JSON.parse(rs);
                        if (rs.status == 'success') {
                            $(".info-user input[name='insert_id']").val(rs.insert_id);
                            $(".info-user input[name='action_url']").val(url);
                            $(".info-user input[name='type']").val(type);
                            $("#info-user-box .img-completed-title-02").html("<b>Question: " + question + "</b>");
                            $("#info-user-box").modal("show");
                        }
                    }
                });
            }
        }
        else {
            $("#info-user-box").modal("show");
        }

    });
    if ($(".new-contact-form").length > 0) {
        $phrases = $.parseJSON($("#phrases").val());
        $(".new-contact-form").each(function (index, form) {
            $form = $(form);
            $form.validate({
                errorElement: 'div',
                errorClass: 'error',
                errorPlacement: function (error, element) {
                    $element = $(element);
                    $type = $element.attr('type');
                    if ($type != 'radio') {
                        $element.after($(error));
                    }
                    else {
                        $element.closest('.form-row').find('.sale-act-title').after($(error));
                    }
                },
                rules: {
                    name: {
                        required: true
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    phone: {
                        required: true,
                        checkphone: true
                    },
                    sales_act_id: {
                        required: true
                    },
                    'cityform': {
                        required: true
                    },
                    'yearform': {
                        required: true
                    },
                },
                messages: {
                    name: {
                        required: $phrases.name_required
                    },
                    email: {
                        required: $phrases.email_required,
                        email: $phrases.email_email
                    },
                    phone: {
                        required: $phrases.phone_required,
                        checkphone: $phrases.phone_checkphone
                    },
                    'yearform': {
                        required: "Chưa chọn độ tuổi"
                    },
                    'cityform': {
                        required: "Chưa chọn thành phố"
                    }
                },
                submitHandler: function (form) {
                    //ssda('send', 'submit_form', form);
                    var formdata = $(form).serializeArray();
                    var data = {};
                    $(formdata).each(function (index, obj) {
                        data[obj.name] = obj.value;
                    });

                    if (data['goals'] && data['goals'] == 'promotion') {
                        var setGoals = "Promotion";
                    } else {
                        setGoals = "Contact";
                    }
                    var urlContact = 'contact/thank.html';
                    var lightbox_thank = '0';
                    if (data['contact-type'] && data['contact-type'] == '1') {
                        var urlContact = 'contact-page/thank.html';
                    }
                    if (data['contact-type'] && data['contact-type'] == 'nse') {
                        var urlContact = 'chuong-trinh-hoc-moi/toan-bo-buoi-gioi-thieu.html';
                        var lightbox_thank = '1';
                    }
                    if (data['type'] == 'lap-ke-hoach-chuan-smart') {
                        var urlContact = 'lap-ke-hoach-ca-nhan-chuan-smart/cam-on.html';
                    }
                    if (data['type'] == 'i_dare_will') {
                        var urlContact = 'contact/thank.html?page=i_dare_will';
                    }
                    dataLayer.push({
                        'event': 'GAevent',
                        'eventCategory': setGoals,
                        'eventAction': 'Send Contact'
                    });
                    var myurl = '/' + $('html').attr('lang') + "/sendcontact";
                    sendFacebookConversion();
                    $.ajax({
                        type: "POST",
                        cache: false,
                        data: $(form).serialize(),
                        beforeSend: function () {
                            $(form).find('.page-submit').html('Đang gửi...');
                            $(form).find('.page-submit').attr("disabled", true);
                        },
                        async: false,
                        url: myurl,
                        success: function (result) {
                            if (lightbox_thank == "1") {
                                alert("Cám ơn bạn đã đăng ký khóa học tại Wall Street English.");
                            }
                            document.location = "/" + $("html").attr("lang") + "/" + urlContact;

                        },
                        error: function (data) {
                        }
                    });
                }
            })
        });
    }


    if ($(".xalolead-contact-form").length > 0) {
        $phrases = $.parseJSON($("#phrases").val());

        $('.adult.btn-success').click(function () {
            $('body').find('.adults.hide').css('display', 'none');
            window.location.reload();
        });


        $(".xalolead-contact-form").each(function (index, form) {
            $form = $(form);
            $form.validate({
                errorElement: 'div',
                errorClass: 'error',
                errorPlacement: function (error, element) {
                    $element = $(element);
                    $type = $element.attr('type');
                    if ($type != 'radio') {
                        $element.after($(error));
                    }
                    else {
                        $element.closest('.form-row').find('.sale-act-title').after($(error));
                    }
                },
                rules: {
                    name: {
                        required: true
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    phone: {
                        required: true,
                        checkphone: true
                    },
                    city: {
                        required: true,
                    },
                    career: {
                        required: true,
                    },
                    purpose: {
                        required: true,
                    },
                    year: {
                        required: true,
                    },
                    time: {
                        required: true,
                    },
                    sales_act_id: {
                        required: true
                    }
                },
                messages: {
                    name: {
                        required: $phrases.name_required
                    },
                    email: {
                        required: $phrases.email_required,
                        email: $phrases.email_checkemail
                    },
                    phone: {
                        required: $phrases.phone_required,
                        checkphone: $phrases.phone_checkphone
                    },
                    city: {
                        required: $phrases.city_required,
                    },
                    career: {
                        required: $phrases.career_required,
                    },
                    purpose: {
                        required: $phrases.purpose_required,
                    },
                    year: {
                        required: $phrases.year_required,
                    },
                    time: {
                        required: $phrases.time_required,
                    }
                },
                submitHandler: function (form) {
                    //ssda('send', 'submit_form', form);
                    var data = {};
                    data['sales_act_id'] = $('.sales_act_id').val();
                    var n = $(".agree_terms:unchecked").length;

                    if (n == 1) {
                        $('body').find('.agreeterm').css('display', 'block');
                    } else {
                        dataLayer.push({
                            'event': 'GAevent',
                            'eventCategory': 'Contact',
                            'eventAction': 'Send Contact'
                        });
                        sendFacebookConversion();
                        $.ajax({
                            type: "POST",
                            cache: false,
                            data: $('.xalolead-contact-form').serialize(),
                            url: "/lead/xalo",
                            success: function (result) {
//   	    					alert('Cám ơn bạn. Chúng tôi đã nhận được thông tin của bạn và sẽ liên lạc bạn trong thời gian sớm nhất!');
//   	    					window.location = "http://wallstreetenglish.edu.vn/vi/tieng-anh-cho-nguoi-lon-ban-ron";


                                $('#event_seminar_modal').modal('show');
                                $('body').find('.hide').removeClass('hide');
                                $('#event_seminar_modal').on('hidden.bs.modal', function () {
                                    window.location.reload();
                                });


                            },
                            error: function (data) {
                            }
                        });
                    }


                }
            })
        });
    }


//    if($("#promotion-modal").length > 0) {
//    	setTimeout(
//			function() {
//				$("#car").animate({
//		    		'display': 'inline-block',
//		    		'left': '+=200%'
//		    	}, 3000, function(){
//		    		$("#promotion-modal").modal('show');
//		    	})
//    	}, 7000);
//
//
//    }

    if ($("#hotsummer-promotion-modal").length > 0) {

        delayNext = setTimeout(function () {
            $("#hotsummer-promotion-modal").modal('show');
            clearTimeout(delayNext);
        }, 6000);

    }
    // Boost income
    if ($(".salary-boost").length > 0) {
        $(document).scrollTop($(".salary-boost").offset().top);

//        	 if($('body').find('.boost .title').is(':hidden')){
//			        		 $('body').find('.boost').mouseenter( function(){
//			           		  $(this).find('.title').fadeIn();
//			           	 } ).mouseleave( function(){
//			           		 $(this).find('.title').fadeOut();
//			           	 } );
//        	 }


    }


    if ($('.button-header').length > 0) {
        $(document).scrollTop($(".bgpage").offset().top);
        $('.button-header').click(function () {
            $(document).scrollTop($(".bgpage-end").offset().top);
            return false;
        })
    }

    if ($('.alumni-sharing').length > 0) {
        $(document).scrollTop($(".alumni-sharing").offset().top);
    }

    $('.boostcontinue').click(function () {
        if ($('#english-level').val() != "" && $('#department').val() != "" && $('#position').val() != "" && $('#salary').val() != "") {
            $('body').find('#boost-step1').css('display', 'none');
            $('body').find('#boost-step2').css('display', 'block');
        } else {
            $('.error-level').show();
        }

    });

    // 	aec2015
    if ($(".aec-main").length > 0) {
        $(document).scrollTop($(".aec-main").offset().top);
    }

    if ($('#fitScreen').length > 0) {
//        $(document).scrollTop($("#fitScreen").offset().top);
//        var screenHeight = $(window).outerHeight();
//        $('#fitScreen').height(screenHeight);
    }


    $(".btn-language").click(function () {
        var a = $(this).data("routename");
        console.log(a);
        var b = $(this).data("params");
        var c = $(this).data("lang");
        changeLanguage(c, a, b);
    });

    function changeLanguage(a, b, c) {
        if (b.indexOf("blog") > -1) $.ajax({
            url: "/" + a + "/blog/index/locale",
            data: {
                lang: a,
                route_name: b,
                route_params: c
            },
            cache: false,
            type: "POST",
            async: false,
            success: function (a) {
                a = JSON.parse(a);
                console.log(a);
                if (a.success) document.location = a.url;
            },
            error: function (a) {
            }
        }); else $.ajax({
            url: "/" + a + "/index/locale",
            data: {
                lang: a,
                route_name: b,
                route_params: c
            },
            cache: false,
            type: "POST",
            async: false,
            success: function (a) {
                a = JSON.parse(a);
                console.log(a);
                if (a.success) if ("/" != location.pathname && "/en/home.html" != location.pathname) {
                    if ("alumni/default" != b) document.location = a.url;
                } else if ("/en/home.html" == location.pathname) document.location = "/"; else location.reload();
            },
            error: function (a) {
            }
        });
        return false;
    }

////////////////////////////////////////////////////////////////////////////////////////
    //  APPLY SELECTED MEDIA TO TARGET FIELD (INPUT TEXT, GRIDVIEW)
    ////////////////////////////////////////////////////////////////////////////////////////

    if ($(".colorbox-modal").length > 0) {

        $(".colorbox-modal").colorbox({
            iframe: true,
            width: '97%', height: '95%',
            onOpen: function () {
            },
            onLoad: function () {
            },
            onComplete: function () {
            },
            onCleanup: function () {

            },
            onClosed: function () {
            }
        });
    }
    ie_version = getInternetExplorerVersion();
    if (ie_version < 10 && ie_version != -1) {
        if ($("input, textarea").length != 0) {
            $('input, textarea').placeholder();
        }
    }

    // insert icon lixi
//    if($(".has-event").length > 0){
//        $(".new-year-modal").modal({
//            show: false,
//            backdrop: true
//        });
//        var randomParagraph = getRandomAnElement($(".has-event p, .has-event h4"));
//        var text = randomParagraph.html();
//        var words = insertDataIntoText("<a class='icon-lixi open-event' href='javascript:void(0)'></a>", text);
//        randomParagraph.html(words);
//
//        $(".open-event").on("click", function(e){
//            e.preventDefault();
//            e.stopPropagation();
//            var groupId = '';
//
//            dataLayer.push({'event': 'GAevent', 'eventCategory': 'Event', 'eventAction': 'Event click envelop'});
//
//            if($(".has-event").hasClass("method")){
//                groupId = 68;
//            }
//            if($(".has-event").hasClass("individual")){
//                groupId = 70;
//            }
//            if($(".has-event").hasClass("about-wse")){
//                groupId = 69;
//            }
//            $.ajax({
//                url: '/' + lang + '/english-tests/lixi/pick-test',
//                data: {
//                    groupId: groupId
//                },
//                async: false,
//                type: 'get',
//                success: function(rs){
//                    rs = JSON.parse(rs);
//                    $("#new-year-test-modal .test-content").html(rs.html);
//                    $("#new-year-test-modal").modal("show");
//                    $("#new-year-test-modal .btn-new-year").data("qid", rs.qid);
//                    $("#new-year-test-modal .option").on("click", function(e){
//                        if(!$(this).hasClass("active")){
//                            $(this).addClass("active").parents(".row").siblings().find(".option").removeClass("active");
//                        }
//                    });
//                }
//            });
//        });
//        $("#new-year-contact-modal .info-user").validate({
//            rules : contactFormRules
//        });
//        var userId = '';
//        $(document).on("click", ".btn-new-year", function(e){
//            if($(this).data("action") == "submit-test"){
////                $(this).button("")
//                var $this = $(this);
//                if($("#new-year-test-modal .option.active").length > 0){
//                    $.ajax({
//                        url: '/vi/english-tests/lixi/validate-test',
//                        data: {
//                            aid: $("#new-year-test-modal .option.active").data("aid"),
//                            qid: $this.data("qid")
//                        },
//                        async: false,
//                        type: 'get',
//                        success: function(rs){
//                            rs = JSON.parse(rs);
//                            userId = rs.userId;
//                            console.log(typeof rs);
//                            $("#new-year-test-modal").modal("hide");
//                            $("#new-year-contact-modal").modal("show");
//                        }
//                    });
//                }
//            }
//
//            if($(this).data("action") == "submit-form"){
//                console.log(userId);
//                if($("#new-year-contact-modal .info-user").valid()){
//                    $.ajax({
//                        url: '/vi/english-tests/lixi/add-contact',
//                        data: {
//                            userId: userId,
//                            name: $("#new-year-contact-modal input[name=name]").val(),
//                            email: $("#new-year-contact-modal input[name=email]").val(),
//                            phone: $("#new-year-contact-modal input[name=telephone]").val(),
//                            fromUrl: location.href
//                        },
//                        type: 'get',
//                        async: false,
//                        success: function(rs){
//                            $("#new-year-contact-modal").modal("hide");
//                            $("#new-year-thank-modal").modal("show");
//                        }
//                    });
//                }
//            }
//            if($(this).data("action") == "back"){
//                $("#new-year-thank-modal").modal("hide");
//            }
//        });
//    }

//   if($("#promotion-modal").length > 0) {
//	   setTimeout(
//	   function()
//	   {
//		   $("#promotion-modal").modal('show').delay(7000);
//		   $('#promotion-modal').on('shown.bs.modal', function (e) {
//			   jwplayer("mom-video").setup({
//				   file: "http://www.youtube.com/watch?v=-j1SwdCIEKU",
//				   width: '100%',
//				   autostart: true,
//				   aspectratio: "16:9"
//			   });
//		   })
//	   }, 7000);
//   }

});
/* end document ready */

function getRandomAnElement(element) {
    var length = element.length;
    var rand = Math.floor(Math.random() * length);
    return element.eq(rand);
}

function insertDataIntoText(data, text) {
    words = text.split(" ");
    var newWords = [];
    var str = '';
    var inTag = false;
    var tmp = "";
    $.each(words, function (i, v) {
        if (v.indexOf('<') != -1 && v.indexOf('>') == -1) {
            inTag = true;
            str = v;
        } else {
            if (v.indexOf('>') != -1) {
                str += " " + v;
                tmp = str;
                str = "";
                inTag = false;
                if (v.indexOf("<") != -1) {
                    inTag = true;
                    str = v.substring(v.indexOf("<"));
                    tmp = tmp.substring(0, tmp.length - str.length);
                }
                newWords.push(tmp);
            } else {
                if (inTag) {
                    str += " " + v;
                } else {
                    newWords.push(v);
                }
            }
        }
    });
    var wordCount = newWords.length;
    var rand = Math.floor(Math.random() * wordCount);
    newWords.splice(rand, 0, data);
    return newWords.join(" ");
}

function getInternetExplorerVersion() {
    var rv = -1;
    if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat(RegExp.$1);
    }
    else if (navigator.appName == 'Netscape') {
        var ua = navigator.userAgent;
        var re = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat(RegExp.$1);
    }
    return rv;
}

function jsonParse(str) {
    try {
        str = JSON.parse(str);
    } catch (e) {
        return false;
    }
    return str;
}

window.addEventListener("beforeunload", function (e) {
    if ($.cookie('isSendContact') == 1) {
        return true;
    }
    window._fbq.push(['track', 'PixelInitialized', {}]);
    return true;
//  var confirmationMessage = "Good bye!";
//
//  (e || window.event).returnValue = confirmationMessage;     //Gecko + IE
//  return confirmationMessage;                                //Gecko + Webkit, Safari, Chrome etc.
});

function sendFacebookConversion() {
    if ($("#facebook-conversion").length > 0) {
        console.log('sent');
        window._fbq.push(['track', $("#facebook-conversion").val(), {'value': '1.00', 'currency': 'VND'}]);
    }
}

function changeLanguage(lang) {
    console.log(lang);
    language = lang;
    route_name = $("#translate-url").attr("data-routeName");
    route_params = $("#translate-url").attr("data-routeParams");
    if (route_name != 'alumni/default') {
        $.ajax({
            url: "/" + lang + "/index/locale",
            data: {lang: lang, route_name: route_name, route_params: route_params},
            cache: false,
            type: "POST",
            async: false,
            success: function (data) {
                data = JSON.parse(data);
                console.log(data);
                if (data.success) {
                    if ((location.pathname != '/') && (location.pathname != '/en/home.html')) {
                        if (route_name != 'alumni/default') {
                            document.location = data.url;
                        }

                    }
                    else {
                        if (location.pathname == '/en/home.html') {
                            document.location = "/";
                        }
                        else {
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

//LAZY LOADING
//if ($('.img-lazy').length > 0) {
//    $(".img-lazy").unveil(100, function () {
//        $(this).load(function() {
//            this.style.opacity = 1;
//        });
//    });
//}


function titleMetaTag() {
    if ($("meta[property='og:title']").length > 0) {
        $("title").text($("meta[property='og:title']").attr('content'));
    }
}
titleMetaTag();

/* notification */
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