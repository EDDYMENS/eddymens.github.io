(function ($) {
    "use strict";
    $(document).ready(function () {
        $(function () {

            $("h1.section-heading").fitText({ minFontSize: '16px', maxFontSize: '62px'})

            /*===Revolution Slider===*/
            var revapi;
            revapi = jQuery('.tp-banner').revolution(
                {
                    delay:7000,
                    startwidth:1170,
                    startheight:500,
                    hideThumbs:10,
                    onHoverStop:"off",
                    fullWidth:"off",
                    fullScreen:"on",
                    navigationType:"none",
                    fullScreenOffsetContainer: ""
                });
            
            /* Download Buttons */
            $('#resume-download').click(function (e) {
                window.open('/LibinVBabu-Resume-May-2014.doc.pdf','_blank');
            });
            $('#wordpress-plugin').click(function (e) {
                window.open('http://wordpress.org/plugins/erident-custom-login-and-dashboard/','_blank');
            });


            /*===Drop Down Menu===*/
            $('.top-nav').superfish();
            $('.nav').onePageNav({
                scrollOffset: 50,
                currentClass: 'current',
                easing: 'easeInExpo',
                filter: ':not(.external)'
            });

            $('.scroll-down').smoothScroll({
                offset: -80,
                easing: 'easeInExpo',
                speed: 500,
                // $.fn.smoothScroll only: whether to prevent the default click action
                preventDefault: true
            });

            $('.navigation').waypoint('sticky', {

                stuckClass: 'sticky-nav'
            });

            /*===Magnific Popup===*/
            $('.image-link').magnificPopup({
                type: 'image'
            });

            /*===Scroll Top===*/

            $.scrollUp({
                scrollName: 'scrollUp', // Element ID
                topDistance: '300', // Distance from top before showing element (px)
                topSpeed: 300, // Speed back to top (ms)
                animation: 'slide', // Fade, slide, none
                animationInSpeed: 200, // Animation in speed (ms)
                animationOutSpeed: 200, // Animation out speed (ms)
                scrollText: '<i class="fa fa-angle-double-up"></i>' // Text for element
            });
            $(' #scrollUp').smoothScroll({
                offset: -80,
                easing: 'easeInExpo',
                speed: 500,
                // $.fn.smoothScroll only: whether to prevent the default click action
                preventDefault: true
            });

            /*===Appear===*/
            $('.number-animate').appear();
            $(document.body).on('appear', '.numeric-count', function () {
                $('.number-animate').each(function () {
                    $(this).animateNumbers($(this).attr("data-value"), true, parseInt($(this).attr("data-animation-duration")));
                });
            });

            $('.appear').appear();

            /*===SKILL BAR===*/
            $(document.body).on('appear', function () {
                /*===Knob Piechart===*/

                $('.chart').easyPieChart();
            });



            /*==Syntax Higlighter ===*/
            window.prettyPrint && prettyPrint();
            /*==Contact Form Toggle ===*/
            $('.form-toggle-icon').click(function (e) {
                $('.contact-form').toggleClass('panel-show');
                e.preventDefault();
            });


            /*===owlCarousel Start===*/
            var owl;

            owl = $("#testimonial-carousel");

            owl.owlCarousel({

                navigation: false, // Show next and prev buttons
                slideSpeed: 300,
                paginationSpeed: 400,
                singleItem: true,
                afterInit: customOWLpagination // do some work after OWL init

            });



            function customOWLpagination() {

                // adding A to div.owl-page
                $('.owl-controls .owl-page').append('<a class="item-link" href="#"/>');

                var pafinatorsLink = $('.owl-controls .item-link');


                $.each(this.owl.userItems, function (i) {

                    $(pafinatorsLink[i])
                        // i - counter
                        // Give some styles and set background image for pagination item
                        .css({
                            'background': 'url(' + $(this).find('.person').attr('src') + ') center center no-repeat',
                            '-webkit-background-size': 'cover',
                            '-moz-background-size': 'cover',
                            '-o-background-size': 'cover',
                            'background-size': 'cover'
                        })
                        // set Custom Event for pagination item
                        .click(function () {
                            owl.trigger('owl.goTo', i);
                        });

                });

                $('.item-link').click(function (e) {
                    e.preventDefault();
                });


            }

            /*===owlCarousel End===*/


            /*===iso tope blog start===*/


            var $container = $('.blog-container'),
                colWidth = function () {
                    var w = $container.width(),
                        columnNum = 1,
                        columnWidth = 0;
                    if (w > 1200) {
                        columnNum = 3;
                    } else if (w > 900) {
                        columnNum = 3;
                    } else if (w > 600) {
                        columnNum = 3;
                    } else if (w > 300) {
                        columnNum = 1;
                    }
                    columnWidth = Math.floor(w / columnNum);
                    $container.find('.item').each(function () {
                        var $item = $(this),
                            multiplier_w = $item.attr('class').match(/item-w(\d)/),
                            multiplier_h = $item.attr('class').match(/item-h(\d)/),
                            width = multiplier_w ? columnWidth * multiplier_w[1] - 20 : columnWidth - 20;
                        //                                height = multiplier_h ? columnWidth*multiplier_h[1]*0.5-4 : columnWidth*0.5-4;
                        $item.css({
                            width: width
                            //                            height: height
                        });
                    });
                    return columnWidth;
                },
                isotope = function () {
                    $container.isotope({
                        resizable: false,
                        itemSelector: '.item',
                        masonry: {
                            columnWidth: colWidth()
                            //                            gutterWidth: 10
                        }
                    });
                };
            isotope();
            $(window).smartresize(isotope);
            $(window).load(isotope);

            /*===iso tope blog end===*/

           /*==Draggable Connect==*/

            $(function() {
                $( ".social-link-drag" ).draggable({
                    cursor: "crosshair",
                    revert: "valid",
                    containment: ".connect-section"
                });
                $( ".drag-place" ).droppable({
                    activeClass: "active-drag ",
                    hoverClass: "social-drag-hover wow pulse animated",
                    drop: function( event, ui ) {
                        $( this ).addClass( "drag-highlight" );
                        window.open(ui.draggable.attr("href"));
                    }
                });
            });


            /*===jQuery Animated Number===*/


            $.fn.animateNumbers = function (stop, commas, duration, ease) {
                return this.each(function () {
                    var $this = $(this);
                    var start = parseInt($this.text().replace(/,/g, ""));
                    commas = (commas === undefined) ? true : commas;
                    $({
                        value: start
                    }).animate({
                            value: stop
                        }, {
                            duration: duration == undefined ? 500 : duration,
                            easing: ease == undefined ? "swing" : ease,
                            step: function () {
                                $this.text(Math.floor(this.value));
                                if (commas) {
                                    $this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
                                }
                            },
                            complete: function () {
                                if (parseInt($this.text()) !== stop) {
                                    $this.text(stop);
                                    if (commas) {
                                        $this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
                                    }
                                }
                            }
                        });
                });
            };




            // INITIALISATION OF THE FANCY BOX (LIVE BOX)
            var api = jQuery('.megafolio-container').megafoliopro({
                filterChangeAnimation: "fade", // fade, rotate, scale, rotatescale, pagetop, pagebottom,pagemiddle
                filterChangeSpeed: 600, // Speed of Transition
                filterChangeRotate: 10, // If you ue scalerotate or rotate you can set the rotation (99 = random !!)
                filterChangeScale: 0.6, // Scale Animation Endparameter
                delay: 20,
                defaultWidth: 980,
                paddingHorizontal: 10,
                paddingVertical: 10,
                layoutarray: [6] // Defines the Layout Types which can be used in the Gallery. 2-9 or "random". You can define more than one, like {5,2,6,4} where the first items will be orderd in layout 5, the next comming items in layout 2, the next comming items in layout 6 etc... You can use also simple {9} then all item ordered in Layout 9 type.

            });


            // THE FILTER FUNCTION
            jQuery('.filter').click(function (e) {
                jQuery('.filter').each(function () {
                    jQuery(this).removeClass("selected")
                });
                api.megafilter(jQuery(this).data('category'));
                jQuery(this).addClass("selected");
                e.preventDefault();
            });


        });




    });


})(jQuery);


/*==Google MAP==*/
function initialize() {
    var image = 'img/map-marker.png';
    var myLatlng = new google.maps.LatLng(12.943857, 77.618054);
    var mapOptions = {
        zoom: 15,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: true,
        center: myLatlng
    };

    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h3 id="firstHeading" class="firstHeading">Libin V Babu</h3>' +
        '<div id="bodyContent">' +
        '<p>CB Enclave, Koramangala 8th block ' +
        'Bangalore, India  </p>' +
        '</div>' +
        '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 280
    });


    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        icon: image,
        animation: google.maps.Animation.DROP,
        title: 'Local Address'
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
    });

}

google.maps.event.addDomListener(window, 'load', initialize);


/*==WOW JS==*/
var ww = $(window).width();

/*==WOW JS==*/
if(ww > 480){
    wow = new WOW({
        animateClass: 'animated',
        offset: 0
    });
    wow.init();
}
