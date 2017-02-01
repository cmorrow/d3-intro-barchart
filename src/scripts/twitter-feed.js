(function(){
	/* PubNub */

	var channel = 'pubnub-twitter';

	var pubnub = PUBNUB.init({
		subscribe_key: 'sub-c-78806dd4-42a6-11e4-aed8-02ee2ddab7fe'
	});

	function getData() {
		var i = 0;
		pubnub.subscribe({
			channel: channel,
			callback: function(m) {
				// i++; 
				// if(i === 1 || i%10 === 0) {
				// 	drawBubbles(m);
				// }
				console.log(m);
				// drawBubbles(m);		
			}
		});
	}

	getData()
})();
 
