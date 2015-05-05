var Preloader = (function(){
	var pre, res;

	var preloaditemhandler = function(e){
		//console.debug(Preloader);
		Preloader.res[e.target.resouceId] = e.target;
		e.target.addEventListener('progress', progresshandler, false);
		var part = Object.keys(Preloader.res).length / Preloader.pre.length;
		var ev = new CustomEvent('preloadprocess', {detail : {'total':part}});
		document.dispatchEvent(ev);

		if(Object.keys(Preloader.res).length == Preloader.pre.length){
			var ev = new CustomEvent('preloaddone', {detail : {'resources':Preloader.res}});
			document.dispatchEvent(ev);
		}
	};

	var progresshandler = function(e){
		var part = Object.keys(Preloader.res).length / Preloader.pre.length;
		var total = 0;
		Object.keys(Preloader.res).forEach(function(key){
			var item = Preloader.res[key];
			var process = 1;
			if(item.tagName == 'AUDIO'){
				process = item.buffered.end(0)/item.duration;
			}
			total += 1/Preloader.pre.length * process;
		});
		var ev = new CustomEvent('preloadprocess', {detail : {'total':total}});
		document.dispatchEvent(ev);
	};

	var loadResources = function(preloaditems, resources){
		this.pre = preloaditems;
		this.res = resources;
		//start loading the resources
		this.pre.forEach(function(item) {
			var itemObj = new item.type();
			itemObj.resouceId = item.id;

			//set the event
			var event = (itemObj.tagName == 'AUDIO') ? 'canplaythrough' : 'load';
			itemObj.addEventListener(event, preloaditemhandler, false);

			//set the source
			if(itemObj.tagName == 'AUDIO'){
				
				//assume that the first source is ok
				itemObj.src = item.srcs[0].src;
				//find a better source
				item.srcs.some(function(srcObj, i){
					if(itemObj.canPlayType(srcObj.type) == 'probably'){
						itemObj.src = srcObj.src;
						return true;
					}
				});
			} else {
				itemObj.src = item.src;
			}
		});
	};

	return {load : loadResources};
})();