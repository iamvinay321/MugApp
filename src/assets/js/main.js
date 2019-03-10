var controller = new ScrollMagic.Controller();

$('.fs').each(function () {
    var $bg = $(this).find('.bg');
    var parallaxScene = new ScrollMagic.Scene({
        triggerElement: this,
        triggerHook: 1,
        duration: '100%'
    })
        .setTween(TweenMax.from($bg, 1, { y: '-90%', autoAlpha: 0.3, ease: Power0.easeNone }))
        .addTo(controller);
});

$('.hs').each(function () {
    var hsSectionScene = new ScrollMagic.Scene({
        triggerElement: this,
        offset: -30
    })
        .setClassToggle(this, 'is-active')
        .on("enter", function () {
            $('nav').attr('class', 'is-color');
        })
        .addTo(controller);
});

$('.fs').each(function () {
    var fsSectionScene = new ScrollMagic.Scene({
        triggerElement: this,
        offset: -10
    })
        .setClassToggle(this, 'is-active')
        .on("enter", function () {
            $('nav').removeAttr('class');
        })
        .addTo(controller);
});

var navScene = new ScrollMagic.Scene({
    triggerElement: '.slide.is-dark'
})
    .setClassToggle('nav', 'is-light')
    .addTo(controller);


// intro leave scene
var introTl = new TimelineMax();
introTl
    .to($('#slide01 h1'), .2, { autoAlpha: 0, y: 50, ease: Power0.easeNone })
    .to($('#slide01 .bg'), 1.4, { y: '20%', autoAlpha: 0.5, ease: Power1.easeOut }, '-=0.2');
var introScene = new ScrollMagic.Scene({
    triggerElement: '#slide01',
    triggerHook: 0,
    duration: "100%"
})
    .setTween(introTl)
    .addTo(controller);



// href to scroll
controller.scrollTo(function (newpos) {
    TweenMax.to(window, 1, { scrollTo: { y: newpos }, ease: Power1.easeNone });
});

$(document).on("click", "a[href^='#']", function (e) {
    var id = $(this).attr("href");
    if ($(id).length > 0) {
        e.preventDefault();

        // trigger scroll
        controller.scrollTo(id);

        // if supported by the browser we can even update the URL.
        if (window.history && window.history.pushState) {
            history.pushState("", document.title, id);
        }
    }
});

$(document).ready(function () {
    var movementStrength = 25;
    var height = movementStrength / $(window).height();
    var width = movementStrength / $(window).width();
    $(".blackscreen").mousemove(function (e) {
        var pageX = e.pageX - ($(window).width() / 2);
        var pageY = e.pageY - ($(window).height() / 2);
        var newvalueX = width * pageX * -1 - 25;
        var newvalueY = height * pageY * -1 - 50;
        $('.bg').css("background-position", newvalueX + "px     " + newvalueY + "px");
    });
});