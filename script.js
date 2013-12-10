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
	$('#list').append('<div><input name="items" readonly /><span><a class="delete">Delete</a></span></div>');
	$('input[readonly]').last().attr('value', item);
	$('input[readonly]').last().slideDown();
	$('#newItem').val('');
};

$(function() {
	$('#add').on('click', addItem);
	$('#list').on('click', '.delete', deleteItem);
});

$(function(){
	$('#submit').on('click', function(){
		var itemsArray = [];
			$('input[name="items"]').map(function(){
 		 	itemsArray.push($(this).attr('value'));
		});
		$.post('mail.php', {
			name : $('#Name').val(),
			email: $('#Email').val(),
			items : itemsArray
		}, 
			function(data){
				$('#returnmsg').text(data);
			});
		$.post('mailparent.php', {
			name : $('#Name').val(),
			parents: $('#Parent-Email').val(),
			items : itemsArray
		}, 
			function(data){
				$('#returnmsg2').text(data);
			});
		$('#returnmsg').css('padding', '.5em').fadeOut(10000);
		$('#submit').fadeOut(300);
	});
});
