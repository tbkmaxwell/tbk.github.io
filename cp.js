/*
*	(C)2017 VeryIDE
*	js/copy.js
*	author: Lay veryide@qq.com
*	desc: å¤åˆ¶æ–‡æ¡ˆç»„ä»¶
*	date: 2017/03/17
*/
var Copy = {
			
	//å¤åˆ¶æˆåŠŸæç¤º
	Succeed: function(){

		//æˆåŠŸæç¤º
		R.toast("success", 'å·²å¤åˆ¶ï¼Œè¯·æ‰“å¼€æ‰‹æœºæ·˜å®', 3, {'unique': 'toast'});

		//æ”¹å†™æŒ‰é’®
		Copy.Button.html('å·²å¤åˆ¶');

	},
	
	//ä½¿ç”¨å…¼å®¹æ¨¡å¼
	Compatibility: function(){

		//è‡ªåŠ¨é€‰æ‹©æ–‡æœ¬
		document.addEventListener("selectionchange", function(e) {
			tkl = document.getElementById("intro");
			window.getSelection().selectAllChildren( tkl );
		}, false);
	
	},

	Init: function( conf ){

		//å¤åˆ¶æŒ‰é’®
		Copy.Button = R(conf.button);

		//è§†å›¾å®¹å™¨
		Copy.Vessel = R(conf.vessel);
		
		//å†…å®¹å®¹å™¨
		Copy.Content = R(conf.content);

		
		//æµè§ˆå™¨æ”¯æŒå‰ªè´´æ¿
		if( Copy.Button.attr('display') || !Clipboard.isSupported() ){

			//å…¼å®¹æ¨¡å¼
			Copy.Compatibility();

			//å¤åˆ¶æ–‡æœ¬
			var clipboard = new Clipboard( conf.vessel + 'button' );

			//å¤åˆ¶æˆåŠŸ
			clipboard.on('success', function (e) {
				console.info('Action:', e.action);
				console.info('Text:', e.text);
				console.info('Trigger:', e.trigger);
				e.clearSelection();
				Copy.Succeed();
			});
		
		}else{
			Copy.Compatibility();
			//å¤åˆ¶æ–‡æœ¬
			var clipboard = new Clipboard( conf.button, {
				text: function(trigger) {
					return R.String( Copy.Content.html() ).stripTags().trim();
				}
			});
			
			//å¤åˆ¶æˆåŠŸ
			clipboard.on('success', function (e) {
				console.info('Action:', e.action);
				console.info('Text:', e.text);
				console.info('Trigger:', e.trigger);
				e.clearSelection();
				Copy.Succeed();
			});
			
			//å¤åˆ¶å¤±è´¥
			clipboard.on('error', function (e) {
				console.error('Action:', e.action);
				console.error('Trigger:', e.trigger);
				Copy.Compatibility();
			});
		
		}
	
	}

};

//åˆå§‹åŒ–ç»„ä»¶
Copy.Init( { 'button' : '.copy_tkl', 'content' : '#intro', 'vessel' : '#member-code' } );
