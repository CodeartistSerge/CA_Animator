# CA_Animator
jQuery tool to trigger css animations depending on the scroll position. It has various handy options and measures relative to screen or particular selector

## Example code
```javascript
$.ca_animator([
	{
		element: 'body', // jQuery selector
		boundaries: 'both', // possible values: "both", "top" (makes it infinitely long till the bottom), or "bottom" (makes it infinitely long till the top) default "both"
		animations: [ // Array of actions attached to the detector of the given element
			{
				action: function(params) {
					// You can get parameters like this
					var min = params.min;
					var max = params.max;
					var value = params.value; // calculated every tick based on min, max & current percentage
					var percent = params.percent;// current value of percentage.
					//Basically tells you how much of an element is present on screen (if it's smaller than the screen)
					//Or how much of the screen is occupied by the element (if it's bigger than the screen)
					var element = params.element; //jQuery object of the given element
					var direction = params.direction; //Direction of the current scroll action
					// Can be "down", "still" or "up"
					var isProbe = params.isProbe; // Bool value which tells you if the probe line located within the given element boundaries (respects the boundaries setting)
					var percentTop = params.percentTop; //Part of the window from top to the probe is used to calculade percents
					var percentBottom = params.percentBottom; //Part of the window from bottom to the probe is used to calculade percents
					var probePercent = params.probePercent;//Percent of the element from bottom to probe or from top to probe
					// probePercent.top - for the top percent calculation
					// probePercent.bottom - for the bottom percent calculation
				},
				probe: 50, //position of a probe line on screen in percentage from top (default is 50)
				min: 100, // minimum boudary of the value (default 0)
				max: 300, // maximum boundary of the value (default 100)
				// For example, if current percent value is 50, min is 100 & max is 300, then the value would be set to 200
			},
			{//Another animation with different value boundaries & probe
				action: function(params) {
					//Do whatever you like
				},
				min: 10,
				max: 1000,
				probe: 5,
			}
		]
	},
	{//Minimal construction for another element to track percentages
		element: '.the_element',
		animations: [
			{
				action: function(params) {
					// Do something here
				}
			},
		]
	},
]);```
