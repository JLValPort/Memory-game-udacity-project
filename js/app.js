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
			console.log('The cards got shuffled'); // <-------------------- REMOVE
		},
		// This function sets the cards back to their place
		assignCards: function() {
			console.log('assignCards function activated'); // <-------------------- REMOVE
			$('li.card').each(function(index) {
				$(this).html(game.cards[index]);
				console.log('The cards got assigned'); // <-------------------- REMOVE
			});
		},
		// This lets the cards be clicked
		clickHandlers: function() {
			console.log('The clickHandlers function activated'); // <-------------------- REMOVE
			
			$('li.card').on('click', function(event) {
				
				console.log('click from the clickHandlers function'); // <-------------------- REMOVE
				console.log('THIS IS THE EVENT INFO: '+event.target); // <-------------------- REMOVE
				
				$(this).addClass('open show').removeClass('unselected');
				$(event.target).off('click');
				event.stopPropagation();
				game.movesCount();
				game.starsCount();
				game.checkMatch();
			});
		},
		// activateClickHandlers: function() {
		// 	$('li.card').on('click');
		// },

		// Checks if the two cards selected match
		checkMatch: function() {
			if ($('li.open').length === 2) {
				console.log('There are two .open cards'); // <-------------------- REMOVE
				if (($('li.open').first().html()) === ($('li.open').last().html())) {
					console.log('Cards .open matched'); // <-------------------- REMOVE
					$('li.open').addClass('match').removeClass('open show');
					$('.match').off('click');
					game.checkWin();
				} else {
					game.clickHandlers();
					console.log('Cards .open did NOT match'); // <-------------------- REMOVE
					setTimeout(function() {
						$('li.open').removeClass('open show').addClass('unselected');
					}, 700);
				}
			}
		},
		//Checks if the player has matched all the cards
		checkWin: function() {
			if ($('li.match').length === 16) {
				console.log('All .match cards are a total of 16'); // <-------------------- REMOVE
				game.timer.stop();
				game.activateOverlay();
			}
		},
		// Sets the information to be displayed in a modal when the player has won and displays it
		activateOverlay: function() {
			console.log('activateOverlay function activated'); // <-------------------- REMOVE
			el = document.getElementById('overlay');
			var starsGotten = $('.fa-star').length;
			var timeToFinish = $('.values').text();
			$('#p-win').html('You won with '+game.numberOfMoves+' moves!');
			$('#stars-won').html('You got '+starsGotten+' stars in '+timeToFinish);
			el.style.visibility = 'visible'
			
		},
		// Changes the stars according the the number of moves
		starsCount: function() {
			console.log('starsCount function activated'); // <-------------------- REMOVE
			if (game.numberOfMoves === 26) {
				$('#first-star').removeClass('fa-star').addClass('fa-star-o');
			} else if (game.numberOfMoves === 32) {
				$('#second-star').removeClass('fa-star').addClass('fa-star-o');
			}
		},
		// Counts the number of moves done by the player
		movesCount: function() {
			console.log('movesCount function activated'); // <-------------------- REMOVE
			game.numberOfMoves += 1
			$('.moves').html(game.numberOfMoves);
		},
		// Manages the timer
		timerFunction: function() { 
			$('.deck').on('click', function () {
			    game.timer.start();
			    $(this).off('click');
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
				console.log('Game got restarted from repeat-button'); // <-------------------- REMOVE
			});
			$('#restart-button').on('click', function() {
				game.restartAfterWin();
			});
		},
		

		// Restarts the game
		restartAfterWin: function() {
			el = document.getElementById('overlay');
			$('li.card').attr('class', 'card unselected');
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

			// var clickHandler1 = $("li.card").data();
			// console.log(clickHandler1);

			var jqueryObject = $('li.card');
			var rawDOMElement = jqueryObject.get(0);
			var eventObject = $._data(rawDOMElement, 'events');

			console.log(eventObject); // <-------------------- REMOVE
			if (eventObject != undefined && eventObject.click != undefined) {
				console.log('Passed the eventObject if statement'); // <-------------------- REMOVE
				$('li.card').off('click');
				game.clickHandlers();
			}


		}
	};
	game.init();
});








