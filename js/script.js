// $('#add').click( function(){
// 	$( "<div class='list-item'><input type='text' placeholder='I want a...'><button class='delete'>Delete</button></div>" ).appendTo( "#list" );
// });

// $( "#remove" ).click(function() {
//   $('.list-item').last().remove();
// });


function deleteItem(){
	$(this).closest('div').slideUp(400, function(){
		$(this).closest('div').remove();
	});
	
};
function addItem(){
	var item = $('#newItem').val();
	$('.itemerror').html('');
	if(item.trim().length<1){
		$('.itemerror').text('List items cannot be empty!');
		$('#newItem').val('');
	}else{
	$('#list').append('<div><input name="items" readonly /><span><a class="delete">X</a></span></div>');
	$('input[readonly]').last().attr('value', item);
	$('input[readonly]').last().slideDown();
	$('#newItem').val('');
}};
$('#newItem').keypress(function(e) {
    if(e.which == 13) {
        addItem();
        e.preventDefault();
    }
});

$(function() {
	$('#add').on('vclick', addItem);
	$('#list').on('vclick', '.delete', deleteItem);
	if ($(document).width() > 959) {
		$.fn.snow({minSize: 20, maxSize: 30, newOn: 1200});
	}
	$('.subbtn').prepend('<div id=botcheck><input type=checkbox name=notBot id=notBot /><label for=notBot>I am not a robot</label></div>')
});
$('#form').validate({
	rules: {
    	name: { lettersonly: true }
  }
});
var valid = false;
$(function(){
	$('#form').on('submit', function(e){
		$('.itemerror').html('');
		
		var itemsArray = [];
		$('input[name="items"]').map(function(){
 		 	itemsArray.push($(this).attr('value'));
		});

		valid = $('#form').valid();

		if(valid == false) {
			$('.itemerror').text("Please fix any errors before submitting");
		} else if(itemsArray.length<1) {
			$('.itemerror').text('Please add an item to your list');
		} else if (itemsArray.length>10) {
			$('.itemerror').text("Limit 10 items. Don't be greedy!");
		} else if ($('input[name=notBot]').prop('checked') == false){
			$('.itemerror').text("Please verify you are not a robot");
		}else{
			$.ajax({
				type: 'POST',
				url: 'mail.php',
				data: {
					name : $('#Name').val(),
					email: $('#Email').val(),
					items : itemsArray,
					notBot: $('input[name=notBot]').prop('checked')
					}
				})
				.done(function( data ) {
    				$('#returnmsg').text(data);
    			});
    			$.ajax({
				type: 'POST',
				url: 'mailparent.php',
				data: {
					name : $('#Name').val(),
					parents: $('#Parent-Email').val(),
					items : itemsArray,
					notBot: $('input[name=notBot]').prop('checked')
					}
				})
				.done(function( data ) {
    				$('#returnmsg').text(data);
    			});
    		 $(this).find("input[type=text], input[type=email]").val("");
    		 $('#list').empty();
    		 $('input[name=notBot]').attr('checked', false);
			// alert('i think it worked...');
			$('#returnmsg').css('padding', '.5em').fadeOut(5000, function(){
				$(this).text('');
				$(this).css('padding', '0').fadeIn(50);
			});
		}

		e.preventDefault();
		
		// $('#submit').fadeOut(300);	
	
	});
});