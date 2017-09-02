$(document).ready(function() {
	var game = {

		// Variables used through out the game
		cards: $('li.card').map(function() {return $(this).html()}),
		numberOfMoves: 0,
		timer: new Timer(),

		init: function() {
			$('.moves').html(game.numberOfMoves); // This sets the number of moves to 0 in the score panel
			game.shuffle(game.cards);
			game.assignCards();
			game.clickHandlers();
			game.timerFunction();
			game.repeatGame();
		},
		// This function shuffles the cards
		shuffle: function(array) {
			var currentIndex = array.length, temporaryValue, randomIndex;

			while (currentIndex !== 0) {
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;
				temporaryValue = array[currentIndex];
				array[currentIndex] = array[randomIndex];
				array[randomIndex] = temporaryValue;
			}
		},
		// This function sets the cards back to their place
		assignCards: function() {
			$('li.card').each(function(index) {
				$(this).html(game.cards[index]);
			});
		},
		// This lets the cards be clicked
		clickHandlers: function() {
			$('.deck').on('click','.unselected.clickable', function(event) {				
				$(this).addClass('open show').removeClass('unselected clickable');
				event.stopPropagation();
				game.movesCount();
				game.starsCount();
				game.checkMatch();
			});
		},
		// Checks if the two cards selected match
		checkMatch: function() {
			if ($('li.open').length === 2) {
				$('.unselected').removeClass('clickable');
				if (($('li.open').first().html()) === ($('li.open').last().html())) {
					$('li.open').addClass('match').removeClass('open show');
					$('.unselected').addClass('clickable');
					game.checkWin();
				} else {
					setTimeout(function() {
						$('.unselected').addClass('clickable');
						$('li.open').removeClass('open show').addClass('unselected clickable');
					}, 700);
				}
			}
		},
		//Checks if the player has matched all the cards
		checkWin: function() {
			if ($('li.match').length === 16) {
				game.timer.stop();
				game.activateOverlay();
			}
		},
		// Sets the information to be displayed in a modal when the player has won and displays it
		activateOverlay: function() {
			el = document.getElementById('overlay');
			var starsGotten = $('.fa-star').length;
			var timeToFinish = $('.values').text();
			$('#p-win').html('You won with '+game.numberOfMoves+' moves!');
			$('#stars-won').html('You got '+starsGotten+' stars in '+timeToFinish);
			el.style.visibility = 'visible'
			
		},
		// Changes the stars according the the number of moves
		starsCount: function() {
			if (game.numberOfMoves === 26) {
				$('#first-star').removeClass('fa-star').addClass('fa-star-o');
			} else if (game.numberOfMoves === 32) {
				$('#second-star').removeClass('fa-star').addClass('fa-star-o');
			}
		},
		// Counts the number of moves done by the player
		movesCount: function() {
			game.numberOfMoves += 1
			$('.moves').html(game.numberOfMoves);
		},
		// Manages the timer
		timerFunction: function() { 
			$('.deck').one('click','.unselected', function () {
			    game.timer.start();
			});
			game.timer.addEventListener('secondsUpdated', function (e) {
			    $('.chronometer .values').html(game.timer.getTimeValues().toString());
			});
			game.timer.addEventListener('started', function (e) {
			    $('.chronometer .values').html(game.timer.getTimeValues().toString());
			});
		},
		// Activates the repeat and restart button
		repeatGame: function() {
			$('#repeat-button').on('click', function() {
				game.restartAfterWin();
			});
			$('#restart-button').on('click', function() {
				game.restartAfterWin();
			});
		},
		// Restarts the game
		restartAfterWin: function() {
			el = document.getElementById('overlay');
			$('li.card').attr('class', 'card unselected clickable');
			$('#first-star, #second-star, #third-star').attr('class', 'fa fa-star');
			$('.moves').html(game.numberOfMoves = 0);
			game.timer.stop();
			$('.values').text('00:00:00');
			game.shuffle(game.cards);
			game.assignCards();
			game.timerFunction();
			if (el.style.visibility == 'visible') {
				el.style.visibility = 'hidden';
			}
		}
	};
	game.init();
});