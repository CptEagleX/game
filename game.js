var time = 15;
function timeLeft() {
	if (time != 0) {
		time -= 1;
		document.getElementById("timer").innerHTML = "Time left: " + time + "s";
	}
	else {
		document.getElementById("timer").innerHTML = "Time left: 0s";
	}
};

const canvas = document.getElementById("cv");
const ctx = canvas.getContext("2d");
const square = 140;
const coin = 20;
var q, w;
var x = 1;
var y = 1;
var score = 0;

				//player
var u = 0;
function coins() {
	do {
		q = Math.floor(Math.random() * 3);
	} while (q == x);
	do {
		w = Math.floor(Math.random() * 3);
	} while (w == y);

	ctx.fillStyle = "black";
	ctx.fillRect(q * 160 + 65, w * 160 + 65, coin, coin);

	if (u == 1) {
		u = 0;
		catcher();
	};
}

function catcher() {
	ctx.fillStyle = "red";
	ctx.fillRect(x * 160 + 10, y * 160 + 10, square, square);

	if ((x == q) && (y == w)) {
		score += 1;
		ctx.clearRect(q * 160, w * 160, 160, 160);			//clear from coin
		ctx.fillRect(x * 160 + 10, y * 160 + 10, square, square);			//get back player
		coins();
	}
	document.getElementById("score").innerHTML = 'Score = ' + score;
};

var gamenumber = 0;
var HighestScore = 0;
function restart() {
	if (HighestScore < score) {
		HighestScore = score;
		document.getElementById("HS").innerHTML = "Highest score: " +  HighestScore;
	}
	document.getElementById("scoreboard").innerHTML += "<li>" + [gamenumber += 1] + "<span>" + score + "</span>" + "</li>"; 
	time = 15;
	x = 1;
	y = 1;
	i = 0;
	score = 0;
	clearInterval(int);
	ctx.clearRect(0, 0, 480, 480);
	u += 1;
	coins();
}


				//keyboard press detection
var int;
var i = 0;
document.addEventListener('keydown',
	function(t) {
		if (t.keyCode == 37 || 38 || 39 || 40 || 65 || 87 ||68 || 83) {
			if (time != 0) {
				ctx.clearRect(x * 160 + 10, y * 160 + 10, square, square);
			};
			for (; i < 1; i++) {
				int = setInterval(timeLeft, 1000);
			};
		};
		//disable default actions
		if([32, 37, 38, 39, 40].indexOf(t.keyCode) > -1) {
			t.preventDefault();
		}
		//left key
	    if (((t.keyCode == 37) || (t.keyCode == 65)) && (x != 0)) {
	        x -= 1;
	    }
	    //top key
	    else if (((t.keyCode == 38) || (t.keyCode == 87)) && (y != 0)) {
	        y -= 1;
	    }
	    //right key
	    else if (((t.keyCode == 39) || (t.keyCode == 68)) && (x != 2)) {
	       x += 1;
	    }
	    //bottom key
	    else if (((t.keyCode == 40) || (t.keyCode == 83)) && (y != 2)) {
	    	y += 1;
	    };
	    //restart game (r)
	    if (t.keyCode == 82) {
	    	restart();
	    	document.getElementById("timer").innerHTML = "Time left: 15s";
	    };
	    if (time != 0) {
	    	catcher();
		}
});


coins()
catcher();