// // Sami Aliraqi
// // Sami Aliraqi
// // import { Files } from "../imports/api/Files"
// // import { Template }    from 'meteor/templating';
// // Template.navbar.helpers({
// // 	 newFiles() {
// // 	   return Files.find().fetch();
// // 	 }
// //  });
// class StickyNavigation {
	
// 	constructor() {
// 		this.currentId = null;
// 		this.currentTab = null;
// 		this.tabContainerHeight = 70;
// 		let self = this;
// 		$('.active').click(function() { 
// 			self.onTabClick(event, $(this)); 
// 		});
// 		$(window).scroll(() => { this.onScroll(); });
// 		$(window).resize(() => { this.onResize(); });
// 	}

// 	onTabClick(event, element) {
// 		event.preventDefault();
// 		let scrollTop = $(element.attr('href')).offset().top - this.tabContainerHeight + 1;
// 		$('html, body').animate({ scrollTop: scrollTop }, 600);
// 	}
	
// 	onScroll() {
// 		this.checkTabContainerPosition();
//     this.findCurrentTabSelector();
// 	}
	
// 	onResize() {
// 		if(this.currentId) {
// 			this.setSliderCss();
// 		}
// 	}
	
// 	checkTabContainerPosition() {
// 		let offset = $('.navbar-class').offset().top + $('.navbar-class').height() - this.tabContainerHeight;
// 		if($(window).scrollTop() > offset) {
// 			$('.navbar-class-container').addClass('navbar-class-container--top');
// 		} 
// 		else {
// 			$('.navbar-class-container').removeClass('navbar-class-container--top');
// 		}
// 	}
	
// 	findCurrentTabSelector(element) {
// 		let newCurrentId;
// 		let newCurrentTab;
// 		let self = this;
// 		$('.active').each(function() {
// 			let id = $(this).attr('href');
// 			let offsetTop = $(id).offset().top - self.tabContainerHeight;
// 			let offsetBottom = $(id).offset().top + $(id).height() - self.tabContainerHeight;
// 			if($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
// 				newCurrentId = id;
// 				newCurrentTab = $(this);
// 			}
// 		});
// 		if(this.currentId != newCurrentId || this.currentId === null) {
// 			this.currentId = newCurrentId;
// 			this.currentTab = newCurrentTab;
// 			this.setSliderCss();
// 		}
// 	}
	
// 	setSliderCss() {
// 		let width = 0;
// 		let left = 0;
// 		if(this.currentTab) {
// 			width = this.currentTab.css('width');
// 			left = this.currentTab.offset().left;
// 		}
// 		$('.navbar-class-slider').css('width', width);
// 		$('.navbar-class-slider').css('left', left);
// 	}

// 	myMap(){
// 		var map, infoWindow;
// 		function initMap() {
// 		  map = new google.maps.Map(document.getElementById('googleMap'), {
// 			center: {lat: -34.397, lng: 150.644},
// 			zoom: 6
// 		  });
// 		  infoWindow = new google.maps.InfoWindow;
  
// 		  // HTML5 geolocation.
// 		  if (navigator.geolocation) {
// 			navigator.geolocation.getCurrentPosition(function(position) {
// 			  var pos = {
// 				lat: position.coords.latitude,
// 				lng: position.coords.longitude
// 			  };
  
// 			  infoWindow.setPosition(pos);
// 			  infoWindow.setContent('Location found.');
// 			  infoWindow.open(map);
// 			  map.setCenter(pos);
// 			}, function() {
// 			  handleLocationError(true, infoWindow, map.getCenter());
// 			});
// 		  } else {
// 			// Browser doesn't support Geolocation
// 			handleLocationError(false, infoWindow, map.getCenter());
// 		  }
// 		}
  
// 		function handleLocationError(browserHasGeolocation, infoWindow, pos) {
// 		  infoWindow.setPosition(pos);
// 		  infoWindow.setContent(browserHasGeolocation ?
// 								'Error: The Geolocation service failed.' :
// 								'Error: Your browser doesn\'t support geolocation.');
// 		  infoWindow.open(map);
// 		}

// 	}
// }
// new StickyNavigation();