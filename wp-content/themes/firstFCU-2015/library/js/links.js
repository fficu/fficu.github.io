/* These functions adds a disclosure to all off site links */
var links;
var areas;			// Added as they use image maps extensively
var linkDisclosure = 	"You are now leaving this web site, headed to a third party website not operated by this site.\n\n We are not responsible for the content of this new site, nor are we in control of any transactions that occur outside of our site.\n\n Please review the new site's privacy and security policies, as they may differ from those of this site.";

function addLinkDisclosure () {
	if(!document.getElementsByTagName || !document.domain) return false; // exit if we can't do it

	var offSite = new Array; 								// For our links that lead off site
	var domain = document.domain;							// The domain of the current document
	domain = domain.replace('www.', '');					// To make things consistant take out "www."
	var domainRegex = new RegExp(domain+"|mailto|cuanswers\.com|itsme247\.com|cuathome\.org|xtend\.webex.com|javascript|#|youtube\.com|joinmycu\.com|tel:1-872-203-0774", "i"); 	// Cuz vars in /regexes/ can be sticky
	links = document.getElementsByTagName('A'); 			// An array of all our page link objects
	areas = document.getElementsByTagName('area');

	for(var i=0; i<links.length; i++) {
		if(links[i].href !="" && !links[i].href.match(domainRegex)) {
			offSite.push(links[i].href);
			links[i].target = "_blank";
			links[i].className += " external";
			links[i].onclick = function () {
				return window.confirm(linkDisclosure);
			}
		}
	}

	for(var i=0; i<areas.length; i++) {
		if(!areas[i].href.match(domainRegex)) {
			areas[i].target = "_blank";
			areas[i].className += " external";
			areas[i].onclick = function () {
				return window.confirm(linkDisclosure);
			}
		}
	}
}

window.onload=addLinkDisclosure; // Only one function to run so direct assignment is ok
