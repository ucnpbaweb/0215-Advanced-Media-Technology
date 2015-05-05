discs.game = (function(){
	var showScreen = function(screenId){
		//run the screen module
		discs.screens[screenId].run();
		// display the screen
		var currentScreen = document.querySelector('#game .screen.active');
		if(currentScreen) currentScreen.classList.remove('active');
		document.getElementById(screenId).classList.add('active');
	};

	return {
		showScreen : showScreen
	}
})();

discs.screens.splashscreen = (function(){
	var firstrun = true;

	var setup = function(){
		document.addEventListener('preloadprocess', function(e){
			document.getElementById('splashscreen').querySelector('progress').value = e.detail.total;
		}, false);
		document.addEventListener('preloaddone', function(e){
			document.getElementById('splashscreen').querySelector('p.message').innerHTML = 'Click to continue';
			document.getElementById('splashscreen').addEventListener('click', function(){
				discs.game.showScreen('mainmenu');
			}, false);
		}, false);
		Preloader.load(discs.preloaditems, discs.resources);
	};

	var run = function(){
		if(firstrun){
			setup();
			firstrun = false;
		}
	};

	return {
		run : run
	}
})();

discs.screens.mainmenu = (function(){
	var firstrun = true;

	var setup = function(){
		document.getElementById('mainmenu').addEventListener('click', function(e){
			discs.game.showScreen(e.target.name);
		});
	};

	var run = function(){
		if(firstrun){
			setup();
			firstrun = false;
		}
	};

	return {
		run : run
	}
})();

discs.screens.gamescreen = (function(){
	var firstrun = true;

	var setup = function(){
		discs.board.initialize();
	};

	var run = function(){
		if(firstrun){
			setup();
			firstrun = false;
		}
	};

	return {
		run : run
	}
})();

discs.screens.highscore = (function(){
	var firstrun = true;

	var setup = function(){
		document.getElementById('highscore').addEventListener('click', function(){
			discs.game.showScreen('mainmenu');
		}, false);
	};

	var run = function(){
		if(firstrun){
			setup();
			firstrun = false;
		}
	};

	return {
		run : run
	}
})();

discs.screens.aboutscreen = (function(){
	var firstrun = true;

	var setup = function(){
		document.getElementById('aboutscreen').addEventListener('click', function(){
			discs.game.showScreen('mainmenu');
		}, false);
	};

	var run = function(){
		if(firstrun){
			setup();
			firstrun = false;
		}
	};

	return {
		run : run
	}
})();