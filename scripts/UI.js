$(document).ready(function(){
	UI.init();
	UI.bindEvents();
	var map = World.newMap(100,100,16);
	Engine.init(map);
	$("#version").text(GAME_VERSION);
});

var UI = (function(){
	var init = function(){
		var noAds = localStorage.getItem('noAds');
		if(noAds === 'true'){
			$('#chkAds').prop('checked', true);
			$('#ads').hide();
		}
		if(QueryString.getVar('ads') === 'false'){ //temp hide ads with querystring
			$('#ads').hide();
		}
	};
	
	var bindEvents = function(){
		//audio tab click
		$('#tab-audio').click(function(){
			toggleSettings();
			switchSettingTab('audio');
		});
		$('#tab-page').click(function(){
			toggleSettings();
			switchSettingTab('page');
		});
		//audio drag
		$('#content-audio').on('dragover', function(e){
			e.stopPropagation();
			e.preventDefault();
		});
		//audio drop
		$('#content-audio').on('drop', function(e){
			e.stopPropagation();
			e.preventDefault();
		
			e = e.originalEvent;
			files = e.dataTransfer.files;
			for(var i = 0; i < files.length; i++){
				var file = files[i];
				var reader = new FileReader();
				reader.onload = function(e){
					$('#content-audio').append('<audio controls><source src="' + e.target.result + '" type="audio/mp3" /></controls>');
				};
				reader.onerror = function(e){ console.log(e);};
				reader.readAsDataURL(file);
			}
		});
		$('.settings-main').on("webkitAnimationEnd", function(){
			if($('.settings-main').hasClass('slidein')){
				$('.tab-content').children().hide();
			}
		});
		$('.settings-main').on("webkitAnimationStart", function(){
			if($('.settings-main').hasClass('slideout')){
				$('.tab-content').children().show();
			}
		});
		$('#chkAds').change(function(){
			var checked = $(this).is(':checked');
			$('#ads').toggle(!checked);
			localStorage.setItem('noAds', checked);
			
		});
	};
	
	var switchSettingTab = function(tab){
		$('.tab-content').hide();
		$('#content-' + tab).show();
	};
	
	var toggleSettings = function(){
		var $settings = $('.settings-main')
		var $settingsAndAudio = $settings.add($('.settings-main .tab-content *'));
		if($settings.hasClass('slideout')){
			$settingsAndAudio.removeClass('slideout');
			$settingsAndAudio.addClass('slidein');
		}else{
			$settingsAndAudio.removeClass('slidein');
			$settingsAndAudio.addClass('slideout');
		}
	};
	
	var toggleAds = function(){
	};
	
	return {
		init: init,
		bindEvents: bindEvents
	};
})();