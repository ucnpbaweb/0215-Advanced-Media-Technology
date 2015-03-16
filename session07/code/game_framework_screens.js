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
		document.getElementById('splashscreen').addEventListener('click', function(){
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

discs.screens.mainmenu = (function(){
	var firstrun = true;

	var setup = function(){
		document.forms.mainmenu.addEventListener('submit', function(e){
			e.preventDefault();
			discs.game.showScreen(e.explicitOriginalTarget.name);
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