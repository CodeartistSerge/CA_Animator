(function($){
	$.ca_animator = function(pAnimations) {

		var pAnimations = pAnimations ? pAnimations : [];
		var lastScroll = $(window).scrollTop();

		var animateAll = function() {
			$.each(pAnimations, function(index, val) {
				$.each($(val.element), function(index, element){
					var top, bottom;
					var scroll = $(window).scrollTop();
					var direction;
					if(scroll > lastScroll) direction = 'down';
					if(scroll == lastScroll) direction = 'still';
					if(scroll < lastScroll) direction = 'up';
					val.probe = val.probe ? val.probe : 50;
					switch(val.boundaries) {
						case 'top':
							top = $(element).offset().top;
							bottom = $('body').outerHeight();
						break;
						case 'bottom':
							top = 0;
							bottom = top + $(element).outerHeight();
						break;
						default:
							top = $(element).offset().top;
							bottom = top + $(element).outerHeight();
						break;
					}
					var theProbe = Math.ceil($(window).height() / 100 * val.probe) + scroll;
					var percent = calculateCoverPercent(
						{
							y1: scroll,
							y2: scroll + $(window).height()
						},
						{
							y1: top,
							y2: bottom
						}
					);
					var percentTop = calculateCoverPercent(
						{
							y1: 0,
							y2: theProbe
						},
						{
							y1: top,
							y2: bottom
						}
					);
					var percentBottom = calculateCoverPercent(
						{
							y1: theProbe,
							y2: scroll + $(window).height()
						},
						{
							y1: top,
							y2: bottom
						}
					);
					$.each(val.animations, function(index, anim){
						anim.action({
							min: anim.min ? anim.min : 0,
							max: anim.max ? anim.max : 100,
							value: (anim.min + (((anim.max - anim.min) * percent) / 100)),
							percent: percent,//Percent of the element present on screen or percent of the screen covered by the element depending on the size of the element
							element: $(element),
							direction: direction,
							isProbe: caluclateProbePercent(top, bottom, theProbe),//If probe within the element
							percentTop: percentTop,//Percent of the element from top to probe
							percentBottom: percentBottom,//Percent of the element from bottom to probe
						});
					})
				})
			});
			lastScroll = $(window).scrollTop();
			requestAnimationFrame(animateAll);
		};

		var caluclateProbePercent = function(top, bottom, prb) {
			return ((prb >= top) && (prb <= bottom));
		}

		var calculateCoverPercent = function(o1, o2) {
			var do1 = Math.abs(o1.y2 - o1.y1);
			var do2 = Math.abs(o2.y2 - o2.y1);
			if(do1 <= do2) {
				do1 = o1;
				do2 = o2;
			}
			else {
				do1 = o2;
				do2 = o1;
			}
			var y1 = do1.y1 <= do1.y2 ? do1.y1 : do1.y2;
			var y2 = do1.y1 <= do1.y2 ? do1.y2 : do1.y1;

			var y11 = do2.y1 <= do2.y2 ? do2.y1 : do1.y2;
			var y12 = do2.y1 <= do2.y2 ? do2.y2 : do2.y1;

			var dy1 = y1 - y11;
			var dy2 = y2 - y12;

			if((dy1 >= 0) && (dy2 <=0) ) return 100;
			if((y11 > y2) || (y1 > y12)) return 0;

			var theY = dy2 > 0 ? y12 : y11;
			var theDY = y1 - theY;

			var rawPercent = Math.abs(Math.ceil(100 * theDY / (y2 - y1)));
			return dy2 > 0 ? rawPercent : 100 - rawPercent;
		}

		requestAnimationFrame(animateAll);
	}
})(jQuery);