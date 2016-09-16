// == START OF PHOENIX JS ==
window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // START OF: utilities =====
    function throttle(callback, limit) {
        var wait = false;                  // Initially, we're not waiting
        return function () {               // We return a throttled function
            if (!wait) {                   // If we're not waiting
                callback.call();           // Execute users function
                wait = true;               // Prevent future invocations
                setTimeout(function () {   // After a period of time
                    wait = false;          // And allow future invocations
                }, limit);
            }
        }
    }

    // ===== END OF: utilities

    // START OF: webfont loader  =====
    var fonts = (function () {
        var families = ['Playfair+Display:400,400italic,700,700italic:latin', 'Montserrat:700,400:latin'];

        function load() {
            WebFont.load({
                google: {
                    families: families
                }
            });
        }

        return {
            load: load
        }
    }());
    // ===== END OF: webfont loader

    // START OF: sliders =====
    //all the sliders are configurated via attributes in the markup
    (function () {
        var $sliders = $('.js-slider');
        $sliders.on('init', function (slick) {
            $('.cover__slider__dots')
                .wrap('<div class="cover__slider__dots_container"></div>');
        });

        $sliders.slick();
    })();
    // ===== END OF: sliders

    // START OF: charts =====
    var charts = (function () {
        var $charts = $('.js-round-chart');
        var init = function () {
            var chartRadius = parseInt($charts.find('circle').attr('r'), 10);
            var chartCircleLength = 2 * chartRadius * Math.PI;
            var chartsCount = $charts.length;
            for (var i = 0; i < chartsCount; i++) {
                var value = parseInt($charts.eq(i).attr('data-chart-value'), 10);
                var strokeOffset = chartCircleLength * (1 - value / 100);
                $charts.eq(i).css('stroke-dashoffset', strokeOffset);
            }
        }
        return {
            init: init
        }
    }());
    // ===== END OF: charts

    // START OF: show more works =====
    var showWorks = (function () {
        var bind = function () {
            $('.js-show-more-works').on('click', function (event) {
                event.preventDefault();

                $(this).fadeOut(400, function () {
                    $('.state-hidden-works-row').fadeIn();
                })
            });
        }
        return {
            bind: bind
        }
    }());
    // ===== END OF: show more works

    // START OF: filterizr =====
    var filterizr = (function () {
        var bind = function () {
            var $filters = $('.js-filtering-button');
            $filters.on('click', function (event) {
                event.preventDefault();

                $filters.removeClass('button--black').addClass('button--gray');
                $(this).addClass('button--black');
            });
        }

        var init = function () {
            //bind filtering buttons color change:
            bind();

            //init plugin:
            //Default options
            var options = {
                animationDuration: 0.5, //in seconds
                filter: 'all', //Initial filter
                callbacks: {
                    onFilteringStart: function () {
                    },
                    onFilteringEnd: function () {
                    },
                    onShufflingStart: function () {
                    },
                    onShufflingEnd: function () {
                    },
                    onSortingStart: function () {
                    },
                    onSortingEnd: function () {
                    }
                },
                delay: 0, //Transition delay in ms
                delayMode: 'progressive', //'progressive' or 'alternate'
                easing: 'ease-out',
                filterOutCss: { //Filtering out animation
                    opacity: 0,
                    transform: 'scale(0.75)'
                },
                filterInCss: { //Filtering in animation
                    opacity: 1,
                    transform: 'scale(1)'
                },
                layout: 'sameSize', //See layouts
                selector: '.filtr-container',
                setupControls: true
            }
//You can override any of these options and then call...
            var filterizd = $('.filtr-container').filterizr(options);
//If you have already instantiated your Filterizr then call...
            filterizd.filterizr('setOptions', options);
        }
        return {
            init: init
        }
    }());
    // ===== END OF: filterizr

    // START OF: scroll to =====
    var scrollTo = (function () {
        var $scrollFullscreen = $('.js-scroll-fullscreen');
        var scrollFullscreen = function () {
            $('html,body').animate({scrollTop: window.innerHeight + window.scrollY}, 700);
        }
        var bindScrollFullscreen = function () {
            $scrollFullscreen.on('click', function (event) {
                event.preventDefault();
                scrollFullscreen();
            });
        }

        return {
            bindScrollFullscreen: bindScrollFullscreen
        }
    }());
    // ===== END OF: scroll to

    // START OF: content changer =====
    var contentChanger = (function () {
        var $contentTrigger = $('.js-content-trigger');
        var $contentBox = $('.js-content-box');
        var slidingTime = 400;
        var bind = function () {
            $contentTrigger.on('click', function (event) {
                event.preventDefault();
                var contentAttr = $(this).attr('data-content-index');

                $contentTrigger.removeClass('state-active');
                $(this).addClass('state-active');

                $contentBox.slideUp(slidingTime);

                setTimeout(function () {
                    $('.js-content-box[data-content-index="' + contentAttr + '"]').slideDown(slidingTime);
                }, slidingTime / 2);
            });
        }
        return {
            bind: bind
        }
    }());
    // ===== END OF: content changer

    // START OF: dropdowns =====
    var dropdown = {
        toggle: function ($targetDropdown) {
            $targetDropdown.toggleClass('state-visible');
        },
        collapseAll: function () {
            $('.js-dropdown').removeClass('state-visible');
        },
        bindCollapsingAll: function () {
            $(document).on('click', function (event) {
                dropdown.collapseAll();
            });
        },
        bindOpeners: function () {
            $('.js-dropdown-opener').off().on('click', function (event) {
                event.preventDefault();
                event.stopPropagation();
                var dropdownName = $(this).attr('data-dropdown-target');
                var $targetDropdown = $('[data-dropdown-name=' + dropdownName + ']');
                dropdown.toggle($targetDropdown);
            });
        },
        init: function () {
            this.bindCollapsingAll();
            this.bindOpeners();
        }
    };
    // ===== END OF: dropdowns

    // START OF: menu =====
    var menu = {
        DOM: {
            overlay: document.querySelector('.js-overlay'),
            menu: document.querySelectorAll('.js-menu'),
            body: document.querySelector('body')
        },
        bind: function () {
            var self = this;

            function scrollToTop(burger) {
                try {
                    var scrollValue = $(burger).parents('.js-cover').offset().top;
                    $('html,body').animate({scrollTop: scrollValue}, 400);
                } catch (e) {
                    console.log(e);
                }
            }

            var openers = document.querySelectorAll('.js-open-menu');
            for (var i = 0; i < openers.length; i++) {
                openers[i].addEventListener('click', function (ev) {
                    ev.preventDefault();

                    scrollToTop(this);
                    var menuIndex = $(this).attr('data-menu-index');
                    var $menu = $('.js-menu[data-menu-index="' + menuIndex + '"]');

                    $(self.DOM.overlay).addClass('state-visible');
                    $(self.DOM.body).addClass('state-fixed');
                    $menu.addClass('state-opened');
                });
            }

            var closers = document.querySelectorAll('.js-close-menu');

            for (var i = 0; i < closers.length; i++) {
                closers[i].addEventListener('click', function (ev) {
                    ev.preventDefault();

                    $(self.DOM.overlay).removeClass('state-visible');
                    $(self.DOM.body).removeClass('state-fixed');
                    $(self.DOM.menu).removeClass('state-opened');
                });
            }
        },
        init: function () {
            this.bind();
        }
    };
    // ===== END OF: menu

    // START OF: popups =====
    var popup = {
        OPENING_DURATION: 300, //a hardcoded value. equals the CSS transition-duration.
        DOM: {
            $popups: $('.popup'),
            $openers: $('.js-open-popup'),
            $ovelay: $('.js-overlay'),
            $closers: $('.js-close-all-popups'),
            $body: $('body')
        },
        toggleOverlay: function () {
            this.DOM.$ovelay.toggleClass('state-visible');
        },
        toggleBodyFix: function () {
            this.DOM.$body.toggleClass('state-fixed-body');
        },
        open: function (name) {
            $('[data-popup-name="' + name + '"]').fadeIn(this.OPENING_DURATION).addClass('state-visible');
            this.toggleOverlay();
            this.toggleBodyFix();
        },
        closeOpened: function () {
            var self = this;
            self.DOM.$popups.fadeOut(self.OPENING_DURATION);
            setTimeout(function () {
                self.DOM.$popups.removeClass('state-visible');
            }, self.OPENING_DURATION);
            this.toggleOverlay();
            this.toggleBodyFix();
        },
        bindOverlay: function () {
            var self = this;
            self.DOM.$ovelay.on('click', function (event) {
                event.preventDefault();
                self.closeOpened();
            });
        },
        bindOpeners: function ($specificElement) {
            var self = this;
            var $triggers = $specificElement ? $specificElement : self.DOM.$openers;

            $triggers.on('click', function (event) {
                event.preventDefault();
                event.stopPropagation();

                var name = $(this).attr('data-popup-target');

                self.open(name);
            });
        },
        bindClosers: function () {
            var self = this;
            self.DOM.$closers.on('click', function (event) {
                event.preventDefault();
                self.closeOpened();
            });
        },
        init: function () {
            this.bindOverlay();
            this.bindOpeners();
            this.bindClosers();
        }
    };
    // ===== END OF: popups

    // START OF: hacks =====
    var hacks = {
        DOM: {
            $covers: $('.js-cover')
        },
        //windowHeight: $(window).outerHeight(),
        setIntroHeight: function () {
            if ($(window).outerWidth() <= 1024) {
                this.DOM.$covers.css('min-height', $(window).outerHeight());
            } else {
                this.DOM.$covers.css('min-height', '100vh');
            }
        },
        bind: function () {
            var self = this;

            window.addEventListener('orientationchange', function () {
                self.setIntroHeight();
            });
        },
        init: function () {
            this.bind();
        }

    };
    if (hacks.DOM.$covers.length) {
        hacks.setIntroHeight();
        hacks.init();
    }
// ===== END OF: hacks

// START OF: presentation navigation =====
    var navigation = (function () {
        var DOM = {
            $linksBox: $('.js-navigation-links'),
            $toggler: $('.js-open-navigation-links'),
            overlay: document.querySelector('.js-overlay')
        }

        function closeMenu() {
            DOM.$toggler.removeClass('state-opened');
            DOM.$linksBox.slideUp();
            $(DOM.overlay).removeClass('state-visible');
        }

        function toggleMenu() {
            DOM.$toggler.toggleClass('state-opened');
            DOM.$linksBox.slideToggle();
            $(DOM.overlay).toggleClass('state-visible');
        }

        var bind = function () {
            DOM.$toggler.on('click', function (event) {
                event.preventDefault();
                toggleMenu();
            });

            $('.js-navigation-link').on('click', function (event) {
                event.preventDefault();
                closeMenu();
                var destination = $(this).attr('href');
                var scrollValue = $('.' + destination).offset().top - 44 /*nav bar height*/;

                $('html,body').animate({scrollTop: scrollValue}, 300);
            });

            $('.js-close-navigation').on('click', function (event) {
                event.preventDefault();
                closeMenu();
            });
        }

        return {
            bind: bind
        }
    }());
// ===== END OF: presentation navigation

    popup.init();
    menu.init();
    dropdown.init();
    fonts.load();
    scrollTo.bindScrollFullscreen();
    contentChanger.bind();
    charts.init();
    navigation.bind();
    showWorks.bind();
    if ($('.filtr-container').length > 0) {
        filterizr.init();
    }
});
// == END OF PHOENIX JS ==

window.viewportUnitsBuggyfill.init();

$(window).load(function() { // makes sure the whole site is loaded
    $('.jelly').fadeOut(); // will first fade out the loading animation
    $('.preloader').delay(1000).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('body').delay(1000).css({
        'overflow': 'visible'
    });

    wow = new WOW(
        { mobile: false }
    );
    wow.init();

    setTimeout(function () {
        $('.desk').parallax();




        $(function () {
            $(".text-1").typed({
                strings: ["Hi!^1000\nI'm Yuriy Kovalev^300,\nFront-End Developer^500, explorer^500, and dreamer^500.^500.^500.^1000"],
                showCursor: true,
                typeSpeed: 30
            });
        });
    }, 2000);


});