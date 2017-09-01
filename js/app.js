$(document).ready(function() {
	var game = {
		cards: $('li.card').map(function() {return $(this).html()}),
		numberOfMoves: 0,
		timer: new Timer(),
		init: function() {
			// This sets the number of moves to 0 in the score panel
			$('.moves').html(game.numberOfMoves);

			game.shuffle(game.cards);
			
		},
		shuffle: function(array) {
			var currentIndex = array.length, temporaryValue, randomIndex;

			while (currentIndex !== 0) {
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;
				temporaryValue = array[currentIndex];
				array[currentIndex] = array[randomIndex];
				array[randomIndex] = temporaryValue;
			}
			game.assignCards();
		},
		assignCards: function() {
			$('li.card').each(function(index) {
				$(this).html(game.cards[index]);	
			})
			game.clickHandlers();
			game.timerFunction();
			$('#repeat-button').on('click', function() {
				restartAfterWin();
			});
		},
		clickHandlers: function() {
			$('li.card').on('click', function() {
				$(this).addClass('open show');
				game.movesCount();
				game.starsCount();
				game.checkMatch();
			});			
		},
		checkMatch: function() {
			if ($('li.open').length === 2) {
				if (($('li.open').first().html()) === ($('li.open').last().html())) {
					$('li.open').addClass('match').removeClass('open show');
					game.checkWin();
				} else {
					setTimeout(function() {
						$('li.open').removeClass('open show');
					}, 700);
				}
			}
		},
		checkWin: function() {
			if ($('li.match').length === 16) {
				game.timer.stop();
				game.activateOverlay();
			}
		},
		activateOverlay: function() {
			el = document.getElementById('overlay');
			var starsGotten = $('ul.stars').html();
			var timeToFinish = $('.values').text();

			$('#p-win').html('You won with '+game.numberOfMoves+' moves!');
			$('<div>You got <ul class=\'stars\'>'+starsGotten+'</ul> stars!</div>').insertBefore('#restart-button');
			$('<div>In '+timeToFinish+'</div>').insertBefore('#restart-button');
			el.style.visibility = 'visible'
			$('#restart-button').on('click', function() {
				game.restartAfterWin();
			});
		},
		starsCount: function() {
			if (game.numberOfMoves === 26) {
				$('#first-star').removeClass('fa-star').addClass('fa-star-o');
			} else if (game.numberOfMoves === 32) {
				$('#second-star').removeClass('fa-star').addClass('fa-star-o');
			} else if (game.numberOfMoves === 38) {
				$('#third-star').removeClass('fa-star').addClass('fa-star-o');
			}
		},
		movesCount: function() {
			game.numberOfMoves += 1
			$('.moves').html(game.numberOfMoves);
		},
		timerFunction: function() { 
			if (game.numberOfMoves === 0) {
				$('.deck').on('click', function () {
				    game.timer.start();
				});
			}
			game.timer.addEventListener('secondsUpdated', function (e) {
			    $('#chronoExample .values').html(game.timer.getTimeValues().toString());
			});
			game.timer.addEventListener('started', function (e) {
			    $('#chronoExample .values').html(game.timer.getTimeValues().toString());
			});
		},
		restartAfterWin: function() {
			el = document.getElementById('overlay');
			$('li.card').attr('class', 'card');
			$('#first-star, #second-star, #third-star').attr('class', 'fa fa-star');
			
			if (el.style.visibility == 'visible') {
				el.style.visibility = 'hidden';
			}
			$('.moves').html(game.numberOfMoves = 0);
			$('.values').text('00:00:00');
		}
	}
	game.init();
});









