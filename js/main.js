function Banner(){
	var keyword = "#Day70",
	    canvas,
	    context,
	    bgCanvas,
	    bgContext,
	    denseness = 8,
	    parts = [],

	    mouse = {x:0,y:0},
	    mouseOnScreen = false,

    colors = ['rgba(213, 222, 213, 0.8)', 'rgba(48, 135, 109, 0.8)', 'rgba(42, 108, 136, 0.8)', 'rgba(32, 62, 120, 0.8)'];


//When creating the particles, we assign a color from this list.
color: colors[Math.floor(Math.random() * colors.length)],

	this.initialize = function(canvas_id){
		canvas = document.getElementById(canvas_id);
		context = canvas.getContext('2d');

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		bgCanvas = document.createElement('canvas');
		bgContext = bgCanvas.getContext('2d');

		bgCanvas.width = window.innerWidth;
		bgCanvas.height = window.innerHeight;

		canvas.addEventListener('mousemove', MouseMove, false);
		canvas.addEventListener('mouseout', MouseOut, false);

		test();
	};

	var test = function(){

		bgContext.fillStyle = "#123321";
		bgContext.font = '300px Nunito';
		bgContext.fillText(keyword, 40, 270);

		clear();
		getCoords();
	};

	var getCoords = function(){
		var imageData, pixel, height, width;

		imageData = bgContext.getImageData(0, 0, canvas.width, canvas.height);

	    for(height = 0; height < bgCanvas.height; height += denseness){
            for(width = 0; width < bgCanvas.width; width += denseness){
               pixel = imageData.data[((width + (height * bgCanvas.width)) * 4) - 1];
                  if(pixel == 255) {
                    drawCircle(width, height);
                  }
            }
        }

        setInterval( update, 40 );
	};

	var drawCircle = function(x, y){
		parts.push(
			{c: colors[Math.floor(Math.random() * colors.length)],
			 x: x, //Original position
			 y: y,
			 x2: x, //Movable position
			 y2: y,
			 v:{x:(Math.random() * 3) * 2 - 3 , y:(Math.random() * 3) * 2 - 3},
			}
		);
	};

	var update = function(){
		var i, dx, dy, sqrDist, scale;

		clear();
		for (i = 0; i < parts.length; i++){

			if (mouseOnScreen == true) {

				parts[i].x2 += parts[i].v.x;
		        parts[i].y2 += parts[i].v.y;

		        if (parts[i].x2 > canvas.width || parts[i].x2 < 0) {
		            parts[i].v.x = -parts[i].v.x;
		        }

		        if (parts[i].y2 > canvas.height || parts[i].y2 < 0) {
		            parts[i].v.y = -parts[i].v.y;
		        }
			} else {
				parts[i].x2 = parts[i].x;
				parts[i].y2 = parts[i].y;
			}

		dx = parts[i].x2 - mouse.x;
	        dy = parts[i].y2 - mouse.y;
	        sqrDist =  Math.sqrt(dx*dx + dy*dy);
		scale = Math.max( Math.min( 6 - ( sqrDist / 10 ), 10 ), 1 );
		//Draw the circle

		context.fillStyle = parts[i].c;
		context.beginPath();
		context.arc(parts[i].x2, parts[i].y2, 4 * scale ,0 , Math.PI*2, true);
		context.closePath();
	  context.fill();

		}
	};

	var MouseMove = function(e) {
	    if (e.layerX || e.layerX == 0) {
	    	//Reset particle positions
	    	mouseOnScreen = true;


	        mouse.x = e.layerX - canvas.offsetLeft;
	        mouse.y = e.layerY - canvas.offsetTop;
	    }
	};

	var MouseOut = function(e) {
		mouseOnScreen = false;
		mouse.x = -200;
		mouse.y = -200;
	};

	//Clear the on screen canvas
	var clear = function(){
		context.fillStyle = '#1d1719';
		context.beginPath();
  		context.rect(0, 0, canvas.width, canvas.height);
 		context.closePath();
 		context.fill();
	};
}

var banner = new Banner();
banner.initialize("canvas");
