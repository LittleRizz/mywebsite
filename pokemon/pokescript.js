$(document).ready(function pokescript(){
	var pokemon = {};
	var counter = 0;
	console.log('ready!');

	//random interval function
	function getRandomInt(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	};


	//makin an ajax call!  I CHOOSE YOU!
	$('.btn-danger').on("click", function(){
		//checking to see if this is still working after the reset
		console.log("click");
		//logic to keep team size limited to 6.
		if (counter >= 5){
			$('#reset_button').empty().html("<button type='button' class='btn btn-success' data-toggle='modal' data-target='#myModal'>Reset</button>");
		};
		//random pokemon generator
		var rando = getRandomInt(2,719);

		//call to action!
		$.ajax({
			url: "http://pokeapi.co/api/v1/sprite/" + rando + "/",
			type: "GET",
			dataType: "jsonp",
			success: function(data) {
				pokemon.name = data.name;
				pokemon.id = data.id -1;
				pokemon.image = data.image;
				var spriteURL = 'http://pokeapi.co/'+ data.image;
				var nametrimmer = pokemon.name.split('_');
				$('.row').append("<div class='thumbnail'><div id='sprites'></div><div><h3 id='PokeName'></h3></div></div>")
				$('#PokeName').append("<span>" + nametrimmer[0] + "!  </span>");
				$('#sprites').append("<img class='pokeclass' src='" + spriteURL + "'/>").effect("bounce", "slow");

				counter ++;

			}
		})
	})
	//clearing the screen on the reset button
	$('#hella_reset').on("click", function() {
		counter = 0;
		$('#PokeName, #sprites').empty();
		$('#reset_button').empty().html("<button type='button' class='btn btn-danger' role='button'>A Wild Pokemon Appeared!</button>");
		pokescript();
	});

});
