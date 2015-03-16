discs.board = (function(){
	var settings, width, height, board, ctx, lastdelta, hits, starttime;
	var discObjs = [];
	var gametime = 5000;
	var gameended = false;

	var initialize = function(){
		settings = discs.settings;
		width = settings.width;
		height = settings.height;

		board = document.getElementById('board');
		board.width = width;
		board.height = height;
		ctx = board.getContext('2d');

		hits = 0;

		for(var i = 0; i < 11; i++){
			var lastentertime = (discObjs[discObjs.length-1]) ? discObjs[discObjs.length-1].entertime : 0;
			var timeleft = gametime - lastentertime;
			console.debug(timeleft);
			var entertime = lastentertime + Math.random() * timeleft/(11-i);
			discObjs[i] = {
				entertime : entertime,
				disc : new Disc()
			};
		}
		console.debug(discObjs);

		board.addEventListener('click', function(e){
			//hits++;
			if(!gameended){
				var rect = board.getBoundingClientRect();
				var clickX = e.clientX - rect.x;
				var clickY = e.clientY - rect.y;
				console.debug('x:' + clickX + ' y:' + clickY);
				discObjs.forEach(function(discObj){
					var disc = discObj.disc;
					if(!disc.hit){
						if(disc.hitting(clickX, clickY)){
							hits++;
						}
					}
				});
			}
		});
		requestAnimationFrame(animate);

	};

	var update = function(now, timediff){
		//nothing yet
		if(!gameended){
			discObjs.forEach(function(discObj){
				var disc = discObj.disc;
				//change the opacity
				if(!disc.hit && now-(discObj.entertime+starttime) > 0){
					disc.opacity = disc.opacity < 1 ? disc.opacity+0.5*timediff/1000 : 1;
				} else {
					disc.opacity = disc.opacity > 0 ? disc.opacity-1*timediff/1000 : 0;
				}
				console.debug(disc.opacity);
			});
		}
	};

	var render = function(){
		ctx.clearRect(0, 0, board.width, board.height);
		discObjs.forEach(function(discObj){
			var disc = discObj.disc;
			ctx.fillStyle = 'rgba(' + disc.color.r + ',' + disc.color.g + ', ' + disc.color.b + ', ' + disc.opacity + ')';;
			ctx.beginPath();
			ctx.arc(disc.position.x, disc.position.y, disc.radius, 0, Math.PI*2, false);
			ctx.fill();
		});
	};

	var animate = function(delta){
		starttime = !starttime ? delta : starttime;
		var timediff = delta - lastdelta;
		if(lastdelta){
			//update
			update(delta, timediff);
			//render
			render();
		}
		lastdelta = delta;
		if(delta - starttime < gametime){
			requestAnimationFrame(animate);
		}else{
			stop();
		}
	};

	var stop = function(){
		ctx.clearRect(0, 0, board.width, board.height);
		gameended = true;
		
		console.debug('game stoped - hits: ' + hits);
	};

	return {
		initialize : initialize
	}
})();



var Disc = function(){
	this.color =  {
		'r' : Math.floor(Math.random()*255),
		'g' : Math.floor(Math.random()*255),
		'b' : Math.floor(Math.random()*255)
	};
	this.radius = 20 + Math.random()*10;
	this.opacity = 0;
	this.hidden = true;
	this.hit = false;
	this.position = {
		x : this.radius+Math.random()*(400-2*this.radius),
		y : this.radius+Math.random()*(400-2*this.radius)
	};
};

Disc.prototype.hitting = function(x, y){
	var distX = Math.pow(x - this.position.x, 2);
	var distY = Math.pow(y - this.position.y, 2);
	var distance = Math.sqrt(distX + distY);
	if(distance < this.radius){
		this.hit = true;
	}
	return this.hit;
};