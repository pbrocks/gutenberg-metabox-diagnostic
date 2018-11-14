var button1z = $('#editor > div > div > div > div.edit-post-header > div.edit-post-header__settings > button.components-button.editor-post-publish-button.is-button.is-default.is-primary.is-large');
jQuery(document).ready(function($) {
	$(".editor-post-publish-button").click(function(e) {
        e.alert('saving post');
		e.preventDefault();
        // We'll pass this variable to the PHP function example_ajax_request
        var fruit = 'Banana';
        // // This does the ajax request
        $.ajax({
        	type: "POST",
        	url: frontend_ajax_object.frontend_ajaxurl,
            // url: ajaxurl, // or example_ajax_obj.ajaxurl if using on frontend
            data: {
            	'action': 'example_ajax_request',
            	'fruit' : fruit,
            	'frontend_ajaxurl' : frontend_ajax_object.frontend_ajaxurl,
            	'frontend_nonce' : frontend_ajax_object.frontend_nonce,
            	'random_number' : frontend_ajax_object.random_number,
            },
            success:function(data) {
            	$( '#return-frontend' ).html(data);
            	$( '#test-input-ajax' ).val(frontend_ajax_object.frontend_nonce);
                // This outputs the result of the ajax request
                console.log(data);
            },
            error: function(jqXHR, textStatus, errorThrown){
            	console.log(errorThrown);
            }
        });  
    });      
});