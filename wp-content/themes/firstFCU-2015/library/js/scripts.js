/*
Bones Scripts File
Author: Eddie Machado

This file should contain any js scripts you want to add to the site.
Instead of calling it in the header or throwing it inside wp_head()
this file will be called automatically in the footer so as not to
slow the page load.

*/

// IE8 ployfill for GetComputed Style (for Responsive Script below)
if (!window.getComputedStyle) {
    window.getComputedStyle = function(el, pseudo) {
        this.el = el;
        this.getPropertyValue = function(prop) {
            var re = /(\-([a-z]){1})/g;
            if (prop == 'float') prop = 'styleFloat';
            if (re.test(prop)) {
                prop = prop.replace(re, function () {
                    return arguments[2].toUpperCase();
                });
            }
            return el.currentStyle[prop] ? el.currentStyle[prop] : null;
        }
        return this;
    }
}

// as the page loads, call these scripts
jQuery(document).ready(function($) {

     var e = document.createElement("script"); 
     e.setAttribute("type", "text/javascript"); 
     e.setAttribute("src", "//browser-update.org/update.js"); 
     document.body.appendChild(e); 


    
//Slick menu mobile nav (Using different mobile nav)
//    $(function(){
//        $('#menu').slicknav({
//            label: 'Main Menu',
//            duration: 0,
//            allowParentLinks: true
//        });
//    });

    $('#banners').cycle({ 
        fx:    'fade', 
        speed:  1000,  //time the transition lasts
        timeout: 5000, //time between transitions
        pause: 1, //stop the show on mouseover
        random: 0, //random order (our mysql does this already)
        delay: -1000, //delay before show starts first transition
        next:  '#next', 
        prev:  '#previous',
        pager: "#feature-nav",
        pagerEvent:    'mouseover', // name of event which drives the pager navigation 
        autostop:       true, // true to end slideshow after X transitions (where X == slide count) 
        autostopCount: 100,      // number of transitions (optionally used with autostop to define X) 
        // callback fn that creates a thumbnail to use as pager anchor 

        pagerAnchorBuilder: function(idx, slide) { 
            // return selector string for existing anchor 
            // slide.attributes.alt.value
            //slide.childNodes[0].childNodes[0].alt 
            var thetitle = slide.title;
            var desc = jQuery('#'+slide.id+' img:first').attr("alt");
            var href = jQuery('#'+slide.id+' a:first').attr("href");
            return '<li><a href="'+ href +'" title="Show: '+ desc +'"></a></li>'; 
        } 
     });
    

    //Add the needed text to the featured rates areas
    $('.featured-rate > .mini-feature:last-of-type').append('<br><em>* APR = annual percentage rate. Rates vary.</em>');
    $('.featured-rate > span > .mini-feature:last-of-type').append('<br><em>* APY = annual percentage yield. Rates vary.</em>');

    //Remove the pesky placeholder text in the search form
    $("#s").attr("placeholder", "");

    //Tab functionality
    $('.tabs').tabs();

    

    

    

    
    /* getting viewport width */
    var responsive_viewport = $(window).width();
    
    /* if is below 481px */
    if (responsive_viewport < 481) {
    
    } /* end smallest screen */
    
    /* if is larger than 481px */
    if (responsive_viewport > 481) {
        
    } /* end larger than 481px */
    
    /* if is above or equal to 768px */
    if (responsive_viewport >= 768) {
    
        /* load gravatars */
        $('.comment img[data-gravatar]').each(function(){
            $(this).attr('src',$(this).attr('data-gravatar'));
        });
        
    }
    
    /* off the bat large screen actions */
    if (responsive_viewport > 1030) {
        
    }
    
	
	// add all your scripts here
	
 
}); /* end of as page load scripts */


/*! A fix for the iOS orientationchange zoom bug.
 Script by @scottjehl, rebound by @wilto.
 MIT License.
*/
(function(w){
	// This fix addresses an iOS bug, so return early if the UA claims it's something else.
	if( !( /iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1 ) ){ return; }
    var doc = w.document;
    if( !doc.querySelector ){ return; }
    var meta = doc.querySelector( "meta[name=viewport]" ),
        initialContent = meta && meta.getAttribute( "content" ),
        disabledZoom = initialContent + ",maximum-scale=1",
        enabledZoom = initialContent + ",maximum-scale=10",
        enabled = true,
		x, y, z, aig;
    if( !meta ){ return; }
    function restoreZoom(){
        meta.setAttribute( "content", enabledZoom );
        enabled = true; }
    function disableZoom(){
        meta.setAttribute( "content", disabledZoom );
        enabled = false; }
    function checkTilt( e ){
		aig = e.accelerationIncludingGravity;
		x = Math.abs( aig.x );
		y = Math.abs( aig.y );
		z = Math.abs( aig.z );
		// If portrait orientation and in one of the danger zones
        if( !w.orientation && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ){
			if( enabled ){ disableZoom(); } }
		else if( !enabled ){ restoreZoom(); } }
	w.addEventListener( "orientationchange", restoreZoom, false );
	w.addEventListener( "devicemotion", checkTilt, false );
})( this );